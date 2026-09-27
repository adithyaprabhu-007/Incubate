import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
            UUID(as_uuid=True),
            primary_key=True,
        )

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
    )

    role: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    created_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )


class EmergencyProfile(Base):
    __tablename__ = "emergency_profiles"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    blood_group: Mapped[str | None] = mapped_column(
        String(10),
    )

    allergies: Mapped[str | None] = mapped_column(
        Text,
    )

    medications: Mapped[str | None] = mapped_column(
        Text,
    )

    critical_conditions: Mapped[str | None] = mapped_column(
        Text,
    )

    emergency_contact_name: Mapped[str | None] = mapped_column(
        String(100),
    )

    emergency_contact_phone: Mapped[str | None] = mapped_column(
        String(20),
    )

    last_verified_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )

    created_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )


class AccessRequest(Base):
    __tablename__ = "access_requests"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    requester_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    purpose: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    requested_blood_group: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    requested_allergies: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    requested_medications: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    requested_conditions: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    requested_emergency_contact: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="pending",
    )

    created_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )

    expires_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )


class AccessGrant(Base):
    __tablename__ = "access_grants"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    request_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("access_requests.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    approved_blood_group: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    approved_allergies: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    approved_medications: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    approved_conditions: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    approved_emergency_contact: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    granted_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )
    updated_at: Mapped[datetime | None] = mapped_column(DateTime)

    expires_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="active",
    )


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = mapped_column(
    UUID(as_uuid=True),
    primary_key=True,
    default=uuid.uuid4,
)

    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
    )

    patient_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
    )

    request_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("access_requests.id"),
    )

    action: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    reason: Mapped[str | None] = mapped_column(
        Text,
    )

    created_at: Mapped[datetime | None] = mapped_column(
        DateTime,
    )