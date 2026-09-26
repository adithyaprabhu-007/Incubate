import React, { useState } from 'react';
import { 
  Siren, 
  AlertTriangle, 
  Heart, 
  Phone, 
  Radio, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  FileWarning, 
  Droplet, 
  Crosshair,
  User,
  Activity,
  PhoneCall,
  X,
  Send,
  Lock,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Clock,
  Flame
} from 'lucide-react';
import ECGMonitor from './ECGMonitor';

export default function FirstResponderView({ 
  patient, 
  provider, 
  onNavigateTo,
  onLogEvent 
}) {
  const [isCalling, setIsCalling] = useState(null);
  const [telemetryDispatched, setTelemetryDispatched] = useState(false);
  const [emtNotes, setEmtNotes] = useState('Patient found conscious, mild respiratory distress post-trauma. IV line 18G established in left antecubital.');
  const [addedNoteSuccess, setAddedNoteSuccess] = useState(false);

  const handleCall = (contact) => {
    setIsCalling(contact);
    onLogEvent({
      actor: 'Paramedic EMT-07 (Voice Dispatch)',
      institution: 'Metro Emergency Dispatch',
      action: `Emergency phone link established to Next-of-Kin (${contact.name}, ${contact.relation})`,
      status: 'CONNECTED',
      statusColor: 'emerald'
    });
  };

  const handleDispatchTelemetry = () => {
    setTelemetryDispatched(true);
    onLogEvent({
      actor: 'Ambulance Unit 07',
      institution: 'Metro EMS Telemetry Link',
      action: `Live encrypted ECG & telemetry streaming dispatched to ${provider.hospitalName} Trauma Bay 3`,
      status: 'STREAMING',
      statusColor: 'blue'
    });
  };

  const handleAppendNote = (snippet) => {
    setEmtNotes(prev => prev + ` • ${snippet}`);
    setAddedNoteSuccess(true);
    setTimeout(() => setAddedNoteSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* High-Visibility Dark Medical Lockscreen Bypass Header */}
      <div className="bg-red-950/70 border-b border-red-800/80 px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/50 animate-pulse">
              <Siren className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded-full font-mono">
                  LOCKSCREEN BYPASS ACTIVE
                </span>
                <span className="text-xs text-red-300 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  NFC TAP DETECTED
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight mt-0.5">
                First Responder Emergency Triage Mode
              </h1>
              <p className="text-xs text-slate-300 flex items-center gap-2 mt-0.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>GPS: 28.6139° N, 77.2090° E • Paramedic Unit #07 • En Route to {provider.hospitalName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-heading">TRAUMA DESTINATION</span>
              <span className="text-xs font-bold text-white block">{provider.hospitalName}</span>
              <span className="text-[11px] text-emerald-400 font-mono">Bay 3 • {provider.doctorName}</span>
            </div>
            <button
              onClick={() => onNavigateTo('hospital-request')}
              className="bg-[#0066cc] hover:bg-[#0284c7] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Transfer to Hospital ER</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* TOP ROW: Patient High-Visibility Triage HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Patient Identity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-heading">IDENTIFIED PATIENT</span>
            <div className="text-lg font-bold text-white mt-0.5 font-heading">{patient.name}</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Age: 32 • Male • DOB: {patient.dob}
            </div>
            <div className="text-[11px] text-blue-400 font-mono mt-1 truncate">
              ID: {patient.dpiId}
            </div>
          </div>

          {/* CRITICAL BLOOD TYPE - HIGHEST VISIBILITY */}
          <div className="bg-red-950/80 border-2 border-red-600 rounded-2xl p-4 shadow-lg shadow-red-950/40 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-black text-red-300 flex items-center gap-1 font-heading tracking-wider">
                  <Droplet className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  CRITICAL BLOOD GROUP
                </span>
                <div className="text-3xl font-black text-white font-mono tracking-tight mt-0.5">
                  {patient.bloodGroup}
                </div>
                <div className="text-xs text-red-200 font-medium">
                  Universal RBC Donor (Rh-Negative)
                </div>
              </div>
              <span className="text-[10px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded font-mono">
                RARE
              </span>
            </div>
          </div>

          {/* Organ Donor Registration */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-heading">ADVANCE DIRECTIVES</span>
            <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5 font-heading">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{patient.organDonor}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Policy: {patient.insurancePolicy}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
              Signed: National Registry
            </div>
          </div>

          {/* Telemetry Stream Connection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-heading">TELEMETRY LINK STATUS</span>
              <div className="text-xs font-bold text-white mt-1 flex items-center gap-1.5 font-mono">
                <span className={`w-2.5 h-2.5 rounded-full ${telemetryDispatched ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                <span>{telemetryDispatched ? 'LIVE STREAMING TO ER' : 'LOCAL ONLY (READY)'}</span>
              </div>
            </div>
            <button
              onClick={handleDispatchTelemetry}
              disabled={telemetryDispatched}
              className={`mt-2 w-full py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                telemetryDispatched
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#0066cc] hover:bg-[#0284c7] text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{telemetryDispatched ? 'Streaming Live' : 'Transmit to ER Bay 3'}</span>
            </button>
          </div>

        </div>

        {/* CRITICAL DRUG ALLERGY WARNING BANNER */}
        <div className="bg-red-950/90 border-2 border-red-500 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 animate-pulse" />
              <div>
                <h3 className="text-base font-black text-white font-heading uppercase tracking-wide">
                  CRITICAL CONTRAINDICATION: PENICILLIN & BETA-LACTAMS
                </h3>
                <span className="text-xs font-bold text-red-300">
                  SEVERITY: ANAPHYLACTIC SHOCK HAZARD (HIGH MORTALITY RISK)
                </span>
              </div>
            </div>
            <span className="text-xs font-bold bg-red-600 text-white px-3 py-1 rounded-full uppercase tracking-wider font-mono self-start sm:self-auto">
              DO NOT ADMINISTER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-black/40 p-3.5 rounded-xl border border-red-800/60">
            <div>
              <span className="text-red-300 font-bold block">Strictly Prohibited Medications:</span>
              <span className="text-white mt-0.5 block font-mono">
                Amoxicillin, Ampicillin, Piperacillin, Augmentin, Cefazolin, Cefalexin
              </span>
            </div>
            <div>
              <span className="text-red-300 font-bold block">Mandatory Protocol:</span>
              <span className="text-white mt-0.5 block">
                Have Epinephrine 1:1,000 autoinjector on standby. Use Macrolides or Fluoroquinolones if antibiotic required.
              </span>
            </div>
          </div>
        </div>

        {/* MAIN TELEMETRY DISPLAY: Live ECG Sweep & Monitors */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-heading flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              Continuous Real-Time Vitals Telemetry (Field Monitor)
            </h2>
            <span className="text-xs font-mono text-slate-400">Sample Rate: 250 Hz • Lead II Sinus</span>
          </div>

          {/* ECG Monitor Component */}
          <ECGMonitor isEmergency={true} />
        </div>

        {/* BOTTOM SPLIT: Chronic Conditions & Active Meds vs Next-of-Kin SOS Dialer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Chronic Medical History & Prescriptions */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              Active Medical Conditions & Field Relevant Meds
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">ENDOCRINE ALERT</span>
                <div className="font-bold text-white text-sm">Type 1 Diabetes Mellitus</div>
                <p className="text-slate-400 text-[11px]">Basal-Bolus Insulin Regimen. Monitored via CGM sensor on left tricep.</p>
                <div className="text-emerald-400 text-[11px] font-mono pt-1">Active: Insulin Glargine 18U QHS</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">PULMONARY ALERT</span>
                <div className="font-bold text-white text-sm">Moderate Persistent Asthma</div>
                <p className="text-slate-400 text-[11px]">Acute bronchospasm trigger on respiratory infection or NSAID exposure.</p>
                <div className="text-cyan-400 text-[11px] font-mono pt-1">Active: Albuterol 90mcg PRN</div>
              </div>
            </div>

            {/* Paramedic Field Triage Notes */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 font-heading">
                  Paramedic Field Triage Log (Transmitted with Handover)
                </label>
                {addedNoteSuccess && (
                  <span className="text-[11px] text-emerald-400 font-mono">Quick template appended</span>
                )}
              </div>
              <textarea
                value={emtNotes}
                onChange={(e) => setEmtNotes(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:border-blue-500 focus:outline-hidden"
              />
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-500 font-medium">Quick Insert:</span>
                <button
                  onClick={() => handleAppendNote('Vitals stable en route')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors"
                >
                  + Vitals Stable
                </button>
                <button
                  onClick={() => handleAppendNote('O2 2L/min via NC')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors"
                >
                  + O2 via NC
                </button>
                <button
                  onClick={() => handleAppendNote('Pupils equal & reactive')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded transition-colors"
                >
                  + PERRL
                </button>
              </div>
            </div>
          </div>

          {/* Right: Emergency SOS Next-of-Kin One-Touch Dialer */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              Emergency SOS Next-of-Kin Contacts
            </h3>

            <div className="space-y-3">
              {patient.emergencyContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-heading">{contact.name}</span>
                      <span className="text-[10px] text-slate-400">({contact.relation})</span>
                      {contact.isPrimary && (
                        <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded font-mono">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-emerald-400 block mt-1">{contact.phone}</span>
                    <span className="text-[10px] text-slate-500 block">{contact.address}</span>
                  </div>

                  <button
                    onClick={() => handleCall(contact)}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 shrink-0"
                    title={`Dial ${contact.name}`}
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Advance to Doctor Request View */}
            <div className="pt-2">
              <button
                onClick={() => onNavigateTo('hospital-request')}
                className="w-full bg-[#0066cc] hover:bg-[#0284c7] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 font-heading"
              >
                <span>Proceed to Step 3: Hospital Request Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Simulated Live Call Overlay */}
      {isCalling && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-emerald-400 font-mono block">PARAMEDIC EMERGENCY DISPATCH LINK</span>
              <h4 className="text-lg font-bold font-heading mt-1">{isCalling.name}</h4>
              <span className="text-xs text-slate-400 font-mono">{isCalling.phone} ({isCalling.relation})</span>
            </div>
            <p className="text-xs text-slate-400">
              Call connected. Automatic notification packet sent: Patient conscious, en route to City General Hospital Bay 3.
            </p>
            <button
              onClick={() => setIsCalling(null)}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              Disconnect Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
