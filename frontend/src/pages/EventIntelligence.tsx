import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SeverityBadge, VerificationBadge } from '../components/Badges/StatusBadge';
import { IndiaMap } from '../components/Map/IndiaMap';
import { ArrowLeft, ArrowDown, MapPin, Layers, FileText } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

export const EventIntelligence: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, reports } = useApp();

  const evt = events.find((e) => e.id === id) || events[0]; // fallback to first event if param missing
  const eventReports = reports.filter((r) => r.eventId === evt.id || r.event_id === evt.id || (evt.id === 'EVENT-HYD-001' && r.city === 'Hyderabad'));

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto font-sans p-4">
      {/* Back Button & Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md shadow-xs transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Weather Events
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Event ID:</span>
          <span className="text-sm font-mono font-bold text-blue-700">{evt.id}</span>
          <SeverityBadge severity={evt.severity} />
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase text-blue-700 font-bold tracking-widest font-sans">
              UNIFIED EVENT INTELLIGENCE DOSSIER
            </span>
            <h2 className="text-xl font-bold text-slate-900">{evt.title}</h2>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-1 font-sans">
              <span>📍 {evt.city}, {evt.state}</span>
              <span>•</span>
              <span>Radius: {evt.affectedRadiusKm || evt.affected_radius_km || 10} km</span>
              <span>•</span>
              <span>First Detected: {new Date(evt.firstDetected || evt.first_detected || Date.now()).toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 font-sans text-xs">
            <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-center">
              <span className="text-slate-500 text-[10px] block uppercase font-bold">CONFIDENCE</span>
              <span className="text-emerald-700 font-extrabold text-base">{evt.confidence}%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-center">
              <span className="text-slate-500 text-[10px] block uppercase font-bold">STATUS</span>
              <span className="text-red-700 font-extrabold text-base">{evt.status}</span>
            </div>
          </div>
        </div>

        {/* Breakdown KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-200 font-sans">
          <div className="bg-slate-50 p-2 rounded-md border border-slate-200">
            <span className="text-slate-500 text-[10px] block font-bold uppercase">TOTAL OBSERVATIONS</span>
            <span className="text-slate-900 font-bold text-sm">{formatIndianNumber(evt.totalReports || evt.total_reports || 0)}</span>
          </div>
          <div className="bg-emerald-50 p-2 rounded-md border border-emerald-200">
            <span className="text-emerald-700 text-[10px] block font-bold uppercase">VERIFIED TRUSTED</span>
            <span className="text-emerald-700 font-bold text-sm">{formatIndianNumber(evt.verifiedReports || evt.verified_reports || 0)}</span>
          </div>
          <div className="bg-amber-50 p-2 rounded-md border border-amber-200">
            <span className="text-amber-700 text-[10px] block font-bold uppercase">REDUNDANT RECORDS FILTERED</span>
            <span className="text-amber-700 font-bold text-sm">{formatIndianNumber(evt.duplicateReports || evt.duplicate_reports || 0)}</span>
          </div>
          <div className="bg-red-50 p-2 rounded-md border border-red-200">
            <span className="text-red-700 text-[10px] block font-bold uppercase">FLAGGED OBSERVATIONS</span>
            <span className="text-red-700 font-bold text-sm">{formatIndianNumber(evt.suspiciousReports || evt.suspicious_reports || 0)}</span>
          </div>
        </div>
      </div>

      {/* Visual EVENT FUSION Pipeline Diagram */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs font-sans">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" /> VISUAL EVENT FUSION PIPELINE (WeatherFusion Engine Graph)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-center text-xs">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-slate-500 text-[10px] block font-bold uppercase">STEP 1</span>
            <span className="text-slate-900 font-bold block my-1">{formatIndianNumber(eventReports.length)} Multi-Source Pkts</span>
            <span className="text-[10px] text-slate-500">Raw Stream Packet</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-blue-600 font-bold">
            <ArrowDown className="w-4 h-4 -rotate-90" />
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-slate-500 text-[10px] block font-bold uppercase">STEP 2</span>
            <span className="text-blue-700 font-bold block my-1">Geo Matching</span>
            <span className="text-[10px] text-slate-500">{evt.city} radius</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-blue-600 font-bold">
            <ArrowDown className="w-4 h-4 -rotate-90" />
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
            <span className="text-slate-500 text-[10px] block font-bold uppercase">STEP 3</span>
            <span className="text-amber-700 font-bold block my-1">Redundancy Filtering</span>
            <span className="text-[10px] text-slate-500">Spatial cluster match</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-blue-600 font-bold">
            <ArrowDown className="w-4 h-4 -rotate-90" />
          </div>

          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-md">
            <span className="text-emerald-700 text-[10px] block font-bold uppercase">RESULT</span>
            <span className="text-emerald-800 font-bold block my-1">MASTER EVENT GRAPH</span>
            <span className="text-[10px] text-emerald-700">{evt.confidence}% AI Confidence</span>
          </div>
        </div>
      </div>

      {/* Grid: Supporting Reports Feed + Event Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 font-sans">
        {/* Supporting Reports */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" /> SUPPORTING INCOMING OBSERVATIONS ({formatIndianNumber(eventReports.length)})
          </h3>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {eventReports.map((rep) => {
              const relScore = rep.reliabilityScore ?? rep.reliability_score ?? 80;
              const status = rep.verificationStatus || rep.verification_status || 'Verified';

              return (
                <div key={rep.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-700">{rep.id}</span>
                      <span className="text-slate-500">• {rep.source}</span>
                    </div>
                    <VerificationBadge status={status} />
                  </div>
                  <p className="text-slate-800 text-xs">{rep.text || rep.content}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-sans">
                    <span>📍 {rep.city} ({rep.latitude?.toFixed(4)}, {rep.longitude?.toFixed(4)})</span>
                    <span className="text-emerald-700 font-bold">Reliability: {relScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Preview */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-3 flex flex-col h-[450px] shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2 font-sans">
            <MapPin className="w-4 h-4 text-blue-600" /> EVENT CLUSTER GEOGRAPHIC MAP
          </h3>
          <div className="flex-1 w-full">
            <IndiaMap events={[evt]} height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};
