export type PropertyType = 'parcelle' | 'villa' | 'terrain' | 'appartement' | 'immeuble' | 'location' | 'duplex' | 'maison' | 'bureau' | 'commerce' | 'entrepot' | 'hotel';
export type PropertyStatus = 'disponible' | 'sous-compromis' | 'vendu' | 'loué' | 'réservé';

export type PropertyCategory = 'vente' | 'location' | 'achat';
export type LocationType = 'court_sejour' | 'long_sejour';

export interface Property {
  id: string;
  ref: string;
  title: string;
  type: PropertyType;
  category?: PropertyCategory;
  locationType?: LocationType;
  city: string;
  neighborhood?: string;
  sector?: string;
  address?: string;
  priceXof: number;
  surfaceM2: number;
  status: PropertyStatus;
  isNegotiable?: boolean;
  isFeatured: boolean;
  photos: string[];
  description?: string;
  gpsLat?: number;
  gpsLng?: number;
  pointsOfInterest?: string[];
  studioLinkId?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for the Woning API response
export interface WoningApiBien {
  id: string;
  categorie: 'vente' | 'location' | 'achat';
  type: string;
  adresse?: string;
  secteur?: string;
  quartier?: string;
  ville?: string;
  prix: string;
  superficie: string;
  photos: string[];
  description?: string;
  statut: string;
  negociable: boolean;
  studioLinkId?: string | null;
  typeLocation?: 'court_sejour' | 'long_sejour';
}

export interface MarketContextEntry {
  type: PropertyType;
  city: string;
  priceMinXof: number;
  priceMaxXof: number;
  trend: 'stable' | 'hausse' | 'baisse';
  availability: 'abondant' | 'modéré' | 'rare';
  updatedAt: string;
}

export interface Lead {
  name: string;
  phone: string;
  email?: string;
  message: string;
  source: string;
  propertyRef?: string;
  locale: string;
}
