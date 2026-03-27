'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { type Property, type PropertyType } from '@/lib/types';
import { PropertyCard } from '@/components/properties/PropertyCard';

const TYPES: PropertyType[] = ['parcelle', 'villa', 'terrain', 'appartement', 'immeuble', 'location'];

interface CatalogueClientProps {
  properties: Property[];
  stalenessDate?: string;
}

export function CatalogueClient({ properties, stalenessDate }: CatalogueClientProps) {
  const t = useTranslations('property');
  const tf = useTranslations('filter');
  const tc = useTranslations('catalogue');

  const [filterType, setFilterType] = useState<PropertyType | 'all'>('all');
  const [filterCity, setFilterCity] = useState<string>('all');

  const cities = useMemo(() => {
    const all = properties.map((p) => p.city);
    return ['all', ...Array.from(new Set(all)).sort()];
  }, [properties]);

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        const typeOk = filterType === 'all' || p.type === filterType;
        const cityOk = filterCity === 'all' || p.city === filterCity;
        return typeOk && cityOk;
      }),
    [properties, filterType, filterCity]
  );

  return (
    <div>
      {/* Stale data indicator */}
      {stalenessDate && (
        <p className="text-xs text-[var(--color-status-pending)] mb-4 flex items-center gap-1">
          ⚠ {t('dataFreshness')} {stalenessDate}
        </p>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Type chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label={tf('type')}>
          <button
            onClick={() => setFilterType('all')}
            className={chipClass(filterType === 'all')}
          >
            {tf('allTypes')}
          </button>
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={chipClass(filterType === type)}
            >
              {t(type === 'location' ? 'location_type' : type as any)}
            </button>
          ))}
        </div>

        {/* City select */}
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          aria-label={tf('city')}
          className="px-3 py-1.5 text-sm rounded-full border border-white/15 bg-[var(--color-anthracite-soft)] text-white focus:outline-none focus:border-[var(--color-gold)]"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city === 'all' ? tf('allCities') : city}
            </option>
          ))}
        </select>
      </div>

      {/* Result count */}
      <p className="text-sm text-[var(--color-white-muted)] mb-6">
        {filterType !== 'all' || filterCity !== 'all'
          ? tc('resultCountFiltered', { count: filtered.length })
          : tc('resultCount', { count: filtered.length })}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-[var(--color-white-muted)] mb-4">{t('noResults')}</p>
          <button
            onClick={() => { setFilterType('all'); setFilterCity('all'); }}
            className="text-sm text-[var(--color-gold)] underline hover:no-underline"
          >
            {t('noResultsAction')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function chipClass(active: boolean) {
  return [
    'px-3 py-1.5 text-sm rounded-full border transition-colors',
    active
      ? 'bg-[var(--color-gold)] text-[var(--color-anthracite)] border-[var(--color-gold)] font-medium'
      : 'border-white/15 text-[var(--color-white-muted)] hover:border-white/30 hover:text-white',
  ].join(' ');
}
