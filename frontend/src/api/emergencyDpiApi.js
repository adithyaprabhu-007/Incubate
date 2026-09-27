const API_BASE_URL = 'http://localhost:8010';

async function parseJsonResponse(response, fallbackMessage) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    // Non-JSON or empty body; fall through to the status-based error below.
  }

  if (!response.ok) {
    throw new Error(data?.detail || fallbackMessage);
  }

  return data;
}

export async function createAccessRequest({
  patientId,
  requesterId,
  purpose,
  requestedBloodGroup = false,
  requestedAllergies = false,
  requestedMedications = false,
  requestedConditions = false,
  requestedEmergencyContact = false,
}) {
  const response = await fetch(`${API_BASE_URL}/access-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patient_id: patientId,
      requester_id: requesterId,
      purpose,
      requested_blood_group: requestedBloodGroup,
      requested_allergies: requestedAllergies,
      requested_medications: requestedMedications,
      requested_conditions: requestedConditions,
      requested_emergency_contact: requestedEmergencyContact,
    }),
  });

  return parseJsonResponse(response, 'Failed to create access request');
}

export async function approveAccessRequest(requestId, {
  approvedBloodGroup = false,
  approvedAllergies = false,
  approvedMedications = false,
  approvedConditions = false,
  approvedEmergencyContact = false,
  expiresInMinutes = 15,
}) {
  const response = await fetch(
    `${API_BASE_URL}/access-requests/${requestId}/approve`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        approved_blood_group: approvedBloodGroup,
        approved_allergies: approvedAllergies,
        approved_medications: approvedMedications,
        approved_conditions: approvedConditions,
        approved_emergency_contact: approvedEmergencyContact,
        expires_in_minutes: expiresInMinutes,
      }),
    }
  );

  return parseJsonResponse(response, 'Failed to approve access request');
}

export async function getSharedProfile(patientId, requestId) {
  const response = await fetch(
    `${API_BASE_URL}/patients/${patientId}/shared-profile?request_id=${requestId}`
  );

  return parseJsonResponse(response, 'Failed to retrieve shared profile');
}

export async function getAuditLogs(patientId) {
  const response = await fetch(
    `${API_BASE_URL}/access-requests/audit-logs/${patientId}`
  );

  return parseJsonResponse(response, 'Failed to retrieve audit logs');
}

export async function createBreakGlassAccess({
  patientId,
  requesterId,
  reason,
  expiresInMinutes = 60,
}) {
  const response = await fetch(`${API_BASE_URL}/access-requests/break-glass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patient_id: patientId,
      requester_id: requesterId,
      reason,
      expires_in_minutes: expiresInMinutes,
    }),
  });

  return parseJsonResponse(response, 'Failed to authorize break-glass access');
}