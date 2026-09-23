import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { CommandCenter } from './pages/CommandCenter';
import { LiveReports } from './pages/LiveReports';
import { ReportDetails } from './pages/ReportDetails';
import { WeatherEvents } from './pages/WeatherEvents';
import { EventIntelligence } from './pages/EventIntelligence';
import { NationalMapPage } from './pages/NationalMapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AiVerificationPage } from './pages/AiVerificationPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { AlertsPage } from './pages/AlertsPage';
import { AdminPanel } from './pages/AdminPanel';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SystemHealthPage } from './pages/SystemHealthPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<CommandCenter />} />
        <Route path="/reports" element={<LiveReports />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
        <Route path="/events" element={<WeatherEvents />} />
        <Route path="/events/:id" element={<EventIntelligence />} />
        <Route path="/map" element={<NationalMapPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ai" element={<AiVerificationPage />} />
        <Route path="/sources" element={<DataSourcesPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/audit" element={<AuditLogsPage />} />
        <Route path="/system" element={<SystemHealthPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
