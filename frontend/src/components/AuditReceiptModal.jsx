import React from 'react';
import { FileText, Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { patientData } from '../data/mockData';

export default function AuditReceiptModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-300 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-hospital-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Emergency Access Audit Receipt</h3>
              <p className="text-xs text-slate-500 font-mono">HIPAA § 164.512(j) Safe Harbor Record #DPI-RCP-88219</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-hospital-50 border border-blue-200 text-hospital-700 text-xs font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Print Friendly) */}
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4 text-xs">
          
          <div className="text-center pb-3 border-b border-slate-200">
            <div className="text-[10px] font-bold tracking-widest text-hospital-700 uppercase">
              OFFICIAL STATUTORY DISCLOSURE RECORD
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
              EmergencyDPI Point-of-Care Handshake Certificate
            </h2>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Ledger Anchor Nonce: 0x7F8C4A9D219C0012B19D • SHA-256 Verified
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">PATIENT SUBJECT</span>
              <div className="font-bold text-slate-900 text-sm">{patientData.name}</div>
              <div className="font-mono text-slate-500">{patientData.medicalId}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">REQUESTING FACILITY</span>
              <div className="font-bold text-slate-900 text-sm">City General Hospital — Trauma Unit 3</div>
              <div className="font-mono text-slate-500">Facility ID: #CGH-7749-EM • NPI: 1942083921</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">ATTENDING CLINICIAN</span>
              <div className="font-bold text-slate-800">Dr. Alex Sharma, MD</div>
              <div className="text-slate-500">Emergency Medicine • Active On-Duty</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">AUTHORIZATION TYPE</span>
              <div className="font-bold text-emerald-700">Patient 1-Tap Biometric Approval</div>
              <div className="text-slate-500">30-Minute Ephemeral Key Window</div>
            </div>
          </div>

          {/* Datasets Transferred */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
              DISCLOSED HEALTHCARE FIELDS
            </span>
            <ul className="space-y-1 list-disc list-inside text-slate-700 font-medium">
              <li>Blood Group &amp; Cross-Match Profile (ABO Typing B+, Rh Positive) — LOINC 883-9</li>
              <li>Critical Allergies (Penicillin Anaphylaxis, Sulfa, Latex) — SNOMED-CT 419199007</li>
              <li>Active Medication Administration Record (Lisinopril, Atorvastatin, Albuterol)</li>
            </ul>
          </div>

          {/* Shielded Data Notice */}
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-[11px] text-slate-500">
            <strong className="text-slate-700">Cryptographic Data Shielding Attestation:</strong> Psychotherapy, reproductive health, behavioral psychiatry, and financial accounts were blocked at API gateway per HIPAA § 164.512(j) minimum necessary rule.
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Signature Verified on DPI Federated Node</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hospital-600 hover:bg-hospital-700 text-white rounded-xl font-bold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
