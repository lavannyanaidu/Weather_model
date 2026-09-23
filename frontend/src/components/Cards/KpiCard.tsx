import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { formatIndianNumber } from '../../utils/formatters';

interface KpiCardProps {
  title: string;
  value: string | number;
  label?: string;
  trend?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  accentColor?: 'red' | 'cyan' | 'emerald' | 'amber' | 'purple';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  label,
  trend,
  isPositive = true,
  icon: Icon,
  accentColor = 'cyan'
}) => {
  const colorMap = {
    red: 'text-red-700 bg-red-50 border-red-200',
    cyan: 'text-blue-700 bg-blue-50 border-blue-200',
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-700 bg-amber-50 border-amber-200',
    purple: 'text-purple-700 bg-purple-50 border-purple-200'
  };

  const formattedValue = typeof value === 'number' ? formatIndianNumber(value) : value;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans leading-tight">
          {title}
        </span>
        <div className={`p-1.5 rounded-md border flex-shrink-0 ${colorMap[accentColor]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight leading-none">
          {formattedValue}
        </span>
        {trend && (
          <span className={`text-xs font-semibold whitespace-nowrap ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
            {trend}
          </span>
        )}
      </div>

      {label && <div className="mt-1.5 text-[11px] text-slate-500 font-medium font-sans leading-tight">{label}</div>}
    </div>
  );
};
