import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Sliders, Moon, Sun, Bell } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userSettings, updateSettings, themeMode, toggleThemeMode } = useApp();

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 font-sans">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-700" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Platform Configuration & AI Parameters
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-sans">
          Adjust operational thresholds, GIS default layers, dark/light themes, and notification preferences
        </p>
      </div>

      <div className="space-y-6 font-sans">
        {/* Section 1: Display & Theme Preferences */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-600" /> Display & UI Preferences
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Theme Mode</div>
              <div className="text-[11px] text-slate-500">Toggle between Light Cream & Operational Dark Mode</div>
            </div>
            <button
              onClick={toggleThemeMode}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2 shadow-xs"
            >
              {themeMode === 'dark' ? <Moon className="w-3.5 h-3.5 text-purple-300" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span>{themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-800">Compact Density Mode</div>
              <div className="text-[11px] text-slate-500">Reduce table row padding for high-density command center screens</div>
            </div>
            <input
              type="checkbox"
              checked={userSettings.compactMode}
              onChange={(e) => updateSettings({ compactMode: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-slate-800">GIS Map Default Base Layer</div>
              <div className="text-[11px] text-slate-500">Select initial weather overlay rendered on National Map</div>
            </div>
            <select
              value={userSettings.mapDefaultLayer}
              onChange={(e) => updateSettings({ mapDefaultLayer: e.target.value as any })}
              className="px-3 py-1 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-blue-500 font-sans font-medium"
            >
              <option value="Events">Weather Events</option>
              <option value="Reports">Citizen Reports</option>
              <option value="Heatmap">Weather Heatmap</option>
              <option value="Rainfall">Rainfall Radar</option>
              <option value="Temperature">Temperature Grid</option>
              <option value="Wind">Wind Vectors</option>
            </select>
          </div>
        </div>

        {/* Section 2: AI Verification Thresholds */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" /> AI Verification & Redundancy Thresholds
          </h2>

          <div className="space-y-3 font-sans">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>AI Auto-Verification Confidence Threshold</span>
                <span className="font-bold text-emerald-700 font-sans">{userSettings.aiConfidenceThresholdPct}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={userSettings.aiConfidenceThresholdPct}
                onChange={(e) => updateSettings({ aiConfidenceThresholdPct: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Observations above this threshold receive automated verification badge.</p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Flagging Review Threshold</span>
                <span className="font-bold text-red-700 font-sans">{userSettings.suspicionThresholdPct}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                value={userSettings.suspicionThresholdPct}
                onChange={(e) => updateSettings({ suspicionThresholdPct: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Observations with reliability scores below this value enter AI triage queue.</p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Redundancy Correlation Similarity Threshold</span>
                <span className="font-bold text-amber-700 font-sans">{userSettings.duplicateThresholdPct}%</span>
              </div>
              <input
                type="range"
                min="75"
                max="98"
                value={userSettings.duplicateThresholdPct}
                onChange={(e) => updateSettings({ duplicateThresholdPct: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Cosine vector similarity cutoff for automatic redundancy filtering.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Operational Stream Notifications */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" /> Operational Alert Notifications
          </h2>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-slate-800">Enable Live Audio & Pop-up Notifications</div>
              <div className="text-[11px] text-slate-500">Play alert sound when high severity cloudburst or cyclone observations arrive</div>
            </div>
            <input
              type="checkbox"
              checked={userSettings.notificationsEnabled}
              onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
