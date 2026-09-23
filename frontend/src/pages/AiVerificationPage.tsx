import React from 'react';
import { BrainCircuit, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatIndianNumber } from '../utils/formatters';

export const AiVerificationPage: React.FC = () => {
  const models = [
    {
      name: 'ModernBERT-Weather-v2',
      type: 'Text NLP Model',
      purpose: 'Weather event taxonomy, location extraction, and severity parsing',
      demoConfidence: '96.4%',
      demoLatency: '18ms',
      demoThroughput: `${formatIndianNumber(2400)} docs/sec`,
      status: 'Active'
    },
    {
      name: 'SigLIP 2 Zero-Shot',
      type: 'Image Visual Model',
      purpose: 'Zero-shot flood depth estimation, visual redundancy detection, storm cloud features',
      demoConfidence: '94.8%',
      demoLatency: '45ms',
      demoThroughput: '680 imgs/sec',
      status: 'Active'
    },
    {
      name: 'VideoMAE V2',
      type: 'Video Action Model',
      purpose: 'Spatio-temporal video event classification and frame motion analysis',
      demoConfidence: '91.2%',
      demoLatency: '110ms',
      demoThroughput: '120 vids/sec',
      status: 'Active'
    },
    {
      name: 'PaddleOCR-VL',
      type: 'Visual OCR Extraction',
      purpose: 'Extracted text detection, bounding box grounding, bulletin text parsing',
      demoConfidence: '97.4%',
      demoLatency: '32ms',
      demoThroughput: `${formatIndianNumber(1100)} imgs/sec`,
      status: 'Active'
    },
    {
      name: 'WeatherFusion-v4',
      type: 'Multimodal Fusion Engine',
      purpose: 'Cross-modal evidence correlation, explainable verification scoring, doppler radar ground truth matching',
      demoConfidence: '96.1%',
      demoLatency: '12ms',
      demoThroughput: `${formatIndianNumber(4500)} fusions/sec`,
      status: 'Active'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              AI Evidence Analysis & Multimodal Architecture
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Simulated Multimodal Intelligence & Machine Learning Pipeline for Pan-India Weather Big Data
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-bold font-sans">
            SIMULATED DEMO MODEL OUTPUT
          </span>
        </div>
      </div>

      {/* Animated Architecture Diagram Card */}
      <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 shadow-lg relative overflow-hidden font-sans">
        <div className="text-xs font-bold text-purple-400 uppercase tracking-widest font-sans mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> END-TO-END MULTIMODAL INFERENCE & EVIDENCE PIPELINE
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10 font-sans">
          {/* Input Stage */}
          <div className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 text-center space-y-2">
            <div className="text-xs font-bold text-blue-400 uppercase font-sans">RAW OBSERVATIONS</div>
            <div className="text-xs text-slate-300 font-medium">Text, Photos, Videos, OCR & Metadata</div>
            <div className="text-[10px] text-slate-400 font-sans">{formatIndianNumber(2413920)} Pkts/day</div>
          </div>

          {/* Model Stage */}
          <div className="p-4 bg-slate-800/80 rounded-lg border border-purple-500/40 text-center space-y-2">
            <div className="text-xs font-bold text-purple-400 uppercase font-sans">MULTIMODAL CLASSIFICATION</div>
            <div className="text-[11px] text-purple-200 font-semibold leading-tight font-sans">
              ModernBERT | SigLIP 2 | VideoMAE V2 | PaddleOCR-VL
            </div>
            <div className="text-[10px] text-emerald-400 font-sans">Multi-GPU Distributed</div>
          </div>

          {/* Fusion Engine */}
          <div className="p-4 bg-purple-900/40 rounded-lg border border-purple-400/60 text-center space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase font-sans">EVIDENCE CORRELATION</div>
            <div className="text-xs text-purple-100 font-medium">WeatherFusion-v4 Cross-Attention</div>
            <div className="text-[10px] text-amber-300 font-sans">Embedding Alignment</div>
          </div>

          {/* Verification Engine */}
          <div className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 text-center space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase font-sans">SPATIAL & TEMPORAL CORRELATION</div>
            <div className="text-xs text-slate-300 font-medium">Redundancy Filtering & Source Reliability</div>
            <div className="text-[10px] text-emerald-400 font-sans">Explainable AI Audit</div>
          </div>

          {/* Output Event */}
          <div className="p-4 bg-slate-800/80 rounded-lg border border-emerald-500/50 text-center space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase font-sans">EVENT FUSION</div>
            <div className="text-xs text-emerald-200 font-bold">WEATHER INTELLIGENCE</div>
            <div className="text-[10px] text-slate-400 font-sans">Command Center Ready</div>
          </div>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="space-y-3 font-sans">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600" /> Active AI Model Telemetry
          </h2>
          <span className="text-xs text-slate-500 font-sans">SIMULATED DEMO TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m) => (
            <div key={m.name} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-xs font-sans">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-sans text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {m.type}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 font-sans">{m.name}</h3>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-sans">
                  <CheckCircle2 className="w-3 h-3" /> {m.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">{m.purpose}</p>

              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 grid grid-cols-3 gap-2 text-center font-sans">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</div>
                  <div className="text-xs font-bold text-emerald-700">{m.demoConfidence}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Latency</div>
                  <div className="text-xs font-bold text-blue-700">{m.demoLatency}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Throughput</div>
                  <div className="text-xs font-bold text-purple-700">{m.demoThroughput}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
