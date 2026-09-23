import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { VerificationBadge } from '../components/Badges/StatusBadge';
import { OcrBoundingBoxVisualizer } from '../components/OcrBoundingBoxVisualizer';
import { VideoFrameInspector } from '../components/VideoFrameInspector';
import { ArrowLeft, ShieldCheck, AlertOctagon, Cpu, Sparkles, AlertTriangle } from 'lucide-react';

export const ReportDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, verifyReport, markSuspicious, markDuplicate } = useApp();

  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-lg max-w-md mx-auto mt-10 shadow-xs font-sans">
        <AlertOctagon className="w-10 h-10 text-red-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900 mb-1">Observation Not Found</h3>
        <p className="text-xs text-slate-500 mb-4">No observation matching ID "{id}" was found in the active database.</p>
        <button
          onClick={() => navigate('/reports')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium"
        >
          Return to Incoming Observations
        </button>
      </div>
    );
  }

  const isVerified = (report.verificationStatus || report.verification_status) === 'Verified';
  const isSuspicious = (report.verificationStatus || report.verification_status) === 'Suspicious';
  const isDuplicate = (report.verificationStatus || report.verification_status) === 'Duplicate';

  const defaultAiMetrics = report.aiMetrics || {
    textModel: 'ModernBERT',
    textConfidence: 96.4,
    imageModel: 'SigLIP 2',
    imageConfidence: 94.8,
    videoModel: 'VideoMAE V2',
    videoConfidence: 90.0,
    ocrModel: 'PaddleOCR-VL',
    ocrConfidence: report.ocrConfidence || 97.4,
    fusionEngine: 'WeatherFusion-v4',
    fusionConfidence: report.aiConfidence || 95.5
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans p-4">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md shadow-2xs font-semibold font-sans"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Observations Feed
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-semibold font-mono">OBSERVATION ID: {report.id}</span>
          <VerificationBadge status={report.verificationStatus || report.verification_status || 'Verified'} />
        </div>
      </div>

      {/* Grid: Main Observation Info + Multimodal AI Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Observation Data & Media Inspection */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Original Ingested Content */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
                ORIGINAL INGESTED OBSERVATION TEXT
              </span>
              <span className="text-[11px] font-sans font-medium text-slate-400">
                {new Date(report.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-900 font-medium leading-relaxed font-sans">
              "{report.text || report.content}"
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-1">
              {report.hashtags?.map((tag) => (
                <span key={tag} className="text-xs font-bold font-sans text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-200 font-sans">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Source handle</span>
                <span className="text-slate-900 font-bold">{report.source}</span>
                <div className="text-[11px] text-blue-700 font-mono">{report.sourceHandle}</div>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Location & GPS</span>
                <span className="text-slate-900 font-bold">📍 {report.city}, {report.state}</span>
                <div className="text-[11px] text-slate-500 font-mono">{report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)}</div>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive OCR Bounding Box Visualizer Overlay */}
          {(report.imageUrl || report.media_url) && (
            <OcrBoundingBoxVisualizer
              imageUrl={report.imageUrl || report.media_url!}
              ocrText={report.ocrText}
              ocrConfidence={report.ocrConfidence}
              boundingBoxes={report.ocrBoundingBoxes}
              reportId={report.id}
            />
          )}

          {/* Card 3: Video Keyframe Inspector (If video media) */}
          {(report.mediaType === 'video' || report.videoUrl) && (
            <VideoFrameInspector
              frames={report.videoFrames}
              processingStatus={report.processingStatus || 'VERIFIED'}
              videoUrl={report.videoUrl}
            />
          )}
        </div>

        {/* Right Column: Multimodal Model Outputs & Explainable AI */}
        <div className="lg:col-span-5 space-y-5">
          {/* Simulated Model Output Telemetry Box */}
          <div className="bg-slate-900 rounded-lg p-5 text-white border border-slate-800 shadow-md space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-purple-300">
                  SIMULATED DEMO MODEL OUTPUT
                </span>
              </div>
              <span className="text-[10px] font-sans font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                FUSED: {defaultAiMetrics.fusionConfidence}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Text (ModernBERT)</div>
                <div className="text-sm font-bold text-blue-400">{defaultAiMetrics.textConfidence}%</div>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Image (SigLIP 2)</div>
                <div className="text-sm font-bold text-purple-400">{defaultAiMetrics.imageConfidence}%</div>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Video (VideoMAE V2)</div>
                <div className="text-sm font-bold text-amber-400">{defaultAiMetrics.videoConfidence}%</div>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">OCR (PaddleOCR-VL)</div>
                <div className="text-sm font-bold text-emerald-400">{defaultAiMetrics.ocrConfidence}%</div>
              </div>
            </div>
          </div>

          {/* Explainable AI Decision Reasoning */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans border-b border-slate-200 pb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> EXPLAINABLE AI EVIDENCE REASONING
            </h3>

            {isVerified && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> WHY VERIFIED:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(report.evidence || report.reasons_trusted || [
                    '✓ Location coordinates match reported region exactly',
                    '✓ OCR visual text aligns with reported weather event classification',
                    '✓ Timestamp matches nearby Doppler radar activity and weather observations'
                  ]).map((item, idx) => (
                    <li key={idx} className="p-2.5 bg-emerald-50 rounded-md border border-emerald-200 leading-relaxed font-sans">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isSuspicious && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-red-700 flex items-center gap-1.5 font-sans">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> WHY FLAGGED:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(report.contradictoryEvidence || report.reasons_suspicious || [
                    '! Source historical verification rate below platform threshold',
                    '! Media visual embedding matches archive flood stock image dataset',
                    '! Local sensor telemetries show normal rain gauge readings'
                  ]).map((item, idx) => (
                    <li key={idx} className="p-2.5 bg-red-50 rounded-md border border-red-200 leading-relaxed font-sans">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isDuplicate && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 font-sans">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> WHY REDUNDANT:
                </div>
                <div className="p-3 bg-amber-50 rounded-md border border-amber-200 text-xs text-amber-900 leading-relaxed font-sans">
                  Duplicate Cluster ID: <span className="font-mono font-bold">{report.duplicateClusterId || 'DUP-001'}</span>. Image similarity: 96%, text similarity: 91%, distance: 0.02km. Repeated observation filtered.
                </div>
              </div>
            )}
          </div>

          {/* Admin Override Actions */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2.5 shadow-xs font-sans">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">
              MANUAL OPERATOR ACTION
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => verifyReport(report.id)}
                className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold shadow-2xs transition-colors"
              >
                Verify
              </button>
              <button
                onClick={() => markSuspicious(report.id)}
                className="py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold shadow-2xs transition-colors"
              >
                Flag Review
              </button>
              <button
                onClick={() => markDuplicate(report.id)}
                className="py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold shadow-2xs transition-colors"
              >
                Mark Redundant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
