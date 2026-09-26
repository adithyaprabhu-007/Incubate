from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from database import get_db
from models import AccessGrant, AccessRequest, EmergencyProfile, User
from schemas import EmergencyProfileResponse, UserResponse


router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.get(
    "/{patient_id}",
    response_model=UserResponse,
)
def get_patient(
    patient_id: UUID,
    db: Session = Depends(get_db),
):
    patient = db.scalar(
        select(User).where(
            User.id == patient_id,
            User.role == "patient",
        )
    )

    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    return patient


@router.get(
    "/{patient_id}/emergency-profile",
    response_model=EmergencyProfileResponse,
)
def get_emergency_profile(
    patient_id: UUID,
    db: Session = Depends(get_db),
):
    patient = db.scalar(
        select(User).where(
            User.id == patient_id,
            User.role == "patient",
        )
    )

    if patient is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    profile = db.scalar(
        select(EmergencyProfile).where(
            EmergencyProfile.user_id == patient_id
        )
    )

    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Emergency profile not found",
        )

    return profile
@router.get("/{patient_id}/shared-profile")
def get_shared_profile(
    patient_id: UUID,
    request_id: UUID,
    db: Session = Depends(get_db),
):
    access_request = db.scalar(
        select(AccessRequest).where(
            AccessRequest.id == request_id,
            AccessRequest.patient_id == patient_id,
        )
    )

    if access_request is None:
        raise HTTPException(
            status_code=404,
            detail="Access request not found",
        )

    grant = db.scalar(
        select(AccessGrant).where(
            AccessGrant.request_id == request_id,
            AccessGrant.status == "active",
        )
    )

    if grant is None:
        raise HTTPException(
            status_code=403,
            detail="No active access grant",
        )

    from datetime import datetime

    if grant.expires_at <= datetime.utcnow():
        grant.status = "expired"
        db.commit()
        raise HTTPException(
            status_code=403,
            detail="Access grant has expired",
        )

    profile = db.scalar(
        select(EmergencyProfile).where(
            EmergencyProfile.user_id == patient_id
        )
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Emergency profile not found",
        )

    response = {}

    if grant.approved_blood_group:
        response["blood_group"] = profile.blood_group

    if grant.approved_allergies:
        response["allergies"] = profile.allergies

    if grant.approved_medications:
        response["medications"] = profile.medications

    if grant.approved_conditions:
        response["critical_conditions"] = profile.critical_conditions

    if grant.approved_emergency_contact:
        response["emergency_contact_name"] = profile.emergency_contact_name
        response["emergency_contact_phone"] = profile.emergency_contact_phone

    response["last_verified_at"] = profile.last_verified_at

    return response