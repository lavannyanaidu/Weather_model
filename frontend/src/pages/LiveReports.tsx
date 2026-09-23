import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { VerificationBadge } from '../components/Badges/StatusBadge';
import { Search, ExternalLink, Image as ImageIcon } from 'lucide-react';

export const LiveReports: React.FC = () => {
  const navigate = useNavigate();
  const { reports } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEventType, setFilterEventType] = useState<string>('ALL');
  const [filterSource, setFilterSource] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredReports = reports.filter((rep) => {
    const textContent = rep.text || rep.content || '';
    const eventType = rep.eventType || rep.event_type || '';
    const status = rep.verificationStatus || rep.verification_status || '';

    const matchesSearch =
      textContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rep.sourceHandle && rep.sourceHandle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEvent = filterEventType === 'ALL' || eventType === filterEventType;
    const matchesSource = filterSource === 'ALL' || rep.source === filterSource;
    const matchesStatus = filterStatus === 'ALL' || status === filterStatus;

    return matchesSearch && matchesEvent && matchesSource && matchesStatus;
  });

  return (
    <div className="space-y-4 max-w-[1800px] mx-auto font-sans p-4">
      {/* Header & Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-sans">
              INCOMING WEATHER OBSERVATIONS FEED
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Multi-source ingested weather observations stream with explainable heuristic trust metrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by city, keyword, observation ID..."
                className="bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 w-64 focus:outline-none focus:border-blue-500 focus:bg-white font-sans"
              />
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 font-sans">Event Type</label>
            <select
              value={filterEventType}
              onChange={(e) => setFilterEventType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
            >
              <option value="ALL">All Event Types</option>
              <option value="Flooding">Flooding</option>
              <option value="Heavy Rain">Heavy Rain</option>
              <option value="Heatwave">Heatwave</option>
              <option value="Thunderstorm">Thunderstorm</option>
              <option value="Dust Storm">Dust Storm</option>
              <option value="Strong Winds">Strong Winds</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Landslide">Landslide</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 font-sans">Source Channel</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
            >
              <option value="ALL">All Sources</option>
              <option value="Citizen Report">Citizen Report</option>
              <option value="Social Media">Social Media</option>
              <option value="IMD Data Feed">IMD Data Feed</option>
              <option value="Weather API">Weather API</option>
              <option value="State Disaster Authority">State Disaster Authority</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 font-sans">Verification Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
            >
              <option value="ALL">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Suspicious">Suspicious</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterEventType('ALL');
                setFilterSource('ALL');
                setFilterStatus('ALL');
              }}
              className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-md border border-slate-200 transition-colors font-medium font-sans"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 bg-slate-50 font-sans">
              <th className="py-2.5 px-3">Observation ID</th>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Source Channel</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Event Category</th>
              <th className="py-2.5 px-3">Observation Content</th>
              <th className="py-2.5 px-3">Media</th>
              <th className="py-2.5 px-3">Reliability</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs font-sans">
            {filteredReports.map((rep) => {
              const relScore = rep.reliabilityScore ?? rep.reliability_score ?? 80;
              const status = rep.verificationStatus || rep.verification_status || 'Verified';
              const eventType = rep.eventType || rep.event_type || 'Heavy Rain';

              return (
                <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-blue-700">{rep.id}</td>
                  <td className="py-3 px-3 font-sans text-slate-500 whitespace-nowrap">
                    {new Date(rep.timestamp || Date.now()).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-900 font-medium">{rep.source}</div>
                    {rep.sourceHandle && <div className="text-[10px] text-slate-500 font-mono">{rep.sourceHandle}</div>}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">
                    📍 {rep.city}, {rep.state}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {eventType}
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-xs truncate text-slate-700">{rep.text || rep.content}</td>
                  <td className="py-3 px-3">
                    {(rep.imageUrl || rep.media_url) ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 font-medium">
                        <ImageIcon className="w-3 h-3" /> Photo
                      </span>
                    ) : (
                      <span className="text-slate-400 font-sans text-[10px]">None</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${relScore >= 75 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {relScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <VerificationBadge status={status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/reports/${rep.id}`)}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors"
                      >
                        Inspect Evidence <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
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
