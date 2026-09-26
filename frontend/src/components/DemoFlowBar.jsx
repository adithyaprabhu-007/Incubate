import React from 'react';
import { Home, Siren, Building2, UserCheck, Clock, ArrowRight, ShieldAlert } from 'lucide-react';

export const DEMO_STEPS = [
  {
    id: 'dashboard',
    stepNumber: '1',
    title: 'Patient Home',
    subtitle: 'Health ID & Consents',
    icon: Home,
    tag: 'Patient'
  },
  {
    id: 'first-responder',
    stepNumber: '2',
    title: 'First Responder Mode',
    subtitle: 'Live Vitals & Allergies',
    icon: Siren,
    tag: 'EMT Field'
  },
  {
    id: 'hospital-request',
    stepNumber: '3',
    title: 'Hospital Request Portal',
    subtitle: 'Dr. Rahul Sharma @ City Gen',
    icon: Building2,
    tag: 'Doctor'
  },
  {
    id: 'patient-consent',
    stepNumber: '4',
    title: 'Consent & Approval',
    subtitle: 'Real-time Push Decision',
    icon: UserCheck,
    tag: 'Patient'
  },
  {
    id: 'active-session',
    stepNumber: '5',
    title: 'Active Timer & Audit',
    subtitle: 'Countdown & Kill-Switch',
    icon: Clock,
    tag: 'Live Monitor'
  }
];

export default function DemoFlowBar({ currentView, setCurrentView, hasPendingRequest, isSessionActive, isRevoked }) {
  return (
    <div className="bg-white border-b border-slate-200/80 sticky top-16 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
          {DEMO_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentView === step.id;
            
            // Contextual badges
            let badge = null;
            if (step.id === 'patient-consent' && hasPendingRequest) {
              badge = <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />;
            } else if (step.id === 'active-session' && isSessionActive && !isRevoked) {
              badge = <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />;
            } else if (step.id === 'active-session' && isRevoked) {
              badge = <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />;
            }

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentView(step.id)}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-left transition-all duration-200 shrink-0 group ${
                    isActive
                      ? 'bg-[#f0f6ff] border-2 border-[#0066cc] text-[#0066cc] shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-[#0066cc] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#0066cc]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold leading-tight">{step.title}</span>
                      {badge}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span className="font-mono text-slate-400">Step {step.stepNumber}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-600">{step.tag}</span>
                    </div>
                  </div>
                </button>

                {idx < DEMO_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden lg:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
