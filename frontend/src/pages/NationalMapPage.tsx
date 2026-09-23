import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IndiaMap } from '../components/Map/IndiaMap';
import { SeverityBadge } from '../components/Badges/StatusBadge';
import type { WeatherEvent } from '../types';
import { X, Layers, Filter } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

export const NationalMapPage: React.FC = () => {
  const { events } = useApp();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedWeatherApi, setSelectedWeatherApi] = useState<string>('ALL');
  const [activeDrawerEvent, setActiveDrawerEvent] = useState<WeatherEvent | null>(null);

  const filteredEvents = events.filter((evt) => {
    const matchesSeverity = selectedSeverity === 'ALL' || evt.severity === selectedSeverity;
    const matchesWeatherApi = selectedWeatherApi === 'ALL' || evt.event_type === selectedWeatherApi;
    return matchesSeverity && matchesWeatherApi;
  });

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col space-y-3 relative overflow-hidden font-sans">
      {/* Top Filter & GIS Control Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 z-20 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-100 border border-amber-200 text-amber-900">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
              NATIONAL GIS WEATHER MAP (MoES FEEDS)
            </h2>
            <span className="text-[10px] text-stone-500 font-sans">
              Live Spatiotemporal Event Clusters & Thematic API Overlay
            </span>
          </div>
        </div>

        {/* Right Corner Controls: Weather Layer Dropdown & Severity Filter */}
        <div className="flex items-center gap-3 text-xs font-sans">
          {/* Weather API Category Dropdown */}
          <div className="flex items-center gap-1.5 bg-stone-50 p-1 rounded-lg border border-stone-200">
            <span className="text-stone-600 font-semibold px-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-800" /> Weather API Layer:
            </span>
            <select
              value={selectedWeatherApi}
              onChange={(e) => setSelectedWeatherApi(e.target.value)}
              className="bg-white border border-stone-200 rounded-md px-2.5 py-1 text-stone-900 font-medium focus:outline-none focus:border-amber-600 shadow-2xs cursor-pointer"
            >
              <option value="ALL">🌐 All Weather APIs & Feeds</option>
              <option value="Thunderstorm">🌩️ Thunderstorms API</option>
              <option value="Heavy Rain">🌧️ Heavy Rain & Cloudburst API</option>
              <option value="Flooding">🌊 Flooding & Inundation API</option>
              <option value="Heatwave">☀️ Heatwave Hazard API</option>
              <option value="Dust Storm">🌪️ Dust Storm & High Winds API</option>
            </select>
          </div>

          {/* Severity Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-stone-50 p-1 rounded-lg border border-stone-200">
            <span className="text-stone-600 font-semibold px-1">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-white border border-stone-200 rounded-md px-2 py-1 text-stone-900 font-medium focus:outline-none focus:border-amber-600 shadow-2xs cursor-pointer"
            >
              <option value="ALL">All Severities</option>
              <option value="Critical">🔴 Critical</option>
              <option value="High">🟠 High Risk</option>
              <option value="Warning">🟡 Warning</option>
              <option value="Normal">🟢 Monitoring</option>
            </select>
          </div>

          <div className="text-stone-600 border-l border-stone-200 pl-3 hidden md:block font-sans">
            Active Clusters: <span className="text-stone-900 font-bold text-sm">{formatIndianNumber(filteredEvents.length)}</span>
          </div>
        </div>
      </div>

      {/* Map Container & Optional Side Drawer */}
      <div className="flex-1 w-full relative rounded-xl overflow-hidden border border-stone-200 shadow-2xs font-sans">
        <IndiaMap
          events={filteredEvents}
          onSelectEvent={(evt) => setActiveDrawerEvent(evt)}
          height="100%"
          activeWeatherApi={selectedWeatherApi}
        />

        {/* Side Drawer for Selected Event Details */}
        {activeDrawerEvent && (
          <div className="absolute top-0 right-0 h-full w-84 bg-white/96 border-l border-stone-200 p-4.5 shadow-2xl z-[1000] overflow-y-auto space-y-3.5 animate-slide-right font-sans">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-mono font-bold text-amber-900">{activeDrawerEvent.id}</span>
              <button
                onClick={() => setActiveDrawerEvent(null)}
                className="p-1 hover:bg-stone-100 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <SeverityBadge severity={activeDrawerEvent.severity} />
              <h3 className="text-sm font-bold text-stone-900 mt-2">{activeDrawerEvent.title}</h3>
              <p className="text-xs text-stone-600 mt-1">📍 {activeDrawerEvent.city}, {activeDrawerEvent.state}</p>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
              {activeDrawerEvent.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-sans bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <div>
                <span className="text-stone-500 text-[10px] block font-semibold uppercase">CONFIDENCE</span>
                <span className="text-emerald-700 font-bold">{activeDrawerEvent.confidence}%</span>
              </div>
              <div>
                <span className="text-stone-500 text-[10px] block font-semibold uppercase">TOTAL OBSERVATIONS</span>
                <span className="text-stone-900 font-bold">{formatIndianNumber(activeDrawerEvent.total_reports || 0)}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[10px] block font-semibold uppercase">VERIFIED OBSERVATIONS</span>
                <span className="text-emerald-700 font-bold">{formatIndianNumber(activeDrawerEvent.verified_reports || 0)}</span>
              </div>
              <div>
                <span className="text-stone-500 text-[10px] block font-semibold uppercase">REDUNDANT RECORDS</span>
                <span className="text-amber-700 font-bold">{formatIndianNumber(activeDrawerEvent.duplicate_reports || 0)}</span>
              </div>
            </div>

            <button
              onClick={() => window.location.assign(`/events/${activeDrawerEvent.id}`)}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold text-center block transition-colors shadow-xs"
            >
              Open Full Event Intelligence Dossier →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
