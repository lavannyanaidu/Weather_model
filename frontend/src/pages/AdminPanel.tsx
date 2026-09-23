import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertTriangle, CopyX, History, Layers, GitMerge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
  const { reports, verifyReport, markSuspicious, duplicateClusters, mergeDuplicateCluster, markClusterUnique } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'suspicious' | 'duplicates'>('suspicious');

  const suspiciousReports = reports.filter((r) => r.verificationStatus === 'Suspicious' || r.verification_status === 'Suspicious' || (r.reliabilityScore || r.reliability_score || 100) < 45);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-sans">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> OPERATIONAL TRIAGE & REDUNDANCY REVIEW WORKSPACE
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Manual observation moderation queues, flagged observation review, vector similarity clustering, and governance audit trail.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-200 font-semibold">
            Flagged Queue: <span className="font-bold font-mono">{suspiciousReports.length}</span>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
            Redundant Clusters: <span className="font-bold font-mono">{duplicateClusters.length}</span>
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-medium">
        <button
          onClick={() => setActiveTab('suspicious')}
          className={`px-4 py-2.5 rounded-t-md font-semibold flex items-center gap-2 transition-all font-sans ${
            activeTab === 'suspicious'
              ? 'bg-white text-red-700 border-t-2 border-x border-slate-200 border-t-red-600 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-red-600" /> FLAGGED OBSERVATIONS QUEUE ({suspiciousReports.length})
        </button>

        <button
          onClick={() => setActiveTab('duplicates')}
          className={`px-4 py-2.5 rounded-t-md font-semibold flex items-center gap-2 transition-all font-sans ${
            activeTab === 'duplicates'
              ? 'bg-white text-amber-700 border-t-2 border-x border-slate-200 border-t-amber-600 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CopyX className="w-4 h-4 text-amber-600" /> REDUNDANT RECORDS REVIEW ({duplicateClusters.length})
        </button>

        <button
          onClick={() => navigate('/audit')}
          className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-2 font-sans"
        >
          <History className="w-4 h-4 text-slate-500" /> View Audit History Log
        </button>
      </div>

      {/* Tab 1: Flagged Observations Queue */}
      {activeTab === 'suspicious' && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 overflow-x-auto space-y-3 shadow-xs font-sans">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500 bg-slate-50 font-sans">
                <th className="py-3 px-3">Observation ID</th>
                <th className="py-3 px-3">Source Channel</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Content Snippet</th>
                <th className="py-3 px-3">Reliability</th>
                <th className="py-3 px-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {suspiciousReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-red-700">{rep.id}</td>
                  <td className="py-3 px-3 font-medium text-slate-800">{rep.source}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{rep.city}, {rep.state}</td>
                  <td className="py-3 px-3 text-slate-700 max-w-sm truncate">{rep.text || rep.content}</td>
                  <td className="py-3 px-3 font-sans font-bold text-red-700">{rep.reliabilityScore || rep.reliability_score}%</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => verifyReport(rep.id)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 transition-colors shadow-2xs font-sans"
                      >
                        Override & Verify
                      </button>
                      <button
                        onClick={() => markSuspicious(rep.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors shadow-2xs font-sans"
                      >
                        Confirm Flagged
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Redundant Records Review */}
      {activeTab === 'duplicates' && (
        <div className="space-y-4 font-sans">
          <div className="text-xs text-slate-500 font-sans font-medium">
            Vector similarity redundancy filtering grouped repeated weather observations into candidate clusters. Review similarity metrics and take operational action.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {duplicateClusters.map((cluster) => (
              <div key={cluster.clusterId} className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold font-mono text-slate-900">{cluster.clusterId}</span>
                  </div>
                  <span className="text-xs font-sans font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    Redundancy Score: {cluster.overallDuplicateScore}%
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs font-sans bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Image Similarity</div>
                    <div className="font-bold text-amber-700">{cluster.imageSimilarityPct}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Text Similarity</div>
                    <div className="font-bold text-blue-700">{cluster.textSimilarityPct}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Distance</div>
                    <div className="font-bold text-slate-800">{cluster.locationDistanceKm} km</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-sans font-bold">Time Delta</div>
                    <div className="font-bold text-slate-800">{cluster.timeDiffMinutes} min</div>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-slate-700 font-sans">
                  <div>
                    Primary Observation: <span className="font-mono font-bold text-blue-700">{cluster.primaryReportId}</span>
                  </div>
                  <div>
                    Repeated Observations: <span className="font-mono text-slate-600">{cluster.duplicateReportIds.join(', ')}</span>
                  </div>
                  <div>
                    Cluster Status: <span className="font-sans font-bold text-slate-900">{cluster.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs font-sans">
                  <button
                    onClick={() => verifyReport(cluster.primaryReportId)}
                    className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold transition-colors"
                  >
                    Keep Original
                  </button>
                  <button
                    onClick={() => mergeDuplicateCluster(cluster.clusterId)}
                    className="py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold transition-colors shadow-2xs flex items-center justify-center gap-1"
                  >
                    <GitMerge className="w-3.5 h-3.5" /> Filter Redundant
                  </button>
                  <button
                    onClick={() => markClusterUnique(cluster.clusterId)}
                    className="py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition-colors shadow-2xs"
                  >
                    Mark Unique
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
