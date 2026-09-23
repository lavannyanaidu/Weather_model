import type { WeatherReport, WeatherEvent, DataSource, SystemStatus } from '../types';
import { INITIAL_REPORTS, INITIAL_EVENTS, INITIAL_SOURCES, INITIAL_SYSTEM_STATUS } from '../data/initialData';

// Simulated API latency
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getReports(): Promise<WeatherReport[]> {
    await delay();
    return [...INITIAL_REPORTS];
  },

  async getReportById(id: string): Promise<WeatherReport | undefined> {
    await delay();
    return INITIAL_REPORTS.find((r) => r.id === id);
  },

  async getEvents(): Promise<WeatherEvent[]> {
    await delay();
    return [...INITIAL_EVENTS];
  },

  async getEventById(id: string): Promise<WeatherEvent | undefined> {
    await delay();
    return INITIAL_EVENTS.find((e) => e.id === id);
  },

  async getSources(): Promise<DataSource[]> {
    await delay();
    return [...INITIAL_SOURCES];
  },

  async getSystemStatus(): Promise<SystemStatus> {
    await delay();
    return { ...INITIAL_SYSTEM_STATUS };
  },

  // Generates a new live report simulation
  generateSimulatedReport(): { report: WeatherReport; pipelineSteps: string[] } {
    const locations = [
      { city: 'Hyderabad', state: 'Telangana', lat: 17.4955, lng: 78.3980, event: 'Flooding' as const, event_id: 'EVENT-HYD-001' },
      { city: 'Mumbai', state: 'Maharashtra', lat: 19.0780, lng: 72.8750, event: 'Heavy Rain' as const, event_id: 'EVENT-MUM-002' },
      { city: 'New Delhi', state: 'Delhi', lat: 28.6145, lng: 77.2095, event: 'Heatwave' as const, event_id: 'EVENT-DEL-003' },
      { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0830, lng: 80.2715, event: 'Thunderstorm' as const, event_id: 'EVENT-CHE-004' }
    ];
    
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const sources: ('Citizen Report' | 'Social Media' | 'Government Sensors')[] = ['Citizen Report', 'Social Media', 'Government Sensors'];
    const src = sources[Math.floor(Math.random() * sources.length)];
    const newId = `REP-SIM-${Math.floor(100 + Math.random() * 900)}`;

    const newReport: WeatherReport = {
      id: newId,
      timestamp: new Date().toISOString(),
      source: src,
      sourceHandle: `@live_${loc.city.toLowerCase()}_user`,
      sourceType: src,
      city: loc.city,
      state: loc.state,
      latitude: loc.lat,
      longitude: loc.lng,
      eventType: loc.event,
      event_type: loc.event,
      severity: 'High',
      verificationStatus: 'Verified',
      verification_status: 'Verified',
      reliabilityScore: Math.floor(75 + Math.random() * 22),
      reliability_score: Math.floor(75 + Math.random() * 22),
      aiConfidence: 95,
      text: `LIVE SIMULATION: Waterlogging & sudden weather intensity escalation reported near ${loc.city} central junction.`,
      content: `LIVE SIMULATION: Waterlogging & sudden weather intensity escalation reported near ${loc.city} central junction.`,
      hashtags: ['#IMD', `#${loc.city}Live`],
      mediaType: 'image',
      duplicateScore: Math.floor(5 + Math.random() * 20),
      duplicate_score: Math.floor(5 + Math.random() * 20),
      eventId: loc.event_id,
      event_id: loc.event_id,
      locationConfidence: 98,
      severityConfidence: 94,
      sourceReliability: 92,
      evidence: [
        'Real-time WebSocket telemetry packet received',
        'Spatiotemporal coordinate alignment verified',
        'Valid weather pattern correlation score'
      ],
      reasons_trusted: [
        'Real-time WebSocket telemetry packet received',
        'Spatiotemporal coordinate alignment verified'
      ],
      contradictoryEvidence: [],
      reasons_suspicious: [],
      processingStatus: 'VERIFIED',
      processingTimestamp: new Date().toISOString()
    };

    const pipelineSteps = [
      `1. Live Packet Ingested from [${src}]`,
      `2. NER Geocoded location -> ${loc.city}, ${loc.state} (${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)})`,
      `3. NLP Classifier categorized event -> [${loc.event}]`,
      `4. Haversine & Jaccard Deduplication check -> Duplicate Score: ${newReport.duplicateScore}% (Unique)`,
      `5. Heuristic Reliability Evaluator -> Trust Score: ${newReport.reliabilityScore}% (${newReport.verificationStatus})`,
      `6. Spatiotemporal Fusion -> Fused into Active Event [${loc.event_id}]`
    ];

    return { report: newReport, pipelineSteps };
  }
};
