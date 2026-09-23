import type { AlertItem } from '../types';

export const DEMO_ALERTS: AlertItem[] = [
  {
    id: 'ALERT-001',
    title: 'Flash Flood Spike Warning — Kukatpally, Hyderabad',
    type: 'Critical',
    message: 'Rapid surge in high-severity waterlogging reports (over 3ft) within 15 minutes in Kukatpally & Miyapur metro corridor.',
    timestamp: '2026-09-23T22:46:00Z',
    status: 'Active',
    location: 'Hyderabad, Telangana',
    eventId: 'EVENT-HYD-001',
    reportId: 'REP-HYD-101'
  },
  {
    id: 'ALERT-002',
    title: 'High Tide & Extreme Downpour Alert — Dadar, Mumbai',
    type: 'Critical',
    message: 'Continuous monsoon rainfall (180mm/6h) synchronizing with Arabian Sea high tide (4.2m) at 23:15 IST.',
    timestamp: '2026-09-23T22:41:00Z',
    status: 'Active',
    location: 'Mumbai, Maharashtra',
    eventId: 'EVENT-MUM-002',
    reportId: 'REP-MUM-102'
  },
  {
    id: 'ALERT-003',
    title: 'Severe Cyclone Wind Velocity — Visakhapatnam',
    type: 'Critical',
    message: 'Coastal anemometer sensors registering wind gusts exceeding 100 km/h. Red alert for Gangavaram Port operations.',
    timestamp: '2026-09-23T22:36:00Z',
    status: 'Active',
    location: 'Visakhapatnam, Andhra Pradesh',
    eventId: 'EVENT-VTZ-007',
    reportId: 'REP-VTZ-103'
  },
  {
    id: 'ALERT-004',
    title: 'Mountain Highway Landslide Blockade — Guwahati',
    type: 'Critical',
    message: 'Kamakhya Temple Hill road completely obstructed by mudslide debris following heavy rainfall.',
    timestamp: '2026-09-23T22:12:00Z',
    status: 'Active',
    location: 'Guwahati, Assam',
    eventId: 'EVENT-GAU-008',
    reportId: 'REP-GAU-105'
  },
  {
    id: 'ALERT-005',
    title: 'Recycled Disaster Media Flagged — Hyderabad',
    type: 'AI',
    message: 'SigLIP 2 visual deduplication engine flagged report REP-SUSP-106 (96% image match with 2018 flood archive dataset).',
    timestamp: '2026-09-23T22:06:00Z',
    status: 'Active',
    location: 'Hyderabad, Telangana',
    eventId: 'EVENT-HYD-001',
    reportId: 'REP-SUSP-106'
  },
  {
    id: 'ALERT-006',
    title: 'High Volume Duplicate Cluster (DUP-001) Detected',
    type: 'AI',
    message: 'Deduplication engine grouped 18 duplicate citizen tweets regarding Kukatpally metro pillar 740 into cluster DUP-001.',
    timestamp: '2026-09-23T22:43:00Z',
    status: 'Active',
    location: 'Hyderabad, Telangana',
    eventId: 'EVENT-HYD-001'
  },
  {
    id: 'ALERT-007',
    title: 'News Wire Aggregator Scraping Latency Degradation',
    type: 'System',
    message: 'Source SRC-NEWS-008 ingestion latency increased to 820ms due to upstream RSS rate limiting.',
    timestamp: '2026-09-23T22:48:00Z',
    status: 'Active',
    location: 'National System Node'
  },
  {
    id: 'ALERT-008',
    title: 'Prakasam Barrage Level Warning — Vijayawada',
    type: 'Critical',
    message: 'Krishna river discharge crossed 4.5 lakh cusecs threshold. Flood alert Level-2 hoisted.',
    timestamp: '2026-09-23T22:40:00Z',
    status: 'Active',
    location: 'Vijayawada, Andhra Pradesh',
    eventId: 'EVENT-VJA-022'
  },
  {
    id: 'ALERT-009',
    title: 'Dense Fog Low Highway Visibility — Lucknow',
    type: 'Warning',
    message: 'Radiation fog reducing visibility to below 50 meters along Agra-Lucknow Expressway toll plaza.',
    timestamp: '2026-09-23T22:30:00Z',
    status: 'Active',
    location: 'Lucknow, Uttar Pradesh',
    eventId: 'EVENT-LKO-014'
  },
  {
    id: 'ALERT-010',
    title: 'Jhelum River Water Level Surge — Srinagar',
    type: 'Critical',
    message: 'Upper-catchment cloudburst near Sonamarg causing rapid water level surge in Jhelum river tributaries.',
    timestamp: '2026-09-23T22:25:00Z',
    status: 'Active',
    location: 'Srinagar, Jammu & Kashmir',
    eventId: 'EVENT-SXR-015'
  }
];

// Add 20 more alerts to complete 30+ items
for (let i = 11; i <= 32; i++) {
  const types: Array<'Critical' | 'Warning' | 'System' | 'AI' | 'Source'> = ['Warning', 'System', 'AI', 'Source', 'Warning'];
  const type = types[i % types.length];
  DEMO_ALERTS.push({
    id: `ALERT-${i < 100 ? (i < 10 ? '00' + i : '0' + i) : i}`,
    title: `${type} Alert #${i}: Weather Anomaly Detected`,
    type: type,
    message: `Automated monitoring alert triggered by threshold condition on sensor payload node ${i * 7}.`,
    timestamp: new Date(Date.now() - (i * 300000)).toISOString(),
    status: i % 4 === 0 ? 'Acknowledged' : 'Active',
    location: `Sector ${i % 15}, Region ${i % 5}`
  });
}
