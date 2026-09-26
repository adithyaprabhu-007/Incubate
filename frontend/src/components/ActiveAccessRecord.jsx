import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, Clock, AlertTriangle, Download, 
  XCircle, FileText, CheckCircle2, Lock, Radio, Activity, ExternalLink, RefreshCw
} from 'lucide-react';
import { auditVaultEvents } from '../data/mockData';

export default function ActiveAccessRecord({ 
  onRevokeAccess, 
  onOpenAuditReceipt,
  sessionActive,
  onResetWorkflow
}) {
  const [sessionSeconds, setSessionSeconds] = useState(1785); // 29m 45s
  const [logs, setLogs] = useState(auditVaultEvents);
  const [revoked, setRevoked] = useState(false);

  useEffect(() => {
    if (revoked || !sessionActive) return;
    const timer = setInterval(() => {
      setSessionSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [revoked, sessionActive]);

  const formatTimer = (total) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRevoke = () => {
    setRevoked(true);
    // Add revocation event to audit log
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()} EST`;
    setLogs(prev => [
      ...prev,
      {
        time: timeStr,
        tag: "REVOKED",
        tagColor: "red",
        title: "Session Terminated by Authorized Party",
        detail: "Ephemeral keys erased from memory. Statutory notification dispatched."
      }
    ]);
    if (onRevokeAccess) onRevokeAccess();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `emergency-dpi-audit-log-session-88219.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Notification Alert Banner */}
      {!revoked ? (
        <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  ACTIVE CLINICAL SESSION ESTABLISHED
                </span>
                <span className="text-xs font-mono font-medium text-emerald-700">
                  • Session #EPHEM-SES-88219
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-900 mt-0.5">
                Emergency Access Granted — Clinical Override Protocol
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Cryptographically sealed under HIPAA § 164.512(j) Direct Point-of-Care Provision.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-center shrink-0">
            {/* Live Countdown Timer Badge */}
            <div className="bg-white border border-emerald-200 rounded-xl px-3.5 py-2 flex items-center space-x-2.5 shadow-sm">
              <Clock className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
              <div>
                <div className="text-sm font-black font-mono text-emerald-800">
                  {formatTimer(sessionSeconds)} <span className="text-[10px] font-sans font-bold text-emerald-600">LEFT</span>
                </div>
                <div className="text-[9px] text-slate-400">
                  Auto-expires in {Math.floor(sessionSeconds / 60)}m {sessionSeconds % 60}s
                </div>
              </div>
            </div>

            {/* Revoke Button */}
            <button
              onClick={handleRevoke}
              className="px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Revoke Access Immediately</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
            <div>
              <div className="text-base font-bold text-rose-900">Session Revoked &amp; Keys Purged</div>
              <p className="text-xs text-rose-700 mt-0.5">
                Access tokens permanently invalidated at hospital terminal. Cryptographic audit trail finalized.
              </p>
            </div>
          </div>
          <button
            onClick={onResetWorkflow}
            className="px-4 py-2 bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Flow</span>
          </button>
        </div>
      )}

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Active Emergency Disclosure Record */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">Active Emergency Disclosure Record</h2>
                  <p className="text-xs text-slate-500">HL7 FHIR v4.0.1 Direct Point-of-Care Provision</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                VERIFIED &amp; ACTIVE
              </span>
            </div>

            {/* Requester Org & Attending Physician */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-hospital-50/50 border border-blue-100 rounded-xl p-3.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">REQUESTER ORGANIZATION</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">City General Hospital</div>
                <div className="text-xs text-slate-600">Trauma &amp; Acute Emergency Unit 3</div>
              </div>

              <div className="bg-hospital-50/50 border border-blue-100 rounded-xl p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATTENDING PHYSICIAN</div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">Active On-Duty</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">Dr. Alex Sharma, MD</div>
                <div className="text-xs text-slate-600 font-mono">NPI: 1942083921 • Board Cert: Emergency Med</div>
              </div>
            </div>

            {/* Statutory Request Basis */}
            <div className="bg-blue-50/40 border border-blue-200/70 rounded-xl p-4 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-hospital-600" />
                <span>STATUTORY REQUEST BASIS</span>
              </div>
              <h4 className="text-sm font-bold text-hospital-700">
                Emergency Treatment — STAT Direct Trauma Stabilization (§ 164.512(j))
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediate threat to patient health/life without prior routine consent window. Electronic signature affirmed under penalty of false disclosure.
              </p>
            </div>

            {/* Approved Data Envelope */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  APPROVED DATA ENVELOPE (EPHEMERALLY STREAMED)
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Strict Read-Only Enforcement
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Blood Group stream card */}
                <div className="bg-hospital-50/70 border border-blue-200 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-hospital-600"></span>
                      Blood group &amp; Cross-match
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white border border-blue-200 text-hospital-700 px-1.5 py-0.2 rounded">
                      LOINC 883-9
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    ABO Typing (B+ Positive), Rh factor verified, transfusion antibody screens.
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    ● Payload: 1.4 KB • Ephemeral RAM Cache
                  </div>
                </div>

                {/* Allergies stream card */}
                <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      Critical Allergies &amp; Alerts
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white border border-rose-200 text-rose-700 px-1.5 py-0.2 rounded">
                      SNOMED-CT
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Penicillin (Anaphylaxis Tier 1), Ketorolac/NSAIDs acute hypersensitivity.
                  </p>
                  <div className="text-[10px] text-rose-600 font-semibold pt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Active Alert Broadcasted to Anesthesia Cart
                  </div>
                </div>
              </div>
            </div>

            {/* Shielded & Suppressed Categories */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Shielded &amp; Suppressed Categories:</strong> Psychotherapy notes, substance history, behavioral health evaluations, and insurance/billing ledgers remain cryptographically locked and masked from this clinical session.
              </div>
            </div>

            {/* Bottom session hash */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 font-mono gap-1">
              <div>
                Ledger Node: <strong className="text-slate-600">0x7F8C4...B19D</strong> (Provable Nonce)
              </div>
              <div>
                Initialized: Today at 14:32:01 EST via Patient 1-Tap
              </div>
            </div>

          </div>

          {/* Card 2: Point-of-Care Handshake Telemetry */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                <Activity className="w-4 h-4 text-hospital-600" />
                <h3>Point-of-Care Handshake Telemetry</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                LATENCY: 14MS (TLS 1.3)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Metric 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">QUERIES DISPATCHED</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">
                  4 <span className="text-xs text-slate-400 font-normal">/ 12 permitted</span>
                </div>
                {/* Mini SVG Sparkline */}
                <div className="h-6 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 24">
                    <path d="M 0 20 L 20 18 L 40 10 L 60 14 L 80 8 L 100 12" fill="none" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">PAYLOAD TRANSFERRED</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">
                  3.2 <span className="text-xs text-slate-400 font-normal">KB (GZIP)</span>
                </div>
                {/* Mini SVG Sparkline */}
                <div className="h-6 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 24">
                    <path d="M 0 22 L 25 20 L 50 16 L 75 14 L 100 10" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">AUDIT INTEGRITY INDEX</div>
                <div className="text-lg font-black text-emerald-700 mt-0.5">
                  100% <span className="text-xs text-slate-400 font-normal">Signed</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Statutory Audit Accountability & Legal Safeguards */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-hospital-600 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900">Statutory Audit Accountability &amp; Legal Safeguards</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  In accordance with HIPAA § 164.512(j) and State Emergency Medical Disclosure statutes, every read query, timestamp, clinician ID, and IP address in this session is immutably signed to the hospital's tamper-evident audit ledger. Unauthorized record dissemination or retention beyond the 30-minute statutory window triggers automated compliance reporting to the Hospital Privacy Officer and HHS OCR.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={onOpenAuditReceipt}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Audit Receipt (PDF)</span>
              </button>

              <button
                onClick={() => alert("Connecting to 24/7 On-Call Patient Privacy Ombudsman hotline: 1-800-555-DPI-HELP")}
                className="px-4 py-2 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold shadow-sm shadow-hospital-600/20 transition-colors flex items-center gap-1.5"
              >
                <span>Contact Privacy Ombudsman</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (Span 4): Immutable Audit Vault Live Feed */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                <Radio className="w-4 h-4 text-hospital-600" />
                <h3>Immutable Audit Vault</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Feed
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Zero-knowledge cryptographic log streamed to hospital compliance broker.
            </p>

            {/* Live Vertical Timeline */}
            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {logs.map((event, idx) => (
                <div key={idx} className="relative text-xs">
                  {/* Timeline dot */}
                  <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-white ${
                    event.tagColor === 'emerald'
                      ? 'bg-emerald-500 ring-2 ring-emerald-100'
                      : event.tagColor === 'red'
                      ? 'bg-rose-500 ring-2 ring-rose-100'
                      : 'bg-hospital-600 ring-2 ring-blue-100'
                  }`}></div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] font-bold text-slate-700">{event.time}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      event.tagColor === 'emerald'
                        ? 'bg-emerald-50 text-emerald-800'
                        : event.tagColor === 'red'
                        ? 'bg-rose-50 text-rose-800'
                        : 'bg-blue-50 text-hospital-800'
                    }`}>
                      {event.tag}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 mt-0.5">{event.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{event.detail}</div>
                </div>
              ))}
            </div>

            {/* Export JSON Button */}
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={handleExportJson}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-hospital-700 font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors border border-blue-200/60"
              >
                <Download className="w-3.5 h-3.5 text-hospital-600" />
                <span>Export Cryptographic Log (.JSON)</span>
              </button>
            </div>
          </div>

          {/* Verified Destination Node Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-hospital-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VERIFIED DESTINATION NODE</div>
              <div className="text-xs font-bold text-slate-900">City General Trauma Station #3</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>TLS 1.3 Mutual Cert Verified</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
