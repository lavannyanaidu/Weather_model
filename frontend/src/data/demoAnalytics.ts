export interface StateAnalytics {
  state: string;
  activeEvents: number;
  totalReports: number;
  verifiedReports: number;
  suspiciousReports: number;
  pendingReports: number;
  duplicateReports: number;
  topEventType: string;
  avgAiConfidence: number;
}

export const DEMO_STATE_ANALYTICS: Record<string, StateAnalytics> = {
  'Telangana': {
    state: 'Telangana',
    activeEvents: 4,
    totalReports: 82431,
    verifiedReports: 71220,
    suspiciousReports: 3102,
    pendingReports: 1842,
    duplicateReports: 6267,
    topEventType: 'Heavy Rain / Urban Flooding',
    avgAiConfidence: 94.8
  },
  'Maharashtra': {
    state: 'Maharashtra',
    activeEvents: 5,
    totalReports: 142800,
    verifiedReports: 124500,
    suspiciousReports: 4200,
    pendingReports: 3100,
    duplicateReports: 11000,
    topEventType: 'Monsoon Rain & High Tide Inundation',
    avgAiConfidence: 96.2
  },
  'Delhi': {
    state: 'Delhi',
    activeEvents: 2,
    totalReports: 48900,
    verifiedReports: 42100,
    suspiciousReports: 1900,
    pendingReports: 1200,
    duplicateReports: 3700,
    topEventType: 'Dust Storm & Squall',
    avgAiConfidence: 91.5
  },
  'Tamil Nadu': {
    state: 'Tamil Nadu',
    activeEvents: 3,
    totalReports: 68400,
    verifiedReports: 59800,
    suspiciousReports: 2100,
    pendingReports: 1500,
    duplicateReports: 5000,
    topEventType: 'Cyclone / Coastal Surge',
    avgAiConfidence: 93.8
  },
  'West Bengal': {
    state: 'West Bengal',
    activeEvents: 3,
    totalReports: 54100,
    verifiedReports: 47200,
    suspiciousReports: 1800,
    pendingReports: 1400,
    duplicateReports: 3700,
    topEventType: 'Thunderstorm (Kalbaishakhi)',
    avgAiConfidence: 90.2
  },
  'Assam': {
    state: 'Assam',
    activeEvents: 4,
    totalReports: 61200,
    verifiedReports: 53900,
    suspiciousReports: 1400,
    pendingReports: 1100,
    duplicateReports: 4800,
    topEventType: 'Brahmaputra Flooding & Landslides',
    avgAiConfidence: 95.1
  },
  'Odisha': {
    state: 'Odisha',
    activeEvents: 3,
    totalReports: 49500,
    verifiedReports: 43800,
    suspiciousReports: 1200,
    pendingReports: 900,
    duplicateReports: 3600,
    topEventType: 'Urban Flash Flood & Rain',
    avgAiConfidence: 92.7
  },
  'Andhra Pradesh': {
    state: 'Andhra Pradesh',
    activeEvents: 4,
    totalReports: 78900,
    verifiedReports: 69200,
    suspiciousReports: 2400,
    pendingReports: 1800,
    duplicateReports: 5500,
    topEventType: 'Cyclone & River Discharge Inundation',
    avgAiConfidence: 95.8
  },
  'Gujarat': {
    state: 'Gujarat',
    activeEvents: 3,
    totalReports: 51200,
    verifiedReports: 45100,
    suspiciousReports: 1600,
    pendingReports: 1100,
    duplicateReports: 3400,
    topEventType: 'Heatwave / Dam Overflow',
    avgAiConfidence: 93.1
  },
  'Kerala': {
    state: 'Kerala',
    activeEvents: 3,
    totalReports: 43200,
    verifiedReports: 38100,
    suspiciousReports: 1100,
    pendingReports: 800,
    duplicateReports: 3200,
    topEventType: 'Heavy Rain & Sea Erosion',
    avgAiConfidence: 91.8
  },
  'Bihar': {
    state: 'Bihar',
    activeEvents: 2,
    totalReports: 39800,
    verifiedReports: 34900,
    suspiciousReports: 1400,
    pendingReports: 950,
    duplicateReports: 2550,
    topEventType: 'Ganga Inundation & River Flooding',
    avgAiConfidence: 92.4
  },
  'Karnataka': {
    state: 'Karnataka',
    activeEvents: 3,
    totalReports: 64500,
    verifiedReports: 56800,
    suspiciousReports: 2100,
    pendingReports: 1600,
    duplicateReports: 4000,
    topEventType: 'Heavy Rain & Waterlogging',
    avgAiConfidence: 93.5
  },
  'Uttar Pradesh': {
    state: 'Uttar Pradesh',
    activeEvents: 4,
    totalReports: 72100,
    verifiedReports: 63100,
    suspiciousReports: 2800,
    pendingReports: 1900,
    duplicateReports: 4300,
    topEventType: 'Dense Fog & Thunderstorm',
    avgAiConfidence: 90.9
  },
  'Uttarakhand': {
    state: 'Uttarakhand',
    activeEvents: 3,
    totalReports: 32400,
    verifiedReports: 28900,
    suspiciousReports: 850,
    pendingReports: 650,
    duplicateReports: 2000,
    topEventType: 'Landslides & Cloudbursts',
    avgAiConfidence: 96.0
  }
};

export const DEMO_NATIONAL_BIGDATA_METRICS = {
  rawReportsTotal: 2840000,
  normalizedTotal: 2731000,
  duplicatesRemovedTotal: 318000,
  aiAnalyzedTotal: 2413000,
  eventsIdentifiedTotal: 428,
  verifiedEventsTotal: 311,
  hourlyIngestionData: [
    { hour: '00:00', count: 42000 },
    { hour: '03:00', count: 28000 },
    { hour: '06:00', count: 35000 },
    { hour: '09:00', count: 85000 },
    { hour: '12:00', count: 142000 },
    { hour: '15:00', count: 215000 },
    { hour: '18:00', count: 310000 },
    { hour: '21:00', count: 285000 }
  ],
  sourceDistribution: [
    { source: 'Social Media', percentage: 38.5, count: 1093400 },
    { source: 'IMD Data Feed', percentage: 24.2, count: 687280 },
    { source: 'Citizen Reports', percentage: 16.8, count: 477120 },
    { source: 'Weather API', percentage: 10.5, count: 298200 },
    { source: 'Government Sensors', percentage: 6.2, count: 176080 },
    { source: 'Radar & Other', percentage: 3.8, count: 107920 }
  ],
  verificationBreakdown: [
    { status: 'Verified', count: 2145000, color: '#10b981' },
    { status: 'Suspicious', count: 68000, color: '#ef4444' },
    { status: 'Duplicate', count: 318000, color: '#f59e0b' },
    { status: 'Pending Review', count: 20000, color: '#3b82f6' }
  ]
};
