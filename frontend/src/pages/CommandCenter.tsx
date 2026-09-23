import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/Cards/KpiCard';
import { PipelineVisualizer } from '../components/PipelineVisualizer';
import { IndiaMap } from '../components/Map/IndiaMap';
import { SeverityBadge, VerificationBadge } from '../components/Badges/StatusBadge';
import type { WeatherEvent } from '../types';
import {
  Zap,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CopyX,
  RefreshCw,
  ExternalLink,
  MapPin,
  Radio,
  Sparkles
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const navigate = useNavigate();
  const { kpis, events, reports, simulateLiveReport, isSimulating } = useApp();

  const activeEvents = events.filter((e) => e.status === 'Active');

  const handleSelectEvent = (evt: WeatherEvent) => {
    navigate(`/events/${evt.id}`);
  };

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto font-sans p-4 animate-fade-in-up">
      {/* Simulation New Event Detection Notification Banner */}
      {isSimulating && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 px-4 flex items-center justify-between shadow-2xs font-sans animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 font-sans">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>AI EVENT CLUSTERING: Correlating multi-source weather observations across Indian sub-regions...</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
            SIMULATION IN PROGRESS
          </span>
        </div>
      )}

      {/* KPI Header Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="animate-fade-in-up animate-stagger-1">
          <KpiCard
            title="ACTIVE WEATHER EVENTS"
            value={kpis.activeEvents || 18}
            label="Monitored nationwide"
            trend="+2 detected this hour"
            icon={Zap}
            accentColor="red"
          />
        </div>
        <div className="animate-fade-in-up animate-stagger-2">
          <KpiCard
            title="OBSERVATIONS PROCESSED"
            value={kpis.reportsProcessed || 2413920}
            label="Multi-source intelligence"
            trend="+18/min"
            icon={FileText}
            accentColor="cyan"
          />
        </div>
        <div className="animate-fade-in-up animate-stagger-3">
          <KpiCard
            title="VERIFIED OBSERVATIONS"
            value={kpis.verifiedReports || 2145087}
            label="Trusted & geo-matched"
            trend="86.3% corroborated"
            icon={ShieldCheck}
            accentColor="emerald"
          />
        </div>
        <div className="animate-fade-in-up animate-stagger-4">
          <KpiCard
            title="FLAGGED OBSERVATIONS"
            value={kpis.suspiciousReports || 68013}
            label="AI triage queue"
            trend="2.8% requiring review"
            icon={AlertTriangle}
            accentColor="amber"
          />
        </div>
        <div className="animate-fade-in-up animate-stagger-5">
          <KpiCard
            title="REDUNDANT RECORDS REMOVED"
            value={kpis.duplicatesRemoved || 318015}
            label="Repeated observations filtered"
            trend="10.7% filtered"
            icon={CopyX}
            accentColor="purple"
          />
        </div>
      </div>

      {/* Real-time Processing Pipeline Visualizer */}
      <PipelineVisualizer />

      {/* Main Grid: Map + Active Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[540px]">
        {/* Map Area */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col h-full shadow-2xs card-hover-subtle">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 font-sans">
              <MapPin className="w-4 h-4 text-blue-600" /> NATIONAL WEATHER EVENT MAP (INDIA)
            </h3>
            <span className="text-[11px] font-sans font-semibold text-slate-500">
              Active Events: <span className="text-slate-900 font-bold font-mono">{events.length}</span>
            </span>
          </div>
          <div className="flex-1 w-full min-h-0">
            <IndiaMap events={events} onSelectEvent={handleSelectEvent} height="100%" />
          </div>
        </div>

        {/* Active Weather Events Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col h-full overflow-hidden shadow-2xs card-hover-subtle">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 font-sans">
              <Zap className="w-4 h-4 text-amber-500" /> ACTIVE WEATHER EVENTS
            </h3>
            <span className="text-[11px] text-slate-500 font-sans font-medium">Sorted by severity</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {activeEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-sans">
                <p className="text-xs font-semibold text-slate-700">No active weather events</p>
                <p className="text-[11px] mt-1 text-slate-400">Monitoring national observation stream for emerging events.</p>
              </div>
            ) : (
              activeEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => handleSelectEvent(evt)}
                  className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-all duration-150 cursor-pointer group shadow-2xs card-hover-subtle font-sans"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700">{evt.id}</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {evt.title}
                      </h4>
                    </div>
                    <SeverityBadge severity={evt.severity} />
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mb-2 font-medium">
                    <span>📍 {evt.city}, {evt.state}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2 rounded-md border border-slate-200 font-sans">
                    <div>
                      <span className="text-slate-500">Confidence:</span>{' '}
                      <span className="text-emerald-700 font-bold">{evt.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Observations:</span>{' '}
                      <span className="text-slate-900 font-bold">{evt.totalReports || evt.total_reports || 0}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500">Updated:</span>{' '}
                      <span className="text-slate-600">
                        {new Date(evt.lastUpdated || evt.last_updated || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Incoming Weather Observations Stream */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs font-sans card-hover-subtle">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 subtle-pulse-dot" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
              INCOMING WEATHER OBSERVATIONS (Multi-Source Stream)
            </h3>
          </div>
          <button
            onClick={simulateLiveReport}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-slate-900 hover:bg-slate-800 text-white transition-all duration-150 shadow-2xs font-sans"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>SIMULATE LIVE OBSERVATION</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-sans uppercase font-bold text-slate-500 bg-slate-50">
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Source Channel</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Event Type</th>
                <th className="py-2.5 px-3">Verification</th>
                <th className="py-2.5 px-3">Reliability</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {reports.slice(0, 7).map((rep) => {
                const relScore = rep.reliabilityScore ?? rep.reliability_score ?? 80;
                const status = rep.verificationStatus || rep.verification_status || 'Verified';
                const eventType = rep.eventType || rep.event_type || 'Heavy Rain';

                return (
                  <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-sans text-slate-500 font-medium">
                      {new Date(rep.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">
                      {rep.source}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      {rep.city}, {rep.state}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {eventType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <VerificationBadge status={status} />
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              relScore >= 75 ? 'bg-emerald-600' :
                              relScore >= 50 ? 'bg-amber-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${relScore}%` }}
                          />
                        </div>
                        <span className={`font-bold text-[11px] ${
                          relScore >= 75 ? 'text-emerald-700' :
                          relScore >= 50 ? 'text-amber-700' : 'text-red-700'
                        }`}>
                          {relScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => navigate(`/reports/${rep.id}`)}
                        className="text-[11px] font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 justify-end ml-auto font-sans"
                      >
                        <span>VIEW EVIDENCE</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

