import React from 'react';
import type { SeverityLevel, VerificationStatus } from '../../types';

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const styles: Record<SeverityLevel, string> = {
    Critical: 'bg-red-50 text-red-700 border-red-200 font-bold',
    High: 'bg-orange-50 text-orange-700 border-orange-200 font-bold',
    Warning: 'bg-amber-50 text-amber-700 border-amber-200 font-bold',
    Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs border ${styles[severity]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        severity === 'Critical' ? 'bg-red-600 animate-pulse' :
        severity === 'High' ? 'bg-orange-600' :
        severity === 'Warning' ? 'bg-amber-600' : 'bg-emerald-600'
      }`} />
      {severity}
    </span>
  );
};

interface VerificationBadgeProps {
  status: VerificationStatus;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status }) => {
  const styles: Record<VerificationStatus, string> = {
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    Suspicious: 'bg-red-50 text-red-700 border-red-200 font-medium',
    Duplicate: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    Pending: 'bg-blue-50 text-blue-700 border-blue-200 font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'Verified' ? 'bg-emerald-600' :
        status === 'Suspicious' ? 'bg-red-600' :
        status === 'Duplicate' ? 'bg-amber-600' : 'bg-blue-600'
      }`} />
      {status}
    </span>
  );
};
