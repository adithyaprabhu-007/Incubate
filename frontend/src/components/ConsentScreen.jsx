import React, { useState } from 'react';
import { 
  Building2, Clock, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, 
  Lock, Key, AlertTriangle, Info, ChevronRight, FileText, Check, ArrowRight
} from 'lucide-react';
import { consentHistoryData } from '../data/mockData';

export default function ConsentScreen({ 
  onAllowAccess, 
  onDenyAccess 
}) {
  const [denied, setDenied] = useState(false);
  const [approving, setApproving] = useState(false);

  const handleAllow = () => {
    setApproving(true);
    setTimeout(() => {
      setApproving(false);
      onAllowAccess();
    }, 400);
  };

  const handleDeny = () => {
    setDenied(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs & Live Node Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-1.5 flex-wrap">
          <span>EmergencyDPI Clinical Portal</span>
          <span>&gt;</span>
          <span>Consent &amp; Access Control</span>
          <span>&gt;</span>
          <span className="text-hospital-600 font-semibold">Active Consent Authorizations</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[11px] font-medium">AUDIT VAULT SYNC ACTIVE</span>
          </div>
          <div className="flex items-center space-x-1 text-hospital-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px] font-medium">
            <span>HL7 FHIR V4.0.1</span>
          </div>
        </div>
      </div>

      {/* Main Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Emergency Access Consent Authorization
        </h1>
        <p className="text-sm text-slate-600 max-w-4xl mt-1 leading-relaxed">
          Review inbound statutory emergency medical record access requests under HIPAA § 164.512(j) Safe Harbor protocols and automated break-glass audit safeguards.
        </p>
      </div>

      {/* Denied Alert Banner if user denied */}
      {denied && (
        <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
            <div>
              <div className="text-sm font-bold text-rose-900">Emergency Access Request Rejected</div>
              <p className="text-xs text-rose-700 mt-0.5">
                The requesting facility (City General Hospital) has been notified. Statutory non-disclosure notice recorded on DPI audit ledger.
              </p>
            </div>
          </div>
          <button
            onClick={() => { setDenied(false); onDenyAccess(); }}
            className="px-3.5 py-1.5 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      )}

      {/* Main 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Span 8): Main Inbound Request Authorization Card */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white border-2 border-blue-200/90 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            
            {/* Header: Hospital + Status */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-5">
              <div className="flex items-start space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-hospital-600 shrink-0 mt-0.5">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-900">City General Hospital</h2>
                    <span className="bg-hospital-50 text-hospital-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Level-1 Trauma Center
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Trauma &amp; Acute Emergency Unit 3 • NPI: 1942083921
                  </div>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  PENDING AUTHORIZATION
                </span>
              </div>
            </div>

            {/* Metadata Row: 4 key facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-100 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ATTENDING CLINICIAN</span>
                <span className="font-bold text-slate-800 block mt-0.5">Dr. Alex Sharma, MD</span>
                <span className="text-[11px] text-slate-500">Trauma Attending</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TIMESTAMP</span>
                <span className="font-bold text-slate-800 block mt-0.5">Just now (12s ago)</span>
                <span className="text-[11px] text-slate-500">Real-time Telemetry</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REQUEST ID</span>
                <span className="font-mono font-bold text-slate-800 block mt-0.5">#DPI-REQ-9942</span>
                <span className="text-[11px] text-slate-500">Statutory Token</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TRIAGE SEVERITY</span>
                <span className="font-bold text-rose-600 flex items-center gap-1 mt-0.5">
                  <span className="text-rose-600 font-bold">✱</span> STAT Case
                </span>
                <span className="text-[11px] text-rose-600/80">Severe Trauma Protocol</span>
              </div>
            </div>

            {/* Requested Clinical Data Fields */}
            <div className="py-4 space-y-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Requested Clinical Data Fields</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The requesting trauma care team has requested read-only emergency access to the following specified datasets only:
                </p>
              </div>

              {/* Scope Item 1 */}
              <div className="bg-hospital-50/50 border border-blue-200/80 rounded-xl p-4 flex items-start space-x-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">Blood group &amp; Cross-match</span>
                      <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.2 rounded">
                        Cached: 18 days ago
                      </span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      READ-ONLY
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    ABO blood typing, Rh factor, transfusion history, and red cell alloantibody screen.
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 mt-1.5">
                    FHIR: BloodGroupObservation • Loinc 883-9
                  </div>
                </div>
              </div>

              {/* Scope Item 2 */}
              <div className="bg-hospital-50/50 border border-blue-200/80 rounded-xl p-4 flex items-start space-x-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">Critical allergies &amp; Warnings</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.2 rounded">
                        2 Verified Severe Alerts
                      </span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      READ-ONLY
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Anaphylactic reactions (Penicillin, NSAIDs), latex and environmental triggers, acute contraindications.
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 mt-1.5">
                    FHIR: AllergyIntolerance • SNOMED-CT 419199007
                  </div>
                </div>
              </div>
            </div>

            {/* Data Shielding Active Notice */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-slate-600 mb-4">
              <ShieldCheck className="w-5 h-5 text-hospital-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Data Shielding Active:</strong> Mental Health notes, psychotherapy notes, genetic testing logs, and billing statements remain strictly locked and inaccessible during this session.
              </div>
            </div>

            {/* 30-Minute Temporary Access Limit Box */}
            <div className="bg-hospital-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-hospital-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">30-Minute Temporary Access Limit</h4>
                  <p className="text-xs text-slate-600 mt-0.5 max-w-md">
                    Ephemeral cryptographic keys self-revoke immediately upon expiration or clinical case sign-off. Full audit logs are immutable and permanently written to the DPI ledger.
                  </p>
                </div>
              </div>

              {/* Countdown Preview Display */}
              <div className="bg-white border border-blue-200 rounded-xl px-4 py-2.5 text-center shadow-sm shrink-0">
                <div className="text-xl font-black text-hospital-700 font-mono tracking-wider">
                  30 : 00
                  <span className="text-[10px] text-slate-500 font-sans font-bold ml-1">WINDOW</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Countdown begins on approval</div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Audit Ledger Target: <strong className="text-slate-700">0x7F8C4...B19D</strong></span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleDeny}
                  className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Deny Access</span>
                </button>

                <button
                  type="button"
                  onClick={handleAllow}
                  disabled={approving}
                  className="px-6 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold shadow-md shadow-hospital-600/30 transition-all flex items-center gap-2 disabled:opacity-75 hover:scale-[1.02]"
                >
                  <Key className="w-4 h-4" />
                  <span>{approving ? 'Sealing Cryptographic Keys...' : 'Allow Access (30m)'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Safe Harbor Guidance Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                Need immediate guidance? Contact <strong className="text-slate-700 underline cursor-pointer">Patient Advocacy</strong> or On-Call Hospital Privacy Officer.
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold text-slate-400">
              SECTION 164.512(J) SAFE HARBOR
            </span>
          </div>

        </div>

        {/* Right Column (Span 4): History & Protocols */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card: Recent Consent History */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                <Clock className="w-4 h-4 text-hospital-600" />
                <h3>Recent Consent History</h3>
              </div>
              <span className="text-xs font-semibold text-hospital-600 hover:underline cursor-pointer">
                Full Log
              </span>
            </div>

            <div className="space-y-3">
              {consentHistoryData.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.hospital}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                      item.statusType === 'expired'
                        ? 'bg-slate-200 text-slate-700'
                        : item.statusType === 'revoked'
                        ? 'bg-blue-100 text-hospital-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{item.department}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-200/60">
                    <span>{item.duration}</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Security Standard Protocols */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3>Security Standard Protocols</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Zero-Persistence Token</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    Tokens are stored in transient RAM and automatically scrubbed after session cutoff.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-hospital-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Cryptographic Nonce</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    Every payload is authenticated against the hospital NPI registry and state physician database.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">HIPAA Safe Harbor Ledger</h5>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    Mandatory break-glass disclosures are synced within 120 seconds to statutory authorities.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>System Telemetry</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                99.998% Uptime
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
