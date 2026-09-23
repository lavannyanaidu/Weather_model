import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { WeatherEvent } from '../../types';
import { SeverityBadge } from '../Badges/StatusBadge';
import { MapPin } from 'lucide-react';

// Generates thematic SVG map pins with custom weather symbols
const createCustomIcon = (severity: string, eventType: string) => {
  const colorMap: Record<string, string> = {
    Critical: '#dc2626',
    High: '#ea580c',
    Warning: '#d97706',
    Normal: '#059669'
  };

  const color = colorMap[severity] || '#2563eb';

  // Weather Symbol SVG Paths
  let symbolSvg = `<circle cx="15" cy="14" r="3" fill="${color}"/>`;
  
  if (eventType === 'Thunderstorm') {
    symbolSvg = `<path d="M16 8 L11 15 H15 L14 20 L19 13 H15 Z" fill="#ffffff" stroke="${color}" stroke-width="0.5"/>`;
  } else if (eventType === 'Flooding') {
    symbolSvg = `<path d="M10 16 C12 14, 13 18, 15 16 C17 14, 18 18, 20 16" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>`;
  } else if (eventType === 'Heavy Rain') {
    symbolSvg = `<path d="M12 11 A3 3 0 0 1 18 11 C19.5 11 20 12.5 19 14 C17 17 15 18 15 18 C15 18 13 17 11 14 C10 12.5 10.5 11 12 11 Z" fill="#ffffff"/>`;
  } else if (eventType === 'Heatwave') {
    symbolSvg = `<circle cx="15" cy="14" r="4" fill="#ffffff"/><path d="M15 7 V9 M15 19 V21 M8 14 H10 M20 14 H22" stroke="#ffffff" stroke-width="1.5"/>`;
  } else if (eventType === 'Dust Storm' || eventType === 'Strong Wind' || eventType === 'Strong Winds') {
    symbolSvg = `<path d="M10 12 H18 M12 15 H20 M9 18 H16" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>`;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="46" viewBox="0 0 30 42">
      <defs>
        <filter id="glow-${severity}-${eventType.replace(/\s+/g, '')}" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="${color}" flood-opacity="0.45"/>
        </filter>
      </defs>
      <path d="M15 0 C6.7 0 0 6.7 0 15 C0 26.25 15 42 15 42 C15 42 30 26.25 30 15 C30 6.7 23.3 0 15 0 Z" fill="${color}" filter="url(#glow-${severity}-${eventType.replace(/\s+/g, '')})"/>
      <circle cx="15" cy="14" r="7.5" fill="#ffffff" opacity="0.25"/>
      ${symbolSvg}
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: 'custom-map-marker',
    iconSize: [34, 46],
    iconAnchor: [17, 46],
    popupAnchor: [0, -42]
  });
};

interface IndiaMapProps {
  events: WeatherEvent[];
  onSelectEvent?: (event: WeatherEvent) => void;
  height?: string;
  selectedEventId?: string | null;
  activeWeatherApi?: string;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  events,
  onSelectEvent,
  height = '100%',
  activeWeatherApi = 'ALL'
}) => {
  const indiaCenter: [number, number] = [20.5937, 78.9629];

  // Filter events by Active Weather API layer if specified
  const displayEvents = events.filter((evt) => {
    if (!activeWeatherApi || activeWeatherApi === 'ALL') return true;
    const type = evt.eventType || evt.event_type;
    return type === activeWeatherApi;
  });

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-stone-200 shadow-xs" style={{ height }}>
      {/* Map Legend Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 border border-stone-200 backdrop-blur-xs rounded-lg p-2.5 shadow-md text-xs space-y-1.5 animate-fade-in font-sans">
        <div className="font-bold text-stone-800 uppercase text-[10px] tracking-wider mb-1 font-mono">Severity Legend</div>
        <div className="flex items-center gap-2 text-stone-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 pulse-glow-red" /> <span className="text-red-700 font-bold">Critical</span>
        </div>
        <div className="flex items-center gap-2 text-stone-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-600" /> <span className="text-orange-700 font-bold">High Risk</span>
        </div>
        <div className="flex items-center gap-2 text-stone-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> <span className="text-amber-700 font-bold">Warning</span>
        </div>
        <div className="flex items-center gap-2 text-stone-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> <span className="text-emerald-700 font-bold">Monitoring</span>
        </div>
      </div>

      <MapContainer
        center={indiaCenter}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url={import.meta.env.VITE_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          maxZoom={19}
        />

        {displayEvents.map((evt) => {
          const eventTypeStr = evt.eventType || evt.event_type || 'Heavy Rain';
          const totalReportsCount = evt.totalReports || evt.total_reports || 0;

          return (
            <Marker
              key={evt.id}
              position={[evt.latitude, evt.longitude]}
              icon={createCustomIcon(evt.severity, eventTypeStr)}
              eventHandlers={{
                click: () => onSelectEvent && onSelectEvent(evt)
              }}
            >
              <Popup>
                <div className="p-1 max-w-xs font-sans text-stone-800">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-amber-800 font-bold">{evt.id}</span>
                    <SeverityBadge severity={evt.severity} />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 leading-tight mb-1">{evt.title}</h4>
                  <div className="text-xs text-stone-600 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" /> {evt.city}, {evt.state}
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-stone-50 p-2 rounded-md border border-stone-200 font-mono mb-2">
                    <div>
                      <span className="text-stone-500">Confidence:</span>
                      <span className="text-emerald-700 font-bold ml-1">{evt.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Reports:</span>
                      <span className="text-stone-900 font-bold ml-1">{totalReportsCount}</span>
                    </div>
                  </div>

                  {onSelectEvent && (
                    <button
                      onClick={() => onSelectEvent(evt)}
                      className="w-full text-center py-1.5 px-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-md transition-colors shadow-2xs"
                    >
                      View Event Intelligence →
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
