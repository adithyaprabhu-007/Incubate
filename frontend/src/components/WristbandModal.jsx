import React from 'react';
import { X, Radio, ShieldCheck, Check } from 'lucide-react';
import { patientData } from '../data/mockData';

export default function WristbandModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-300 space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-hospital-600 animate-pulse" />
            <h3 className="font-bold text-slate-900 text-sm">NFC Medical Wristband Interop</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-hospital-50 border border-blue-200 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Passive NFC Tag NTAG216</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              READ READY
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <div>UID: 04:A2:89:1F:90:3B:80</div>
            <div>RECORD_TYPE: urn:nfc:ext:emergencydpi.health:triage</div>
            <div>PATIENT_ID: {patientData.medicalId}</div>
            <div>BLOOD_TYPE: {patientData.bloodGroup} POS</div>
            <div>PARAMEDIC_PIN: {patientData.emergencyDirectAccess.offlinePin}</div>
            <div>CHKSUM: 0x9AF82C</div>
          </div>
          <p className="text-[11px] text-slate-500">
            Allows EMT and paramedic field teams to tap their Android/iOS MDT terminals against the physical hospital wristband for instant offline telemetry sync.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hospital-600 text-white rounded-xl text-xs font-bold hover:bg-hospital-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
