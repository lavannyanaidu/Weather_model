import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCheck, AlertTriangle, Info, Zap, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsRead } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-sans">
              Operational Stream ({unreadCount} Unread)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markNotificationsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark read
              </button>
            )}
            <button onClick={onClose} className="p-1 rounded hover:bg-slate-200 text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((n) => {
            const getIcon = () => {
              switch (n.type) {
                case 'alert':
                  return <AlertTriangle className="w-4 h-4 text-red-600" />;
                case 'event':
                  return <Zap className="w-4 h-4 text-amber-600" />;
                case 'report':
                  return <FileText className="w-4 h-4 text-blue-600" />;
                default:
                  return <Info className="w-4 h-4 text-slate-500" />;
              }
            };

            return (
              <div
                key={n.id}
                onClick={() => {
                  if (n.targetUrl) {
                    navigate(n.targetUrl);
                    onClose();
                  }
                }}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    : 'bg-blue-50/70 border-blue-200 text-slate-900 font-medium shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 mt-0.5">
                    {getIcon()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-sans text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
