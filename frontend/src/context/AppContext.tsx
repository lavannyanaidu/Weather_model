import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  WeatherReport, 
  WeatherEvent, 
  DataSource, 
  AlertItem, 
  AuditLog, 
  SystemStatus, 
  NotificationItem, 
  DuplicateCluster, 
  SourceReliabilityRecord,
  UserSettings
} from '../types';

import { demoDataService, PIPELINE_STAGES } from '../services/demoDataService';

interface AppContextType {
  reports: WeatherReport[];
  events: WeatherEvent[];
  sources: DataSource[];
  alerts: AlertItem[];
  auditLogs: AuditLog[];
  systemHealth: SystemStatus;
  notifications: NotificationItem[];
  duplicateClusters: DuplicateCluster[];
  sourceReliability: SourceReliabilityRecord[];
  userSettings: UserSettings;
  pipelineLogs: string[];
  currentPipelineStage: number; // 0 to 12
  isSimulating: boolean;
  themeMode: 'dark' | 'light';
  globalSearch: string;
  setGlobalSearch: (term: string) => void;
  toggleThemeMode: () => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  kpis: {
    activeEvents: number;
    reportsIngested: number;
    reportsProcessed: number;
    verifiedReports: number;
    suspiciousReports: number;
    duplicatesRemoved: number;
    statesReporting: number;
    activeSources: number;
  };
  simulateLiveReport: () => Promise<void>;
  verifyReport: (id: string) => void;
  markSuspicious: (id: string) => void;
  markDuplicate: (id: string) => void;
  mergeEvents: (sourceId: string, targetId: string) => void;
  acknowledgeAlert: (id: string) => void;
  escalateAlert: (id: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  markNotificationsRead: () => void;
  mergeDuplicateCluster: (clusterId: string) => void;
  markClusterUnique: (clusterId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<WeatherReport[]>(() => demoDataService.getReports());
  const [events, setEvents] = useState<WeatherEvent[]>(() => demoDataService.getEvents());
  const [sources] = useState<DataSource[]>(() => demoDataService.getSources());
  const [alerts, setAlerts] = useState<AlertItem[]>(() => demoDataService.getAlerts());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => demoDataService.getAuditLogs());
  const [systemHealth] = useState<SystemStatus>(() => demoDataService.getSystemHealth());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => demoDataService.getNotifications());
  const [duplicateClusters, setDuplicateClusters] = useState<DuplicateCluster[]>(() => demoDataService.getDuplicateClusters());
  const [sourceReliability] = useState<SourceReliabilityRecord[]>(() => demoDataService.getSourceReliability());
  const [userSettings, setUserSettingsState] = useState<UserSettings>(() => demoDataService.getUserSettings());
  
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    '[SYSTEM] National Weather Big Data Analytics Platform operational.',
    '[INGESTION] Multi-source ingestion active across 15 pan-India feeds.',
    '[AI FUSION] ModernBERT, SigLIP 2 & PaddleOCR-VL model weights loaded.'
  ]);
  const [currentPipelineStage, setCurrentPipelineStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sih_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('sih_theme', next);
      return next;
    });
  };

  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, [themeMode]);

  // Dynamic national KPI calculations from centralized state
  const kpis = {
    activeEvents: events.filter((e) => e.status === 'Active').length,
    reportsIngested: 2840000 + reports.length * 10,
    reportsProcessed: 2413000 + reports.length * 8,
    verifiedReports: reports.filter((r) => r.verificationStatus === 'Verified' || r.verification_status === 'Verified').length + 2145000,
    suspiciousReports: reports.filter((r) => r.verificationStatus === 'Suspicious' || r.verification_status === 'Suspicious').length + 68000,
    duplicatesRemoved: reports.filter((r) => r.verificationStatus === 'Duplicate' || r.verification_status === 'Duplicate').length + 318000,
    statesReporting: new Set(reports.map((r) => r.state)).size,
    activeSources: sources.filter((s) => s.status === 'Healthy').length
  };

  const simulateLiveReport = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    demoDataService.generateLiveReport();

    // 12-stage animated pipeline simulation
    for (let stage = 1; stage <= 12; stage++) {
      setCurrentPipelineStage(stage);
      const stageInfo = PIPELINE_STAGES[stage - 1];
      setPipelineLogs((prev) => [
        `[STAGE ${stage}/12] ${stageInfo.name}: ${stageInfo.details}`,
        ...prev.slice(0, 25)
      ]);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // Refresh state from demo service
    setReports([...demoDataService.getReports()]);
    setEvents([...demoDataService.getEvents()]);
    setAuditLogs([...demoDataService.getAuditLogs()]);
    setNotifications([...demoDataService.getNotifications()]);

    setTimeout(() => {
      setCurrentPipelineStage(0);
      setIsSimulating(false);
    }, 800);
  };

  const verifyReport = (id: string) => {
    const nowIso = new Date().toISOString();
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verificationStatus: 'Verified', verification_status: 'Verified', processingStatus: 'VERIFIED' } : r))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-ACT-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'VERIFY_REPORT',
        target: id,
        result: `Report ${id} verified manually by operator.`,
        severity: 'info'
      },
      ...prev
    ]);
  };

  const markSuspicious = (id: string) => {
    const nowIso = new Date().toISOString();
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verificationStatus: 'Suspicious', verification_status: 'Suspicious' } : r))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-ACT-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'MARK_SUSPICIOUS',
        target: id,
        result: `Report ${id} flagged as SUSPICIOUS.`,
        severity: 'warning'
      },
      ...prev
    ]);
  };

  const markDuplicate = (id: string) => {
    const nowIso = new Date().toISOString();
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, verificationStatus: 'Duplicate', verification_status: 'Duplicate' } : r))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-ACT-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'MARK_DUPLICATE',
        target: id,
        result: `Report ${id} tagged as DUPLICATE.`,
        severity: 'info'
      },
      ...prev
    ]);
  };

  const mergeEvents = (sourceId: string, targetId: string) => {
    const nowIso = new Date().toISOString();
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === sourceId) return { ...e, status: 'Merged' as const };
        if (e.id === targetId) {
          const source = prev.find((s) => s.id === sourceId);
          return {
            ...e,
            totalReports: e.totalReports + (source ? source.totalReports : 0),
            total_reports: (e.totalReports || 0) + (source ? source.totalReports : 0),
            lastUpdated: nowIso,
            last_updated: nowIso
          };
        }
        return e;
      })
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-MERGE-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'MERGE_EVENTS',
        target: `${sourceId} -> ${targetId}`,
        result: `Weather event ${sourceId} merged into primary event ${targetId}.`,
        severity: 'info'
      },
      ...prev
    ]);
  };

  const acknowledgeAlert = (id: string) => {
    const nowIso = new Date().toISOString();
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Acknowledged' as const } : a))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-ALERT-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'ACKNOWLEDGE_ALERT',
        target: id,
        result: `Operational alert ${id} acknowledged.`,
        severity: 'info'
      },
      ...prev
    ]);
  };

  const escalateAlert = (id: string) => {
    const nowIso = new Date().toISOString();
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Escalated' as const } : a))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-ALERT-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'ESCALATE_ALERT',
        target: id,
        result: `Operational alert ${id} escalated to NDMA Command Center.`,
        severity: 'critical'
      },
      ...prev
    ]);
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setUserSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const mergeDuplicateCluster = (clusterId: string) => {
    const nowIso = new Date().toISOString();
    setDuplicateClusters((prev) =>
      prev.map((c) => (c.clusterId === clusterId ? { ...c, status: 'Merged' as const } : c))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-CLUST-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'MERGE_DUPLICATE_CLUSTER',
        target: clusterId,
        result: `Duplicate cluster ${clusterId} merged into primary record.`,
        severity: 'info'
      },
      ...prev
    ]);
  };

  const markClusterUnique = (clusterId: string) => {
    const nowIso = new Date().toISOString();
    setDuplicateClusters((prev) =>
      prev.map((c) => (c.clusterId === clusterId ? { ...c, status: 'MarkedUnique' as const } : c))
    );
    setAuditLogs((prev) => [
      {
        id: `AUD-CLUST-${Date.now()}`,
        timestamp: nowIso,
        actor: 'Dr. Rajesh Sharma',
        role: 'Chief Operational Meteorologist',
        action: 'MARK_CLUSTER_UNIQUE',
        target: clusterId,
        result: `Duplicate cluster ${clusterId} marked as unique reports.`,
        severity: 'info'
      },
      ...prev
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        reports,
        events,
        sources,
        alerts,
        auditLogs,
        systemHealth,
        notifications,
        duplicateClusters,
        sourceReliability,
        userSettings,
        pipelineLogs,
        currentPipelineStage,
        isSimulating,
        themeMode,
        globalSearch,
        setGlobalSearch,
        toggleThemeMode,
        selectedEventId,
        setSelectedEventId,
        selectedReportId,
        setSelectedReportId,
        kpis,
        simulateLiveReport,
        verifyReport,
        markSuspicious,
        markDuplicate,
        mergeEvents,
        acknowledgeAlert,
        escalateAlert,
        updateSettings,
        markNotificationsRead,
        mergeDuplicateCluster,
        markClusterUnique
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
