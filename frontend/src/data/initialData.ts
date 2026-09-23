import type { WeatherReport, WeatherEvent, DataSource, SystemStatus } from '../types';
import { DEMO_REPORTS } from './demoReports';
import { DEMO_EVENTS } from './demoEvents';
import { DEMO_SOURCES } from './demoSources';
import { DEMO_SYSTEM_HEALTH } from './demoSystemHealth';

export const INITIAL_REPORTS: WeatherReport[] = DEMO_REPORTS;
export const INITIAL_EVENTS: WeatherEvent[] = DEMO_EVENTS;
export const INITIAL_SOURCES: DataSource[] = DEMO_SOURCES;
export const INITIAL_SYSTEM_STATUS: SystemStatus = DEMO_SYSTEM_HEALTH;
