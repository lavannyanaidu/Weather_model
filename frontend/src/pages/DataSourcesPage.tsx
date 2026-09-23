import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, ShieldCheck, Activity } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

export const DataSourcesPage: React.FC = () => {
  const { sources, sourceReliability } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs font-sans">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-sans">
            <Database className="w-5 h-5 text-blue-600" /> MULTI-SOURCE INGESTION CHANNELS & RELIABILITY
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Real-time status monitoring for social media streams, citizen mobile app feeds, radar sensors, and public APIs.
          </p>
        </div>
        <div className="text-xs font-sans font-semibold bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700">
          Active Ingestion Connectors: <span className="text-slate-900 font-bold">{sources.length} Channels</span>
        </div>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="space-y-3 font-sans">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" /> Ingestion Channels Operational Telemetry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          {sources.map((src) => (
            <div key={src.id} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs font-sans">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-700 font-bold">{src.id}</span>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight font-sans">{src.name}</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
                    src.status === 'Healthy'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${src.status === 'Healthy' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                  {src.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-sans bg-slate-50 p-2.5 rounded-md border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase">TYPE</span>
                  <span className="text-slate-900 font-bold">{src.type || src.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase">RECORDS TODAY</span>
                  <span className="text-emerald-700 font-bold">{formatIndianNumber(src.recordsToday || src.records_received || 120000)}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase">THROUGHPUT</span>
                  <span className="text-slate-700 font-bold">{formatIndianNumber(src.recordsPerMin || 350)}/min</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block font-semibold uppercase">ERROR RATE</span>
                  <span className={`font-bold ${(src.errorRatePct || src.error_rate_pct || 0) > 2 ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {src.errorRatePct || src.error_rate_pct || 0}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated Source Reliability Analysis Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 font-sans">
        <div className="flex items-center justify-between font-sans">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Source Reliability Analytics & Factor Breakdowns
          </h2>
          <span className="text-xs text-slate-500 font-sans">SIMULATED SOURCE PROFILING</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
          {sourceReliability.map((sr) => (
            <div key={sr.sourceHandle} className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-700 font-sans">{sr.sourceHandle}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5 font-sans">{sr.sourceName}</h3>
                  <span className="text-[10px] text-slate-400 font-sans">{sr.sourceType}</span>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Reliability Score</div>
                  <div className={`text-xl font-black font-sans ${sr.reliabilityScore >= 80 ? 'text-emerald-700' : 'text-red-700'}`}>
                    {sr.reliabilityScore}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs font-sans bg-slate-50 p-2.5 rounded border border-slate-200">
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">TOTAL</div>
                  <div className="font-bold text-slate-800">{formatIndianNumber(sr.totalReports)}</div>
                </div>
                <div>
                  <div className="text-[9px] text-emerald-600 uppercase font-sans font-bold">VERIFIED</div>
                  <div className="font-bold text-emerald-700">{formatIndianNumber(sr.verifiedCount)}</div>
                </div>
                <div>
                  <div className="text-[9px] text-red-600 uppercase font-sans font-bold">FLAGGED</div>
                  <div className="font-bold text-red-700">{formatIndianNumber(sr.suspiciousCount)}</div>
                </div>
                <div>
                  <div className="text-[9px] text-amber-600 uppercase font-sans font-bold">REDUNDANT</div>
                  <div className="font-bold text-amber-700">{formatIndianNumber(sr.duplicateCount)}</div>
                </div>
              </div>

              {/* Factors Progress Bars */}
              <div className="space-y-2 text-xs font-sans">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                  Reliability Evaluation Factors
                </div>

                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Historical Verification Rate</span>
                    <span className="font-bold text-slate-900">{sr.factors.historicalVerification}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${sr.factors.historicalVerification}%` }} />
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Location & Temporal Consistency</span>
                    <span className="font-bold text-slate-900">{sr.factors.locationConsistency}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${sr.factors.locationConsistency}%` }} />
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Cross-Source Agreement Factor</span>
                    <span className="font-bold text-slate-900">{sr.factors.crossSourceAgreement}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${sr.factors.crossSourceAgreement}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
