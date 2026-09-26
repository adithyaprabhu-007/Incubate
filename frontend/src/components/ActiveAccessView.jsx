import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertOctagon, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Radio, 
  RotateCcw, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  ShieldAlert,
  ArrowRight,
  Database,
  Terminal,
  Zap,
  Download,
  Filter,
  Check,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { AVAILABLE_SCOPES } from '../data/mockData';

export default function ActiveAccessView({
  session,
  isRevoked,
  onKillSwitch,
  auditLogs,
  onSimulateDoctorQuery,
  onRestartDemo,
  onNavigateTo
}) {
  const [timeLeft, setTimeLeft] = useState(899); // 14 mins 59s
  const [showKillModal, setShowKillModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'QUERIES' | 'CONSENT' | 'REVOCATIONS'
  const [exportedReceipt, setExportedReceipt] = useState(false);

  useEffect(() => {
    if (isRevoked) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRevoked]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const percentRemaining = Math.max(0, (timeLeft / 900) * 100);

  const handleConfirmKillSwitch = () => {
    setShowKillModal(false);
    onKillSwitch();
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      protocol: "EmergencyDPI Sovereign Audit Rail v2.4",
      exportTimestamp: new Date().toISOString(),
      sessionToken: session?.tokenId || 'DPI-EPHEM-882194',
      revocationStatus: isRevoked ? "REVOKED_BY_PATIENT" : "ACTIVE_EPHEMERAL_STREAM",
      institution: session?.hospitalName || "City General Hospital",
      attendingPhysician: session?.doctorName || "Dr. Rahul Sharma",
      events: auditLogs
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(receiptData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `emergency-dpi-audit-receipt-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportedReceipt(true);
    setTimeout(() => setExportedReceipt(false), 2500);
  };

  // Filter logs
  const filteredLogs = auditLogs.filter(log => {
    if (activeFilter === 'QUERIES') return log.action.toLowerCase().includes('queried') || log.action.toLowerCase().includes('reviewed') || log.action.toLowerCase().includes('verified');
    if (activeFilter === 'CONSENT') return log.action.toLowerCase().includes('consent') || log.action.toLowerCase().includes('authorized');
    if (activeFilter === 'REVOCATIONS') return log.action.toLowerCase().includes('revoked') || log.action.toLowerCase().includes('kill-switch') || log.status === 'REVOKED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Session Status Banner */}
      <div className={`rounded-2xl p-5 shadow-xs transition-all duration-300 border ${
        isRevoked
          ? 'bg-[#fef2f2] border-[#dc2626] text-slate-900'
          : 'bg-[#f0f6ff] border-blue-200/80 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              isRevoked ? 'bg-[#dc2626] text-white' : 'bg-[#0066cc] text-white animate-pulse'
            }`}>
              {isRevoked ? <AlertOctagon className="w-6 h-6" /> : <Radio className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-mono ${
                  isRevoked ? 'bg-red-200 text-red-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isRevoked ? 'TOKEN REVOKED' : 'EPHEMERAL SESSION ACTIVE'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  TOKEN: {session?.tokenId || 'DPI-EPHEM-882194'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-heading mt-0.5">
                {isRevoked 
                  ? 'Access Terminated Immediately by Sovereign Kill-Switch' 
                  : 'Live Ephemeral Health Data Stream Active'}
              </h1>
              <p className="text-xs text-slate-600">
                {isRevoked
                  ? 'Cryptographic lease invalidated across all hospital EMR nodes. All active socket connections severed.'
                  : `Authenticated node: City General Hospital Trauma Bay 3 (Dr. Rahul Sharma). Continuous zero-trust telemetry stream.`}
              </p>
            </div>
          </div>

          {/* LIVE COUNTDOWN TIMER DISPLAY */}
          <div className={`px-5 py-3 rounded-xl border text-center shrink-0 min-w-[170px] ${
            isRevoked 
              ? 'bg-white border-red-200 text-red-700 shadow-xs' 
              : 'bg-white border-blue-200 shadow-xs'
          }`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-heading">
              {isRevoked ? 'SESSION HALTED' : 'TIME REMAINING'}
            </span>
            <div className={`text-3xl font-black font-mono tracking-tight tabular-nums mt-0.5 ${
              isRevoked ? 'text-slate-400 line-through' : 'text-[#0066cc]'
            }`}>
              {isRevoked ? '00:00' : timeFormatted}
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full transition-all duration-1000 ${
                  isRevoked ? 'bg-rose-400 w-0' : 'bg-[#0066cc]'
                }`}
                style={{ width: isRevoked ? '0%' : `${percentRemaining}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Kill Switch Controls | Real-Time Immutable Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sovereign Kill-Switch & Live Simulation Tools */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* THE SOVEREIGN KILL-SWITCH BUTTON CARD */}
          <div className="bg-white border-2 border-red-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#dc2626] font-bold text-xs uppercase tracking-wider font-heading">
              <ShieldAlert className="w-4 h-4" />
              <span>Sovereign Citizen Safeguard</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Emergency Sovereign Kill-Switch
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Patients retain absolute cryptographic sovereignty. Click below to immediately revoke and destroy all ephemeral tokens on the hospital EMR network.
              </p>
            </div>

            {/* Solid #dc2626 button per design.md */}
            <button
              onClick={() => setShowKillModal(true)}
              disabled={isRevoked}
              className={`w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-md flex items-center justify-center gap-2.5 font-heading ${
                isRevoked
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
                  : 'bg-[#dc2626] hover:bg-[#991b1b] shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 animate-pulse'
              }`}
            >
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <span>{isRevoked ? 'ACCESS ALREADY REVOKED' : '🚨 KILL-SWITCH: REVOKE ACCESS IMMEDIATELY'}</span>
            </button>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Enforces immediate cryptographic key shredding in hospital RAM.</span>
            </div>
          </div>

          {/* SIMULATION CONTROLS FOR EVALUATION */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Live Demo Evaluation Controls
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Interactive</span>
            </div>

            <p className="text-xs text-slate-600">
              Simulate actions executed by Dr. Rahul Sharma inside Trauma Bay 3 to observe live immutable audit logs.
            </p>

            <button
              onClick={onSimulateDoctorQuery}
              disabled={isRevoked}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-heading ${
                isRevoked
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-[#f0f6ff] hover:bg-blue-100 text-[#0066cc] border border-blue-200 active:scale-95'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Simulate ER Doctor Record Query</span>
            </button>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Need to restart demonstration?</span>
              <button
                onClick={onRestartDemo}
                className="text-[#0066cc] hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>

          {/* Session Token Metadata */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-heading">
              SESSION SECURITY MANIFEST
            </span>
            <div className="space-y-1 font-mono text-[11px] text-slate-600">
              <div>TLS Cipher: TLS_AES_256_GCM_SHA384</div>
              <div>Signer: CGH-EMR-NODE-DEL-04</div>
              <div>Token Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
              <div>Auditor Rail: Sovereign DPI Ephemeral v2.4</div>
            </div>
          </div>

        </div>

        {/* Right Column: IMMUTABLE AUDIT TRAIL */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066cc]" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Immutable Cryptographic Audit Trail
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Every access attempt, query, and revocation is non-repudiably signed and sealed.
              </p>
            </div>

            <button
              onClick={handleDownloadReceipt}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-300 self-start sm:self-auto"
            >
              {exportedReceipt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Downloaded JSON</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON Receipt</span>
                </>
              )}
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
            <span className="text-slate-400 text-[11px] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              Filter:
            </span>
            {[
              { id: 'ALL', label: 'All Events' },
              { id: 'QUERIES', label: 'Doctor Queries' },
              { id: 'CONSENT', label: 'Consent Actions' },
              { id: 'REVOCATIONS', label: 'Revocations' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  activeFilter === f.id
                    ? 'bg-[#0066cc] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Event Stream Timeline */}
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredLogs.map((log) => {
              const isRevokedEntry = log.status === 'REVOKED' || log.action.toLowerCase().includes('kill-switch');
              const isEmergency = log.status === 'EMERGENCY_ACCESS';
              const isSuccess = log.status === 'VERIFIED' || log.status === 'ACTIVE' || log.status === 'SUCCESS';

              return (
                <div 
                  key={log.id}
                  className={`p-3.5 rounded-xl border text-xs transition-all space-y-1.5 ${
                    isRevokedEntry
                      ? 'bg-red-50/70 border-red-300 text-red-950'
                      : isEmergency
                      ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                      : isSuccess
                      ? 'bg-[#f0f6ff]/70 border-blue-200 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-500 tabular-nums">
                        {log.timestamp}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-bold text-slate-800 font-heading">{log.actor}</span>
                    </div>

                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono ${
                      isRevokedEntry
                        ? 'bg-red-600 text-white'
                        : isEmergency
                        ? 'bg-rose-600 text-white'
                        : isSuccess
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {log.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{log.action}</p>

                  <div className="pt-1 flex flex-wrap items-center justify-between text-[10px] text-slate-400 gap-1 border-t border-slate-100/80 font-mono">
                    <span>{log.institution}</span>
                    <span className="text-blue-600 font-semibold">{log.verifiedSignature}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Blockchain Ledger: Sub-second finalized</span>
            <span className="font-mono">Merkle Root: 0x8821...a74b</span>
          </div>

        </div>

      </div>

      {/* KILL SWITCH CONFIRMATION MODAL */}
      {showKillModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl border-2 border-red-500 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-black font-heading text-red-700">
                  Confirm Sovereign Kill-Switch
                </h3>
                <span className="text-xs font-mono font-bold text-red-600 uppercase">
                  IRREVERSIBLE CRYPTOGRAPHIC REVOCATION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              This action will <strong>immediately terminate</strong> all live streaming telemetry, purge ephemeral decryption keys on City General Hospital trauma terminals, and append a non-repudiable revocation receipt to the National Audit Rail.
            </p>

            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 font-mono">
              Target Token: {session?.tokenId || 'DPI-EPHEM-882194'}<br/>
              Target Node: CGH-DELHI-EMR-04
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={handleConfirmKillSwitch}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#dc2626] hover:bg-[#991b1b] text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2 font-heading"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Confirm & Revoke Access Now</span>
              </button>
              <button
                onClick={() => setShowKillModal(false)}
                className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
