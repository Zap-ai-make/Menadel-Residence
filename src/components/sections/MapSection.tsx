'use client';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import type { Property } from '@/lib/types';

// Leaflet accède à `window` — import dynamique obligatoire (pas de SSR)
const MapInner = dynamic(() => import('./MapInner'), { ssr: false, loading: () => <MapSkeleton /> });

function MapSkeleton() {
  return (
    <div className="w-full h-[420px] rounded-2xl bg-[var(--color-anthracite-soft)] border border-white/10 animate-pulse flex items-center justify-center">
      <span className="text-[var(--color-white-muted)]/40 text-sm">Chargement de la carte…</span>
    </div>
  );
}

const LABELS = {
  fr: {
    eyebrow: 'Couverture géographique',
    heading: 'Nos biens sur la carte',
    subtitle: 'Ouagadougou · Bobo-Dioulasso',
    legendAvailable: 'Disponible',
    legendPending: 'Sous compromis',
    legendSold: 'Vendu',
    cta: 'Voir tout le catalogue →',
  },
  en: {
    eyebrow: 'Geographic coverage',
    heading: 'Our properties on the map',
    subtitle: 'Ouagadougou · Bobo-Dioulasso',
    legendAvailable: 'Available',
    legendPending: 'Under offer',
    legendSold: 'Sold',
    cta: 'View full catalogue →',
  },
};

interface Props {
  properties: Property[];
}

export function MapSection({ properties }: Props) {
  const locale = useLocale() as 'fr' | 'en';
  const l = LABELS[locale] ?? LABELS.fr;

  // Seulement les biens avec coordonnées GPS
  const mappable = properties.filter((p) => p.gpsLat != null && p.gpsLng != null);

  if (mappable.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10" aria-label={l.heading}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] mb-1">
              {l.eyebrow}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              {l.heading}
            </h2>
            <p className="text-sm text-[var(--color-white-muted)] mt-1">{l.subtitle}</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-white-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0" />
              {l.legendAvailable}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] flex-shrink-0" />
              {l.legendPending}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] flex-shrink-0" />
              {l.legendSold}
            </span>
          </div>
        </div>

        {/* Map */}
        <MapInner properties={mappable} locale={locale} />

        {/* CTA */}
        <div className="mt-5 text-center">
          <a
            href={`/${locale}/catalogue`}
            className="text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
          >
            {l.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
