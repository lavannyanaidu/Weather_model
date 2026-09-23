import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SeverityBadge } from '../components/Badges/StatusBadge';
import { Zap, ExternalLink } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

export const WeatherEvents: React.FC = () => {
  const navigate = useNavigate();
  const { events } = useApp();

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto font-sans p-4">
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-sans">
            <Zap className="w-4 h-4 text-amber-500" /> UNIFIED WEATHER EVENTS INTELLIGENCE
          </h2>
          <p className="text-xs text-slate-500">
            Geographic event clusters fused from multi-source observation streams via spatiotemporal algorithms.
          </p>
        </div>
        <div className="text-xs font-sans font-semibold bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700">
          Total Fused Events: <span className="text-slate-900 font-bold">{formatIndianNumber(events.length)}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-3.5 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 bg-slate-50 font-sans">
              <th className="py-2.5 px-3">Event ID</th>
              <th className="py-2.5 px-3">Event Title</th>
              <th className="py-2.5 px-3">Event Type</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Severity</th>
              <th className="py-2.5 px-3">Confidence</th>
              <th className="py-2.5 px-3">Observations (Verified / Redundant / Flagged)</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Last Updated</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {events.map((evt) => {
              const eventType = evt.eventType || evt.event_type || 'Heavy Rain';
              const totalRep = evt.totalReports || evt.total_reports || 0;
              const verRep = evt.verifiedReports || evt.verified_reports || 0;
              const dupRep = evt.duplicateReports || evt.duplicate_reports || 0;
              const suspRep = evt.suspiciousReports || evt.suspicious_reports || 0;
              const lastUpd = evt.lastUpdated || evt.last_updated || Date.now();

              return (
                <tr key={evt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-blue-700">{evt.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{evt.title}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {eventType}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">
                    📍 {evt.city}, {evt.state}
                  </td>
                  <td className="py-3 px-3">
                    <SeverityBadge severity={evt.severity} />
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-emerald-700 font-bold">{evt.confidence}%</span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    <span className="font-bold text-slate-900">{formatIndianNumber(totalRep)}</span>{' '}
                    <span className="text-slate-400 text-[10px]">
                      ({formatIndianNumber(verRep)}V / {formatIndianNumber(dupRep)}R / {formatIndianNumber(suspRep)}F)
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      evt.status === 'Active' ? 'bg-red-50 text-red-700 border-red-200' :
                      evt.status === 'Monitoring' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                    {new Date(lastUpd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => navigate(`/events/${evt.id}`)}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-md text-[11px] font-semibold flex items-center gap-1 ml-auto transition-colors"
                    >
                      Event Intelligence <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
