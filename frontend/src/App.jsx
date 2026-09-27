import React, { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import { createAccessRequest } from './api/emergencyDpiApi';
import DemoFlowBar from './components/DemoFlowBar';
import PatientDashboard from './components/PatientDashboard';
import FirstResponderView from './components/FirstResponderView';
import HospitalRequestPortal from './components/HospitalRequestPortal';
import PatientConsentScreen from './components/PatientConsentScreen';
import ActiveAccessView from './components/ActiveAccessView';

import {
  MOCK_PROVIDER,
  INITIAL_AUDIT_LOGS
} from './data/mockData';
import { usePatientContext } from './context/PatientContext';

import {
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Siren,
  Pencil,
  X,
  Save,
  User,
  Phone,
  MapPin,
  Calendar,
  Droplets,
  CreditCard,
  HeartPulse
} from 'lucide-react';


export default function App() {

  const { patient, updatePatient, resetDemo } = usePatientContext();

  /* =========================================================
     PATIENT DATA
     ========================================================= */


  /* =========================================================
     PROVIDER / HOSPITAL DATA
     ========================================================= */

  const [provider, setProvider] = useState(() => {
    try {
      const savedProvider =
        window.localStorage.getItem('emergencyDpiProvider');

      if (savedProvider) {
        return {
          ...MOCK_PROVIDER,
          ...JSON.parse(savedProvider)
        };
      }

      return MOCK_PROVIDER;

    } catch (error) {
      console.error(
        'Unable to load saved provider data:',
        error
      );

      return MOCK_PROVIDER;
    }
  });


  /* =========================================================
     SAVE PROVIDER DATA
     ========================================================= */

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'emergencyDpiProvider',
        JSON.stringify(provider)
      );
    } catch (error) {
      console.error(
        'Unable to save provider data:',
        error
      );
    }
  }, [provider]);


  /* =========================================================
     APPLICATION NAVIGATION
     ========================================================= */

  const [currentView, setCurrentView] =
    useState('dashboard');


  /* =========================================================
     AUDIT LOGS
     ========================================================= */

  const [auditLogs, setAuditLogs] =
    useState(INITIAL_AUDIT_LOGS);


  /* =========================================================
     EMERGENCY / ACCESS WORKFLOW STATES
     ========================================================= */

  const [isEmergencyActive, setIsEmergencyActive] =
    useState(false);

  const [hasPendingRequest, setHasPendingRequest] =
    useState(false);

  const [requestData, setRequestData] =
    useState(null);

  const [activeSession, setActiveSession] =
    useState(null);

  const [isRevoked, setIsRevoked] =
    useState(false);


  /* =========================================================
     NOTIFICATION
     ========================================================= */

  const [notification, setNotification] =
    useState(null);


  /* =========================================================
     PROFILE EDITOR
     ========================================================= */

  const [isProfileEditorOpen, setIsProfileEditorOpen] =
    useState(false);

  const [profileDraft, setProfileDraft] =
    useState(null);


  /* =========================================================
     OPEN PROFILE EDITOR
     ========================================================= */

  const handleOpenProfileEditor = () => {

    setProfileDraft({
      name: patient.name || '',
      age: patient.age || '',
      gender: patient.gender || '',
      dob: patient.dob || '',
      bloodGroup: patient.bloodGroup || '',
      bloodDonorStatus: patient.bloodDonorStatus || '',
      organDonor: patient.organDonor || '',
      abhaAddress: patient.abhaAddress || '',
      phone: patient.phone || '',
      city: patient.city || '',
      insurancePolicy: patient.insurancePolicy || ''
    });

    setIsProfileEditorOpen(true);
  };


  /* =========================================================
     CLOSE PROFILE EDITOR
     ========================================================= */

  const handleCloseProfileEditor = () => {
    setIsProfileEditorOpen(false);
    setProfileDraft(null);
  };


  /* =========================================================
     HANDLE PROFILE FIELD CHANGE
     ========================================================= */

  const handleProfileFieldChange = (field, value) => {

    setProfileDraft(previous => ({
      ...previous,
      [field]: value
    }));
  };


  /* =========================================================
     SAVE PROFILE
     ========================================================= */

  const handleSaveProfile = () => {

    if (!profileDraft) {
      return;
    }

    if (!profileDraft.name.trim()) {
      showToast(
        'Patient name cannot be empty.',
        'warning'
      );

      return;
    }

    if (!profileDraft.phone.trim()) {
      showToast(
        'Phone number cannot be empty.',
        'warning'
      );

      return;
    }

    /*
      Update the patient object.

      We deliberately keep:
      - DPI ID
      - ABHA identity structure
      - emergency contacts
      - allergies
      - medications
      - chronic conditions
      - surgeries
      - lock status

      unchanged unless separately edited.
    */

    const updatedPatient = {
      ...patient,

      name: profileDraft.name.trim(),

      age:
        profileDraft.age === ''
          ? ''
          : Number(profileDraft.age),

      gender: profileDraft.gender,

      dob: profileDraft.dob,

      bloodGroup: profileDraft.bloodGroup,

      bloodDonorStatus:
        profileDraft.bloodDonorStatus,

      organDonor:
        profileDraft.organDonor,

      abhaAddress:
        profileDraft.abhaAddress.trim(),

      phone:
        profileDraft.phone.trim(),

      city:
        profileDraft.city.trim(),

      insurancePolicy:
        profileDraft.insurancePolicy.trim()
    };


    /*
      Update QR payload so the displayed
      emergency identity stays consistent
      with the edited name and blood group.
    */

    updatedPatient.qrPayload =
      `DPI-AUTH://ID:${updatedPatient.dpiId}` +
      `?NAME=${encodeURIComponent(
        updatedPatient.name
      ).replace(/%20/g, '+')}` +
      `&BLOOD=${encodeURIComponent(
        updatedPatient.bloodGroup
      ).replace(/%20/g, '_')}` +
      `&EMERGENCY=ACTIVE`;


    updatePatient(updatedPatient);


    /*
      Close editor.
    */

    setIsProfileEditorOpen(false);

    setProfileDraft(null);


    /*
      Show confirmation.
    */

    showToast(
      '✓ Patient profile updated successfully.',
      'success'
    );


    /*
      Add audit record.
    */

    addAuditLog({
      actor:
        `${updatedPatient.name} (Patient)`,

      institution:
        'EmergencyDPI Sovereign Vault',

      action:
        'Patient profile information updated by authorized user.',

      status:
        'PROFILE_UPDATED',

      statusColor:
        'blue'
    });
  };


  /* =========================================================
     TOAST
     ========================================================= */

  function showToast(message, type = 'info') {

    setNotification({
      message,
      type
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }


  /* =========================================================
     UPDATE PATIENT DATA
     ========================================================= */

  const handleUpdatePatient = (updates) => {

    updatePatient(updates);
  };


  /* =========================================================
     UPDATE PROVIDER DATA
     ========================================================= */

  const handleUpdateProvider = (updates) => {

    setProvider(previousProvider => ({
      ...previousProvider,
      ...updates
    }));
  };


  /* =========================================================
     ADD AUDIT LOG
     ========================================================= */

  const addAuditLog = (entry) => {

    const newLog = {

      id:
        `log-${Date.now()}`,

      timestamp:
        new Date().toLocaleTimeString(),

      relativeTime:
        'Just now',

      actor:
        entry.actor || 'System Engine',

      institution:
        entry.institution || 'EmergencyDPI Rail',

      action:
        entry.action,

      scopeAccessed:
        entry.scopeAccessed || [],

      status:
        entry.status || 'VERIFIED',

      statusColor:
        entry.statusColor || 'emerald',

      verifiedSignature:
        `DPI-SIG-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`
    };


    setAuditLogs(previousLogs => [
      newLog,
      ...previousLogs
    ]);
  };


  /* =========================================================
     1. START EMERGENCY
     ========================================================= */

  const handleStartEmergency = () => {

    setIsEmergencyActive(true);

    setCurrentView('first-responder');

    showToast(
      '🚨 EMT Emergency Mode Activated: Emergency profile and simulated field telemetry opened.',
      'emergency'
    );


    addAuditLog({

      actor:
        'Paramedic EMT-07',

      institution:
        'Metro Emergency Dispatch',

      action:
        'Simulated emergency field scan performed. Critical emergency summary unlocked.',

      scopeAccessed:
        [
          'bloodGroup',
          'allergies',
          'emergencyContacts'
        ],

      status:
        'EMERGENCY_ACCESS',

      statusColor:
        'rose'
    });
  };


  /* =========================================================
     2. LOCK / UNLOCK SOVEREIGN ID
     ========================================================= */

  const handleToggleLock = () => {

    const nextLocked =
      !patient.isIdLocked;


    updatePatient({ isIdLocked: nextLocked });


    if (nextLocked) {

      showToast(
        '🔒 Sovereign Vault Frozen. Unauthorized hospital queries blocked.',
        'warning'
      );


      addAuditLog({

        actor:
          `${patient.name} (Patient)`,

        institution:
          'EmergencyDPI Vault',

        action:
          'Sovereign ID Frozen by Citizen. External queries restricted.',

        status:
          'FROZEN',

        statusColor:
          'amber'
      });

    } else {

      showToast(
        '🔓 Sovereign Vault Unlocked. Emergency protocols active.',
        'success'
      );


      addAuditLog({

        actor:
          `${patient.name} (Patient)`,

        institution:
          'EmergencyDPI Vault',

        action:
          'Sovereign ID Unlocked by Citizen.',

        status:
          'ACTIVE',

        statusColor:
          'emerald'
      });
    }
  };


  /* =========================================================
     3. HOSPITAL REQUEST
     ========================================================= */

  const handleSubmitHospitalRequest = async (request) => {
  try {
    const backendRequest = await createAccessRequest({
      patientId: 'fdce8eef-dfba-4dcb-8387-944a5d6558a2',
      requesterId: '87ef9df8-5a44-4192-bf6b-846a4bc084a7',
      purpose: request.purpose || 'Emergency medical access',
      requestedBloodGroup: request.scopes?.includes('vitals') || false,
      requestedAllergies: request.scopes?.includes('allergies') || false,
      requestedMedications: request.scopes?.includes('medications') || false,
      requestedConditions: request.scopes?.includes('history') || false,
      requestedEmergencyContact: false,
    });

    console.log('Backend access request created:', backendRequest);
  } catch (error) {
    console.error('Backend access request failed:', error);
    showToast(`Backend request failed: ${error.message}`, 'error');
    return;
  }
    const normalizedRequest = {

      ...request,

      doctorName:
        request.doctorName ||
        provider.doctorName,

      hospitalName:
        request.hospitalName ||
        provider.hospitalName,

      hospitalEmail:
        request.hospitalEmail ||
        provider.email ||
        '',

      department:
        request.department ||
        provider.department,

      facilityId:
        request.facilityId ||
        provider.facilityId
    };


    setRequestData(normalizedRequest);

    setHasPendingRequest(true);

    setCurrentView('patient-consent');


    showToast(
      `🔔 New high-priority request from ${normalizedRequest.doctorName} (${normalizedRequest.hospitalName})`,
      'info'
    );


    addAuditLog({

      actor:
        `${normalizedRequest.doctorName} (${normalizedRequest.department || provider.department})`,

      institution:
        normalizedRequest.hospitalName,

      action:
        `Requested ephemeral access for scopes: [${(normalizedRequest.scopes || []).join(', ')}] with duration: ${normalizedRequest.duration || 'Not specified'}`,

      scopeAccessed:
        normalizedRequest.scopes || [],

      status:
        'PENDING_CONSENT',

      statusColor:
        'amber'
    });
  };


  /* =========================================================
     4. APPROVE CONSENT
     ========================================================= */

  const handleApproveConsent = (sessionDetails) => {

    setHasPendingRequest(false);

    setActiveSession(sessionDetails);

    setIsRevoked(false);

    setCurrentView('active-session');


    showToast(
      `✓ Ephemeral access granted to ${sessionDetails.doctorName || 'authorized provider'}.`,
      'success'
    );


    addAuditLog({

      actor:
        `${patient.name} (Biometric Auth Verified)`,

      institution:
        'EmergencyDPI Sovereign Gateway',

      action:
        `Citizen authorized ephemeral session [Token: ${sessionDetails.tokenId}]. Scopes: [${(sessionDetails.grantedScopes || []).join(', ')}]`,

      scopeAccessed:
        sessionDetails.grantedScopes || [],

      status:
        'ACTIVE',

      statusColor:
        'emerald'
    });
  };


  /* =========================================================
     4B. DENY CONSENT
     ========================================================= */

  const handleDenyConsent = (reason) => {

    setHasPendingRequest(false);

    setRequestData(null);

    setCurrentView('dashboard');


    showToast(
      `✕ Emergency access request denied: "${reason}"`,
      'warning'
    );


    addAuditLog({

      actor:
        `${patient.name} (Patient)`,

      institution:
        'EmergencyDPI Sovereign Gateway',

      action:
        `Consent explicitly DENIED for ${requestData?.doctorName || provider.doctorName}. Reason: ${reason}`,

      status:
        'DENIED',

      statusColor:
        'rose'
    });
  };


  /* =========================================================
     5. KILL SWITCH
     ========================================================= */

  const handleKillSwitch = () => {

    if (!activeSession) {
      return;
    }


    setIsRevoked(true);


    showToast(
      '🚨 KILL-SWITCH ENGAGED! Hospital access token has been invalidated.',
      'emergency'
    );


    addAuditLog({

      actor:
        `${patient.name} (Sovereign Kill-Switch)`,

      institution:
        'EmergencyDPI Core Engine',

      action:
        `Emergency revocation triggered by patient. Token [${activeSession.tokenId || 'DPI-EPHEM-882194'}] immediately invalidated. Telemetry access terminated.`,

      status:
        'REVOKED',

      statusColor:
        'rose'
    });
  };


  /* =========================================================
     5B. SIMULATE DOCTOR QUERY
     ========================================================= */

  const handleSimulateDoctorQuery = () => {

    if (!activeSession || isRevoked) {

      showToast(
        'No active access session is available.',
        'warning'
      );

      return;
    }


    const queries = [

      {
        action:
          `${provider.doctorName} queried Blood Group and Cross-Match history (${patient.bloodGroup} confirmed)`,

        scope:
          'Blood Bank API'
      },

      {
        action:
          `${provider.doctorName} reviewed allergy contraindications`,

        scope:
          'Immunology Profile'
      },

      {
        action:
          `${provider.doctorName} verified active medications and prescriptions`,

        scope:
          'Pharmacy Rail'
      }
    ];


    const item =
      queries[
        Math.floor(
          Math.random() * queries.length
        )
      ];


    showToast(
      `⚡ Live Audit: ${item.action}`,
      'info'
    );


    addAuditLog({

      actor:
        `${provider.doctorName} (${provider.hospitalName})`,

      institution:
        'Trauma Bay 3 EMR Terminal',

      action:
        item.action,

      scopeAccessed:
        [item.scope],

      status:
        'SUCCESS',

      statusColor:
        'blue'
    });
  };


  /* =========================================================
     6. RESET DEMO
     ========================================================= */

  const handleResetDemo = () => {

    try {

      window.localStorage.removeItem(
        'emergencyDpiPatient'
      );

      window.localStorage.removeItem(
        'emergencyDpiProvider'
      );

    } catch (error) {

      console.error(
        'Unable to clear localStorage:',
        error
      );
    }


    setCurrentView('dashboard');

    resetDemo();

    setProvider({
      ...MOCK_PROVIDER
    });

    setAuditLogs([
      ...INITIAL_AUDIT_LOGS
    ]);

    setIsEmergencyActive(false);

    setHasPendingRequest(false);

    setRequestData(null);

    setActiveSession(null);

    setIsRevoked(false);

    setNotification(null);

    setIsProfileEditorOpen(false);

    setProfileDraft(null);


    try {

      window.localStorage.setItem(
        'emergencyDpiProvider',
        JSON.stringify(MOCK_PROVIDER)
      );

    } catch (error) {

      console.error(
        'Unable to save reset state:',
        error
      );
    }


    showToast(
      'Demo reset to the original clean state.',
      'info'
    );
  };


  /* =========================================================
     PROFILE INPUT COMPONENT
     ========================================================= */

  const ProfileInput = ({
    label,
    value,
    field,
    type = 'text',
    icon: Icon
  }) => {

    return (
      <div className="space-y-1.5">

        <label className="text-xs font-semibold text-slate-600">
          {label}
        </label>

        <div className="relative">

          {Icon && (
            <Icon
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            />
          )}

          <input
            type={type}
            value={value ?? ''}
            onChange={(event) =>
              handleProfileFieldChange(
                field,
                event.target.value
              )
            }
            className={`w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-800 outline-none transition focus:border-[#0066cc] focus:ring-2 focus:ring-blue-100 ${
              Icon
                ? 'pl-10 pr-3'
                : 'px-3'
            }`}
          />

        </div>

      </div>
    );
  };


  /* =========================================================
     RENDER
     ========================================================= */

  return (

    <div className="min-h-screen bg-white text-slate-800 flex flex-col">


      {/* =====================================================
          TOP NAVBAR
          ===================================================== */}

      <Navbar

        currentView={currentView}

        setCurrentView={setCurrentView}

        isEmergencyActive={isEmergencyActive}

        onResetDemo={handleResetDemo}

        isSessionActive={!!activeSession}

        isRevoked={isRevoked}

      />


      {/* =====================================================
          DEMO FLOW BAR
          ===================================================== */}

      <DemoFlowBar

        currentView={currentView}

        setCurrentView={setCurrentView}

        hasPendingRequest={hasPendingRequest}

        isSessionActive={!!activeSession}

        isRevoked={isRevoked}

      />


      {/* =====================================================
          TOAST NOTIFICATION
          ===================================================== */}

      {notification && (

        <div className="fixed top-28 right-4 sm:right-8 z-[100] animate-in fade-in slide-in-from-top-4 duration-200">

          <div
            className={`
              p-4
              rounded-2xl
              shadow-xl
              flex
              items-center
              gap-3
              border
              text-xs
              sm:text-sm
              font-semibold
              max-w-md

              ${
                notification.type === 'emergency'
                  ? 'bg-red-600 text-white border-red-700 shadow-red-600/30'
                  : notification.type === 'success'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-600/30'
                  : notification.type === 'warning'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-amber-500/30'
                  : 'bg-slate-900 text-white border-slate-800 shadow-slate-900/30'
              }
            `}
          >

            {notification.type === 'emergency' ? (

              <Siren className="w-5 h-5 shrink-0" />

            ) : notification.type === 'success' ? (

              <CheckCircle2 className="w-5 h-5 shrink-0" />

            ) : (

              <AlertCircle className="w-5 h-5 shrink-0" />

            )}

            <span>
              {notification.message}
            </span>

          </div>

        </div>

      )}


      {/* =====================================================
          MAIN APPLICATION
          ===================================================== */}

      <main className="flex-1 pb-16">


        {/* ===================================================
            PATIENT DASHBOARD
            =================================================== */}

        {currentView === 'dashboard' && (

          <>

            {/* PROFILE EDIT BUTTON */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={handleOpenProfileEditor}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0066cc] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0052a3] active:scale-[0.98]"
                >

                  <Pencil className="w-4 h-4" />

                  Edit Profile

                </button>

              </div>

            </div>


            <PatientDashboard
              onToggleLock={handleToggleLock}

              onStartEmergency={handleStartEmergency}

              onNavigateTo={setCurrentView}

              hasPendingRequest={hasPendingRequest}

              activeSession={activeSession}

              auditLogs={auditLogs}

            />

          </>

        )}


        {/* ===================================================
            FIRST RESPONDER
            =================================================== */}

        {currentView === 'first-responder' && (

          <FirstResponderView
            provider={provider}

            onNavigateTo={setCurrentView}

            onLogEvent={addAuditLog}

          />

        )}


        {/* ===================================================
            HOSPITAL REQUEST
            =================================================== */}

        {currentView === 'hospital-request' && (

          <HospitalRequestPortal

            provider={provider}

            onSubmitRequest={handleSubmitHospitalRequest}

            onUpdateProvider={handleUpdateProvider}

            onNavigateTo={setCurrentView}

          />

        )}


        {/* ===================================================
            PATIENT CONSENT
            =================================================== */}

        {currentView === 'patient-consent' && (

          <PatientConsentScreen

            requestData={requestData}

            provider={provider}

            onApprove={handleApproveConsent}

            onDeny={handleDenyConsent}

            onNavigateTo={setCurrentView}

          />

        )}


        {/* ===================================================
            ACTIVE ACCESS SESSION
            =================================================== */}

        {currentView === 'active-session' && (

          <ActiveAccessView

            session={activeSession}

            isRevoked={isRevoked}

            onKillSwitch={handleKillSwitch}

            auditLogs={auditLogs}

            onSimulateDoctorQuery={handleSimulateDoctorQuery}

            onRestartDemo={handleResetDemo}

            onNavigateTo={setCurrentView}

          />

        )}

      </main>


      {/* =====================================================
          EDIT PROFILE MODAL
          ===================================================== */}

      {isProfileEditorOpen && profileDraft && (

        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onMouseDown={(event) => {

            if (event.target === event.currentTarget) {
              handleCloseProfileEditor();
            }

          }}
        >

          <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">


            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">

                  <User className="h-5 w-5 text-[#0066cc]" />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Edit Patient Profile
                  </h2>

                  <p className="text-xs text-slate-500">
                    Update your personal information
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={handleCloseProfileEditor}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >

                <X className="h-5 w-5" />

              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-6 py-6">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">


                <ProfileInput
                  label="Full Name"
                  value={profileDraft.name}
                  field="name"
                  icon={User}
                />


                <ProfileInput
                  label="Phone Number"
                  value={profileDraft.phone}
                  field="phone"
                  type="tel"
                  icon={Phone}
                />


                <ProfileInput
                  label="Date of Birth"
                  value={profileDraft.dob}
                  field="dob"
                  type="date"
                  icon={Calendar}
                />


                <ProfileInput
                  label="Age"
                  value={profileDraft.age}
                  field="age"
                  type="number"
                  icon={User}
                />


                {/* GENDER */}

                <div className="space-y-1.5">

                  <label className="text-xs font-semibold text-slate-600">
                    Gender
                  </label>

                  <select
                    value={profileDraft.gender}
                    onChange={(event) =>
                      handleProfileFieldChange(
                        'gender',
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#0066cc] focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                    <option value="Prefer not to say">
                      Prefer not to say
                    </option>

                  </select>

                </div>


                {/* BLOOD GROUP */}

                <div className="space-y-1.5">

                  <label className="text-xs font-semibold text-slate-600">
                    Blood Group
                  </label>

                  <div className="relative">

                    <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />

                    <select
                      value={profileDraft.bloodGroup}
                      onChange={(event) =>
                        handleProfileFieldChange(
                          'bloodGroup',
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-[#0066cc] focus:ring-2 focus:ring-blue-100"
                    >

                      <option value="">
                        Select blood group
                      </option>

                      <option value="A+ Pos">
                        A+ Pos
                      </option>

                      <option value="A- Neg">
                        A- Neg
                      </option>

                      <option value="B+ Pos">
                        B+ Pos
                      </option>

                      <option value="B- Neg">
                        B- Neg
                      </option>

                      <option value="AB+ Pos">
                        AB+ Pos
                      </option>

                      <option value="AB- Neg">
                        AB- Neg
                      </option>

                      <option value="O+ Pos">
                        O+ Pos
                      </option>

                      <option value="O- Neg">
                        O- Neg
                      </option>

                    </select>

                  </div>

                </div>


                <ProfileInput
                  label="City / Location"
                  value={profileDraft.city}
                  field="city"
                  icon={MapPin}
                />


                <ProfileInput
                  label="ABHA Address"
                  value={profileDraft.abhaAddress}
                  field="abhaAddress"
                  icon={HeartPulse}
                />


                <ProfileInput
                  label="Insurance Policy"
                  value={profileDraft.insurancePolicy}
                  field="insurancePolicy"
                  icon={CreditCard}
                />


                <ProfileInput
                  label="Blood Donor Status"
                  value={profileDraft.bloodDonorStatus}
                  field="bloodDonorStatus"
                  icon={Droplets}
                />


                <ProfileInput
                  label="Organ Donor Status"
                  value={profileDraft.organDonor}
                  field="organDonor"
                  icon={HeartPulse}
                />

              </div>


              {/* DPI ID INFORMATION */}

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0066cc]" />

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      DPI Identity Protection
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Your DPI ID is a protected identity identifier and
                      cannot be edited from this profile screen.
                    </p>

                    <p className="mt-2 font-mono text-xs font-semibold text-[#0066cc]">
                      {patient.dpiId}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={handleCloseProfileEditor}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >

                <X className="h-4 w-4" />

                Cancel

              </button>


              <button
                type="button"
                onClick={handleSaveProfile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0066cc] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0052a3] active:scale-[0.98]"
              >

                <Save className="h-4 w-4" />

                Save Changes

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="bg-slate-50 border-t border-slate-200/80 py-6 text-xs text-slate-500 text-center">

        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">

          <div className="flex items-center gap-2">

            <ShieldCheck className="w-4 h-4 text-[#0066cc]" />

            <span className="font-semibold text-slate-700">
              EmergencyDPI Health Protocol
            </span>

            <span>
              • Government Health Infrastructure Standard v2.4
            </span>

          </div>


          <div className="font-mono text-[11px] text-slate-400">

            Node: CGH-DELHI-EMR-04 •
            End-to-End Ephemeral Asymmetric Encryption

          </div>

        </div>

      </footer>

    </div>
  );
}