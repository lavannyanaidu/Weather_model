import type { NotificationItem, DuplicateCluster, SourceReliabilityRecord } from '../types';

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-001',
    title: 'New Live Report Ingested',
    message: 'Report REP-HYD-101 (Kukatpally flooding 3ft) successfully verified with 96% AI confidence score.',
    timestamp: '2026-09-23T22:45:10Z',
    read: false,
    type: 'report',
    targetUrl: '/reports/REP-HYD-101'
  },
  {
    id: 'NOTIF-002',
    title: 'Critical Weather Event Escalation',
    message: 'Event EVENT-MUM-002 (Dadar & Kurla monsoon downpour) confidence escalated to 98% due to high tide sync.',
    timestamp: '2026-09-23T22:40:00Z',
    read: false,
    type: 'event',
    targetUrl: '/events/EVENT-MUM-002'
  },
  {
    id: 'NOTIF-003',
    title: 'Recycled Media Alert Flagged',
    message: 'Report REP-SUSP-106 marked suspicious due to 96% SigLIP match with 2018 archive flood stock photo.',
    timestamp: '2026-09-23T22:06:00Z',
    read: false,
    type: 'alert',
    targetUrl: '/reports/REP-SUSP-106'
  },
  {
    id: 'NOTIF-004',
    title: 'Duplicate Cluster Formed',
    message: 'Engine grouped 18 duplicate posts into cluster DUP-001 (Kukatpally metro pillar 740).',
    timestamp: '2026-09-23T22:43:00Z',
    read: true,
    type: 'system',
    targetUrl: '/admin'
  },
  {
    id: 'NOTIF-005',
    title: 'Cyclone Warning Red Alert',
    message: 'IMD Vizag Radar bulletin updated: Cyclonic wind speeds 95-105 km/h near Visakhapatnam port.',
    timestamp: '2026-09-23T22:36:00Z',
    read: true,
    type: 'event',
    targetUrl: '/events/EVENT-VTZ-007'
  }
];

// Add 15 more notifications
for (let i = 6; i <= 22; i++) {
  DEMO_NOTIFICATIONS.push({
    id: `NOTIF-${i < 10 ? '00' + i : '0' + i}`,
    title: `Operational Update #${i}`,
    message: `System notification regarding event cluster monitoring in Sector ${i % 8}.`,
    timestamp: new Date(Date.now() - (i * 450000)).toISOString(),
    read: i > 8,
    type: i % 2 === 0 ? 'report' : 'system'
  });
}

export const DEMO_DUPLICATE_CLUSTERS: DuplicateCluster[] = [
  {
    id: 'CLUST-001',
    clusterId: 'DUP-001',
    primaryReportId: 'REP-HYD-101',
    duplicateReportIds: ['REP-DUP-107', 'REP-IND-107', 'REP-IND-114'],
    imageSimilarityPct: 96,
    textSimilarityPct: 91,
    locationDistanceKm: 0.02,
    timeDiffMinutes: 3,
    overallDuplicateScore: 94,
    status: 'Pending'
  },
  {
    id: 'CLUST-002',
    clusterId: 'DUP-002',
    primaryReportId: 'REP-MUM-102',
    duplicateReportIds: ['REP-IND-102', 'REP-IND-109'],
    imageSimilarityPct: 94,
    textSimilarityPct: 89,
    locationDistanceKm: 0.15,
    timeDiffMinutes: 5,
    overallDuplicateScore: 92,
    status: 'Pending'
  },
  {
    id: 'CLUST-003',
    clusterId: 'DUP-003',
    primaryReportId: 'REP-VTZ-103',
    duplicateReportIds: ['REP-IND-103'],
    imageSimilarityPct: 98,
    textSimilarityPct: 95,
    locationDistanceKm: 0.05,
    timeDiffMinutes: 2,
    overallDuplicateScore: 96,
    status: 'Merged'
  },
  {
    id: 'CLUST-004',
    clusterId: 'DUP-004',
    primaryReportId: 'REP-DEL-104',
    duplicateReportIds: ['REP-IND-104'],
    imageSimilarityPct: 88,
    textSimilarityPct: 84,
    locationDistanceKm: 0.40,
    timeDiffMinutes: 8,
    overallDuplicateScore: 86,
    status: 'Pending'
  }
];

export const DEMO_SOURCE_RELIABILITY: SourceReliabilityRecord[] = [
  {
    sourceHandle: '@HyderabadWeatherUpdates',
    sourceName: 'Hyderabad Weather Watchers',
    sourceType: 'Social Media',
    totalReports: 1842,
    verifiedCount: 1410,
    suspiciousCount: 96,
    duplicateCount: 336,
    reliabilityScore: 81,
    factors: {
      historicalVerification: 84,
      locationConsistency: 88,
      duplicateFrequency: 75,
      crossSourceAgreement: 82,
      activityQuality: 78
    }
  },
  {
    sourceHandle: '@MumbaiRainsLive',
    sourceName: 'Mumbai Monsoon Trackers',
    sourceType: 'Social Media',
    totalReports: 3240,
    verifiedCount: 2950,
    suspiciousCount: 80,
    duplicateCount: 210,
    reliabilityScore: 94,
    factors: {
      historicalVerification: 96,
      locationConsistency: 95,
      duplicateFrequency: 90,
      crossSourceAgreement: 93,
      activityQuality: 96
    }
  },
  {
    sourceHandle: '@IMD_NationalFeed',
    sourceName: 'IMD Official Automated Data Feed',
    sourceType: 'IMD Data Feed',
    totalReports: 14200,
    verifiedCount: 14180,
    suspiciousCount: 2,
    duplicateCount: 18,
    reliabilityScore: 99,
    factors: {
      historicalVerification: 99,
      locationConsistency: 100,
      duplicateFrequency: 99,
      crossSourceAgreement: 98,
      activityQuality: 100
    }
  },
  {
    sourceHandle: '@UnverifiedViralWatcher',
    sourceName: 'Clickbait Weather Handles',
    sourceType: 'Social Media',
    totalReports: 512,
    verifiedCount: 180,
    suspiciousCount: 240,
    duplicateCount: 92,
    reliabilityScore: 40,
    factors: {
      historicalVerification: 35,
      locationConsistency: 42,
      duplicateFrequency: 38,
      crossSourceAgreement: 40,
      activityQuality: 45
    }
  }
];
