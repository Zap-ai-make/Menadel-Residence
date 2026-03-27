'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type Property, type PropertyType } from '@/lib/types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedPropertiesProps {
  properties: Property[];
}

type FilterKey = 'all' | PropertyType;

const FILTERS: { key: FilterKey; labelKey: string }[] = [
  { key: 'all',         labelKey: 'filterAll' },
  { key: 'parcelle',    labelKey: 'parcelle' },
  { key: 'villa',       labelKey: 'villa' },
  { key: 'terrain',     labelKey: 'terrain' },
  { key: 'appartement', labelKey: 'appartement' },
  { key: 'immeuble',    labelKey: 'immeuble' },
];

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const t = useTranslations('property');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Only show available + pending (not sold), sort featured first
  const available = properties
    .filter((p) => p.status !== 'vendu')
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));

  const filtered = activeFilter === 'all'
    ? available
    : available.filter((p) => p.type === activeFilter);

  const displayed = filtered.slice(0, 6);

  if (properties.length === 0) return null;

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2
            id="featured-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold text-white"
          >
            {t('availableTitle')}
          </h2>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par type">
            {FILTERS.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150',
                  activeFilter === key
                    ? 'bg-[var(--color-gold)] border-[var(--color-gold)] text-[var(--color-anthracite)]'
                    : 'bg-transparent border-white/20 text-[var(--color-white-muted)] hover:border-[var(--color-gold)]/50 hover:text-white'
                )}
                aria-pressed={activeFilter === key}
              >
                {t(labelKey as any)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((property) => (
              <PropertyCard key={property.id} property={property} variant="featured" />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-white-muted)] py-16">
            {t('noResults')}
          </p>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-gold)] hover:underline"
          >
            {t('allProperties')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
