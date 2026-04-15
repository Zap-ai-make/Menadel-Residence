'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, Search, ChevronDown } from 'lucide-react';
import { type Property, type PropertyType } from '@/lib/types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { WHATSAPP_NUMBER } from '@/lib/config';

const TYPES: PropertyType[] = ['parcelle', 'villa', 'terrain', 'appartement', 'immeuble', 'duplex', 'maison', 'hotel', 'bureau', 'commerce', 'location'];
type PropertyLabelKey = PropertyType | 'location_type';

function getPropertyLabelKey(type: PropertyType): PropertyLabelKey {
  return type === 'location' ? 'location_type' : type;
}

interface CatalogueClientProps {
  properties: Property[];
  stalenessDate?: string;
}

export function CatalogueClient({ properties, stalenessDate }: CatalogueClientProps) {
  const t = useTranslations('property');
  const tf = useTranslations('filter');
  const tc = useTranslations('catalogue');
  const locale = useLocale();

  const [filterType, setFilterType] = useState<PropertyType | 'all'>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cities = useMemo(() => {
    const all = properties.map((p) => p.city);
    return Array.from(new Set(all)).sort();
  }, [properties]);

  // Filtrer les villes selon la recherche
  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) return cities;
    return cities.filter((city) =>
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  // Vérifier si la ville recherchée n'existe pas
  const cityNotFound = citySearch.trim() !== '' && filteredCities.length === 0;

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
        setCitySearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city: string) => {
    setFilterCity(city);
    setCitySearch('');
    setShowCityDropdown(false);
  };

  const whatsappMessage = locale === 'fr'
    ? `Bonjour, je recherche un bien à ${citySearch}. Pouvez-vous m'accompagner ?`
    : `Hello, I'm looking for a property in ${citySearch}. Can you help me?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

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
              {t(getPropertyLabelKey(type))}
            </button>
          ))}
        </div>

        {/* City select with search */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowCityDropdown(!showCityDropdown)}
            className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-full border border-white/15 bg-[var(--color-anthracite-soft)] text-white hover:border-white/30 transition-colors"
            aria-label={tf('city')}
          >
            <span>{filterCity === 'all' ? tf('allCities') : filterCity}</span>
            <ChevronDown size={14} className={`text-[var(--color-white-muted)] transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {showCityDropdown && (
            <div className="absolute top-full left-0 mt-1 w-72 rounded-lg border border-white/15 bg-[var(--color-anthracite-soft)] shadow-lg z-50">
              {/* Search input */}
              <div className="p-2 border-b border-white/10">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-white-muted)]" />
                  <input
                    ref={cityInputRef}
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder={locale === 'fr' ? 'Rechercher une ville...' : 'Search a city...'}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-white/10 bg-[var(--color-anthracite)] text-white placeholder:text-[var(--color-white-muted)] focus:outline-none focus:border-[var(--color-gold)]"
                    autoFocus
                  />
                </div>
              </div>

              {/* Options list */}
              <div className="max-h-48 overflow-y-auto">
                {/* Option "Toutes les villes" */}
                {!citySearch && (
                  <button
                    onClick={() => handleCitySelect('all')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      filterCity === 'all'
                        ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {tf('allCities')}
                  </button>
                )}

                {/* Liste des villes filtrées */}
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      filterCity === city
                        ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {city}
                  </button>
                ))}

                {/* Message si ville non trouvée */}
                {cityNotFound && (
                  <div className="p-4 border-t border-white/10">
                    <p className="text-sm text-[var(--color-white-muted)] mb-3">
                      {locale === 'fr'
                        ? `Aucun bien disponible à "${citySearch}" pour le moment.`
                        : `No property available in "${citySearch}" at the moment.`}
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                    >
                      <MessageCircle size={16} />
                      {locale === 'fr'
                        ? 'Contactez-nous pour un accompagnement personnalisé'
                        : 'Contact us for personalized assistance'}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
