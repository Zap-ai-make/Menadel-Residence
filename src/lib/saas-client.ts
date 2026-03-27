import { type Property, type MarketContextEntry, type Lead } from './types';
import { MOCK_PROPERTIES, MOCK_MARKET_GRID } from './mock-data';

const USE_MOCK = !process.env.SAAS_API_URL;
const API_URL = process.env.SAAS_API_URL ?? '';
const API_KEY = process.env.SAAS_API_KEY ?? '';

async function saasGet<T>(path: string, revalidate = 300): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── Properties ──────────────────────────────────────────────

export async function getProperties(): Promise<Property[]> {
  if (USE_MOCK) return MOCK_PROPERTIES;
  const data = await saasGet<Property[]>('/properties');
  return data ?? MOCK_PROPERTIES;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  if (USE_MOCK) return MOCK_PROPERTIES.find((p) => p.id === id) ?? null;
  const data = await saasGet<Property>(`/properties/${id}`);
  return data ?? MOCK_PROPERTIES.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  if (USE_MOCK) return MOCK_PROPERTIES.filter((p) => p.isFeatured);
  const data = await saasGet<Property[]>('/properties/featured');
  return data ?? MOCK_PROPERTIES.filter((p) => p.isFeatured);
}

// ── Market Grid ──────────────────────────────────────────────

export async function getMarketGrid(): Promise<MarketContextEntry[]> {
  if (USE_MOCK) return MOCK_MARKET_GRID;
  const data = await saasGet<MarketContextEntry[]>('/market-grid', 86400);
  return data ?? MOCK_MARKET_GRID;
}

// ── Leads ────────────────────────────────────────────────────

export async function submitLead(lead: Lead): Promise<boolean> {
  if (USE_MOCK) {
    console.info('[MOCK] Lead submitted:', lead.name, lead.source);
    return true;
  }
  try {
    const res = await fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}
