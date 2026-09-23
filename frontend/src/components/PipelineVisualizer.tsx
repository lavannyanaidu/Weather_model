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
    { id: 5, name: 'SOURCE & EVIDENCE ANALYSIS', desc: 'Reliability & corroboration' },
    { id: 6, name: 'EVENT FUSION', desc: 'Cluster intelligence' }
  ];

  // Map 12 pipeline sub-steps to 6 visual stages
  const activeStageId = isSimulating
    ? Math.min(Math.ceil(currentPipelineStage / 2), 6)
    : 0;

  const progressPercent = isSimulating ? Math.min((currentPipelineStage / 12) * 100, 100) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 mb-4 shadow-2xs font-sans card-hover-subtle">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${isSimulating ? 'text-blue-600 animate-spin' : 'text-slate-500'}`} />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            REAL-TIME INTELLIGENCE PIPELINE <span className="text-slate-500 font-normal text-[11px]">(WeatherFusion AI Engine)</span>
          </h3>
        </div>
        {isSimulating ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-sans shadow-2xs">
            <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
            Processing Stage {activeStageId}/6
          </span>
        ) : (
          <span className="text-[11px] text-slate-600 font-sans font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 subtle-pulse-dot" />
            Status: Operational Stream Active
          </span>
        )}
      </div>

      {/* Progress Line Bar */}
      <div className="relative w-full h-1 bg-slate-100 rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: isSimulating ? `${progressPercent}%` : '100%' }}
        />
      </div>

      {/* 6 Pipeline Stage Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {stages.map((stage) => {
          const isActive = activeStageId === stage.id;
          const isCompleted = isSimulating ? activeStageId > stage.id : true;

          return (
            <div
              key={stage.id}
              className={`p-2.5 rounded-md border text-center transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100 shadow-2xs scale-[1.02]'
                  : isCompleted
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                {isActive ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin flex-shrink-0" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-[9px] flex items-center justify-center font-sans text-slate-500 font-semibold flex-shrink-0">
                    {stage.id}
                  </span>
                )}
                <span className={`text-[10px] font-bold tracking-tight uppercase font-sans truncate ${
                  isActive ? 'text-blue-800 font-extrabold' : isCompleted ? 'text-emerald-800' : 'text-slate-600'
                }`}>
                  {stage.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans font-medium truncate">{stage.desc}</p>
            </div>
          );
        })}
      </div>

      {pipelineLogs.length > 0 && (
        <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-md p-2 text-[11px] font-sans text-slate-700 truncate flex items-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
          <span className="truncate font-medium">{pipelineLogs[0]}</span>
        </div>
      )}
    </div>
  );
};

