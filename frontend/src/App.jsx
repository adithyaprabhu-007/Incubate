import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DemoFlowBar from './components/DemoFlowBar';
import PatientDashboard from './components/PatientDashboard';
import FirstResponderView from './components/FirstResponderView';
import HospitalRequestPortal from './components/HospitalRequestPortal';
import PatientConsentScreen from './components/PatientConsentScreen';
import ActiveAccessView from './components/ActiveAccessView';
import { INITIAL_PATIENT, MOCK_PROVIDER, INITIAL_AUDIT_LOGS } from './data/mockData';
import { AlertCircle, CheckCircle2, ShieldCheck, Siren } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [patient, setPatient] = useState(INITIAL_PATIENT);
  const [provider] = useState(MOCK_PROVIDER);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  
  // Workflow States
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [isRevoked, setIsRevoked] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const addAuditLog = (entry) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      relativeTime: 'Just now',
      actor: entry.actor || 'System Engine',
      institution: entry.institution || 'EmergencyDPI Rail',
      action: entry.action,
      status: entry.status || 'VERIFIED',
      statusColor: entry.statusColor || 'emerald',
      verifiedSignature: `DPI-SIG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. Trigger Emergency from Dashboard
  const handleStartEmergency = () => {
    setIsEmergencyActive(true);
    setCurrentView('first-responder');
    showToast('🚨 EMT Paramedic Bypass Activated: Reading Emergency QR & Vitals', 'emergency');
    addAuditLog({
      actor: 'Paramedic EMT-07',
      institution: 'Metro Emergency Dispatch',
      action: 'Emergency NFC Tag scanned in ambulance. Critical summary unlocked.',
      status: 'EMERGENCY_ACCESS',
      statusColor: 'rose'
    });
  };

  // 2. Lock / Freeze Sovereign ID
  const handleToggleLock = () => {
    const nextLocked = !patient.isIdLocked;
    setPatient(prev => ({ ...prev, isIdLocked: nextLocked }));
    if (nextLocked) {
      showToast('🔒 Sovereign Vault Frozen. Unauthorized hospital queries blocked.', 'warning');
      addAuditLog({
        actor: 'Alex Sharma (Patient)',
        institution: 'EmergencyDPI Vault',
        action: 'Sovereign ID Frozen by Citizen. All external queries restricted.',
        status: 'FROZEN',
        statusColor: 'amber'
      });
    } else {
      showToast('🔓 Sovereign Vault Unlocked. Emergency protocols active.', 'success');
      addAuditLog({
        actor: 'Alex Sharma (Patient)',
        institution: 'EmergencyDPI Vault',
        action: 'Sovereign ID Unlocked by Citizen.',
        status: 'ACTIVE',
        statusColor: 'emerald'
      });
    }
  };

  // 3. Doctor submits request from Hospital Portal
  const handleSubmitHospitalRequest = (req) => {
    setRequestData(req);
    setHasPendingRequest(true);
    setCurrentView('patient-consent');
    showToast(`🔔 New High-Priority Request from ${req.doctorName} (${req.hospitalName})`, 'info');
    addAuditLog({
      actor: `${req.doctorName} (${provider.department})`,
      institution: req.hospitalName,
      action: `Requested ephemeral access for scopes: [${req.scopes.join(', ')}] with duration: ${req.duration}`,
      status: 'PENDING_CONSENT',
      statusColor: 'amber'
    });
  };

  // 4. Patient Approves Request with Biometrics
  const handleApproveConsent = (sessionDetails) => {
    setHasPendingRequest(false);
    setActiveSession(sessionDetails);
    setIsRevoked(false);
    setCurrentView('active-session');
    showToast(`✓ Ephemeral Access Granted to ${sessionDetails.doctorName}. Live stream active!`, 'success');
    addAuditLog({
      actor: 'Alex Sharma (Biometric Auth Verified)',
      institution: 'EmergencyDPI Sovereign Gateway',
      action: `Citizen authorized ephemeral session [Token: ${sessionDetails.tokenId}]. Scopes: [${sessionDetails.grantedScopes.join(', ')}]`,
      status: 'ACTIVE',
      statusColor: 'emerald'
    });
  };

  // 4b. Patient Denies Request
  const handleDenyConsent = (reason) => {
    setHasPendingRequest(false);
    setCurrentView('dashboard');
    showToast(`✕ Emergency access request denied: "${reason}"`, 'warning');
    addAuditLog({
      actor: 'Alex Sharma (Citizen)',
      institution: 'EmergencyDPI Sovereign Gateway',
      action: `Consent explicitly DENIED for Dr. Rahul Sharma (${provider.hospitalName}). Reason: ${reason}`,
      status: 'DENIED',
      statusColor: 'rose'
    });
  };

  // 5. Patient triggers the Kill Switch
  const handleKillSwitch = () => {
    setIsRevoked(true);
    showToast('🚨 KILL-SWITCH ENGAGED! Hospital access token permanently invalidated.', 'emergency');
    addAuditLog({
      actor: 'Alex Sharma (Sovereign Kill-Switch)',
      institution: 'EmergencyDPI Core Engine',
      action: `Emergency revocation triggered by patient. Token [${activeSession?.tokenId || 'DPI-EPHEM-882194'}] immediately destroyed. Telemetry severed.`,
      status: 'REVOKED',
      statusColor: 'rose'
    });
  };

  // 5b. Simulate Doctor Query during live session
  const handleSimulateDoctorQuery = () => {
    const queries = [
      {
        action: `Dr. Rahul Sharma queried Blood Group and Cross-Match history (O- Neg confirmed)`,
        scope: 'Blood Bank API'
      },
      {
        action: `Dr. Rahul Sharma reviewed Allergy Contraindications: Penicillin Anaphylaxis flag received`,
        scope: 'Immunology Profile'
      },
      {
        action: `Dr. Rahul Sharma verified active medications: Insulin Glargine & Albuterol Inhaler`,
        scope: 'Pharmacy Rail'
      }
    ];
    const item = queries[Math.floor(Math.random() * queries.length)];
    showToast(`⚡ Live Audit: ${item.action}`, 'info');
    addAuditLog({
      actor: `${provider.doctorName} (City General Hospital)`,
      institution: 'Trauma Bay 3 EMR Terminal',
      action: item.action,
      status: 'SUCCESS',
      statusColor: 'blue'
    });
  };

  // Reset complete demo to clean initial state
  const handleResetDemo = () => {
    setCurrentView('dashboard');
    setPatient(INITIAL_PATIENT);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setIsEmergencyActive(false);
    setHasPendingRequest(false);
    setRequestData(null);
    setActiveSession(null);
    setIsRevoked(false);
    showToast('Demo reset to initial clean state.', 'info');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      
      {/* Top Clinical Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isEmergencyActive={isEmergencyActive}
        onResetDemo={handleResetDemo}
        isSessionActive={!!activeSession}
        isRevoked={isRevoked}
      />

      {/* Interactive Hackathon Flow Stepper */}
      <DemoFlowBar
        currentView={currentView}
        setCurrentView={setCurrentView}
        hasPendingRequest={hasPendingRequest}
        isSessionActive={!!activeSession}
        isRevoked={isRevoked}
      />

      {/* Floating Toast Notification Banner */}
      {notification && (
        <div className="fixed top-28 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-3 border text-xs sm:text-sm font-semibold max-w-md ${
            notification.type === 'emergency'
              ? 'bg-red-600 text-white border-red-700 shadow-red-600/30'
              : notification.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-600/30'
              : notification.type === 'warning'
              ? 'bg-amber-500 text-white border-amber-600 shadow-amber-500/30'
              : 'bg-slate-900 text-white border-slate-800 shadow-slate-900/30'
          }`}>
            {notification.type === 'emergency' ? (
              <Siren className="w-5 h-5 shrink-0" />
            ) : notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Active View Container */}
      <main className="flex-1 pb-16">
        {currentView === 'dashboard' && (
          <PatientDashboard
            patient={patient}
            onToggleLock={handleToggleLock}
            onStartEmergency={handleStartEmergency}
            onNavigateTo={setCurrentView}
            hasPendingRequest={hasPendingRequest}
            activeSession={activeSession}
            auditLogs={auditLogs}
          />
        )}

        {currentView === 'first-responder' && (
          <FirstResponderView
            patient={patient}
            provider={provider}
            onNavigateTo={setCurrentView}
            onLogEvent={addAuditLog}
          />
        )}

        {currentView === 'hospital-request' && (
          <HospitalRequestPortal
            provider={provider}
            patient={patient}
            onSubmitRequest={handleSubmitHospitalRequest}
            onNavigateTo={setCurrentView}
          />
        )}

        {currentView === 'patient-consent' && (
          <PatientConsentScreen
            requestData={requestData}
            patient={patient}
            provider={provider}
            onApprove={handleApproveConsent}
            onDeny={handleDenyConsent}
            onNavigateTo={setCurrentView}
          />
        )}

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

      {/* Footer with Protocol Compliance */}
      <footer className="bg-slate-50 border-t border-slate-200/80 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
            <span className="font-semibold text-slate-700">EmergencyDPI Health Protocol</span>
            <span>• Government Health Infrastructure Standard v2.4</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Node: CGH-DELHI-EMR-04 • End-to-End Ephemeral Asymmetric Encryption
          </div>
        </div>
      </footer>

    </div>
  );
}
