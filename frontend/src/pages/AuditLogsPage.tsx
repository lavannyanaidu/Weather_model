import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { History, Search } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 font-sans">
        <div>
          <div className="flex items-center gap-2 font-sans">
            <History className="w-6 h-6 text-slate-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Operational Audit History Logs
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Immutable log ledger of all operator actions, AI redundancy filtering, triage verifications, and alert escalations
          </p>
        </div>

        {/* Search */}
        <div className="relative w-64 font-sans">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search actor, action, target..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs font-sans">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider font-sans">
              <tr>
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Timestamp (IST)</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Asset</th>
                <th className="py-3 px-4">Operational Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{log.id}</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <div className="font-bold text-slate-900 font-sans">{log.actor}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{log.role}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-sans font-bold text-[10px] px-2 py-0.5 rounded border ${
                        log.severity === 'critical'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : log.severity === 'warning'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-800">{log.target}</td>
                  <td className="py-3 px-4 text-slate-600 leading-relaxed font-sans">{log.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
