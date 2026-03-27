'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '@/lib/types';

// Couleurs par statut
const STATUS_COLOR: Record<string, string> = {
  disponible: '#22C55E',
  'sous-compromis': '#F59E0B',
  vendu: '#EF4444',
};

const TYPE_EMOJI: Record<string, string> = {
  parcelle: '📐',
  villa: '🏡',
  terrain: '🌿',
  appartement: '🏢',
  immeuble: '🏗️',
  location: '🔑',
};

const PRICE_LABELS: Record<string, Record<string, string>> = {
  fr: { disponible: 'Disponible', 'sous-compromis': 'Sous compromis', vendu: 'Vendu', voir: 'Voir la fiche →' },
  en: { disponible: 'Available', 'sous-compromis': 'Under offer', vendu: 'Sold', voir: 'View listing →' },
};

function formatPrice(xof: number, locale: string): string {
  if (xof >= 1_000_000) {
    const m = (xof / 1_000_000).toFixed(xof % 1_000_000 === 0 ? 0 : 1);
    return locale === 'fr' ? `${m} M FCFA` : `${m}M FCFA`;
  }
  return `${(xof / 1000).toFixed(0)}K FCFA`;
}

interface Props {
  properties: Property[];
  locale: string;
}

export default function MapInner({ properties, locale }: Props) {
  const labels = PRICE_LABELS[locale] ?? PRICE_LABELS.fr;

  // Centre par défaut sur Ouagadougou
  const center: [number, number] = [12.3647, -1.5337];

  // Fix CSS variable pour Leaflet dans Next.js
  useEffect(() => {
    // Leaflet cherche des icônes PNG via URL absolue — on désactive ça
    // et on utilise des CircleMarkers à la place (pas besoin d'images)
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: '420px', width: '100%', borderRadius: '1rem' }}
      className="border border-white/10"
      scrollWheelZoom={false}
      attributionControl={false}
    >
      {/* Tuiles sombres CartoDB — s'intègre bien avec le thème anthracite */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {properties.map((p) => {
        if (p.gpsLat == null || p.gpsLng == null) return null;
        const color = STATUS_COLOR[p.status] ?? '#9CA3AF';
        const emoji = TYPE_EMOJI[p.type] ?? '📍';

        return (
          <CircleMarker
            key={p.id}
            center={[p.gpsLat, p.gpsLng]}
            radius={p.status === 'disponible' ? 9 : 7}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: p.status === 'vendu' ? 0.4 : 0.85,
              weight: 2,
            }}
          >
            <Popup
              className="map-popup"
              closeButton={false}
            >
              <div style={{
                background: '#2C2C2E',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '10px 12px',
                minWidth: '180px',
                fontFamily: 'Inter, sans-serif',
              }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '2px' }}>
                  {emoji} {p.ref}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FAFAFA', marginBottom: '4px', lineHeight: 1.3 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '12px', color: '#C9A84C', fontWeight: 600, marginBottom: '4px' }}>
                  {formatPrice(p.priceXof, locale)}
                </div>
                <div style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: `${color}20`,
                  border: `1px solid ${color}50`,
                  color: color,
                  marginBottom: '8px',
                }}>
                  {labels[p.status]}
                </div>
                {p.status === 'disponible' && (
                  <div>
                    <a
                      href={`/${locale}/bien/${p.id}`}
                      style={{ fontSize: '11px', color: '#C9A84C', textDecoration: 'none', fontWeight: 500 }}
                    >
                      {labels.voir}
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
