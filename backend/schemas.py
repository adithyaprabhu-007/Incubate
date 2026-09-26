from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: str
    role: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class EmergencyProfileResponse(BaseModel):
    id: UUID
    user_id: UUID
    blood_group: str | None = None
    allergies: str | None = None
    medications: str | None = None
    critical_conditions: str | None = None
    emergency_contact_name: str | None = None
    emergency_contact_phone: str | None = None
    last_verified_at: datetime | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class AccessRequestCreate(BaseModel):
    patient_id: UUID
    requester_id: UUID
    purpose: str

    requested_blood_group: bool = False
    requested_allergies: bool = False
    requested_medications: bool = False
    requested_conditions: bool = False
    requested_emergency_contact: bool = False


class AccessRequestResponse(BaseModel):
    id: UUID
    patient_id: UUID
    requester_id: UUID
    purpose: str

    requested_blood_group: bool
    requested_allergies: bool
    requested_medications: bool
    requested_conditions: bool
    requested_emergency_contact: bool

    status: str
    created_at: datetime | None = None
    expires_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class AccessGrantResponse(BaseModel):
    id: UUID
    request_id: UUID

    approved_blood_group: bool
    approved_allergies: bool
    approved_medications: bool
    approved_conditions: bool
    approved_emergency_contact: bool

    granted_at: datetime | None = None
    expires_at: datetime
    status: str

    model_config = ConfigDict(from_attributes=True)


class AuditLogResponse(BaseModel):
    id: UUID
    user_id: UUID | None = None
    patient_id: UUID | None = None
    request_id: UUID | None = None
    action: str
    reason: str | None = None
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class AccessRequestApprove(BaseModel):
    approved_blood_group: bool = False
    approved_allergies: bool = False
    approved_medications: bool = False
    approved_conditions: bool = False
    approved_emergency_contact: bool = False

    expires_in_minutes: int = 30