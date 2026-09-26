import React from 'react';
import { Shield, Activity, User, Bell, ChevronRight, Lock, CheckCircle, Zap } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, sessionActive, countdownTime }) {
  const tabs = [
    { id: 'dashboard', label: 'Patient Dashboard', icon: 'dashboard' },
    { id: 'hospital', label: 'Emergency Access', badge: 'ER PORTAL' },
    { id: 'consent', label: 'Consent Manager', badge: 'PENDING' },
    { id: 'active', label: 'Activity Audit', badge: sessionActive ? 'LIVE' : null }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Hackathon Demo Quick Switcher Banner */}
      <div className="bg-gradient-to-r from-hospital-900 via-hospital-800 to-hospital-900 text-white text-xs py-1.5 px-4 flex flex-wrap items-center justify-between border-b border-hospital-700">
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            HACKATHON DEMO MODE
          </span>
          <span className="text-slate-300 hidden md:inline">Click any workflow step to jump directly or follow the interactive buttons:</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 my-0.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeTab === 'dashboard' ? 'bg-hospital-600 text-white font-semibold shadow' : 'text-slate-300 hover:text-white hover:bg-hospital-700/60'
            }`}
          >
            <span>1. Patient Dossier</span>
          </button>
          <span className="text-slate-500 text-[10px]">→</span>
          <button
            onClick={() => setActiveTab('hospital')}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeTab === 'hospital' ? 'bg-hospital-600 text-white font-semibold shadow' : 'text-slate-300 hover:text-white hover:bg-hospital-700/60'
            }`}
          >
            <span>2. Hospital Request</span>
          </button>
          <span className="text-slate-500 text-[10px]">→</span>
          <button
            onClick={() => setActiveTab('consent')}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeTab === 'consent' ? 'bg-hospital-600 text-white font-semibold shadow' : 'text-slate-300 hover:text-white hover:bg-hospital-700/60'
            }`}
          >
            <span>3. Patient Consent</span>
          </button>
          <span className="text-slate-500 text-[10px]">→</span>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-2.5 py-0.5 rounded text-xs transition-colors flex items-center gap-1 ${
              activeTab === 'active' ? 'bg-emerald-600 text-white font-semibold shadow' : 'text-slate-300 hover:text-white hover:bg-hospital-700/60'
            }`}
          >
            <span>4. Active Access & Audit</span>
            {sessionActive && <span className="bg-emerald-400 text-emerald-950 text-[10px] font-bold px-1 rounded">{countdownTime}</span>}
          </button>
        </div>
      </div>

      {/* Main Clinical Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-hospital-600 flex items-center justify-center text-white shadow-md shadow-hospital-600/20 group-hover:bg-hospital-700 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1">
                  Emergency<span className="text-hospital-600">DPI</span>
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase -mt-1">
                  Clinical Health Network
                </span>
              </div>
            </div>

            {/* Nav Tabs */}
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-hospital-50 text-hospital-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Patient Dashboard
              </button>

              <button
                onClick={() => setActiveTab('hospital')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  activeTab === 'hospital'
                    ? 'bg-hospital-50 text-hospital-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Emergency Access
              </button>

              <button
                onClick={() => setActiveTab('consent')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  activeTab === 'consent'
                    ? 'bg-hospital-50 text-hospital-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Consent Manager
                <span className="ml-1.5 px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-semibold rounded-full">
                  1 Inbound
                </span>
              </button>

              <button
                onClick={() => setActiveTab('active')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  activeTab === 'active'
                    ? 'bg-hospital-50 text-hospital-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Activity Audit
                {sessionActive && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-full flex-inline items-center gap-1">
                    ● Live
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Right Header Status / User Info */}
          <div className="flex items-center space-x-3">
            {/* STAT Access Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>TIER 1 STAT ACCESS</span>
            </div>

            {/* Clinician Profile */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 leading-tight">Alex Sharma</div>
                <div className="text-[11px] font-medium text-emerald-600 flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>ACTIVE PROVIDER</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-hospital-700 text-white flex items-center justify-center font-semibold text-sm shadow-sm ring-2 ring-hospital-100">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
