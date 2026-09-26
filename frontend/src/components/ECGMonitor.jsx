import React, { useState, useEffect } from 'react';
import { Activity, Heart, Zap, ShieldCheck } from 'lucide-react';

export default function ECGMonitor({ isEmergency = true }) {
  const [bpm, setBpm] = useState(104);
  const [spo2, setSpo2] = useState(97);
  const [bp, setBp] = useState("124/82");
  const [resp, setResp] = useState(19);

  // Subtle realistic fluctuation for hackathon realism
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next >= 98 && next <= 112 ? next : prev;
      });
      if (Math.random() > 0.7) {
        setSpo2(prev => (prev === 97 ? 98 : 97));
      }
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-700/60 overflow-hidden relative">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase font-mono-numbers">
            FIELD TELEMETRY // EMT-MONITOR-04
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full text-xs text-emerald-400 border border-emerald-500/20 font-mono-numbers">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AES-256 ENCRYPTED FEED</span>
        </div>
      </div>

      {/* Primary Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
        {/* Heart Rate */}
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
          <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              HEART RATE
            </span>
            <span className="text-[10px] text-slate-400">BPM</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-numbers tracking-tight flex items-baseline gap-1">
            {bpm}
            <span className="text-xs font-normal text-rose-300">Tachy</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Normal sinus rhythm</div>
        </div>

        {/* SpO2 */}
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              OXYGEN (SpO2)
            </span>
            <span className="text-[10px] text-slate-400">%</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-numbers tracking-tight">
            {spo2}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Stable oxygenation</div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
            <span>NIBP BLOOD PRESS</span>
            <span className="text-[10px] text-slate-400">mmHg</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-numbers tracking-tight">
            {bp}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">MAP: 96 mmHg</div>
        </div>

        {/* Respiration */}
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-1">
            <span>RESPIRATORY RATE</span>
            <span className="text-[10px] text-slate-400">/min</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-numbers tracking-tight">
            {resp}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Mild tachypnea</div>
        </div>
      </div>

      {/* Simulated ECG Sweep Waveform */}
      <div className="relative h-20 bg-black/60 rounded-xl border border-slate-800 overflow-hidden flex items-center">
        {/* ECG Grid Lines */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* ECG Continuous SVG Path with realistic PQRST wave */}
        <svg className="w-full h-16 absolute left-0" viewBox="0 0 900 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ecgGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="90%" stopColor="#4ade80" stopOpacity="1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="
              M 0 30 
              L 40 30 L 45 28 L 50 30 L 60 30 L 65 34 L 70 8 L 75 48 L 80 30 L 95 30 L 105 24 L 115 30 L 160 30
              L 200 30 L 205 28 L 210 30 L 220 30 L 225 34 L 230 8 L 235 48 L 240 30 L 255 30 L 265 24 L 275 30 L 320 30
              L 360 30 L 365 28 L 370 30 L 380 30 L 385 34 L 390 8 L 395 48 L 400 30 L 415 30 L 425 24 L 435 30 L 480 30
              L 520 30 L 525 28 L 530 30 L 540 30 L 545 34 L 550 8 L 555 48 L 560 30 L 575 30 L 585 24 L 595 30 L 640 30
              L 680 30 L 685 28 L 690 30 L 700 30 L 705 34 L 710 8 L 715 48 L 720 30 L 735 30 L 745 24 L 755 30 L 800 30
              L 840 30 L 845 28 L 850 30 L 860 30 L 865 34 L 870 8 L 875 48 L 880 30 L 895 30 L 900 30
            "
            fill="none"
            stroke="url(#ecgGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Animated Scanner Beam */}
        <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-emerald-400/20 to-emerald-400/50 animate-ecg-scan pointer-events-none" />

        <div className="absolute right-3 top-2 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono-numbers">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          LEAD II • CAL: 10mm/mV • 25mm/s
        </div>
      </div>
    </div>
  );
}
