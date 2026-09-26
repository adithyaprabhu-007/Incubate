import React from 'react';
import { Shield, Activity, RotateCcw, AlertTriangle, CheckCircle2, User, Building2 } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  isEmergencyActive,
  onResetDemo,
  isSessionActive,
  isRevoked
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066cc] flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight">Emergency<span className="text-[#0066cc]">DPI</span></span>
                <span className="text-[10px] font-semibold bg-blue-100 text-[#0066cc] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Health Rail
                </span>
              </div>
              <p className="text-[11px] text-slate-500 -mt-0.5">Zero-Trust Ephemeral Emergency Access Protocol</p>
            </div>
          </div>

          {/* Center Hospital & Network Status */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f6ff] border border-blue-100 text-xs text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium text-slate-600">DPI Gateway:</span>
              <span className="font-semibold text-[#0066cc]">ONLINE</span>
              <span className="text-[10px] text-slate-400 border-l border-blue-200 pl-2">12ms</span>
            </div>

            {isEmergencyActive ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-600 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>EMERGENCY DISPATCH PROTOCOL</span>
              </div>
            ) : isSessionActive && !isRevoked ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ACTIVE CLINICAL SESSION</span>
              </div>
            ) : isRevoked ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>ACCESS TERMINATED BY PATIENT</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span>Standby / Protected Vault</span>
              </div>
            )}
          </div>

          {/* Right Action: Patient Profile & Reset */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center text-xs font-bold">
                AS
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-slate-800 block leading-tight">Alex Sharma</span>
                <span className="text-[10px] text-rose-600 font-semibold">O- Neg (Universal)</span>
              </div>
            </div>

            <button
              onClick={onResetDemo}
              title="Reset Hackathon Demo to Initial State"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0066cc] bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-2 rounded-xl transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
