import React, { useState } from 'react';
import { ShieldAlert, Radio, X, Bell, CheckCircle2, Siren } from 'lucide-react';
import { patientData } from '../data/mockData';

export default function EmergencyAlertModal({ isOpen, onClose }) {
  const [broadcasted, setBroadcasted] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);

  if (!isOpen) return null;

  const handleBroadcast = () => {
    setBroadcasting(true);
    setTimeout(() => {
      setBroadcasting(false);
      setBroadcasted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-rose-300 space-y-4">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 animate-bounce">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                STAT EMERGENCY BROADCAST
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Dispatch Tri-Channel Alert
              </h3>
            </div>
          </div>
          <button 
            onClick={() => { setBroadcasted(false); onClose(); }}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!broadcasted ? (
          <>
            <p className="text-xs text-slate-600 leading-relaxed">
              Initiating this alert sends immediate cryptographic priority tokens and current GPS/Vitals to:
            </p>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <span className="font-semibold text-slate-800">1. Regional 911 / EMS CAD Dispatch</span>
                <span className="text-[10px] font-bold text-hospital-600">CAD v4 Auto-Push</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <span className="font-semibold text-slate-800">2. Mercy General Trauma Center (Level 1)</span>
                <span className="text-[10px] font-bold text-emerald-600">ER Ready</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <span className="font-semibold text-slate-800">3. {patientData.emergencyContact.name} ({patientData.emergencyContact.relation})</span>
                <span className="text-[10px] font-bold text-slate-500">SMS + Push Alert</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleBroadcast}
                disabled={broadcasting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5"
              >
                <Radio className={`w-4 h-4 ${broadcasting ? 'animate-spin' : ''}`} />
                <span>{broadcasting ? 'Broadcasting Protocol...' : 'Broadcast Emergency STAT'}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4 py-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-900">Emergency Alert Broadcast Active</div>
              <p className="text-xs text-emerald-700">
                Dispatch channels acknowledged. Triage unit inbound with pre-briefed allergy and blood cross-match package.
              </p>
            </div>
            <button
              onClick={() => { setBroadcasted(false); onClose(); }}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Close Alert
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
