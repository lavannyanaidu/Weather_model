import type { 
  WeatherReport, 
  WeatherEvent, 
  DataSource, 
  AlertItem, 
  AuditLog, 
  SystemStatus, 
  NotificationItem, 
  DuplicateCluster, 
  SourceReliabilityRecord,
  UserSettings
} from '../types';

import { DEMO_REPORTS } from '../data/demoReports';
import { DEMO_EVENTS } from '../data/demoEvents';
import { DEMO_SOURCES } from '../data/demoSources';
import { DEMO_ALERTS } from '../data/demoAlerts';
import { DEMO_AUDIT_LOGS } from '../data/demoAuditLogs';
import { DEMO_SYSTEM_HEALTH } from '../data/demoSystemHealth';
import { DEMO_NOTIFICATIONS, DEMO_DUPLICATE_CLUSTERS, DEMO_SOURCE_RELIABILITY } from '../data/demoNotifications';
import { DEMO_STATE_ANALYTICS, DEMO_NATIONAL_BIGDATA_METRICS } from '../data/demoAnalytics';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'dark',
  compactMode: false,
  autoRefresh: true,
  refreshIntervalSeconds: 10,
  mapDefaultLayer: 'Events',
  aiConfidenceThresholdPct: 88,
  suspicionThresholdPct: 45,
  duplicateThresholdPct: 90,
  notificationsEnabled: true
};

export const PIPELINE_STAGES = [
  { id: '1', name: 'DATA INGESTION', details: 'Ingesting multi-source stream packet...' },
  { id: '2', name: 'NORMALIZATION', details: 'Normalizing schema & spatial-temporal metadata...' },
  { id: '3', name: 'TEXT ANALYSIS', details: 'ModernBERT natural language entity extraction...' },
  { id: '4', name: 'IMAGE ANALYSIS', details: 'SigLIP 2 zero-shot image embedding extraction...' },
  { id: '5', name: 'VIDEO ANALYSIS', details: 'VideoMAE V2 temporal spatio-video frame classification...' },
  { id: '6', name: 'OCR PROCESSING', details: 'PaddleOCR-VL visual text detection & bounding box alignment...' },
  { id: '7', name: 'CLASSIFICATION', details: 'Weather severity & event taxonomy tagging...' },
  { id: '8', name: 'DEDUPLICATION', details: 'Cross-source image/text vector similarity matching...' },
  { id: '9', name: 'GEO/TIME CORRELATION', details: 'Radius & timestamp clustering against Doppler radar cells...' },
  { id: '10', name: 'EVENT FUSION', details: 'WeatherFusion Engine fusing report into master event graph...' },
  { id: '11', name: 'VERIFICATION', details: 'Explainable AI evidence consistency check...' },
  { id: '12', name: 'FINAL DECISION', details: 'Operational status verified & published to Command Center.' }
];

let reportSequenceCounter = 200;

export class DemoDataService {
  private reports: WeatherReport[] = [...DEMO_REPORTS];
  private events: WeatherEvent[] = [...DEMO_EVENTS];
  private sources: DataSource[] = [...DEMO_SOURCES];
  private alerts: AlertItem[] = [...DEMO_ALERTS];
  private auditLogs: AuditLog[] = [...DEMO_AUDIT_LOGS];
  private systemHealth: SystemStatus = { ...DEMO_SYSTEM_HEALTH };
  private notifications: NotificationItem[] = [...DEMO_NOTIFICATIONS];
  private duplicateClusters: DuplicateCluster[] = [...DEMO_DUPLICATE_CLUSTERS];
  private sourceReliability: SourceReliabilityRecord[] = [...DEMO_SOURCE_RELIABILITY];
  private userSettings: UserSettings = { ...DEFAULT_USER_SETTINGS };

  public getReports(): WeatherReport[] {
    return this.reports;
  }

  public getEvents(): WeatherEvent[] {
    return this.events;
  }

  public getSources(): DataSource[] {
    return this.sources;
  }

  public getAlerts(): AlertItem[] {
    return this.alerts;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public getSystemHealth(): SystemStatus {
    return this.systemHealth;
  }

  public getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  public getDuplicateClusters(): DuplicateCluster[] {
    return this.duplicateClusters;
  }

  public getSourceReliability(): SourceReliabilityRecord[] {
    return this.sourceReliability;
  }

  public getUserSettings(): UserSettings {
    return this.userSettings;
  }

  public getStateAnalytics(stateName?: string) {
    if (stateName && DEMO_STATE_ANALYTICS[stateName]) {
      return DEMO_STATE_ANALYTICS[stateName];
    }
    return DEMO_STATE_ANALYTICS['Telangana'];
  }

  public getNationalAnalytics() {
    return DEMO_NATIONAL_BIGDATA_METRICS;
  }

  // Generate a live simulated report for the live pipeline demonstration
  public generateLiveReport(): { report: WeatherReport; pipelineLogs: string[] } {
    reportSequenceCounter++;
    const cities = [
      { city: 'Hyderabad', state: 'Telangana', lat: 17.4849, lng: 78.4138, eventId: 'EVENT-HYD-001' },
      { city: 'Mumbai', state: 'Maharashtra', lat: 19.0178, lng: 72.8478, eventId: 'EVENT-MUM-002' },
      { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, eventId: 'EVENT-BLR-006' },
      { city: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185, eventId: 'EVENT-VTZ-007' },
      { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, eventId: 'EVENT-CHE-004' }
    ];
    const pickedCity = cities[reportSequenceCounter % cities.length];
    const newId = `REP-LIVE-${reportSequenceCounter}`;
    const nowIso = new Date().toISOString();

    const newReport: WeatherReport = {
      id: newId,
      timestamp: nowIso,
      source: 'Citizen Report',
      sourceHandle: `@live_radar_user_${reportSequenceCounter}`,
      sourceType: 'Citizen Report',
      city: pickedCity.city,
      state: pickedCity.state,
      latitude: pickedCity.lat + 0.002,
      longitude: pickedCity.lng + 0.002,
      eventType: 'Heavy Rain',
      event_type: 'Heavy Rain',
      severity: 'High',
      verificationStatus: 'Verified',
      verification_status: 'Verified',
      reliabilityScore: 94,
      reliability_score: 94,
      aiConfidence: 96,
      text: `LIVE REPORT #${reportSequenceCounter}: High intensity precipitation & urban water accumulation logged in ${pickedCity.city}. Telemetry verified. #IMD #${pickedCity.city}Rains`,
      content: `LIVE REPORT #${reportSequenceCounter}: High intensity precipitation & urban water accumulation logged in ${pickedCity.city}. Telemetry verified. #IMD #${pickedCity.city}Rains`,
      hashtags: ['#IMD', `#${pickedCity.city}Rains`, '#LiveWeather'],
      mediaType: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
      media_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
      ocrText: `HEAVY RAINFALL ALERT ${pickedCity.city.toUpperCase()}`,
      ocrConfidence: 98.4,
      ocrBoundingBoxes: [
        { id: 'live-box-1', text: `HEAVY RAINFALL ALERT`, confidence: 99.0, box: [10, 20, 70, 20] },
        { id: 'live-box-2', text: pickedCity.city.toUpperCase(), confidence: 98.5, box: [20, 48, 55, 18] }
      ],
      duplicateScore: 6,
      duplicate_score: 6,
      eventId: pickedCity.eventId,
      event_id: pickedCity.eventId,
      locationConfidence: 98.0,
      severityConfidence: 96.0,
      aiMetrics: {
        textModel: 'ModernBERT',
        textConfidence: 97.2,
        imageModel: 'SigLIP 2',
        imageConfidence: 95.8,
        videoModel: 'VideoMAE V2',
        videoConfidence: 91.0,
        ocrModel: 'PaddleOCR-VL',
        ocrConfidence: 98.4,
        fusionEngine: 'WeatherFusion-v4',
        fusionConfidence: 96.5
      },
      sourceReliability: 94,
      evidence: [
        `✓ Live GPS coordinates match ${pickedCity.city} precipitation cluster`,
        `✓ OCR visual text detection confirmed "HEAVY RAINFALL ALERT"`,
        `✓ Doppler radar echo reflectivity exceeds 48 dBZ in area`
      ],
      reasons_trusted: [
        `✓ Live GPS coordinates match ${pickedCity.city} precipitation cluster`,
        `✓ OCR visual text detection confirmed "HEAVY RAINFALL ALERT"`
      ],
      contradictoryEvidence: [],
      reasons_suspicious: [],
      processingStatus: 'VERIFIED',
      processingTimestamp: nowIso
    };

    const logs = PIPELINE_STAGES.map((s) => `[STAGE ${s.id}/12] ${s.name}: ${s.details}`);

    // Update internal arrays
    this.reports.unshift(newReport);
    
    // Update matching event count
    this.events = this.events.map(e => {
      if (e.id === pickedCity.eventId) {
        return {
          ...e,
          totalReports: e.totalReports + 1,
          total_reports: (e.totalReports || 0) + 1,
          verifiedReports: e.verifiedReports + 1,
          verified_reports: (e.verifiedReports || 0) + 1,
          lastUpdated: nowIso,
          last_updated: nowIso
        };
      }
      return e;
    });

    // Add audit log
    const audit: AuditLog = {
      id: `AUD-LIVE-${reportSequenceCounter}`,
      timestamp: nowIso,
      actor: 'Simulated Ingestion Pipeline',
      role: 'Automated Real-time Stream',
      action: 'INGEST_LIVE_REPORT',
      target: newId,
      result: `Report ${newId} ingested, processed through 12 pipeline stages, and verified.`,
      severity: 'info'
    };
    this.auditLogs.unshift(audit);

    // Add notification
    const notif: NotificationItem = {
      id: `NOTIF-LIVE-${reportSequenceCounter}`,
      title: 'Live Report Ingested',
      message: `Report ${newId} (${pickedCity.city}) verified by AI WeatherFusion Engine (96.5%).`,
      timestamp: nowIso,
      read: false,
      type: 'report',
      targetUrl: `/reports/${newId}`
    };
    this.notifications.unshift(notif);

    return { report: newReport, pipelineLogs: logs };
  }
}

export const demoDataService = new DemoDataService();
