import type { WeatherReport } from '../types';

export const DEMO_REPORTS: WeatherReport[] = [
  {
    id: 'REP-HYD-101',
    timestamp: '2026-09-23T22:45:10Z',
    source: 'Citizen Report',
    sourceHandle: '@HydCitizenPulse',
    sourceType: 'Citizen Report',
    city: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.4849,
    longitude: 78.4138,
    eventType: 'Flooding',
    event_type: 'Flooding',
    severity: 'Critical',
    verificationStatus: 'Verified',
    verification_status: 'Verified',
    reliabilityScore: 94,
    reliability_score: 94,
    aiConfidence: 96,
    text: 'Waterlogging over 3 feet under Kukatpally flyover near metro pillar 740! Cars stuck, emergency relief vehicles requested immediately. #IMD #HydRains #KukatpallyFloods',
    content: 'Waterlogging over 3 feet under Kukatpally flyover near metro pillar 740! Cars stuck, emergency relief vehicles requested immediately. #IMD #HydRains #KukatpallyFloods',
    hashtags: ['#IMD', '#HydRains', '#KukatpallyFloods'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    ocrText: 'FLASH FLOOD WARNING HYDERABAD - WATER LEVEL 3FT KUKATPALLY',
    ocrConfidence: 97.4,
    ocrBoundingBoxes: [
      { id: 'box-1', text: 'FLASH FLOOD WARNING', confidence: 98.2, box: [10, 15, 65, 18] },
      { id: 'box-2', text: 'HYDERABAD', confidence: 97.5, box: [15, 38, 50, 15] },
      { id: 'box-3', text: 'WATER LEVEL 3FT KUKATPALLY', confidence: 96.5, box: [20, 58, 70, 16] }
    ],
    duplicateScore: 12,
    duplicate_score: 12,
    eventId: 'EVENT-HYD-001',
    event_id: 'EVENT-HYD-001',
    locationConfidence: 98.5,
    severityConfidence: 95.0,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 96.4,
      imageModel: 'SigLIP 2',
      imageConfidence: 94.8,
      videoModel: 'VideoMAE V2',
      videoConfidence: 90.0,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 97.4,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 96.1
    },
    sourceReliability: 92,
    evidence: [
      '✓ Location coordinates match reported Kukatpally GPS region exactly',
      '✓ OCR text explicitly confirms "FLASH FLOOD WARNING HYDERABAD"',
      '✓ Image features dense water accumulation around urban vehicle tires',
      '✓ Timestamp aligns with 142 nearby social media & rain gauge posts',
      '✓ CWR rain gauge station HYD-04 recorded 74mm in past 60 minutes'
    ],
    reasons_trusted: [
      '✓ Location coordinates match reported Kukatpally GPS region exactly',
      '✓ OCR text explicitly confirms "FLASH FLOOD WARNING HYDERABAD"',
      '✓ Image features dense water accumulation around urban vehicle tires'
    ],
    contradictoryEvidence: [
      '! Minor lighting variation between image meta and local solar time (cloud cover reduction factor)'
    ],
    reasons_suspicious: [],
    processingStatus: 'VERIFIED',
    processingTimestamp: '2026-09-23T22:45:12Z'
  },
  {
    id: 'REP-MUM-102',
    timestamp: '2026-09-23T22:40:00Z',
    source: 'Social Media',
    sourceHandle: '@MumbaiRainsLive',
    sourceType: 'Social Media',
    city: 'Mumbai',
    state: 'Maharashtra',
    latitude: 19.0178,
    longitude: 72.8478,
    eventType: 'Heavy Rain',
    event_type: 'Heavy Rain',
    severity: 'Critical',
    verificationStatus: 'Verified',
    verification_status: 'Verified',
    reliabilityScore: 91,
    reliability_score: 91,
    aiConfidence: 97,
    text: 'Continuous heavy downpour in Dadar TT Circle & Kurla West! Water accumulation over 2.5 ft. High tide expected at 23:15 IST. Avoid travel! #IMD #MumbaiRains #Monsoon2026',
    content: 'Continuous heavy downpour in Dadar TT Circle & Kurla West! Water accumulation over 2.5 ft. High tide expected at 23:15 IST. Avoid travel! #IMD #MumbaiRains #Monsoon2026',
    hashtags: ['#IMD', '#MumbaiRains', '#Monsoon2026'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
    ocrText: 'HEAVY RAINFALL ALERT MUMBAI - DADAR & KURLA SECTOR',
    ocrConfidence: 98.1,
    ocrBoundingBoxes: [
      { id: 'box-m1', text: 'HEAVY RAINFALL ALERT', confidence: 99.0, box: [12, 20, 75, 20] },
      { id: 'box-m2', text: 'MUMBAI', confidence: 98.5, box: [25, 45, 45, 18] },
      { id: 'box-m3', text: 'DADAR & KURLA SECTOR', confidence: 96.8, box: [15, 68, 68, 16] }
    ],
    duplicateScore: 8,
    duplicate_score: 8,
    eventId: 'EVENT-MUM-002',
    event_id: 'EVENT-MUM-002',
    locationConfidence: 99.1,
    severityConfidence: 97.4,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 97.8,
      imageModel: 'SigLIP 2',
      imageConfidence: 96.2,
      videoModel: 'VideoMAE V2',
      videoConfidence: 92.4,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 98.1,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 97.2
    },
    sourceReliability: 94,
    evidence: [
      '✓ High volume cross-source verification with 280+ tweets in Dadar region',
      '✓ OCR text explicitly confirms "HEAVY RAINFALL ALERT MUMBAI"',
      '✓ Radar reflectivity from IMD Doppler DWR-Mumbai indicates 85mm/hr cloud cell',
      '✓ High tide timing matches Arabian Sea hydrodynamic tables'
    ],
    reasons_trusted: [
      '✓ High volume cross-source verification with 280+ tweets in Dadar region',
      '✓ OCR text explicitly confirms "HEAVY RAINFALL ALERT MUMBAI"'
    ],
    contradictoryEvidence: [],
    reasons_suspicious: [],
    processingStatus: 'VERIFIED',
    processingTimestamp: '2026-09-23T22:40:02Z'
  },
  {
    id: 'REP-VTZ-103',
    timestamp: '2026-09-23T22:35:00Z',
    source: 'IMD Data Feed',
    sourceHandle: '@IMD_VizagRadar',
    sourceType: 'IMD Data Feed',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    latitude: 17.6868,
    longitude: 83.2185,
    eventType: 'Cyclone',
    event_type: 'Cyclone',
    severity: 'Critical',
    verificationStatus: 'Verified',
    verification_status: 'Verified',
    reliabilityScore: 99,
    reliability_score: 99,
    aiConfidence: 99,
    text: 'Red Alert: Severe Cyclonic Storm approaching North Coastal AP. Wind speeds 95-105 km/h near Visakhapatnam port. Coastal evacuations initiated. #IMD #CycloneWarning #VizagAlert',
    content: 'Red Alert: Severe Cyclonic Storm approaching North Coastal AP. Wind speeds 95-105 km/h near Visakhapatnam port. Coastal evacuations initiated. #IMD #CycloneWarning #VizagAlert',
    hashtags: ['#IMD', '#CycloneWarning', '#VizagAlert'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=800&q=80',
    ocrText: 'CYCLONE WARNING VISAKHAPATNAM - RED ALERT COASTAL SURGE',
    ocrConfidence: 99.2,
    ocrBoundingBoxes: [
      { id: 'box-v1', text: 'CYCLONE WARNING', confidence: 99.5, box: [10, 18, 70, 22] },
      { id: 'box-v2', text: 'VISAKHAPATNAM', confidence: 99.2, box: [15, 44, 60, 18] },
      { id: 'box-v3', text: 'RED ALERT COASTAL SURGE', confidence: 98.8, box: [10, 66, 75, 18] }
    ],
    duplicateScore: 4,
    duplicate_score: 4,
    eventId: 'EVENT-VTZ-007',
    event_id: 'EVENT-VTZ-007',
    locationConfidence: 99.9,
    severityConfidence: 99.0,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 99.1,
      imageModel: 'SigLIP 2',
      imageConfidence: 98.5,
      videoModel: 'VideoMAE V2',
      videoConfidence: 95.0,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 99.2,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 99.0
    },
    sourceReliability: 99,
    evidence: [
      '✓ Official IMD verified digital signature on bulletin payload',
      '✓ INSAT-3D infrared cloud top temperature indicates deep spiral bands',
      '✓ Doppler radar velocity azimuth display confirms 98 km/h wind vector'
    ],
    reasons_trusted: [
      '✓ Official IMD verified digital signature on bulletin payload',
      '✓ INSAT-3D infrared cloud top temperature indicates deep spiral bands'
    ],
    contradictoryEvidence: [],
    reasons_suspicious: [],
    processingStatus: 'VERIFIED',
    processingTimestamp: '2026-09-23T22:35:01Z'
  },
  {
    id: 'REP-DEL-104',
    timestamp: '2026-09-23T22:20:00Z',
    source: 'Social Media',
    sourceHandle: '@DelhiWeatherWatch',
    sourceType: 'Social Media',
    city: 'New Delhi',
    state: 'Delhi',
    latitude: 28.6315,
    longitude: 77.2167,
    eventType: 'Dust Storm',
    event_type: 'Dust Storm',
    severity: 'High',
    verificationStatus: 'Verified',
    verification_status: 'Verified',
    reliabilityScore: 88,
    reliability_score: 88,
    aiConfidence: 92,
    text: 'Blinding dust storm engulfed Central Delhi & Connaught Place! Visibility under 100m, high squall winds pushing dust clouds. #IMD #DelhiDustStorm #WeatherAlert',
    content: 'Blinding dust storm engulfed Central Delhi & Connaught Place! Visibility under 100m, high squall winds pushing dust clouds. #IMD #DelhiDustStorm #WeatherAlert',
    hashtags: ['#IMD', '#DelhiDustStorm', '#WeatherAlert'],
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    ocrText: 'DUST STORM SQUALL ALERT - CONNAUGHT PLACE DELHI VISIBILITY 100M',
    ocrConfidence: 95.8,
    ocrBoundingBoxes: [
      { id: 'box-d1', text: 'DUST STORM SQUALL ALERT', confidence: 96.5, box: [15, 20, 70, 20] },
      { id: 'box-d2', text: 'VISIBILITY 100M', confidence: 95.0, box: [20, 50, 55, 18] }
    ],
    videoFrames: [
      { frameId: 'f-1', frameNumber: 1, timestamp: '00:01', textDetected: 'SQUALL WARNING DELHI', ocrConfidence: 96.2 },
      { frameId: 'f-2', frameNumber: 12, timestamp: '00:04', textDetected: 'VISIBILITY REDUCTION <100M', ocrConfidence: 95.1 },
      { frameId: 'f-3', frameNumber: 24, timestamp: '00:08', textDetected: 'HIGH SQUALL WINDS CP', ocrConfidence: 94.8 },
      { frameId: 'f-4', frameNumber: 36, timestamp: '00:12', textDetected: 'DUST CLOUD ADVANCING', ocrConfidence: 93.9 }
    ],
    duplicateScore: 10,
    duplicate_score: 10,
    eventId: 'EVENT-DEL-003',
    event_id: 'EVENT-DEL-003',
    locationConfidence: 95.0,
    severityConfidence: 91.2,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 93.5,
      imageModel: 'SigLIP 2',
      imageConfidence: 91.0,
      videoModel: 'VideoMAE V2',
      videoConfidence: 94.2,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 95.8,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 93.6
    },
    sourceReliability: 86,
    evidence: [
      '✓ VideoMAE V2 temporal analysis confirms moving brown aerosol particles',
      '✓ CPCB monitoring station Delhi-ITO shows sharp PM10 spike to 980 µg/m³',
      '✓ Multiple citizen video reports uploaded within 10 min window'
    ],
    reasons_trusted: [
      '✓ VideoMAE V2 temporal analysis confirms moving brown aerosol particles',
      '✓ CPCB monitoring station Delhi-ITO shows sharp PM10 spike to 980 µg/m³'
    ],
    contradictoryEvidence: [],
    reasons_suspicious: [],
    processingStatus: 'VERIFIED',
    processingTimestamp: '2026-09-23T22:20:05Z'
  },
  {
    id: 'REP-GAU-105',
    timestamp: '2026-09-23T22:10:00Z',
    source: 'State Disaster Authority',
    sourceHandle: '@ASDMA_Official',
    sourceType: 'State Disaster Authority',
    city: 'Guwahati',
    state: 'Assam',
    latitude: 26.1445,
    longitude: 91.7362,
    eventType: 'Landslide',
    event_type: 'Landslide',
    severity: 'Critical',
    verificationStatus: 'Verified',
    verification_status: 'Verified',
    reliabilityScore: 97,
    reliability_score: 97,
    aiConfidence: 96,
    text: 'Emergency Alert: Landslide on Kamakhya Temple Hill road following intense rainfall. Traffic blocked, response teams deployed. #IMD #AssamFloods #LandslideAlert',
    content: 'Emergency Alert: Landslide on Kamakhya Temple Hill road following intense rainfall. Traffic blocked, response teams deployed. #IMD #AssamFloods #LandslideAlert',
    hashtags: ['#IMD', '#AssamFloods', '#LandslideAlert'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80',
    ocrText: 'LANDSLIDE WARNING GUWAHATI KAMAKHYA ROAD BLOCKED',
    ocrConfidence: 96.9,
    ocrBoundingBoxes: [
      { id: 'box-g1', text: 'LANDSLIDE WARNING', confidence: 97.8, box: [15, 20, 65, 20] },
      { id: 'box-g2', text: 'GUWAHATI KAMAKHYA', confidence: 96.4, box: [18, 48, 60, 18] }
    ],
    duplicateScore: 6,
    duplicate_score: 6,
    eventId: 'EVENT-GAU-008',
    event_id: 'EVENT-GAU-008',
    locationConfidence: 97.8,
    severityConfidence: 96.5,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 96.8,
      imageModel: 'SigLIP 2',
      imageConfidence: 95.4,
      videoModel: 'VideoMAE V2',
      videoConfidence: 91.0,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 96.9,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 96.0
    },
    sourceReliability: 96,
    evidence: [
      '✓ Verified state disaster authority dispatch ticket',
      '✓ Satellite optical difference mapping highlights mud/debris flow path',
      '✓ Cross-verified by Brahmaputra basin hydro-monitoring station GAU-01'
    ],
    reasons_trusted: [
      '✓ Verified state disaster authority dispatch ticket',
      '✓ Satellite optical difference mapping highlights mud/debris flow path'
    ],
    contradictoryEvidence: [],
    reasons_suspicious: [],
    processingStatus: 'VERIFIED',
    processingTimestamp: '2026-09-23T22:10:02Z'
  },
  {
    id: 'REP-SUSP-106',
    timestamp: '2026-09-23T22:05:00Z',
    source: 'Social Media',
    sourceHandle: '@UnverifiedViralWatcher',
    sourceType: 'Social Media',
    city: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.385,
    longitude: 78.4867,
    eventType: 'Flooding',
    event_type: 'Flooding',
    severity: 'High',
    verificationStatus: 'Suspicious',
    verification_status: 'Suspicious',
    reliabilityScore: 42,
    reliability_score: 42,
    aiConfidence: 54,
    text: 'Massive dam burst near Hyderabad city limits! Water spreading everywhere! Evacuate immediately! #HydFloods #EmergencyAlert',
    content: 'Massive dam burst near Hyderabad city limits! Water spreading everywhere! Evacuate immediately! #HydFloods #EmergencyAlert',
    hashtags: ['#HydFloods', '#EmergencyAlert'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    ocrText: 'RECYCLED DISASTER FOOTAGE - ARCHIVE 2018',
    ocrConfidence: 82.5,
    ocrBoundingBoxes: [
      { id: 'box-s1', text: 'ARCHIVE FOOTAGE', confidence: 85.0, box: [20, 30, 50, 20] }
    ],
    duplicateScore: 68,
    duplicate_score: 68,
    eventId: 'EVENT-HYD-001',
    event_id: 'EVENT-HYD-001',
    locationConfidence: 38.0,
    severityConfidence: 45.0,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 52.0,
      imageModel: 'SigLIP 2',
      imageConfidence: 58.4,
      videoModel: 'VideoMAE V2',
      videoConfidence: 48.0,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 82.5,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 54.1
    },
    sourceReliability: 40,
    evidence: [
      '! Image embedding matches 2018 Kerala flood archive stock photo (96% image similarity score)'
    ],
    reasons_trusted: [],
    contradictoryEvidence: [
      '! Source reliability score is very low (42%)',
      '! Image matches 2018 flood archive stock dataset (SigLIP duplicate detection)',
      '! Telanagana Irrigation Dept water sensor telemetries show all dam gates operating normally',
      '! No corroborating reports from nearby emergency stations'
    ],
    reasons_suspicious: [
      '! Source reliability score is very low (42%)',
      '! Image matches 2018 flood archive stock dataset (SigLIP duplicate detection)',
      '! Telanagana Irrigation Dept water sensor telemetries show all dam gates operating normally'
    ],
    processingStatus: 'ANALYZED',
    processingTimestamp: '2026-09-23T22:05:03Z'
  },
  {
    id: 'REP-DUP-107',
    timestamp: '2026-09-23T22:42:00Z',
    source: 'Social Media',
    sourceHandle: '@HydWeatherReposter',
    sourceType: 'Social Media',
    city: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.4851,
    longitude: 78.414,
    eventType: 'Flooding',
    event_type: 'Flooding',
    severity: 'Critical',
    verificationStatus: 'Duplicate',
    verification_status: 'Duplicate',
    reliabilityScore: 65,
    reliability_score: 65,
    aiConfidence: 94,
    text: '3 feet water near Kukatpally flyover metro pillar 740! Avoid area! #HydRains',
    content: '3 feet water near Kukatpally flyover metro pillar 740! Avoid area! #HydRains',
    hashtags: ['#HydRains'],
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    media_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    ocrText: 'FLASH FLOOD WARNING HYDERABAD',
    ocrConfidence: 96.0,
    duplicateScore: 94,
    duplicate_score: 94,
    duplicateClusterId: 'DUP-001',
    eventId: 'EVENT-HYD-001',
    event_id: 'EVENT-HYD-001',
    locationConfidence: 97.0,
    severityConfidence: 94.0,
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 94.0,
      imageModel: 'SigLIP 2',
      imageConfidence: 98.2,
      videoModel: 'VideoMAE V2',
      videoConfidence: 90.0,
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 96.0,
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 94.5
    },
    sourceReliability: 60,
    evidence: [
      '✓ Content matches original report REP-HYD-101'
    ],
    reasons_trusted: [],
    contradictoryEvidence: [
      '! Duplicate Cluster DUP-001 match: 98% image similarity with REP-HYD-101',
      '! Text similarity score 91%, location distance 0.02 km, time delta 3 minutes'
    ],
    reasons_suspicious: [
      '! Duplicate Cluster DUP-001 match: 98% image similarity with REP-HYD-101'
    ],
    processingStatus: 'ANALYZED',
    processingTimestamp: '2026-09-23T22:42:01Z'
  }
];

// Helper to generate a realistic pan-India dataset of ~120 reports
const CITIES_LIST = [
  { city: 'Hyderabad', state: 'Telangana', lat: 17.385, lng: 78.4867, eventId: 'EVENT-HYD-001' },
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.076, lng: 72.8777, eventId: 'EVENT-MUM-002' },
  { city: 'New Delhi', state: 'Delhi', lat: 28.6139, lng: 77.209, eventId: 'EVENT-DEL-003' },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, eventId: 'EVENT-CHE-004' },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, eventId: 'EVENT-KOL-005' },
  { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, eventId: 'EVENT-BLR-006' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185, eventId: 'EVENT-VTZ-007' },
  { city: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, eventId: 'EVENT-GAU-008' },
  { city: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245, eventId: 'EVENT-BBU-009' },
  { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, eventId: 'EVENT-AMD-010' },
  { city: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, eventId: 'EVENT-PUN-011' },
  { city: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376, eventId: 'EVENT-PAT-012' },
  { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, eventId: 'EVENT-JAI-013' },
  { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, eventId: 'EVENT-LKO-014' },
  { city: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lng: 74.7973, eventId: 'EVENT-SXR-015' },
  { city: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lng: 76.9366, eventId: 'EVENT-TRV-016' },
  { city: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673, eventId: 'EVENT-COK-017' },
  { city: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882, eventId: 'EVENT-NGP-018' },
  { city: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126, eventId: 'EVENT-BHO-019' },
  { city: 'Gurugram', state: 'Haryana', lat: 28.4595, lng: 77.0266, eventId: 'EVENT-GUG-020' },
  { city: 'Noida', state: 'Uttar Pradesh', lat: 28.5355, lng: 77.391, eventId: 'EVENT-NOI-021' },
  { city: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.648, eventId: 'EVENT-VJA-022' },
  { city: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311, eventId: 'EVENT-SUR-023' },
  { city: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lng: 76.7794, eventId: 'EVENT-CHD-024' },
  { city: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lng: 78.0322, eventId: 'EVENT-DDN-025' },
  { city: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, eventId: 'EVENT-DDN-025' },
  { city: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lng: 85.3096, eventId: 'EVENT-PAT-012' },
  { city: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2183, lng: 78.1828, eventId: 'EVENT-BHO-019' }
];

const SOURCES_POOL = [
  'Social Media', 'Citizen Report', 'IMD Data Feed', 'Weather API', 
  'Rain Gauge Network', 'Radar Feed', 'News Aggregation', 'State Disaster Authority'
];

const EVENT_TYPES_POOL: Array<'Flooding' | 'Heavy Rain' | 'Thunderstorm' | 'Heatwave' | 'Fog' | 'Dust Storm' | 'Strong Winds' | 'Cyclone' | 'Landslide'> = [
  'Flooding', 'Heavy Rain', 'Thunderstorm', 'Heatwave', 'Fog', 'Dust Storm', 'Strong Winds', 'Cyclone', 'Landslide'
];

// Generate deterministic lightweight records to reach ~115 reports
for (let i = 8; i <= 115; i++) {
  const cityObj = CITIES_LIST[i % CITIES_LIST.length];
  const sourceType = SOURCES_POOL[i % SOURCES_POOL.length] as any;
  const eventType = EVENT_TYPES_POOL[i % EVENT_TYPES_POOL.length];
  const status: 'Verified' | 'Suspicious' | 'Duplicate' | 'Pending' = 
    i % 9 === 0 ? 'Suspicious' : (i % 7 === 0 ? 'Duplicate' : 'Verified');
  const severity = i % 4 === 0 ? 'Critical' : (i % 3 === 0 ? 'High' : (i % 2 === 0 ? 'Warning' : 'Normal'));
  const isDup = status === 'Duplicate';

  const report: WeatherReport = {
    id: `REP-IND-${100 + i}`,
    timestamp: new Date(Date.now() - (i * 140000)).toISOString(),
    source: sourceType,
    sourceHandle: `@weather_watch_${cityObj.city.toLowerCase()}_${i}`,
    sourceType: sourceType,
    city: cityObj.city,
    state: cityObj.state,
    latitude: cityObj.lat + ((i % 5) - 2) * 0.015,
    longitude: cityObj.lng + ((i % 5) - 2) * 0.015,
    eventType: eventType,
    event_type: eventType,
    severity: severity,
    verificationStatus: status,
    verification_status: status,
    reliabilityScore: 70 + (i % 28),
    reliability_score: 70 + (i % 28),
    aiConfidence: 80 + (i % 19),
    text: `Observed ${eventType.toLowerCase()} conditions near ${cityObj.city} sector ${i % 12}. Precipitation / wind telemetry updated. #IMD #${cityObj.city}Weather #${eventType.replace(/\s+/g, '')}`,
    content: `Observed ${eventType.toLowerCase()} conditions near ${cityObj.city} sector ${i % 12}. Precipitation / wind telemetry updated. #IMD #${cityObj.city}Weather #${eventType.replace(/\s+/g, '')}`,
    hashtags: ['#IMD', `#${cityObj.city}Weather`, `#${eventType.replace(/\s+/g, '')}`],
    mediaType: i % 3 === 0 ? 'image' : (i % 5 === 0 ? 'video' : 'none'),
    imageUrl: i % 3 === 0 ? 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80' : undefined,
    ocrText: i % 3 === 0 ? `WEATHER ALERT ${cityObj.city.toUpperCase()} - SECTOR ${i % 12}` : undefined,
    ocrConfidence: i % 3 === 0 ? 94.5 + (i % 5) * 0.8 : undefined,
    ocrBoundingBoxes: i % 3 === 0 ? [
      { id: `box-gen-${i}`, text: `WEATHER ALERT ${cityObj.city.toUpperCase()}`, confidence: 95.0, box: [15, 25, 60, 20] }
    ] : undefined,
    duplicateScore: isDup ? 92 : 10 + (i % 15),
    duplicateClusterId: isDup ? `DUP-00${(i % 4) + 1}` : undefined,
    eventId: cityObj.eventId,
    event_id: cityObj.eventId,
    locationConfidence: 88 + (i % 11),
    severityConfidence: 85 + (i % 13),
    aiMetrics: {
      textModel: 'ModernBERT',
      textConfidence: 91.0 + (i % 8),
      imageModel: 'SigLIP 2',
      imageConfidence: 89.0 + (i % 9),
      videoModel: 'VideoMAE V2',
      videoConfidence: 86.0 + (i % 10),
      ocrModel: 'PaddleOCR-VL',
      ocrConfidence: 94.0 + (i % 5),
      fusionEngine: 'WeatherFusion-v4',
      fusionConfidence: 90.0 + (i % 8)
    },
    sourceReliability: 75 + (i % 23),
    evidence: [
      `✓ Geo-spatial coordinates correlate with ${cityObj.city} weather radar cell`,
      `✓ Time window consistent with monsoonal wave propagation in ${cityObj.state}`,
      `✓ Multiple independent sources agree on ${eventType} classification`
    ],
    reasons_trusted: [
      `✓ Geo-spatial coordinates correlate with ${cityObj.city} weather radar cell`
    ],
    contradictoryEvidence: status === 'Suspicious' ? [
      `! Source historical accuracy below 50%`,
      `! Image visual embedding flagged for potential past event reuse`
    ] : [],
    reasons_suspicious: status === 'Suspicious' ? [
      `! Source historical accuracy below 50%`
    ] : [],
    processingStatus: status === 'Verified' ? 'VERIFIED' : 'ANALYZED',
    processingTimestamp: new Date(Date.now() - (i * 140000) + 2000).toISOString()
  };

  DEMO_REPORTS.push(report);
}
