import React from 'react';
import { Shield, ShieldCheck, Lock, Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-hospital-600 text-white flex items-center justify-center">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-800">EmergencyDPI</span>
            <span className="text-slate-400">© 2024 EmergencyDPI Digital Health System. All rights reserved.</span>
          </div>

          {/* Compliance Badges */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              HIPAA COMPLIANT
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
              <Radio className="w-3 h-3 text-hospital-600" />
              HL7 FHIR V4.0.1
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
              <Lock className="w-3 h-3 text-slate-500" />
              256-BIT TLS
            </span>
          </div>
        </div>

        {/* Secondary Sub-row matching screenshots */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-hospital-600" />
            <span>HIPAA &amp; HL7 FHIR Compliant Point-of-Care Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Security Protocol 4.19</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Emergency Dispatch Sync: Online
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
