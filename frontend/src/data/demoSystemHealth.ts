import type { SystemStatus } from '../types';

export const DEMO_SYSTEM_HEALTH: SystemStatus = {
  data_ingestion: 'Healthy',
  text_processing: 'Healthy',
  image_processing: 'Healthy',
  video_processing: 'Healthy',
  ocr_service: 'Healthy',
  ai_fusion: 'Healthy',
  deduplication: 'Healthy',
  event_fusion: 'Healthy',
  database: 'Healthy',
  map_service: 'Healthy',
  websocket_gateway: 'Healthy',
  api_gateway: 'Healthy',
  active_websocket_connections: 4280,
  cpu_usage_pct: 34.2,
  memory_usage_pct: 58.6,
  queue_length: 142,
  processing_latency_ms: 185,
  throughput_per_sec: 1480,
  last_heartbeat: new Date().toISOString()
};
