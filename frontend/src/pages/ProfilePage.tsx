import React from 'react';
import { ShieldCheck, Award, MapPin, Mail, Building, Key, AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto font-sans">
      {/* Demo Warning Banner */}
      <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg flex items-center justify-between text-xs text-amber-900 font-sans">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="font-semibold">
            DEMO ENVIRONMENT NOTICE: This profile represents a fictional operational officer persona for hackathon demonstration.
          </span>
        </div>
        <span className="font-sans text-[10px] uppercase font-bold bg-amber-200 px-2 py-0.5 rounded border border-amber-400">
          DEMO PERSONA
        </span>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs font-sans">
        <div className="h-28 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-6 flex items-end justify-between font-sans">
          <span className="text-xs font-sans font-bold text-amber-400 uppercase tracking-widest">
            MINISTRY OF EARTH SCIENCES / INDIA METEOROLOGICAL DEPARTMENT
          </span>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded text-xs font-sans font-bold">
            STATUS: ACTIVE DEMO OFFICER
          </span>
        </div>

        <div className="p-6 pt-0 relative font-sans">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-10 mb-4 gap-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-white flex items-center justify-center text-amber-900 text-2xl font-black shadow-md font-sans">
                RS
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 font-sans">Dr. Rajesh Sharma</h1>
                <p className="text-xs text-slate-500 font-sans">ID: <span className="font-mono font-bold">MoES-NDMA-89204</span> | Level-5 Operational Clearance</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-bold font-sans flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Chief Operational Meteorologist
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs text-slate-700 font-sans">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-900">Department:</span>
                <span>Weather Intelligence & Disaster Early Warning Division</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-900">Station:</span>
                <span>National Command Center HQ #402, New Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-900">Email:</span>
                <span className="text-slate-600 font-medium">r.sharma.demo@imd.gov.in</span>
              </div>
            </div>

            <div className="space-y-2.5 font-sans">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-900">Access Scope:</span>
                <span>Pan-India Emergency Verification & Event Fusion Authority</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-900">Platform Role:</span>
                <span>National Triage Approver & AI Model Supervisor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
