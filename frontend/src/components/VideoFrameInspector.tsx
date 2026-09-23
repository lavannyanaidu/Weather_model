import React from 'react';
import type { VideoFrameSample } from '../types';
import { Film, CheckCircle2, Play, Cpu } from 'lucide-react';

interface VideoFrameInspectorProps {
  frames?: VideoFrameSample[];
  processingStatus: 'RECEIVED' | 'PROCESSING' | 'ANALYZED' | 'VERIFIED';
  videoUrl?: string;
}

export const VideoFrameInspector: React.FC<VideoFrameInspectorProps> = ({
  frames = [],
  processingStatus
}) => {
  const defaultFrames: VideoFrameSample[] = frames.length > 0 ? frames : [
    { frameId: 'f-1', frameNumber: 1, timestamp: '00:01', textDetected: 'SQUALL WARNING DELHI', ocrConfidence: 96.2 },
    { frameId: 'f-2', frameNumber: 12, timestamp: '00:04', textDetected: 'VISIBILITY REDUCTION <100M', ocrConfidence: 95.1 },
    { frameId: 'f-3', frameNumber: 24, timestamp: '00:08', textDetected: 'HIGH SQUALL WINDS CP', ocrConfidence: 94.8 },
    { frameId: 'f-4', frameNumber: 36, timestamp: '00:12', textDetected: 'DUST CLOUD ADVANCING', ocrConfidence: 93.9 }
  ];

  const statuses = ['RECEIVED', 'PROCESSING', 'ANALYZED', 'VERIFIED'] as const;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-xs font-sans">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
            VideoMAE V2 Spatio-Temporal Frame Sampling & OCR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {processingStatus}
          </span>
        </div>
      </div>

      {/* Video Processing Stage Timeline */}
      <div className="grid grid-cols-4 gap-2">
        {statuses.map((st, idx) => {
          const isDone = statuses.indexOf(processingStatus) >= idx;

          return (
            <div
              key={st}
              className={`p-2 rounded border text-center transition-colors ${
                isDone
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider font-mono">
                Stage {idx + 1}
              </div>
              <div className="text-xs font-semibold">{st}</div>
            </div>
          );
        })}
      </div>

      {/* Frame Preview Samples Grid */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 font-sans flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-purple-600" /> Sampled Keyframes (16 FPS Extraction)
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {defaultFrames.map((f) => (
            <div
              key={f.frameId}
              className="bg-slate-900 rounded-lg p-2.5 text-white border border-slate-700 space-y-2 relative group hover:border-purple-400 transition-all shadow-xs"
            >
              <div className="h-24 bg-slate-800 rounded flex items-center justify-center relative overflow-hidden border border-slate-700">
                {f.frameImageUrl ? (
                  <img src={f.frameImageUrl} alt={`Frame ${f.frameNumber}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2">
                    <Play className="w-6 h-6 text-purple-400 mx-auto mb-1 opacity-70" />
                    <span className="text-[10px] font-mono text-slate-400">FRAME {f.frameNumber < 10 ? '0' + f.frameNumber : f.frameNumber}</span>
                  </div>
                )}
                <span className="absolute top-1 right-1 text-[9px] font-mono font-bold bg-black/80 text-amber-300 px-1 py-0.5 rounded">
                  {f.timestamp}
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">
                  Frame {f.frameNumber}
                </div>
                {f.textDetected && (
                  <div className="text-[11px] font-mono font-semibold text-purple-200 leading-tight truncate mt-0.5">
                    "{f.textDetected}"
                  </div>
                )}
                <div className="text-[9px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> OCR: {f.ocrConfidence}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
