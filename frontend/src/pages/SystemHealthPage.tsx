import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Server, Cpu, HardDrive, Wifi, Zap } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

export const SystemHealthPage: React.FC = () => {
  const { systemHealth } = useApp();

  const subServices = [
    { name: 'Data Ingestion Service', key: systemHealth.data_ingestion, desc: 'Multi-source stream listener (Twitter, RSS, APIs)' },
    { name: 'Text Processing Engine (ModernBERT)', key: systemHealth.text_processing, desc: 'NLP entity tagging & sentiment analysis' },
    { name: 'Image Processing Engine (SigLIP 2)', key: systemHealth.image_processing, desc: 'Visual embeddings & zero-shot classification' },
    { name: 'Video Processing Engine (VideoMAE V2)', key: systemHealth.video_processing, desc: 'Spatio-temporal action & frame keyframing' },
    { name: 'Visual OCR Service (PaddleOCR-VL)', key: systemHealth.ocr_service, desc: 'Image & video frame text bounding box extraction' },
    { name: 'AI Fusion Engine (WeatherFusion-v4)', key: systemHealth.ai_fusion, desc: 'Cross-modal correlation & radar ground truth matching' },
    { name: 'Redundancy Filtering Service', key: systemHealth.deduplication, desc: 'Faiss vector index redundancy cluster grouping' },
    { name: 'Weather Event Fusion Module', key: systemHealth.event_fusion, desc: 'Spatial-temporal event graph synthesis' },
    { name: 'TimescaleDB / Postgres Database', key: systemHealth.database, desc: 'Primary relational & time-series data store' },
    { name: 'GIS Vector Map Layer Service', key: systemHealth.map_service, desc: 'Tileserver & Leaflet geo-json renderer' },
    { name: 'Real-Time WebSocket Gateway', key: systemHealth.websocket_gateway, desc: 'High-concurrency live stream push sockets' },
    { name: 'National API Gateway', key: systemHealth.api_gateway, desc: 'MoES secure OpenAPI reverse proxy' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Mission Control System Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Real-time operational status monitoring for all 12 distributed Big Data microservices
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold font-sans flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SIMULATED SYSTEM TELEMETRY
          </span>
        </div>
      </div>

      {/* KPI Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-blue-600" /> CPU Load
          </div>
          <div className="text-2xl font-black text-slate-900 font-sans">{systemHealth.cpu_usage_pct}%</div>
          <div className="text-[10px] text-slate-400 font-sans">64 Cores Active</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-purple-600" /> RAM Memory
          </div>
          <div className="text-2xl font-black text-slate-900 font-sans">{systemHealth.memory_usage_pct}%</div>
          <div className="text-[10px] text-slate-400 font-sans">256 GB / 512 GB</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600" /> Throughput
          </div>
          <div className="text-2xl font-black text-slate-900 font-sans">{formatIndianNumber(systemHealth.throughput_per_sec)}</div>
          <div className="text-[10px] text-slate-400 font-sans">Events / sec</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-emerald-600" /> Latency
          </div>
          <div className="text-2xl font-black text-slate-900 font-sans">{systemHealth.processing_latency_ms} ms</div>
          <div className="text-[10px] text-slate-400 font-sans">End-to-end processing</div>
        </div>
      </div>

      {/* 12 Sub-services Status Grid */}
      <div className="space-y-3 font-sans">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
          <Server className="w-4 h-4 text-slate-600" /> Microservice Operations Health Grid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          {subServices.map((svc) => (
            <div key={svc.name} className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-2 font-sans">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 font-sans">{svc.name}</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-sans">
                  {svc.key}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
