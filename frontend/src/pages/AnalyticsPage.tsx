import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { demoDataService } from '../services/demoDataService';
import { BarChart3, Filter } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

const eventTypeData = [
  { type: 'Flooding', count: 482000, color: '#0284c7' },
  { type: 'Heavy Rain', count: 320000, color: '#2563eb' },
  { type: 'Heatwave', count: 184000, color: '#d97706' },
  { type: 'Thunderstorm', count: 142000, color: '#7c3aed' },
  { type: 'Dust Storm', count: 96000, color: '#ea580c' },
  { type: 'Cyclone', count: 178000, color: '#dc2626' },
  { type: 'Landslide', count: 92000, color: '#854d0e' }
];

export const AnalyticsPage: React.FC = () => {
  const nationalData = demoDataService.getNationalAnalytics();
  const [selectedState, setSelectedState] = useState<string>('Telangana');

  const stateAnalytics = demoDataService.getStateAnalytics(selectedState);

  const stateList = [
    'Telangana', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'West Bengal',
    'Assam', 'Odisha', 'Andhra Pradesh', 'Gujarat', 'Kerala',
    'Bihar', 'Karnataka', 'Uttar Pradesh', 'Uttarakhand'
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-4">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-sans">
            <BarChart3 className="w-5 h-5 text-blue-600" /> PAN-INDIA WEATHER BIG DATA ANALYTICS
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Simulated National Analytics Suite for Ministry of Earth Sciences / IMD Weather Big Data Platform
          </p>
        </div>

        {/* State Selection Dropdown */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs font-sans">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-700">State Filter:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white border border-slate-300 rounded px-3 py-1 font-bold text-slate-900 focus:outline-none focus:border-blue-500 font-sans"
          >
            {stateList.map((st) => (
              <option key={st} value={st}>
                {st} State
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* State-Wise Operational Breakdown Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-xs font-sans">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">
            STATE OPERATIONS DOSSIER: {stateAnalytics.state.toUpperCase()}
          </span>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-sans">
            Top Threat: {stateAnalytics.topEventType}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-sans text-center">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Active Events</div>
            <div className="text-lg font-black text-red-700">{formatIndianNumber(stateAnalytics.activeEvents)}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Total Ingested</div>
            <div className="text-lg font-black text-slate-900">{formatIndianNumber(stateAnalytics.totalReports)}</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
            <div className="text-[10px] text-emerald-700 uppercase font-sans font-bold">Verified</div>
            <div className="text-lg font-black text-emerald-700">{formatIndianNumber(stateAnalytics.verifiedReports)}</div>
          </div>
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <div className="text-[10px] text-red-700 uppercase font-sans font-bold">Flagged</div>
            <div className="text-lg font-black text-red-700">{formatIndianNumber(stateAnalytics.suspiciousReports)}</div>
          </div>
          <div className="p-3 bg-amber-50 rounded border border-amber-200">
            <div className="text-[10px] text-amber-800 uppercase font-sans font-bold">Redundant</div>
            <div className="text-lg font-black text-amber-700">{formatIndianNumber(stateAnalytics.duplicateReports)}</div>
          </div>
          <div className="p-3 bg-purple-50 rounded border border-purple-200">
            <div className="text-[10px] text-purple-700 uppercase font-sans font-bold">Avg Confidence</div>
            <div className="text-lg font-black text-purple-700">{stateAnalytics.avgAiConfidence}%</div>
          </div>
        </div>
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-sans">
        {/* Chart 1: Hourly Ingestion Stream */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            1. NATIONAL HOURLY INGESTION THROUGHPUT
          </h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={nationalData.hourlyIngestionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => formatIndianNumber(v)} />
                <Tooltip
                  formatter={(val: any) => [formatIndianNumber(Number(val)), 'Ingested Observations']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '6px', fontSize: '11px', color: '#0f172a' }}
                />
                <Line type="monotone" dataKey="count" name="Ingested Observations" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Event Taxonomy Breakdown */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            2. NATIONAL EVENT TAXONOMY DISTRIBUTION
          </h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => formatIndianNumber(v)} />
                <YAxis dataKey="type" type="category" stroke="#64748b" fontSize={11} width={100} />
                <Tooltip
                  formatter={(val: any) => [formatIndianNumber(Number(val)), 'Observation Count']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '6px', fontSize: '11px', color: '#0f172a' }}
                />
                <Bar dataKey="count" name="Observation Count" radius={[0, 4, 4, 0]}>
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Verification & Redundancy Filtering Ratio */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            3. NATIONAL VERIFICATION & REDUNDANCY FILTERING RATIOS
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nationalData.verificationBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {nationalData.verificationBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatIndianNumber(Number(val)), 'Count']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '6px', fontSize: '11px', color: '#0f172a' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Source Distribution */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            4. INGESTION SOURCE CATEGORY SHARES (%)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nationalData.sourceDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="percentage"
                  nameKey="source"
                  label
                >
                  {nationalData.sourceDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563eb' : '#059669'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '6px', fontSize: '11px', color: '#0f172a' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
