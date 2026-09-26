import React from 'react';
import { X, Droplet, Heart, Phone, Shield, QrCode, Download, Printer } from 'lucide-react';
import { patientData } from '../data/mockData';

export default function DigitalCardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-300 space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-hospital-600" />
            <h3 className="font-bold text-slate-900 text-sm">Emergency Digital Identity Card</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Digital Wallet Card Design */}
        <div className="bg-gradient-to-br from-hospital-700 via-hospital-800 to-slate-900 text-white rounded-2xl p-5 shadow-xl relative overflow-hidden space-y-4">
          
          {/* Card Top */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight">EmergencyDPI</div>
                <div className="text-[9px] text-blue-200 uppercase tracking-widest font-semibold">Point-of-Care Pass</div>
              </div>
            </div>

            <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded border border-white/20">
              {patientData.medicalId}
            </span>
          </div>

          {/* Patient Name & Blood Group */}
          <div className="flex items-end justify-between pt-2">
            <div>
              <div className="text-[10px] text-blue-200 uppercase font-semibold">PATIENT NAME</div>
              <div className="text-lg font-black tracking-tight">{patientData.name}</div>
              <div className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>Organ Donor: YES</span>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-center">
              <div className="text-[9px] text-blue-200 uppercase font-bold">BLOOD GROUP</div>
              <div className="text-xl font-black text-white">{patientData.bloodGroup}</div>
            </div>
          </div>

          {/* Critical Allergy Warning */}
          <div className="bg-rose-500/20 border border-rose-400/40 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <span className="text-rose-200 font-bold uppercase text-[10px]">ALLERGY ALERT:</span>
            <span className="font-bold text-rose-100">PENICILLIN (ANAPHYLAXIS)</span>
          </div>

          {/* Emergency Contact */}
          <div className="text-xs text-blue-100 flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <span className="text-[9px] text-blue-300 block uppercase">ICE CONTACT</span>
              <span className="font-bold text-white">{patientData.emergencyContact.name} ({patientData.emergencyContact.relation})</span>
            </div>
            <div className="font-mono text-xs">{patientData.emergencyContact.phone}</div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-2 pt-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Card</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-hospital-600 hover:bg-hospital-700 text-white text-xs font-bold rounded-xl"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
