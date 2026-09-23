import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProfileModal } from '../Profile/ProfileModal';
import { NotificationDrawer } from '../NotificationDrawer';
import { Search, Bell, RefreshCw, AlertCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const { simulateLiveReport, isSimulating, globalSearch, setGlobalSearch, notifications } = useApp();
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'National Command Center';
      case '/reports':
        return 'Incoming Weather Observations Feed';
      case '/events':
        return 'Weather Events Catalog';
      case '/map':
        return 'National GIS Weather Map';
      case '/analytics':
        return 'Pan-India Weather Analytics';
      case '/ai':
        return 'Multimodal AI Evidence & Verification Engine';
      case '/sources':
        return 'Data Sources & Ingestion Telemetry';
      case '/alerts':
        return 'Operational Alert Center';
      case '/admin':
        return 'Triage & Redundancy Review Admin';
      case '/audit':
        return 'Operational Audit Logs';
      case '/system':
        return 'System Telemetry & Mission Control';
      case '/settings':
        return 'Platform Configuration Settings';
      case '/profile':
        return 'Officer Profile Workspace';
      default:
        if (pathname.startsWith('/reports/')) return 'Observation Investigation Details';
        if (pathname.startsWith('/events/')) return 'Event Intelligence Analysis';
        return 'Weather Intelligence Command Center';
    }
  };

  return (
    <>
      <header className="h-14 bg-white border-b border-stone-200 px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs font-sans">
        {/* Left: Page Title & Global Demo Badge */}
        <div className="flex items-center gap-3 font-sans">
          <h1 className="text-base font-bold text-stone-900 tracking-tight m-0 font-sans">
            {getPageTitle(location.pathname)}
          </h1>

          {/* Prominent GLOBAL DEMO MODE Indicator */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-bold uppercase tracking-wider font-sans">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            SIMULATED DEMO ENVIRONMENT
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 font-sans">
          {/* Simulate Live Report Action Button */}
          <button
            onClick={simulateLiveReport}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all shadow-xs font-sans ${
              isSimulating
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
            }`}
            title="Inject simulated live citizen / radar weather observation packet"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Processing Pipeline...' : 'SIMULATE INCOMING OBSERVATION'}
          </button>

          {/* Live Clock Indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-stone-100 rounded-md border border-stone-200 text-xs font-sans">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-emerald-700 font-bold font-sans">LIVE STREAM</span>
            <span className="text-stone-500 text-[11px] border-l border-stone-300 pl-2 font-mono font-bold">{currentTime}</span>
          </div>

          {/* Global Search Bar */}
          <div className="hidden lg:flex items-center relative font-sans">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search observation, event, city..."
              className="w-48 bg-stone-100 border border-stone-200 rounded-md pl-8 pr-3 py-1 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors font-sans"
            />
          </div>

          {/* Operational Notifications Trigger */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-1.5 rounded-md bg-stone-100 border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors font-sans"
            title="View Operational Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white font-sans">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Trigger */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200 font-sans">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-xs shadow-2xs transition-all hover:scale-105 font-sans"
              title="Dr. Rajesh Sharma (Chief Operational Meteorologist)"
            >
              RS
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Notification Drawer */}
      <NotificationDrawer isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />

      {/* Officer Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};
