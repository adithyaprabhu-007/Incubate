import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Clock, 
  Fingerprint, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Lock, 
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  BadgeCheck,
  Stethoscope,
  X
} from 'lucide-react';
import { AVAILABLE_SCOPES } from '../data/mockData';

export default function PatientConsentScreen({
  requestData,
  patient,
  provider,
  onApprove,
  onDeny,
  onNavigateTo
}) {
  const initialScopes = requestData?.scopes || ['vitals', 'allergies', 'medications', 'history'];
  const [grantedScopes, setGrantedScopes] = useState(initialScopes);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [denyReason, setDenyReason] = useState('Unrecognized doctor or facility');
  const [biometricStep, setBiometricStep] = useState(0); // 0: idle, 1: scanning, 2: verified
  const [countdown, setCountdown] = useState(179); // 2 mins 59s

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleScope = (scopeId) => {
    setGrantedScopes(prev => 
      prev.includes(scopeId)
        ? prev.filter(id => id !== scopeId)
        : [...prev, scopeId]
    );
  };

  const handleStartBiometrics = () => {
    setIsAuthorizing(true);
    setBiometricStep(1); // scanning

    setTimeout(() => {
      setBiometricStep(2); // verified

      setTimeout(() => {
        onApprove({
          doctorName: requestData?.doctorName || provider.doctorName,
          hospitalName: requestData?.hospitalName || provider.hospitalName,
          grantedScopes: grantedScopes,
          duration: requestData?.duration || '15_mins',
          purpose: requestData?.purpose || 'Emergency Room Trauma Triage & Resuscitation',
          tokenId: `DPI-EPHEM-${Math.floor(100000 + Math.random() * 900000)}`,
          sessionStartTime: new Date().toLocaleTimeString(),
          expiresInMinutes: 15
        });
      }, 600);

    }, 1100);
  };

  const handleConfirmDenial = () => {
    setShowDenyModal(false);
    onDeny(denyReason);
  };

  const durationText = requestData?.duration === '15_mins' 
    ? '15 Minutes' 
    : requestData?.duration === '30_mins' 
    ? '30 Minutes' 
    : requestData?.duration === '1_hour' 
    ? '1 Hour' 
    : '4 Hours';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* High-Priority Inbound Push Alert Header */}
      <div className="bg-[#fffbeb] border-2 border-[#d97706] rounded-2xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#d97706] text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-mono">
                  HIGH-PRIORITY INBOUND DPI CONSENT ALERT
                </span>
                <span className="text-xs font-mono font-bold text-amber-800">
                  Auto-declines in {formatCountdown(countdown)}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 font-heading">
                Hospital Requesting Emergency Ephemeral Access
              </h1>
            </div>
          </div>

          <div className="bg-white/90 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-mono text-amber-900 shrink-0">
            PUSH ID: #REQ-8821
          </div>
        </div>
      </div>

      {/* Main Consent Authorization Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Requester Physician & Facility Profile */}
        <div className="bg-[#f0f6ff] border border-blue-200/80 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#0066cc] text-white flex items-center justify-center font-bold shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {requestData?.hospitalName || provider.hospitalName}
                  </h3>
                  <BadgeCheck className="w-4 h-4 text-[#059669]" />
                </div>
                <p className="text-xs text-slate-600">
                  Attending: <strong className="text-slate-900">{requestData?.doctorName || provider.doctorName}</strong> ({provider.department})
                </p>
                <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                  NPI: <strong className="text-slate-800 font-bold">{provider.npiNumber}</strong> • {provider.licenseNumber}
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-[#0066cc] bg-blue-100 px-3 py-1 rounded-full shrink-0 font-mono">
              Level-1 Trauma Bay 3
            </span>
          </div>

          <div className="pt-3 border-t border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Stated Clinical Purpose:</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                {requestData?.purpose || 'Emergency Room Trauma Triage & Resuscitation'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Requested Session Lease:</span>
              <span className="font-bold text-[#0066cc] text-sm mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{durationText} (Auto-Expiring)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Citizen Sovereignty: Scopes Review & Modification */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#0066cc]" />
                Requested Clinical Scopes (Sovereign Review)
              </h3>
              <p className="text-xs text-slate-500">
                You have the sovereign right to toggle off non-essential records before signing.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {grantedScopes.length} scopes will be granted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AVAILABLE_SCOPES.map((scope) => {
              const isRequested = initialScopes.includes(scope.id);
              const isGranted = grantedScopes.includes(scope.id);

              return (
                <div
                  key={scope.id}
                  onClick={() => toggleScope(scope.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isGranted
                      ? 'bg-[#f0f6ff] border-[#0066cc] shadow-xs'
                      : 'bg-white border-slate-200 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 text-[#0066cc]">
                    {isGranted ? (
                      <CheckSquare className="w-4 h-4 fill-blue-50 text-[#0066cc]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 font-heading">{scope.label}</span>
                      {scope.requiredForEmergency && (
                        <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded font-mono">
                          CRITICAL
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{scope.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & Audit Commitment Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0066cc] shrink-0" />
            <span>
              All queries by Dr. Rahul Sharma will be signed with an immutable cryptographic receipt.
            </span>
          </div>
          <span className="text-emerald-700 font-bold hidden sm:inline font-mono">E2E TLS 1.3</span>
        </div>

        {/* Primary Action Buttons: Biometric Approve vs Deny */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleStartBiometrics}
            disabled={grantedScopes.length === 0}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#0066cc] hover:bg-[#0284c7] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2.5 active:scale-95 font-heading"
          >
            <Fingerprint className="w-5 h-5" />
            <span>Approve Ephemeral Access (Biometric Shield)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDenyModal(true)}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 font-heading"
          >
            <XCircle className="w-4 h-4" />
            <span>Deny Request</span>
          </button>
        </div>

      </div>

      {/* BIOMETRIC SCANNING MODAL */}
      {isAuthorizing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className={`absolute inset-0 rounded-full border-2 ${
                biometricStep === 2 ? 'border-emerald-400 bg-emerald-500/20' : 'border-[#0066cc] animate-ping'
              }`} />

              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all ${
                biometricStep === 2 ? 'bg-[#059669]' : 'bg-[#0066cc]'
              }`}>
                {biometricStep === 2 ? (
                  <CheckCircle2 className="w-10 h-10 animate-in zoom-in" />
                ) : (
                  <Fingerprint className="w-10 h-10 animate-pulse" />
                )}
              </div>

              {/* Laser Scan line */}
              {biometricStep === 1 && (
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-1 bg-cyan-400 shadow-md shadow-cyan-400/80 animate-bounce pointer-events-none" />
              )}
            </div>

            <div>
              <h4 className="text-lg font-bold font-heading">
                {biometricStep === 2 ? 'Biometric Signature Verified' : 'Verifying Biometric Shield...'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {biometricStep === 2 
                  ? 'Cryptographic Token Generated // DPI-EPHEM-882194' 
                  : 'Matching Secure Enclave Hardware Key...'}
              </p>
            </div>

            <div className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 p-2.5 rounded-xl font-mono">
              ● Sovereign Asymmetric Session Key Minted
            </div>
          </div>
        </div>
      )}

      {/* DENIAL REASON MODAL */}
      {showDenyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-1.5 text-rose-600">
                <AlertTriangle className="w-4 h-4" />
                Confirm Explicit Consent Denial
              </h3>
              <button
                onClick={() => setShowDenyModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please specify the statutory justification for declining emergency clinical access. An immutable receipt will be logged on the National Rail.
            </p>

            <div className="space-y-2">
              {[
                'I am not currently at this medical facility',
                'Unrecognized doctor or facility credentials',
                'Overbroad clinical data scope requested',
                'Emergency has concluded / Patient is discharged',
                'Suspicious request or patient identity discrepancy'
              ].map((reason) => (
                <label 
                  key={reason} 
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                    denyReason === reason 
                      ? 'bg-rose-50 border-rose-300 font-semibold text-rose-900' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="deny-reason"
                    checked={denyReason === reason}
                    onChange={() => setDenyReason(reason)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleConfirmDenial}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                Confirm Denial & Sign Receipt
              </button>
              <button
                onClick={() => setShowDenyModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
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
