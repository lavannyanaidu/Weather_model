import React, { useState, useEffect, useRef } from 'react';
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

  const isNumeric = typeof value === 'number';
  const targetNum = isNumeric ? (value as number) : 0;
  const [displayNum, setDisplayNum] = useState<number>(() => (isNumeric ? 0 : 0));
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const prevValueRef = useRef<string | number>(value);
  const hasLoadedRef = useRef<boolean>(false);

  // Initial Count-Up Animation on Mount
  useEffect(() => {
    if (!isNumeric) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayNum(targetNum);
      hasLoadedRef.current = true;
      return;
    }

    if (!hasLoadedRef.current) {
      const duration = 700; // ms
      const startTime = performance.now();
      const startNum = Math.floor(targetNum * 0.4);

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(startNum + (targetNum - startNum) * easeProgress);

        setDisplayNum(currentVal);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayNum(targetNum);
          hasLoadedRef.current = true;
        }
      };

      requestAnimationFrame(step);
    } else if (prevValueRef.current !== value) {
      // Trigger subtle flash animation on value change
      setDisplayNum(targetNum);
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 600);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value, isNumeric, targetNum]);

  const formattedValue = isNumeric
    ? formatIndianNumber(hasLoadedRef.current ? targetNum : displayNum)
    : value;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs hover:border-slate-300 card-hover-subtle flex flex-col justify-between group font-sans">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans leading-tight">
          {title}
        </span>
        <div className={`p-1.5 rounded-md border flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${colorMap[accentColor]}`}>
          <Icon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-2">
        <span
          className={`text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight leading-none transition-colors ${
            isFlashing ? 'text-blue-700 metric-updated-flash' : ''
          }`}
        >
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

