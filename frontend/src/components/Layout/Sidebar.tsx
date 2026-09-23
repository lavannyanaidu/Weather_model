import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Zap,
  Map,
  BarChart3,
  BrainCircuit,
  Database,
  BellRing,
  ShieldAlert,
  History,
  Activity,
  Settings,
  UserCheck,
  CloudRain
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { systemHealth } = useApp();

  const mainNav = [
    { label: 'Command Center', path: '/', icon: LayoutDashboard },
    { label: 'Incoming Observations', path: '/reports', icon: FileText },
    { label: 'Weather Events', path: '/events', icon: Zap },
    { label: 'National Map', path: '/map', icon: Map },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 }
  ];

  const intelligenceNav = [
    { label: 'AI Verification', path: '/ai', icon: BrainCircuit },
    { label: 'Data Sources', path: '/sources', icon: Database },
    { label: 'Alert Center', path: '/alerts', icon: BellRing }
  ];

  const governanceNav = [
    { label: 'Admin & Triage', path: '/admin', icon: ShieldAlert },
    { label: 'Audit Logs', path: '/audit', icon: History }
  ];

  const systemNav = [
    { label: 'System Health', path: '/system', icon: Activity },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Officer Profile', path: '/profile', icon: UserCheck }
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-40 flex-shrink-0 font-sans">
      {/* Product Branding Header */}
      <div className="h-14 px-4 border-b border-slate-200 flex items-center gap-2.5 bg-slate-50/50">
        <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 shadow-2xs">
          <CloudRain className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <div className="text-xs font-extrabold text-slate-900 tracking-wider uppercase leading-tight font-sans">
            WEATHER INTELLIGENCE
          </div>
          <div className="text-[10px] text-slate-500 font-bold tracking-wider uppercase font-sans">
            IMD / MoES PLATFORM
          </div>
        </div>
      </div>

      {/* Navigation Menu with Logical Categorization */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto font-sans">
        {/* Section 1: Operational Views */}
        <div>
          <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            Operational Core
          </div>
          <div className="space-y-0.5">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 sidebar-item-hover font-sans ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 sidebar-icon transition-transform duration-150" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Section 2: AI & Intelligence */}
        <div>
          <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            AI & Intelligence
          </div>
          <div className="space-y-0.5">
            {intelligenceNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 sidebar-item-hover font-sans ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 sidebar-icon transition-transform duration-150" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Section 3: Governance & Triage */}
        <div>
          <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            Governance & Triage
          </div>
          <div className="space-y-0.5">
            {governanceNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 sidebar-item-hover font-sans ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 sidebar-icon transition-transform duration-150" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Section 4: System Management */}
        <div>
          <div className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
            System Platform
          </div>
          <div className="space-y-0.5">
            {systemNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 sidebar-item-hover font-sans ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 sidebar-icon transition-transform duration-150" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Section: System Status */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2 font-sans">
        <div className="p-2.5 rounded-md bg-white border border-slate-200 text-xs shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1 font-sans">
              <Activity className="w-3 h-3 text-emerald-600" /> SYSTEM STATUS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 subtle-pulse-dot"></span>
          </div>
          <div className="text-[11px] text-slate-700 flex items-center justify-between font-sans">
            <span>Ingestion & AI:</span>
            <span className="text-emerald-700 font-bold font-sans">{systemHealth.data_ingestion}</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-center font-sans font-medium pt-1">
          MoES SIH26069 v1.0.4 Demo
        </div>
      </div>
    </aside>
  );
};

