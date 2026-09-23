import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Loader2, ArrowRight, Activity } from 'lucide-react';

export const PipelineVisualizer: React.FC = () => {
  const { currentPipelineStage, isSimulating, pipelineLogs } = useApp();

  const stages = [
    { id: 1, name: 'OBSERVATION RECEIVED', desc: 'Multi-source ingestion' },
    { id: 2, name: 'LOCATION & TIME EXTRACTED', desc: 'NER + geocoding' },
    { id: 3, name: 'EVENT CLASSIFICATION', desc: 'Multimodal AI' },
    { id: 4, name: 'REDUNDANCY FILTERING', desc: 'Spatiotemporal correlation' },
    { id: 5, name: 'SOURCE & EVIDENCE ANALYSIS', desc: 'Source reliability' },
    { id: 6, name: 'EVENT FUSION', desc: 'Cluster intelligence' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 mb-4 shadow-xs font-sans">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${isSimulating ? 'text-blue-600 animate-spin' : 'text-slate-500'}`} />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            REAL-TIME INTELLIGENCE PIPELINE <span className="text-slate-500 font-normal text-[11px]">(WeatherFusion AI Engine)</span>
          </h3>
        </div>
        {isSimulating ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-sans">
            <Loader2 className="w-3 h-3 animate-spin" /> Processing Stage {currentPipelineStage > 6 ? 6 : currentPipelineStage}/6
          </span>
        ) : (
          <span className="text-[11px] text-slate-500 font-sans font-medium">Status: Operational Stream Active</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {stages.map((stage) => {
          const isActive = currentPipelineStage === stage.id || (isSimulating && currentPipelineStage > 6 && stage.id === 6);
          const isCompleted = currentPipelineStage > stage.id || (!isSimulating && currentPipelineStage === 0);

          return (
            <div
              key={stage.id}
              className={`p-2.5 rounded-md border text-center transition-all ${
                isActive
                  ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300'
                  : isCompleted
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                {isActive ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-[9px] flex items-center justify-center font-sans text-slate-500 font-semibold">
                    {stage.id}
                  </span>
                )}
                <span className={`text-[10px] font-bold tracking-tight uppercase font-sans truncate ${isActive ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {stage.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans font-medium truncate">{stage.desc}</p>
            </div>
          );
        })}
      </div>

      {pipelineLogs.length > 0 && (
        <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-md p-2 text-[11px] font-mono text-slate-700 truncate flex items-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
          <span className="truncate">{pipelineLogs[0]}</span>
        </div>
      )}
    </div>
  );
};
