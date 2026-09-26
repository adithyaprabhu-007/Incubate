import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, Clock, CheckSquare, Square, Radio, 
  Lock, ArrowRight, AlertTriangle, Shield, Check, UserCheck, ChevronDown
} from 'lucide-react';
import { hospitalRequestData } from '../data/mockData';

export default function HospitalPortal({ 
  onRequestConsent, 
  onBreakGlass, 
  onCancel 
}) {
  const [purpose, setPurpose] = useState('emergency');
  const [duration, setDuration] = useState('30');
  const [scopeSelection, setScopeSelection] = useState({
    blood: true,
    allergies: true,
    medications: true,
    conditions: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleScope = (id) => {
    setScopeSelection(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = () => {
    setScopeSelection({
      blood: true,
      allergies: true,
      medications: true,
      conditions: true
    });
  };

  const handleMinimalVitals = () => {
    setScopeSelection({
      blood: true,
      allergies: true,
      medications: false,
      conditions: false
    });
  };

  const handleRequestSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRequestConsent();
    }, 450);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs & Live Node Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-1.5 flex-wrap">
          <span className="hover:text-slate-800 cursor-pointer" onClick={onCancel}>EmergencyDPI Clinical Portal</span>
          <span>&gt;</span>
          <span className="text-slate-700 font-medium">Emergency Access</span>
          <span>&gt;</span>
          <span className="text-hospital-600 font-semibold">Patient Consent Authorization</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[11px] font-medium">Audit Vault Node: TLS 1.3 Active</span>
          </div>
          <div className="flex items-center space-x-1 text-hospital-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px] font-medium">
            <span>HL7 V4.0.1 CONNECTED</span>
          </div>
        </div>
      </div>

      {/* Top 2 Cards: Verified Institution & Triage Sync */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left: Verified Clinical Institution */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-hospital-600 shrink-0 mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-hospital-700">
                    VERIFIED CLINICAL INSTITUTION
                  </span>
                  <span className="bg-hospital-50 text-hospital-700 border border-blue-200 text-[10px] font-bold px-2 py-0.2 rounded-full">
                    {hospitalRequestData.facilityType}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  {hospitalRequestData.hospitalName}
                </h2>
                <div className="text-xs text-slate-500 mt-0.5 font-mono">
                  Facility ID: <span className="font-semibold text-slate-700">{hospitalRequestData.facilityId}</span> • NPI Provider: <span className="font-semibold text-slate-700">{hospitalRequestData.npiProvider}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Cryptographically Verified
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                HASH: {hospitalRequestData.cryptographicHash}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600">
            <div className="flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Staff Credential: <strong className="text-slate-800">{hospitalRequestData.staffCredential}</strong></span>
            </div>
            <div className="font-mono text-slate-500 text-[11px]">
              Session {hospitalRequestData.sessionSeed}
            </div>
          </div>
        </div>

        {/* Right: Inbound Triage Sync Patient */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                  STAT TRIAGE SYNC
                </span>
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.2 rounded-full">
                  {hospitalRequestData.patientInbound.unit}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                {hospitalRequestData.patientInbound.name}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                MRN: <strong className="font-mono text-slate-700">{hospitalRequestData.patientInbound.mrn}</strong> • DOB: {hospitalRequestData.patientInbound.dob} • {hospitalRequestData.patientInbound.gender}
              </div>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-hospital-700 font-bold flex items-center justify-center text-sm shadow-sm">
              {hospitalRequestData.patientInbound.initials}
            </div>
          </div>

          <div className="mt-3 bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">INBOUND ETA</span>
              <span className="font-bold text-slate-800">{hospitalRequestData.patientInbound.eta}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">PROTOCOL</span>
              <span className="font-bold text-rose-600">{hospitalRequestData.patientInbound.protocol}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Form: Emergency Record Access Parameters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-hospital-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Emergency Record Access Parameters</h3>
              <p className="text-xs text-slate-500">
                Specify access justification and clinical scope under HIPAA § 164.512(j) emergency health disclosure protocols.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold bg-blue-50 text-hospital-700 border border-blue-200 px-2.5 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5" />
            ENCRYPTED TOKEN DPI-994
          </span>
        </div>

        {/* 2 Parameter Select Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Box 1: Request Purpose */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span className="text-hospital-600">✱</span> Request Purpose
              </label>
              <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded">
                MANDATORY STATUTORY CODE
              </span>
            </div>

            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-hospital-600 focus:bg-white transition-all cursor-pointer"
              >
                <option value="emergency">Emergency treatment</option>
                <option value="resuscitation">Critical Resuscitation &amp; Airway Management</option>
                <option value="surgical">Acute Surgical Intervention</option>
                <option value="trauma">Trauma Resuscitation &amp; Blood Product Transfusion</option>
              </select>
              <div className="absolute right-3.5 top-3.5 pointer-events-none flex items-center gap-1.5">
                <span className="bg-blue-100 text-hospital-800 text-[10px] font-bold px-1.5 py-0.2 rounded">STAT</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Direct emergency stabilization, triage evaluation, or resuscitation
            </p>
            <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5 pt-0.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Legally qualified under Emergency Exception Rule § 45 CFR 164.512</span>
            </div>
          </div>

          {/* Box 2: Session Access Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-hospital-600" /> Session Access Duration
              </label>
              <span className="bg-blue-50 text-hospital-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">
                Auto-Revoke Enabled
              </span>
            </div>

            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl p-3 pr-10 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-hospital-600 focus:bg-white transition-all cursor-pointer"
              >
                <option value="30">30 minutes</option>
                <option value="15">15 minutes (Rapid Assessment)</option>
                <option value="60">60 minutes (Extended Trauma Protocol)</option>
                <option value="120">120 minutes (OR Surgical Window)</option>
              </select>
              <div className="absolute right-3.5 top-3.5 pointer-events-none flex items-center gap-1.5">
                <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.2 rounded">Standard STAT</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Temporary STAT Session Key • Strict Time-Bound Token
            </p>
            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Ephemeral cryptographic keys purge instantly upon countdown termination</span>
            </div>
          </div>

        </div>

        {/* Section: Requested Clinical Data Scope */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Requested Clinical Data Scope</h4>
              <p className="text-xs text-slate-500">
                Select datasets required for immediate patient stabilization. Non-critical historical files remain shielded.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <button 
                type="button"
                onClick={handleSelectAll}
                className="text-hospital-600 hover:text-hospital-700 font-semibold hover:underline"
              >
                Select All Critical
              </button>
              <span className="text-slate-300">•</span>
              <button 
                type="button"
                onClick={handleMinimalVitals}
                className="text-slate-500 hover:text-slate-700 font-medium hover:underline"
              >
                Minimal Vitals Only
              </button>
            </div>
          </div>

          {/* 4 Interactive Checkbox Scope Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {hospitalRequestData.defaultScope.map((scope) => {
              const isChecked = scopeSelection[scope.id];
              return (
                <div
                  key={scope.id}
                  onClick={() => toggleScope(scope.id)}
                  className={`border rounded-xl p-4 transition-all cursor-pointer select-none flex items-start space-x-3.5 ${
                    isChecked
                      ? 'bg-hospital-50/60 border-blue-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 opacity-70'
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <div className="w-5 h-5 rounded bg-hospital-600 text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{scope.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        scope.tagColor === 'red'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : scope.tagColor === 'blue'
                          ? 'bg-blue-50 text-hospital-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {scope.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {scope.description}
                    </p>
                    <div className="text-[11px] font-mono text-slate-500 mt-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      {scope.fhir}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual-Channel Patient & Proxy Notification Banner */}
        <div className="bg-hospital-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-hospital-700 flex items-center justify-center shrink-0 mt-0.5">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Simultaneous Dual-Channel Patient &amp; Surrogate Notification</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                A dynamic consent prompt with 1-tap approval and emergency SMS alert will be dispatched to patient phone (
                <strong className="text-slate-800">{hospitalRequestData.patientInbound.phoneMasked}</strong>) and designated healthcare proxy (
                <strong className="text-slate-800">{hospitalRequestData.patientInbound.proxy}</strong>).
              </p>
            </div>
          </div>
          <div className="sm:shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-white text-hospital-700 border border-blue-200 px-2.5 py-1 rounded-lg shadow-sm">
              <Lock className="w-3 h-3 text-hospital-600" />
              ZERO-KNOWLEDGE TOKEN
            </span>
          </div>
        </div>

        {/* Bottom Metadata & Action Buttons */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 font-mono gap-1">
            <div className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Immutable DPI Ledger Target: <strong className="text-slate-700">0x7F8C4...B19D</strong></span>
            </div>
            <div>
              Provider Credential: <strong className="text-slate-700">NPI-Valid</strong> • UTC 06:31:57.027
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
              >
                Cancel / Return to Roster
              </button>

              <button
                type="button"
                onClick={onBreakGlass}
                className="px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Break-Glass Attending Override
              </button>
            </div>

            <button
              type="button"
              onClick={handleRequestSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold shadow-md shadow-hospital-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-75 hover:scale-[1.02]"
            >
              <span>{isSubmitting ? 'Transmitting Request...' : 'Request Patient Consent'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-center">
        <div className="bg-white border border-slate-200 rounded-lg p-2 text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-hospital-600" />
          <span>256-Bit AES End-to-End Cryptography</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2 text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>HIPAA § 164.512(j) Safe Harbor Certified</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2 text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-hospital-600" />
          <span>HL7 FHIR Release 4 Point-of-Care API</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2 text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Audit Pipeline: Active Verification</span>
        </div>
      </div>

    </div>
  );
}
