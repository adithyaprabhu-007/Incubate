import React, { useState } from 'react';
import { 
  Shield, 
  QrCode, 
  AlertOctagon, 
  Heart, 
  Phone, 
  Lock, 
  Unlock, 
  Activity, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Share2, 
  FileText, 
  AlertTriangle,
  Siren,
  Hospital,
  Pill,
  Stethoscope,
  Users,
  Copy,
  Check,
  PhoneCall,
  Send,
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';
import { READINESS_CHECKLIST, TOTAL_READINESS_SCORE } from '../data/mockData';
import { usePatientContext } from '../context/PatientContext';

export default function PatientDashboard({
  onToggleLock,
  onStartEmergency,
  onNavigateTo,
  hasPendingRequest,
  activeSession,
  auditLogs
}) {
  const { patient } = usePatientContext();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'medical-id' | 'medications' | 'care-team'
  const [showQrModal, setShowQrModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [callingContact, setCallingContact] = useState(null);
  const [smsSentContact, setSmsSentContact] = useState(null);
  const criticalAllergy = patient.allergies?.[0];

  const handleCopyId = () => {
    navigator.clipboard?.writeText(patient.dpiId);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSimulateCall = (contact) => {
    setCallingContact(contact);
  };

  const handleSimulateSms = (contact) => {
    setSmsSentContact(contact.name);
    setTimeout(() => setSmsSentContact(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Protocol Status & EMT Simulation Banner */}
      <div className="bg-[#f0f6ff] border border-blue-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#0066cc] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 font-heading">National Health DPI Sovereign Portal</h1>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Zero-Trust Vault Active
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Citizen Profile: <strong className="text-slate-900">{patient.name}</strong> • Ephemeral asymmetric encryption enabled on National Health Rail.
            </p>
          </div>
        </div>

        {/* Primary EMT Emergency Trigger */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onStartEmergency}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all duration-150 text-xs sm:text-sm active:scale-95"
          >
            <Siren className="w-4 h-4 animate-pulse" />
            <span>Simulate EMT Field Scan</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Mobile-First View Management */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Emergency Summary', icon: Activity },
          { id: 'medical-id', label: 'Medical ID & Vitals', icon: FileText },
          { id: 'medications', label: 'Prescriptions & Regimens', icon: Pill },
          { id: 'care-team', label: 'Contacts & Care Team', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#0066cc] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & EMERGENCY SUMMARY */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Digital DPI Health Card & Critical Allergy Banner */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Emergency Health ID Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0066cc] via-[#0052a3] to-[#003d7a] text-white p-6 shadow-md border border-blue-400/30">
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                <Shield className="w-64 h-64 text-white" />
              </div>

              {/* Card Header */}
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xs">
                      +
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-blue-100 font-heading">
                      NATIONAL EMERGENCY HEALTH RAIL
                    </span>
                  </div>
                  <div className="text-2xl font-bold mt-2 font-heading tracking-tight">{patient.name}</div>
                  <div className="text-xs text-blue-200 tabular-nums">
                    DOB: {patient.dob} • {patient.age} Yrs • {patient.gender}
                  </div>
                </div>

                {/* Blood Group Display - High Contrast */}
                <div className="bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2.5 rounded-xl text-right">
                  <span className="text-[10px] uppercase font-bold text-rose-200 block">BLOOD TYPE</span>
                  <span className="text-2xl font-black text-white tabular-nums tracking-tight">{patient.bloodGroup}</span>
                  <span className="text-[9px] text-blue-100 block font-semibold">{patient.bloodDonorStatus}</span>
                </div>
              </div>

              {/* Smart NFC Chip & QR Pass Action */}
              <div className="my-5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border border-amber-500/50 shadow-inner flex items-center justify-center">
                    <div className="w-7 h-4 border border-amber-600/40 rounded-xs"></div>
                  </div>
                  <div className="text-blue-200 text-xs font-mono">
                    <span className="inline-block rotate-90 text-sm">)))</span> NFC CONTACTLESS
                  </div>
                </div>

                <button
                  onClick={() => setShowQrModal(true)}
                  className="bg-white text-[#0066cc] hover:bg-blue-50 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Emergency QR</span>
                </button>
              </div>

              {/* Health Identifier & Copy */}
              <div className="pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 relative z-10 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-blue-200 font-semibold block">DPI IDENTIFIER</span>
                  <span className="tabular-nums font-mono text-base font-bold tracking-widest text-white">
                    {patient.dpiId}
                  </span>
                </div>
                <button
                  onClick={handleCopyId}
                  className="bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 font-medium"
                >
                  {copyFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CRITICAL PENICILLIN ALLERGY WARNING BANNER */}
            <div className="bg-[#fef2f2] border-2 border-[#dc2626] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#dc2626]">
                  <AlertOctagon className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider font-heading">
                    CRITICAL CONTRAINDICATION & ALLERGY ALERT
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase bg-[#dc2626] text-white px-2 py-0.5 rounded-full">
                  {criticalAllergy?.severity || 'ALERT'}
                </span>
              </div>

              <div className="bg-white border border-red-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      {criticalAllergy?.allergen || 'No critical allergy recorded'}
                    </h4>
                    <p className="text-xs text-red-700 font-medium mt-0.5">
                      {criticalAllergy?.reaction || 'No reaction recorded.'}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-red-100 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                  <span>{criticalAllergy?.clinicalNote || 'No contraindication notes recorded.'}</span>
                  <span className="text-slate-400">Verified: {criticalAllergy?.verifiedBy || 'Not verified'}</span>
                </div>
              </div>

              <div className="text-[11px] text-red-800 flex items-center gap-1.5 bg-red-100/50 p-2 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                <span>Paramedics and emergency physicians are alerted automatically via zero-knowledge verification.</span>
              </div>
            </div>

            {/* Sovereign Vault Freeze & Cryptographic Controls */}
            <div className="bg-[#f0f6ff] border border-blue-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  patient.isIdLocked ? 'bg-amber-500 text-white' : 'bg-[#0066cc] text-white'
                }`}>
                  {patient.isIdLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                    Sovereign Vault Status: {patient.isIdLocked ? 'FROZEN' : 'ACTIVE & PROTECTED'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {patient.isIdLocked
                      ? 'Automated queries are blocked. Manual PIN required for any clinical access.'
                      : 'Zero-trust consent required for hospital EMR access. EMT emergency bypass ready.'}
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleLock}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  patient.isIdLocked
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {patient.isIdLocked ? 'Unlock ID' : 'Freeze Vault'}
              </button>
            </div>

          </div>

          {/* Right Column: Readiness Score Meter, Pending Requests & Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* EMERGENCY READINESS SCORE WIDGET */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider block font-heading">
                    CLINICAL METRIC
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Emergency Readiness Score</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#059669] font-heading tabular-nums">
                    {TOTAL_READINESS_SCORE}%
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Optimal</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#059669] h-full rounded-full transition-all duration-500"
                  style={{ width: `${TOTAL_READINESS_SCORE}%` }}
                />
              </div>

              {/* Checklist items */}
              <div className="space-y-2 pt-1">
                {READINESS_CHECKLIST.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-2 text-xs py-1 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-2">
                      {item.status === 'complete' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold text-slate-800 block leading-tight">{item.label}</span>
                        <span className="text-[10px] text-slate-500">{item.detail}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600 font-semibold shrink-0">
                      {item.score}/{item.max}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inbound Access Request Alert Card */}
            {hasPendingRequest && (
              <div className="bg-[#fffbeb] border-2 border-[#d97706] rounded-2xl p-5 shadow-xs space-y-3 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#d97706] mt-1 shrink-0 animate-ping" />
                  <div>
                    <span className="text-xs font-black uppercase text-[#d97706] tracking-wider block font-heading">
                      HIGH-PRIORITY INBOUND REQUEST
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-heading mt-0.5">
                      City General Hospital Emergency Access
                    </h4>
                    <p className="text-xs text-slate-700 mt-1">
                      Dr. Rahul Sharma is requesting 15-minute emergency ephemeral access.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTo('patient-consent')}
                  className="w-full bg-[#0066cc] hover:bg-[#0284c7] text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Review & Authorize Consent</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Active Session Notification Card */}
            {activeSession && !hasPendingRequest && (
              <div className="bg-[#ecfdf5] border border-[#059669] rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                    Live Ephemeral Stream Active
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    {activeSession.tokenId}
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  Doctor: <strong className="text-slate-900">{activeSession.doctorName}</strong> ({activeSession.hospitalName})
                </p>
                <button
                  onClick={() => onNavigateTo('active-session')}
                  className="w-full bg-white hover:bg-emerald-50 text-[#059669] border border-[#059669] text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Active Timer & Kill-Switch</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Direct Emergency SOS Contacts */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <Phone className="w-4 h-4 text-[#059669]" />
                  Verified Emergency SOS Contacts
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">Auto-Notified</span>
              </div>

              {smsSentContact && (
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Emergency SOS alert dispatched to {smsSentContact}!</span>
                </div>
              )}

              <div className="space-y-2.5">
                {patient.emergencyContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 font-heading">{contact.name}</span>
                        <span className="text-[11px] text-slate-500">({contact.relation})</span>
                        {contact.isPrimary && (
                          <span className="text-[9px] bg-[#0066cc] text-white px-1.5 py-0.2 rounded font-bold">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-600 block mt-0.5">{contact.phone}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSimulateSms(contact)}
                        title={`Send SOS SMS to ${contact.name}`}
                        className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSimulateCall(contact)}
                        title={`Call ${contact.name}`}
                        className="p-2 rounded-lg bg-[#059669] hover:bg-[#10b981] text-white transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guided Step 2 CTA */}
            <div className="bg-[#f0f6ff] border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider block font-heading">
                  HACKATHON PROTOCOL STEP 2
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">Explore First Responder Mode</h4>
              </div>
              <button
                onClick={() => onNavigateTo('first-responder')}
                className="bg-[#0066cc] hover:bg-[#0284c7] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>EMT View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: MEDICAL ID & VITALS */}
      {activeTab === 'medical-id' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0066cc]" />
              Patient Demographics & Identifiers
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Full Legal Name</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{patient.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Date of Birth & Age</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{patient.dob} ({patient.age}y)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Phone Number</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{patient.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Gender</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{patient.gender}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Blood Group</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{patient.bloodGroup}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Address / Location</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{patient.city}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">National DPI ID</span>
                <span className="font-mono font-bold text-slate-800 text-xs mt-0.5 block">{patient.dpiId}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">ABHA Virtual Address</span>
                <span className="font-mono font-bold text-slate-800 text-xs mt-0.5 block">{patient.abhaAddress}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Insurance Policy</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">{patient.insurancePolicy}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-medium">Organ Donor Status</span>
                <span className="font-bold text-emerald-700 text-xs mt-0.5 block">{patient.organDonor}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#dc2626]" />
              Chronic Conditions & Surgical History
            </h3>
            
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chronic Conditions</h4>
              {patient.chronicConditions.map((cond, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#f0f6ff] border border-blue-100 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">{cond.condition}</span>
                    <span className="text-slate-600 mt-0.5 block">{cond.treatment}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-blue-100 text-[#0066cc] px-2 py-0.5 rounded">
                    Diag: {cond.diagnosed}
                  </span>
                </div>
              ))}

              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider pt-2">Surgical History</h4>
              {patient.surgeries.map((surg, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">{surg.procedure}</span>
                    <span className="text-slate-600 text-[11px] mt-0.5 block">{surg.hospital} • {surg.surgeon}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{surg.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MEDICATIONS & REGIMENS */}
      {activeTab === 'medications' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#0066cc]" />
                Active Prescriptions & Regimens
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time synchronized with Government E-Prescription Pharmacy Rail.
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              {patient.medications.length} Verified Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patient.medications.map((med, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-[#f8fafc] hover:bg-[#f0f6ff] transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#0066cc] bg-blue-50 px-2 py-0.5 rounded">
                    {med.indication}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{med.name}</h4>
                <div className="text-xs space-y-1 text-slate-600">
                  <div><strong>Dosage:</strong> {med.dosage}</div>
                  <div><strong>Frequency:</strong> {med.frequency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CONTACTS & CARE TEAM */}
      {activeTab === 'care-team' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#059669]" />
              Emergency SOS Next-of-Kin Contacts
            </h3>
            <div className="space-y-3">
              {patient.emergencyContacts.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-heading text-sm">{c.name}</span>
                      <span className="text-xs text-slate-500">({c.relation})</span>
                    </div>
                    <span className="text-xs font-mono text-slate-600 block mt-1">{c.phone}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{c.address}</span>
                  </div>
                  <button
                    onClick={() => handleSimulateCall(c)}
                    className="p-2.5 rounded-xl bg-[#059669] hover:bg-[#10b981] text-white transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Hospital className="w-4 h-4 text-[#0066cc]" />
              Designated Primary Healthcare Facility
            </h3>
            <div className="p-4 rounded-xl bg-[#f0f6ff] border border-blue-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 text-sm block font-heading">City General Hospital</span>
              <p className="text-slate-600">NABH Accredited Level-1 Trauma & Multispecialty Center</p>
              <div className="pt-2 border-t border-blue-100 text-slate-600 space-y-1">
                <div><strong>Primary Physician:</strong> Dr. Rahul Sharma (Trauma Lead)</div>
                <div><strong>Facility ID:</strong> HOSP-CGH-DEL-04</div>
                <div><strong>Emergency Helpline:</strong> 112 / +91 11-2334-9900</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Inspection Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase font-heading">Emergency DPI QR Pass</span>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center">
              <div className="w-44 h-44 bg-white p-3 rounded-lg border border-slate-300 shadow-xs flex items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path fill="#000000" d="M0,0 h30 v30 h-30 z M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" />
                  <path fill="#000000" d="M70,0 h30 v30 h-30 z M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" />
                  <path fill="#000000" d="M0,70 h30 v30 h-30 z M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" />
                  <path fill="#0066cc" d="M42,42 h16 v16 h-16 z" />
                  <rect x="35" y="10" width="8" height="8" fill="#000" />
                  <rect x="48" y="15" width="8" height="18" fill="#000" />
                  <rect x="15" y="38" width="12" height="6" fill="#000" />
                  <rect x="70" y="38" width="22" height="6" fill="#000" />
                  <rect x="35" y="70" width="15" height="15" fill="#000" />
                  <rect x="65" y="65" width="8" height="25" fill="#000" />
                  <rect x="80" y="75" width="15" height="8" fill="#000" />
                </svg>
                <div className="absolute w-7 h-7 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-xs">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-slate-800 mt-2.5">{patient.dpiId}</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">● Cryptographically Signed QR</span>
            </div>

            <p className="text-xs text-slate-500">
              Paramedics scan this QR code with their mobile field unit to extract emergency summary and blood group in seconds.
            </p>

            <button
              onClick={() => {
                setShowQrModal(false);
                onStartEmergency();
              }}
              className="w-full bg-[#dc2626] hover:bg-[#ef4444] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              Simulate Scan by EMT
            </button>
          </div>
        </div>
      )}

      {/* Simulated Phone Call Modal */}
      {callingContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl border border-slate-700 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#059669] text-white flex items-center justify-center mx-auto animate-bounce">
              <PhoneCall className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Dialing SOS Emergency Line...</span>
              <h4 className="text-lg font-bold font-heading mt-1">{callingContact.name}</h4>
              <span className="text-xs font-mono text-emerald-400 block">{callingContact.phone}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Simulated voice link with GPS incident coordinates payload.
            </p>
            <button
              onClick={() => setCallingContact(null)}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
