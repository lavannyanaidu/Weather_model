import React from 'react';
import { X, ShieldCheck, User, MapPin, Activity, FileSpreadsheet, Clock } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 animate-fade-in">
      <div
        className="bg-white border border-stone-200 rounded-xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all animate-slide-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-amber-800 via-stone-800 to-stone-900 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-400/80 flex items-center justify-center text-amber-900 font-bold text-xl shadow-md">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Dr. Rajesh Sharma</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 border border-amber-300/40 text-amber-200">
                  Level-5 Officer
                </span>
              </div>
              <p className="text-xs text-amber-200/90">Senior Weather Operations Commander</p>
              <div className="text-[11px] text-stone-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-amber-300" /> MoES HQ, New Delhi Desk #402
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Content */}
        <div className="p-5 space-y-4 text-xs font-sans text-stone-800 bg-stone-50/50">
          {/* Status & Clearance Badges */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-stone-500 block mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> CLEARANCE LEVEL
              </span>
              <span className="text-xs font-bold text-stone-900">National Emergency Response</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-stone-500 block mb-1 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-600 animate-pulse" /> DUTY SESSION
              </span>
              <span className="text-xs font-bold text-emerald-700 font-mono">Active (06h 42m)</span>
            </div>
          </div>

          {/* Officer Metadata Table */}
          <div className="bg-white rounded-lg border border-stone-200 p-3.5 space-y-2 shadow-2xs">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-700 border-b border-stone-100 pb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-700" /> OFFICER PROFILE SPECS
            </h4>
            <div className="space-y-1.5 text-stone-600 font-sans">
              <div className="flex justify-between">
                <span className="text-stone-500">Official Badge ID:</span>
                <span className="font-mono font-bold text-stone-900">MOES-ND-402</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Division:</span>
                <span className="font-semibold text-stone-800">Severe Weather Analytics & GIS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Assigned Sector:</span>
                <span className="font-semibold text-stone-800">Peninsular & Inland India (Sector-4)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Telemetry Channel:</span>
                <span className="font-mono text-emerald-700 font-semibold">WebSocket Secure Port 8000</span>
              </div>
            </div>
          </div>

          {/* Recent Officer Activity Log */}
          <div className="bg-white rounded-lg border border-stone-200 p-3.5 space-y-2 shadow-2xs">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-700 border-b border-stone-100 pb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" /> RECENT DUTY LOG ACTIONS
            </h4>
            <ul className="space-y-1.5 text-[11px] text-stone-600 font-mono">
              <li className="flex items-center gap-1.5 text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Verified Kukatpally Cloudburst (REP-HYD-001)
              </li>
              <li className="flex items-center gap-1.5 text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Auto-merged 3 duplicate feeds into EVENT HYD-001
              </li>
              <li className="flex items-center gap-1.5 text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Initiated National GIS Map Severity Filter
              </li>
            </ul>
          </div>

          {/* Quick Actions Footer */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => alert('Duty Log Exported successfully!')}
              className="flex-1 py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Export Duty Log
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
