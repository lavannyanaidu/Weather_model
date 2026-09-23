export type SeverityLevel = 'Critical' | 'High' | 'Warning' | 'Normal';
export type VerificationStatus = 'Verified' | 'Suspicious' | 'Duplicate' | 'Pending';
export type EventCategory = 
  | 'Rainfall'
  | 'Heavy Rain'
  | 'Thunderstorm'
  | 'Flooding'
  | 'Heatwave'
  | 'Fog'
  | 'Dust Storm'
  | 'Strong Winds'
  | 'Cyclone'
  | 'Landslide';

export type SourceType = 
  | 'Social Media'
  | 'Citizen Report'
  | 'IMD Data Feed'
  | 'Weather API'
  | 'Rain Gauge Network'
  | 'Radar Feed'
  | 'News Aggregation'
  | 'Public Dataset'
  | 'State Disaster Authority'
  | 'Government Sensors'
  | 'Web Sources';

export interface OcrBoundingBox {
  id: string;
  text: string;
  confidence: number;
  box: [number, number, number, number]; // [x, y, width, height] in percentage (0-100)
}

export interface VideoFrameSample {
  frameId: string;
  frameNumber: number;
  timestamp: string; // e.g. "00:04"
  textDetected?: string;
  ocrConfidence?: number;
  frameImageUrl?: string;
}

export interface MultimodalAiMetrics {
  textModel: string; // "ModernBERT"
  textConfidence: number;
  imageModel: string; // "SigLIP 2"
  imageConfidence: number;
  videoModel: string; // "VideoMAE V2"
  videoConfidence: number;
  ocrModel: string; // "PaddleOCR-VL"
  ocrConfidence: number;
  fusionEngine: string; // "WeatherFusion-v4"
  fusionConfidence: number;
}

export interface WeatherReport {
  id: string;
  timestamp: string;
  source: SourceType;
  sourceHandle: string;
  sourceType: SourceType;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  eventType: EventCategory;
  event_type?: EventCategory; // alias for backwards compatibility
  severity: SeverityLevel;
  verificationStatus: VerificationStatus;
  verification_status?: VerificationStatus; // alias
  reliabilityScore: number; // 0 - 100
  reliability_score?: number; // alias
  aiConfidence: number; // 0 - 100
  text: string;
  content?: string; // alias
  hashtags: string[];
  mediaType: 'none' | 'image' | 'video';
  imageUrl?: string;
  media_url?: string; // alias
  videoUrl?: string;
  ocrText?: string;
  ocrConfidence?: number;
  ocrBoundingBoxes?: OcrBoundingBox[];
  videoFrames?: VideoFrameSample[];
  duplicateScore: number; // 0 - 100
  duplicate_score?: number; // alias
  duplicateClusterId?: string;
  eventId?: string;
  event_id?: string; // alias
  locationConfidence: number;
  severityConfidence: number;
  aiMetrics?: MultimodalAiMetrics;
  sourceReliability: number;
  evidence: string[]; // Reasons trusted
  reasons_trusted?: string[]; // alias
  contradictoryEvidence: string[]; // Reasons suspicious
  reasons_suspicious?: string[]; // alias
  processingStatus: 'RECEIVED' | 'PROCESSING' | 'ANALYZED' | 'VERIFIED';
  processingTimestamp: string;
  metadata?: Record<string, any>;
  user_ip?: string;
}

export interface WeatherEvent {
  id: string;
  title: string;
  eventType: EventCategory;
  event_type?: EventCategory; // alias
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  severity: SeverityLevel;
  confidence: number;
  status: 'Active' | 'Monitoring' | 'Resolved' | 'Merged';
  totalReports: number;
  total_reports?: number; // alias
  verifiedReports: number;
  verified_reports?: number; // alias
  duplicateReports: number;
  duplicate_reports?: number; // alias
  suspiciousReports: number;
  suspicious_reports?: number; // alias
  firstDetected: string;
  first_detected?: string; // alias
  lastUpdated: string;
  last_updated?: string; // alias
  description: string;
  affectedRadiusKm: number;
  affected_radius_km?: number; // alias
  sourcesCount: number;
  primaryState: string;
}

export interface DataSource {
  id: string;
  name: string;
  category: SourceType;
  type: SourceType;
  status: 'Healthy' | 'Degraded' | 'Offline';
  lastIngestion: string;
  last_ingestion?: string; // alias
  recordsToday: number;
  records_received?: number; // alias
  recordsPerMin: number;
  latencyMs: number;
  errorRatePct: number;
  error_rate_pct?: number; // alias
  reliabilityScore: number;
  ingestionFrequency: string;
  ingestion_frequency?: string; // alias
}

export interface AlertItem {
  id: string;
  title: string;
  type: 'Critical' | 'Warning' | 'System' | 'AI' | 'Source';
  message: string;
  timestamp: string;
  status: 'Active' | 'Acknowledged' | 'Escalated';
  location?: string;
  eventId?: string;
  reportId?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  result: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface DuplicateCluster {
  id: string;
  clusterId: string;
  primaryReportId: string;
  duplicateReportIds: string[];
  imageSimilarityPct: number;
  textSimilarityPct: number;
  locationDistanceKm: number;
  timeDiffMinutes: number;
  overallDuplicateScore: number;
  status: 'Pending' | 'Merged' | 'MarkedUnique';
}

export interface SourceReliabilityRecord {
  sourceHandle: string;
  sourceName: string;
  sourceType: SourceType;
  totalReports: number;
  verifiedCount: number;
  suspiciousCount: number;
  duplicateCount: number;
  reliabilityScore: number;
  factors: {
    historicalVerification: number;
    locationConsistency: number;
    duplicateFrequency: number;
    crossSourceAgreement: number;
    activityQuality: number;
  };
}

export interface SystemStatus {
  data_ingestion: 'Healthy' | 'Degraded' | 'Offline';
  text_processing: 'Healthy' | 'Degraded' | 'Offline';
  image_processing: 'Healthy' | 'Degraded' | 'Offline';
  video_processing: 'Healthy' | 'Degraded' | 'Offline';
  ocr_service: 'Healthy' | 'Degraded' | 'Offline';
  ai_fusion: 'Healthy' | 'Degraded' | 'Offline';
  deduplication: 'Healthy' | 'Degraded' | 'Offline';
  event_fusion: 'Healthy' | 'Degraded' | 'Offline';
  database: 'Healthy' | 'Degraded' | 'Offline';
  map_service: 'Healthy' | 'Degraded' | 'Offline';
  websocket_gateway: 'Healthy' | 'Degraded' | 'Offline';
  api_gateway: 'Healthy' | 'Degraded' | 'Offline';
  active_websocket_connections: number;
  cpu_usage_pct: number;
  memory_usage_pct: number;
  queue_length: number;
  processing_latency_ms: number;
  throughput_per_sec: number;
  last_heartbeat: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  details?: string;
  latencyMs?: number;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  compactMode: boolean;
  autoRefresh: boolean;
  refreshIntervalSeconds: number;
  mapDefaultLayer: 'Reports' | 'Events' | 'Heatmap' | 'Rainfall' | 'Temperature' | 'Wind';
  aiConfidenceThresholdPct: number;
  suspicionThresholdPct: number;
  duplicateThresholdPct: number;
  notificationsEnabled: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'report' | 'alert' | 'system' | 'event';
  targetUrl?: string;
}
