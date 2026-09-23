import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BellRing, AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, escalateAlert } = useApp();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredAlerts = alerts.filter((a) => {
    if (filterType === 'ALL') return true;
    return a.type.toUpperCase() === filterType;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Operational Alert Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Real-time critical operational alerts, weather threshold triggers, and AI redundancy anomalies
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          {['ALL', 'CRITICAL', 'WARNING', 'SYSTEM', 'AI'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filterType === t
                  ? 'bg-amber-600 text-white shadow-2xs font-sans font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid / List */}
      <div className="space-y-3 font-sans">
        {filteredAlerts.map((a) => {
          const isCritical = a.type === 'Critical';
          const isWarning = a.type === 'Warning';

          return (
            <div
              key={a.id}
              className={`p-4 rounded-lg border transition-all font-sans ${
                isCritical
                  ? 'bg-red-50/60 border-red-200 text-slate-900'
                  : isWarning
                  ? 'bg-amber-50/60 border-amber-200 text-slate-900'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg border mt-0.5 ${
                      isCritical
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : 'bg-amber-100 border-amber-300 text-amber-800'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap font-sans">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider font-sans px-2 py-0.5 rounded border ${
                          isCritical
                            ? 'bg-red-600 text-white border-red-700'
                            : 'bg-amber-500 text-white border-amber-600'
                        }`}
                      >
                        {a.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">{a.id}</span>
                      {a.location && (
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-sans">
                          {a.location}
                        </span>
                      )}
                      <span className="text-[11px] font-sans text-slate-500">
                        {new Date(a.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mt-1 font-sans">{a.title}</h3>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed font-sans">{a.message}</p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center font-sans">
                  {a.reportId && (
                    <button
                      onClick={() => navigate(`/reports/${a.reportId}`)}
                      className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 flex items-center gap-1 font-sans"
                    >
                      Open Observation <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                  {a.eventId && (
                    <button
                      onClick={() => navigate(`/events/${a.eventId}`)}
                      className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 flex items-center gap-1 font-sans"
                    >
                      Open Event <ChevronRight className="w-3 h-3" />
                    </button>
                  )}

                  {a.status === 'Active' ? (
                    <>
                      <button
                        onClick={() => acknowledgeAlert(a.id)}
                        className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-2xs font-sans"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledge
                      </button>
                      <button
                        onClick={() => escalateAlert(a.id)}
                        className="px-3 py-1 text-xs font-bold bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1 shadow-2xs font-sans"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" /> Escalate
                      </button>
                    </>
                  ) : (
                    <span className="px-2.5 py-1 rounded text-xs font-bold font-sans bg-slate-200 text-slate-700 border border-slate-300">
                      Status: {a.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
