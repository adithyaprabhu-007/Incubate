from datetime import datetime, timedelta
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_db
from models import AccessGrant, AccessRequest, AuditLog, User
from schemas import (
    AccessGrantResponse,
    AccessRequestApprove,
    AccessRequestCreate,
    AccessRequestResponse,
    AuditLogResponse,
)

router = APIRouter(
    prefix="/access-requests",
    tags=["Access Requests"],
)


# ---------------------------------------------------------
# CREATE ACCESS REQUEST
# ---------------------------------------------------------

@router.post(
    "",
    response_model=AccessRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_access_request(
    request_data: AccessRequestCreate,
    db: Session = Depends(get_db),
):
    if request_data.patient_id == request_data.requester_id:
        raise HTTPException(
            status_code=400,
            detail="Patient and requester must be different users",
        )

    requested_fields = [
        request_data.requested_blood_group,
        request_data.requested_allergies,
        request_data.requested_medications,
        request_data.requested_conditions,
        request_data.requested_emergency_contact,
    ]

    if not any(requested_fields):
        raise HTTPException(
            status_code=400,
            detail="At least one medical field must be requested",
        )

    patient = db.scalar(
        select(User).where(
            User.id == request_data.patient_id,
            User.role == "patient",
        )
    )

    if patient is None:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    requester = db.scalar(
        select(User).where(
            User.id == request_data.requester_id,
            User.role.in_(["doctor", "hospital"]),
        )
    )

    if requester is None:
        raise HTTPException(
            status_code=403,
            detail="Requester must be a doctor or hospital",
        )

    now = datetime.utcnow()

    access_request = AccessRequest(
        patient_id=request_data.patient_id,
        requester_id=request_data.requester_id,
        purpose=request_data.purpose,
        requested_blood_group=request_data.requested_blood_group,
        requested_allergies=request_data.requested_allergies,
        requested_medications=request_data.requested_medications,
        requested_conditions=request_data.requested_conditions,
        requested_emergency_contact=request_data.requested_emergency_contact,
        status="pending",
        created_at=now,
        updated_at=now,
    )

    db.add(access_request)
    db.flush()

    audit_log = AuditLog(
        user_id=request_data.requester_id,
        patient_id=request_data.patient_id,
        request_id=access_request.id,
        action="access_requested",
        reason=request_data.purpose,
        created_at=now,
    )

    db.add(audit_log)

    db.commit()
    db.refresh(access_request)

    return access_request


# ---------------------------------------------------------
# APPROVE ACCESS REQUEST
# ---------------------------------------------------------

@router.post(
    "/{request_id}/approve",
    response_model=AccessGrantResponse,
    status_code=status.HTTP_201_CREATED,
)
def approve_access_request(
    request_id: UUID,
    approval: AccessRequestApprove,
    db: Session = Depends(get_db),
):
    access_request = db.scalar(
        select(AccessRequest)
        .where(AccessRequest.id == request_id)
        .with_for_update()
    )

    if access_request is None:
        raise HTTPException(
            status_code=404,
            detail="Access request not found",
        )

    if access_request.status != "pending":
        raise HTTPException(
            status_code=400,
            detail=(
                f"Request cannot be approved because its status is "
                f"'{access_request.status}'"
            ),
        )

    # Make sure only requested fields are approved.
    checks = [
        (
            approval.approved_blood_group,
            access_request.requested_blood_group,
            "Blood group was not requested",
        ),
        (
            approval.approved_allergies,
            access_request.requested_allergies,
            "Allergies were not requested",
        ),
        (
            approval.approved_medications,
            access_request.requested_medications,
            "Medications were not requested",
        ),
        (
            approval.approved_conditions,
            access_request.requested_conditions,
            "Critical conditions were not requested",
        ),
        (
            approval.approved_emergency_contact,
            access_request.requested_emergency_contact,
            "Emergency contact was not requested",
        ),
    ]

    for approved, requested, message in checks:
        if approved and not requested:
            raise HTTPException(
                status_code=400,
                detail=message,
            )

    approved_fields = [
        approval.approved_blood_group,
        approval.approved_allergies,
        approval.approved_medications,
        approval.approved_conditions,
        approval.approved_emergency_contact,
    ]

    if not any(approved_fields):
        raise HTTPException(
            status_code=400,
            detail="At least one medical field must be approved",
        )

    if approval.expires_in_minutes <= 0:
        raise HTTPException(
            status_code=400,
            detail="Expiry time must be greater than 0 minutes",
        )

    if approval.expires_in_minutes > 1440:
        raise HTTPException(
            status_code=400,
            detail="Expiry time cannot exceed 24 hours",
        )

    now = datetime.utcnow()
    expires_at = now + timedelta(
        minutes=approval.expires_in_minutes
    )

    grant = AccessGrant(
        request_id=access_request.id,
        approved_blood_group=approval.approved_blood_group,
        approved_allergies=approval.approved_allergies,
        approved_medications=approval.approved_medications,
        approved_conditions=approval.approved_conditions,
        approved_emergency_contact=approval.approved_emergency_contact,
        granted_at=now,
        updated_at=now,
        expires_at=expires_at,
        status="active",
    )

    db.add(grant)

    access_request.status = "approved"
    access_request.updated_at = now
    access_request.expires_at = expires_at

    audit_log = AuditLog(
        user_id=access_request.patient_id,
        patient_id=access_request.patient_id,
        request_id=access_request.id,
        action="access_approved",
        reason="Patient approved requested emergency information",
        created_at=now,
    )

    db.add(audit_log)

    # Force SQLAlchemy to send the INSERT/UPDATE statements
    # before committing.
    db.flush()

    db.commit()

    db.refresh(grant)

    return grant


# ---------------------------------------------------------
# GET AUDIT LOGS FOR A PATIENT
# ---------------------------------------------------------

@router.get(
    "/audit-logs/{patient_id}",
    response_model=list[AuditLogResponse],
)
def get_audit_logs(
    patient_id: UUID,
    db: Session = Depends(get_db),
):
    logs = db.scalars(
        select(AuditLog)
        .where(AuditLog.patient_id == patient_id)
        .order_by(AuditLog.created_at.desc())
    ).all()

    return list(logs)