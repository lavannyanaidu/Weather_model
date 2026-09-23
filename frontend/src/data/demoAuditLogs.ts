import type { AuditLog } from '../types';

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-09-23T22:45:12Z',
    actor: 'Dr. Rajesh Sharma',
    role: 'Chief Operational Meteorologist',
    action: 'VERIFY_REPORT',
    target: 'REP-HYD-101',
    result: 'Report status updated to VERIFIED. Event EVENT-HYD-001 total count updated.',
    severity: 'info'
  },
  {
    id: 'AUD-902',
    timestamp: '2026-09-23T22:40:02Z',
    actor: 'Dr. Rajesh Sharma',
    role: 'Chief Operational Meteorologist',
    action: 'VERIFY_REPORT',
    target: 'REP-MUM-102',
    result: 'Report status updated to VERIFIED. Event EVENT-MUM-002 confidence score escalated to 98%.',
    severity: 'info'
  },
  {
    id: 'AUD-903',
    timestamp: '2026-09-23T22:38:15Z',
    actor: 'System AI Engine',
    role: 'Automated Deduplication Pipeline',
    action: 'CLUSTER_DUPLICATES',
    target: 'DUP-001',
    result: 'Created duplicate cluster DUP-001 containing 18 report items for Kukatpally waterlogging.',
    severity: 'info'
  },
  {
    id: 'AUD-904',
    timestamp: '2026-09-23T22:30:10Z',
    actor: 'Officer Anita Verma',
    role: 'National Weather Analyst',
    action: 'FLAG_SUSPICIOUS',
    target: 'REP-SUSP-106',
    result: 'Report marked SUSPICIOUS due to 96% SigLIP match with 2018 archive flood stock photo.',
    severity: 'warning'
  },
  {
    id: 'AUD-905',
    timestamp: '2026-09-23T22:25:00Z',
    actor: 'Officer Vikram Singh',
    role: 'Triage Officer (Zone-North)',
    action: 'ACKNOWLEDGE_ALERT',
    target: 'ALERT-003',
    result: 'Acknowledged severe cyclone velocity alert for Visakhapatnam port region.',
    severity: 'info'
  },
  {
    id: 'AUD-906',
    timestamp: '2026-09-23T22:20:05Z',
    actor: 'Dr. Rajesh Sharma',
    role: 'Chief Operational Meteorologist',
    action: 'VERIFY_REPORT',
    target: 'REP-DEL-104',
    result: 'Verified dust storm video report using VideoMAE V2 temporal confidence & CPCB PM10 telemetries.',
    severity: 'info'
  },
  {
    id: 'AUD-907',
    timestamp: '2026-09-23T22:15:30Z',
    actor: 'System AI Engine',
    role: 'Event Fusion Module',
    action: 'AUTO_FUSE_EVENT',
    target: 'EVENT-GAU-008',
    result: 'Fused 92 multi-source landslide reports into master event record EVENT-GAU-008.',
    severity: 'info'
  },
  {
    id: 'AUD-908',
    timestamp: '2026-09-23T22:10:00Z',
    actor: 'Officer Anita Verma',
    role: 'National Weather Analyst',
    action: 'MERGE_EVENTS',
    target: 'EVENT-HYD-002 -> EVENT-HYD-001',
    result: 'Merged secondary Miyapur rain cluster EVENT-HYD-002 into master Kukatpally event EVENT-HYD-001.',
    severity: 'info'
  },
  {
    id: 'AUD-909',
    timestamp: '2026-09-23T22:05:00Z',
    actor: 'System Watchdog',
    role: 'Telemetry Daemon',
    action: 'SOURCE_STATUS_CHANGE',
    target: 'SRC-NEWS-008',
    result: 'Source status changed to DEGRADED due to elevated HTTP response latency (820ms).',
    severity: 'warning'
  },
  {
    id: 'AUD-910',
    timestamp: '2026-09-23T22:00:00Z',
    actor: 'Dr. Rajesh Sharma',
    role: 'Chief Operational Meteorologist',
    action: 'UPDATE_AI_THRESHOLDS',
    target: 'System Settings',
    result: 'Updated AI confidence verification threshold from 85% to 88%. Saved to platform state.',
    severity: 'info'
  }
];

// Generate up to 55 records
for (let i = 11; i <= 55; i++) {
  DEMO_AUDIT_LOGS.push({
    id: `AUD-${900 + i}`,
    timestamp: new Date(Date.now() - (i * 240000)).toISOString(),
    actor: i % 2 === 0 ? 'Dr. Rajesh Sharma' : (i % 3 === 0 ? 'Officer Anita Verma' : 'System AI Engine'),
    role: i % 2 === 0 ? 'Chief Operational Meteorologist' : 'National Weather Analyst',
    action: i % 4 === 0 ? 'VERIFY_REPORT' : (i % 3 === 0 ? 'MARK_DUPLICATE' : 'ACKNOWLEDGE_ALERT'),
    target: `REP-IND-${100 + i}`,
    result: `Operational action recorded successfully for target asset item #${100 + i}.`,
    severity: i % 6 === 0 ? 'warning' : 'info'
  });
}
