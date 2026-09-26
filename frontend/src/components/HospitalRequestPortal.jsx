import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  CheckSquare, 
  Square, 
  Send, 
  AlertCircle, 
  ChevronRight, 
  Key, 
  Lock,
  FileText,
  Stethoscope,
  Info,
  QrCode,
  Camera,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  BadgeCheck
} from 'lucide-react';
import { AVAILABLE_SCOPES } from '../data/mockData';
import { usePatientContext } from '../context/PatientContext';

export default function HospitalRequestPortal({
  provider,
  onSubmitRequest,
  onNavigateTo
}) {
  const { patient } = usePatientContext();
  const [selectedScopes, setSelectedScopes] = useState(['vitals', 'allergies', 'medications', 'history']);
  const [duration, setDuration] = useState('15_mins');
  const [purpose, setPurpose] = useState('Emergency Room Trauma Triage & Resuscitation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanningQr, setIsScanningQr] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(true);

  const toggleScope = (scopeId) => {
    setSelectedScopes(prev => 
      prev.includes(scopeId)
        ? prev.filter(id => id !== scopeId)
        : [...prev, scopeId]
    );
  };

  const selectPreset = (type) => {
    if (type === 'minimum') {
      setSelectedScopes(['vitals', 'allergies']);
    } else if (type === 'standard') {
      setSelectedScopes(['vitals', 'allergies', 'medications', 'history']);
    } else if (type === 'full') {
      setSelectedScopes(AVAILABLE_SCOPES.map(s => s.id));
    }
  };

  const handleSimulateScan = () => {
    setIsScanningQr(true);
    setTimeout(() => {
      setIsScanningQr(false);
      setScanSuccess(true);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedScopes.length === 0) {
      alert('Please select at least one clinical scope to proceed.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitRequest({
        doctorName: provider.doctorName,
        hospitalName: provider.hospitalName,
        scopes: selectedScopes,
        duration: duration,
        purpose: purpose,
        timestamp: new Date().toLocaleTimeString(),
        requestId: `DPI-REQ-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }, 500);
  };

  const durationLabels = {
    '15_mins': '15 Minutes (Acute Resuscitation)',
    '30_mins': '30 Minutes (Trauma Bay Stabilization)',
    '1_hour': '1 Hour (ER Observation)',
    '4_hours': '4 Hours (ICU Shift Handover)'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Hospital Credential & NPI Verification Header */}
      <div className="bg-[#f0f6ff] border border-blue-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0066cc] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#0066cc] px-2 py-0.5 rounded-full font-mono">
                CLINICAL EMR CONNECTOR // DPI NODE #4
              </span>
              <span className="text-xs font-semibold text-[#059669] flex items-center gap-1">
                <BadgeCheck className="w-4 h-4 text-[#059669]" />
                HIPAA Attested Node
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1 font-heading">
              Hospital Emergency Access Request Portal
            </h1>
            <p className="text-xs text-slate-600">
              Requesting zero-trust ephemeral health records through the National Ephemeral Health Consent Rail.
            </p>
          </div>
        </div>

        {/* NPI VERIFIED PHYSICIAN BADGE */}
        <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-xs text-right w-full md:w-auto shrink-0">
          <div className="flex items-center justify-between md:justify-end gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-heading">NPI VERIFIED PHYSICIAN</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-sm font-bold text-slate-900 font-heading">{provider.doctorName}</div>
          <div className="text-xs text-[#0066cc] font-medium">{provider.department}</div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            NPI: <strong className="text-slate-800 font-bold">{provider.npiNumber}</strong> • {provider.licenseNumber}
          </div>
        </div>
      </div>

      {/* Main Request Configuration Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Patient QR Scan HUD & Scope Checkboxes */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Target Patient Identifier & QR Scanner Simulator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#0066cc]" />
                Target Patient Identified in Trauma Bay
              </h3>
              <button
                type="button"
                onClick={handleSimulateScan}
                className="text-xs text-[#0066cc] hover:underline font-semibold flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Re-scan Wristband QR</span>
              </button>
            </div>

            {/* QR Scan Simulated Viewfinder */}
            {isScanningQr && (
              <div className="bg-slate-950 text-white rounded-xl p-4 text-center space-y-2 relative overflow-hidden">
                <div className="w-12 h-12 border-2 border-emerald-400 mx-auto rounded-lg flex items-center justify-center animate-pulse">
                  <QrCode className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-xs font-mono text-emerald-400 block animate-pulse">
                  Decoding High-Density Sovereign QR Matrix...
                </span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-ecg-scan pointer-events-none" />
              </div>
            )}

            {/* Patient Verification Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#f0f6ff] border border-blue-100 text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block font-heading">PATIENT NAME</span>
                <span className="text-sm font-bold text-slate-900 block font-heading">{patient.name}</span>
                <span className="text-slate-500 mt-0.5 block">Age: {patient.age} • {patient.gender} • Trauma Inbound</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block font-heading">DPI HEALTH IDENTIFIER</span>
                <span className="font-mono text-xs font-bold text-slate-900 block mt-0.5">{patient.dpiId}</span>
                <span className="text-[10px] text-slate-500 block">{patient.abhaAddress}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block font-heading">CONFIRMED BLOOD TYPE</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-black text-rose-600 font-mono">{patient.bloodGroup}</span>
                  <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                    Universal Donor
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">● Cryptographic Identity Verified</span>
              </div>
            </div>
          </div>

          {/* HIPAA MINIMUM-NECESSARY FIELD SELECTOR CHECKBOXES */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#0066cc]" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    HIPAA Minimum-Necessary Scope Selector
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  45 CFR § 164.502(b): Limit health data requested to the minimum strictly required for clinical care.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => selectPreset('minimum')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#0066cc] text-slate-700 font-semibold transition-colors border border-slate-200"
                >
                  Emergency Only (Min)
                </button>
                <button
                  type="button"
                  onClick={() => selectPreset('standard')}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0066cc] font-semibold transition-colors border border-blue-200"
                >
                  Trauma Standard
                </button>
                <button
                  type="button"
                  onClick={() => selectPreset('full')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors border border-slate-200"
                >
                  All Scopes
                </button>
              </div>
            </div>

            {/* Checkbox Scopes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {AVAILABLE_SCOPES.map((scope) => {
                const isSelected = selectedScopes.includes(scope.id);
                return (
                  <div
                    key={scope.id}
                    onClick={() => toggleScope(scope.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 flex items-start gap-3 select-none ${
                      isSelected
                        ? 'bg-[#f0f6ff] border-[#0066cc] shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 text-[#0066cc]">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 fill-blue-50 text-[#0066cc]" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 font-heading">{scope.label}</span>
                        {scope.requiredForEmergency && (
                          <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded font-mono">
                            CRITICAL
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{scope.desc}</p>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Category: {scope.category}</span>
                        <span className="font-mono text-slate-500">{scope.riskLevel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Selected Scopes: <strong>{selectedScopes.length} of {AVAILABLE_SCOPES.length}</strong></span>
              </span>
              <span className="text-[11px] text-slate-500">Citizen retains sovereign approval override</span>
            </div>
          </div>

        </div>

        {/* Right Column: Duration Selector, Purpose & Submission Action */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* ACCESS DURATION SELECTOR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0066cc]" />
                Access Lease Duration
              </h3>
              <span className="text-[11px] font-mono text-[#0066cc] font-semibold">Auto-Expiring</span>
            </div>

            <div className="space-y-2">
              {[
                { id: '15_mins', label: '15 Minutes', note: 'Standard Acute Resuscitation (Recommended)', recommended: true },
                { id: '30_mins', label: '30 Minutes', note: 'Trauma Bay Operative Stabilization', recommended: false },
                { id: '1_hour', label: '1 Hour', note: 'ER Observation & Diagnostic Follow-up', recommended: false },
                { id: '4_hours', label: '4 Hours', note: 'Shift Handover to Intensive Care (ICU)', recommended: false },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setDuration(opt.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs flex items-center justify-between ${
                    duration === opt.id
                      ? 'bg-[#f0f6ff] border-[#0066cc] text-[#0066cc] font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span>{opt.label}</span>
                      {opt.recommended && (
                        <span className="text-[9px] bg-blue-100 text-[#0066cc] font-bold px-1.5 py-0.2 rounded font-mono">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal block">{opt.note}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    duration === opt.id ? 'border-[#0066cc] bg-[#0066cc]' : 'border-slate-300'
                  }`}>
                    {duration === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Ephemeral cryptographic tokens self-destruct upon expiration. All cached RAM keys are purged.
            </p>
          </div>

          {/* Clinical Stated Purpose */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#0066cc]" />
              Clinical Justification
            </h3>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0066cc] focus:outline-hidden"
            />
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="text-slate-400 font-medium">Presets:</span>
              <button
                type="button"
                onClick={() => setPurpose('Emergency Room Trauma Triage & Resuscitation')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600"
              >
                Trauma Triage
              </button>
              <button
                type="button"
                onClick={() => setPurpose('Anesthesia Pre-Op Evaluation & Airway Review')}
                className="bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600"
              >
                Anesthesia
              </button>
            </div>
          </div>

          {/* SUBMIT REQUEST BUTTON */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || selectedScopes.length === 0}
              className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 font-heading ${
                isSubmitting
                  ? 'bg-[#0284c7] cursor-wait'
                  : 'bg-[#0066cc] hover:bg-[#0284c7] active:scale-95'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transmitting Encrypted DPI Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Ephemeral Access Request</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-slate-500">
              Triggers instant high-priority push authorization on patient handset.
            </p>
          </div>

        </div>

      </form>

    </div>
  );
}
