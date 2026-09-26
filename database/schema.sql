-- EmergencyDPI Database Schema
-- PostgreSQL / Supabase

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ============================================
-- USERS
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- EMERGENCY PROFILES
-- ============================================

CREATE TABLE emergency_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID UNIQUE NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    blood_group VARCHAR(10),
    allergies TEXT,
    medications TEXT,
    critical_conditions TEXT,

    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),

    last_verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- ACCESS REQUESTS
-- ============================================

CREATE TABLE access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    patient_id UUID NOT NULL
        REFERENCES users(id),

    requester_id UUID NOT NULL
        REFERENCES users(id),

    purpose VARCHAR(255) NOT NULL,

    requested_blood_group BOOLEAN DEFAULT FALSE,
    requested_allergies BOOLEAN DEFAULT FALSE,
    requested_medications BOOLEAN DEFAULT FALSE,
    requested_conditions BOOLEAN DEFAULT FALSE,
    requested_emergency_contact BOOLEAN DEFAULT FALSE,

    status VARCHAR(30) DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'approved',
                'denied',
                'expired',
                'break_glass'
            )
        ),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);


-- ============================================
-- ACCESS GRANTS
-- ============================================

CREATE TABLE access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    request_id UUID UNIQUE NOT NULL
        REFERENCES access_requests(id) ON DELETE CASCADE,

    approved_blood_group BOOLEAN DEFAULT FALSE,
    approved_allergies BOOLEAN DEFAULT FALSE,
    approved_medications BOOLEAN DEFAULT FALSE,
    approved_conditions BOOLEAN DEFAULT FALSE,
    approved_emergency_contact BOOLEAN DEFAULT FALSE,

    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,

    status VARCHAR(30) DEFAULT 'active'
        CHECK (
            status IN (
                'active',
                'expired',
                'revoked'
            )
        )
);


-- ============================================
-- AUDIT LOGS
-- ============================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES users(id),

    patient_id UUID
        REFERENCES users(id),

    request_id UUID
        REFERENCES access_requests(id),

    action VARCHAR(100) NOT NULL,
    reason TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_access_requests_patient
ON access_requests(patient_id);

CREATE INDEX idx_access_requests_requester
ON access_requests(requester_id);

CREATE INDEX idx_audit_logs_patient
ON audit_logs(patient_id);

CREATE INDEX idx_audit_logs_request
ON audit_logs(request_id);
