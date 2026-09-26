-- Demo users
INSERT INTO users (full_name, email, role)
VALUES
('Alex Sharma', 'alex@example.com', 'patient'),
('Dr. Arun Kumar', 'arun@apollo-demo.com', 'doctor'),
('Apollo Emergency Department', 'emergency@apollo-demo.com', 'hospital');

-- Demo emergency profile
INSERT INTO emergency_profiles (
    user_id,
    blood_group,
    allergies,
    medications,
    critical_conditions,
    emergency_contact_name,
    emergency_contact_phone,
    last_verified_at
)
SELECT
    id,
    'O+',
    'Penicillin',
    'Insulin',
    'Diabetes',
    'Rahul Sharma',
    '+91-9000000000',
    CURRENT_TIMESTAMP
FROM users
WHERE email = 'alex@example.com';

-- Demo access request
INSERT INTO access_requests (
    patient_id,
    requester_id,
    purpose,
    requested_blood_group,
    requested_allergies,
    requested_medications,
    requested_conditions,
    requested_emergency_contact,
    status,
    expires_at
)
SELECT
    patient.id,
    doctor.id,
    'Emergency Treatment',
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    'pending',
    CURRENT_TIMESTAMP + INTERVAL '1 hour'
FROM users patient
CROSS JOIN users doctor
WHERE patient.email = 'alex@example.com'
  AND doctor.email = 'arun@apollo-demo.com';

-- Demo access grant
INSERT INTO access_grants (
    request_id,
    approved_blood_group,
    approved_allergies,
    approved_medications,
    approved_conditions,
    approved_emergency_contact,
    expires_at,
    status
)
SELECT
    id,
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    CURRENT_TIMESTAMP + INTERVAL '1 hour',
    'active'
FROM access_requests
WHERE purpose = 'Emergency Treatment'
  AND status = 'pending';

-- Demo audit log
INSERT INTO audit_logs (
    user_id,
    patient_id,
    request_id,
    action,
    reason
)
SELECT
    doctor.id,
    patient.id,
    request.id,
    'EMERGENCY_ACCESS_GRANTED',
    'Emergency treatment'
FROM users doctor
CROSS JOIN users patient
JOIN access_requests request
    ON request.patient_id = patient.id
   AND request.requester_id = doctor.id
WHERE doctor.email = 'arun@apollo-demo.com'
  AND patient.email = 'alex@example.com'
  AND request.purpose = 'Emergency Treatment';
