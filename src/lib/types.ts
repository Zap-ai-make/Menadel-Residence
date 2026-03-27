export type PropertyType = 'parcelle' | 'villa' | 'terrain' | 'appartement' | 'immeuble' | 'location';
export type PropertyStatus = 'disponible' | 'sous-compromis' | 'vendu';

export interface Property {
  id: string;
  ref: string;
  title: string;
  type: PropertyType;
  city: string;
  neighborhood?: string;
  priceXof: number;
  surfaceM2: number;
  status: PropertyStatus;
  isFeatured: boolean;
  photos: string[];
  description?: string;
  gpsLat?: number;
  gpsLng?: number;
  pointsOfInterest?: string[];
  createdAt: string;
  updatedAt: string;
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
