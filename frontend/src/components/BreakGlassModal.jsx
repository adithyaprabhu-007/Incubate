import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, X, Lock, Check } from 'lucide-react';

export default function BreakGlassModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('unconscious');
  const [attestation, setAttestation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    if (!attestation) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onConfirm({ reason });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-rose-300 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  STATUTORY EMERGENCY OVERRIDE
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Break-Glass Attending Protocol
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-900 leading-relaxed">
          <p className="font-bold mb-1">
            STATUTORY WARNING — 45 CFR § 164.512(j) &amp; State Emergency Law
          </p>
          Emergency override bypasses patient 1-tap consent ONLY under certified imminent threat to life or patient incapacity. An immutable tamper-evident record is logged to statutory state oversight ledgers.
        </div>

        {/* Clinical Justification Selector */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-700 block">
            Select Immediate Clinical Justification:
          </label>
          <select 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="unconscious">Patient Unconscious / GCS &lt; 8 (Acute Resuscitation)</option>
            <option value="incapacitated">Severe Trauma Shock &amp; Severe Hypoxia</option>
            <option value="cardiac">Active Cardiac Arrest / Defibrillation Protocol</option>
            <option value="anaphylaxis">Acute Airway Compromise &amp; Anaphylaxis</option>
          </select>
        </div>

        {/* Clinician Attestation Checkbox */}
        <div 
          onClick={() => setAttestation(!attestation)}
          className={`border rounded-xl p-3.5 flex items-start space-x-3 cursor-pointer select-none transition-all ${
            attestation ? 'bg-rose-50/60 border-rose-300' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="mt-0.5">
            {attestation ? (
              <div className="w-5 h-5 rounded bg-rose-600 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white"></div>
            )}
          </div>
          <div className="text-xs text-slate-700 leading-snug">
            I, <strong>Dr. Alex Sharma, MD (NPI: 1942083921)</strong>, affirm under penalty of statutory law that patient consent cannot be obtained prior to emergency intervention.
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAuthorize}
            disabled={!attestation || submitting}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4" />
            <span>{submitting ? 'Executing Break-Glass Override...' : 'Authorize Statutory Break-Glass'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
