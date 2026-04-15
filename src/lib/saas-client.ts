import { type Property, type PropertyType, type PropertyStatus, type MarketContextEntry, type Lead, type WoningApiBien } from './types';

// Woning API Configuration
const WONING_API_URL = 'https://woning-api.woning.workers.dev';
const AGENCY_SLUG = 'menadel-residence';

// ── Price Parser ──────────────────────────────────────────────
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;

  const cleanStr = priceStr.toString().replace(/\s/g, '').toUpperCase();

  // Handle "1.5B" or "1,5B" format (billions)
  const billionMatch = cleanStr.match(/^([\d.,]+)B$/);
  if (billionMatch) {
    const num = parseFloat(billionMatch[1].replace(',', '.'));
    return num * 1_000_000_000;
  }

  // Handle "850M" format (millions)
  const millionMatch = cleanStr.match(/^([\d.,]+)M$/);
  if (millionMatch) {
    const num = parseFloat(millionMatch[1].replace(',', '.'));
    return num * 1_000_000;
  }

  // Handle "500K" format (thousands)
  const thousandMatch = cleanStr.match(/^([\d.,]+)K$/);
  if (thousandMatch) {
    const num = parseFloat(thousandMatch[1].replace(',', '.'));
    return num * 1_000;
  }

  // Handle plain numbers with possible XOF suffix
  const plainMatch = cleanStr.match(/^([\d.,]+)/);
  if (plainMatch) {
    return parseFloat(plainMatch[1].replace(/,/g, '').replace(/\./g, ''));
  }

  return 0;
}

// ── Surface Parser ────────────────────────────────────────────
function parseSurface(surfaceStr: string): number {
  if (!surfaceStr) return 0;

  const cleanStr = surfaceStr.toString().replace(/\s/g, '').toLowerCase();

  // Handle "903 m²" or "903m²" or "903" format
  const match = cleanStr.match(/^([\d.,]+)/);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }

  return 0;
}

// ── Type Mapper ───────────────────────────────────────────────
function mapPropertyType(apiType: string): PropertyType {
  const typeMap: Record<string, PropertyType> = {
    'villa': 'villa',
    'appartement': 'appartement',
    'terrain': 'terrain',
    'immeuble': 'immeuble',
    'parcelle': 'parcelle',
    'duplex': 'duplex',
    'maison': 'maison',
    'bureau': 'bureau',
    'commerce': 'commerce',
    'entrepot': 'entrepot',
    'hotel': 'hotel',
    'studio': 'appartement',
    'loft': 'appartement',
    'penthouse': 'appartement',
  };

  const normalizedType = apiType?.toLowerCase().trim() || '';
  return typeMap[normalizedType] || 'immeuble';
}

// ── Status Mapper ─────────────────────────────────────────────
function mapPropertyStatus(apiStatus: string): PropertyStatus {
  const statusMap: Record<string, PropertyStatus> = {
    'disponible': 'disponible',
    'vendu': 'vendu',
    'loué': 'loué',
    'loue': 'loué',
    'sous-compromis': 'sous-compromis',
    'sous compromis': 'sous-compromis',
    'réservé': 'réservé',
    'reserve': 'réservé',
  };

  const normalizedStatus = apiStatus?.toLowerCase().trim() || '';
  return statusMap[normalizedStatus] || 'disponible';
}

// ── Title Generator ───────────────────────────────────────────
function generateTitle(bien: WoningApiBien): string {
  const type = bien.type?.charAt(0).toUpperCase() + bien.type?.slice(1).toLowerCase() || 'Bien';
  const location = bien.quartier || bien.secteur || bien.ville || '';

  if (location) {
    return `${type} — ${location}`;
  }
  return type;
}

// ── Bien to Property Mapper ───────────────────────────────────
function mapBienToProperty(bien: WoningApiBien, index: number): Property {
  const now = new Date().toISOString().split('T')[0];

  return {
    id: bien.id,
    ref: `MR-${String(index + 1).padStart(3, '0')}`,
    title: generateTitle(bien),
    type: mapPropertyType(bien.type),
    category: bien.categorie as Property['category'],
    locationType: bien.typeLocation,
    city: bien.ville || 'Ouagadougou',
    neighborhood: bien.quartier,
    sector: bien.secteur,
    address: bien.adresse,
    priceXof: parsePrice(bien.prix),
    surfaceM2: parseSurface(bien.superficie),
    status: mapPropertyStatus(bien.statut),
    isNegotiable: bien.negociable ?? true,
    isFeatured: index < 6, // First 6 properties are featured
    photos: bien.photos?.length > 0 ? bien.photos : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'],
    description: bien.description,
    studioLinkId: bien.studioLinkId ?? undefined,
    createdAt: now,
    updatedAt: now,
  };
}

// ── API Fetcher ───────────────────────────────────────────────
interface WoningApiResponse {
  ok: boolean;
  total?: number;
  biens?: WoningApiBien[];
}

async function woningGet(endpoint: string): Promise<WoningApiResponse | null> {
  try {
    const url = `${WONING_API_URL}${endpoint}`;

    const res = await fetch(url);

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

// ── Properties ──────────────────────────────────────────────

export async function getProperties(options?: {
  category?: 'vente' | 'location' | 'achat';
  locationType?: 'court_sejour' | 'long_sejour';
  type?: string;
}): Promise<Property[]> {
  let endpoint = `/v1/biens?agence=${AGENCY_SLUG}`;

  if (options?.category) {
    endpoint += `&categorie=${options.category}`;
  }
  if (options?.locationType) {
    endpoint += `&typeLocation=${options.locationType}`;
  }
  if (options?.type) {
    endpoint += `&type=${options.type}`;
  }

  const data = await woningGet(endpoint);

  if (data?.ok && data.biens && data.biens.length > 0) {
    return data.biens.map((bien, index) => mapBienToProperty(bien, index));
  }

  // Return empty array if no data
  return [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  // Fetch all properties and find by ID
  const properties = await getProperties();
  return properties.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const properties = await getProperties();
  return properties
    .filter((p) => p.isFeatured && p.status !== 'vendu' && p.status !== 'loué')
    .slice(0, 6);
}

// Get properties for sale (vente)
export async function getPropertiesForSale(): Promise<Property[]> {
  return getProperties({ category: 'vente' });
}

// Get properties for rent (location)
export async function getPropertiesForRent(locationType?: 'court_sejour' | 'long_sejour'): Promise<Property[]> {
  return getProperties({ category: 'location', locationType });
}

// ── Market Grid ──────────────────────────────────────────────
// Note: The Woning API doesn't provide market grid data, so we generate it from properties
export async function getMarketGrid(): Promise<MarketContextEntry[]> {
  const properties = await getProperties();
  const now = new Date().toISOString().split('T')[0];

  if (properties.length === 0) {
    return [];
  }

  // Group properties by type and city
  const groups = new Map<string, Property[]>();

  for (const prop of properties) {
    const key = `${prop.type}|${prop.city}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(prop);
  }

  // Generate market entries from groups
  const entries: MarketContextEntry[] = [];

  for (const [key, props] of groups) {
    const [type, city] = key.split('|');
    const prices = props.map(p => p.priceXof).filter(p => p > 0);

    if (prices.length > 0) {
      entries.push({
        type: type as Property['type'],
        city,
        priceMinXof: Math.min(...prices),
        priceMaxXof: Math.max(...prices),
        trend: 'stable',
        availability: props.length >= 5 ? 'abondant' : props.length >= 2 ? 'modéré' : 'rare',
        updatedAt: now,
      });
    }
  }

  return entries;
}

// ── Leads ────────────────────────────────────────────────────
// Note: Lead submission goes to console for now (can be connected to a backend later)
export async function submitLead(lead: Lead): Promise<boolean> {
  console.info('[Lead] Submitted:', lead.name, lead.source, lead.propertyRef);
  // TODO: Connect to a lead management API
  return true;
}

// ── Agency Info ──────────────────────────────────────────────
export interface AgencyInfo {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  logoURL?: string;
  slug: string;
}

interface WoningAgencyResponse {
  ok: boolean;
  agence?: AgencyInfo;
}

export async function getAgencyInfo(): Promise<AgencyInfo | null> {
  try {
    const url = `${WONING_API_URL}/v1/agence?agence=${AGENCY_SLUG}`;
    const res = await fetch(url);

    if (!res.ok) return null;

    const data: WoningAgencyResponse = await res.json();
    return data?.agence ?? null;
  } catch {
    return null;
  }
}
