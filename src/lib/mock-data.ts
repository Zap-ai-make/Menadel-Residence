// This file is kept for backwards compatibility but is no longer used.
// The application now fetches real data from the Woning API.
// See saas-client.ts for the API integration.

import { type Property, type MarketContextEntry } from './types';

// Empty arrays - data now comes from Woning API
export const MOCK_PROPERTIES: Property[] = [];
export const MOCK_MARKET_GRID: MarketContextEntry[] = [];
