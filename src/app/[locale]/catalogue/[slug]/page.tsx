import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProperties } from '@/lib/saas-client';
import { type PropertyType } from '@/lib/types';
import { CatalogueClient } from '@/components/catalogue/CatalogueClient';

export const revalidate = 300;

// Same normalisation used in sitemap.ts
function toSlug(type: string, city: string): string {
  return `${type.toLowerCase()}-${city
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')}`;
}

export async function generateStaticParams() {
  const properties = await getProperties();
  const seen = new Set<string>();
  const params: { slug: string }[] = [];
  for (const p of properties) {
    const slug = toSlug(p.type, p.city);
    if (!seen.has(slug)) {
      seen.add(slug);
      params.push({ slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const properties = await getProperties();
  const match = properties.find((p) => toSlug(p.type, p.city) === slug);
  if (!match) return {};

  const typeLabel: Record<PropertyType, string> = {
    parcelle: locale === 'fr' ? 'Parcelles' : 'Plots',
    villa: 'Villas',
    terrain: locale === 'fr' ? 'Terrains' : 'Land',
    appartement: locale === 'fr' ? 'Appartements' : 'Apartments',
    immeuble: locale === 'fr' ? 'Immeubles' : 'Buildings',
    duplex: 'Duplex',
    maison: locale === 'fr' ? 'Maisons' : 'Houses',
    bureau: locale === 'fr' ? 'Bureaux' : 'Offices',
    commerce: locale === 'fr' ? 'Commerces' : 'Commercial',
    entrepot: locale === 'fr' ? 'Entrepôts' : 'Warehouses',
    hotel: locale === 'fr' ? 'Hôtels' : 'Hotels',
    location: locale === 'fr' ? 'Locations' : 'Rentals',
  };

  const label = typeLabel[match.type] ?? match.type;

  return {
    title:
      locale === 'fr'
        ? `${label} à ${match.city} — Menadel Residence`
        : `${label} in ${match.city} — Menadel Residence`,
    description:
      locale === 'fr'
        ? `Découvrez les ${label.toLowerCase()} disponibles à ${match.city} avec Menadel Residence, agence immobilière agréée au Burkina Faso.`
        : `Browse available ${label.toLowerCase()} in ${match.city} with Menadel Residence, licensed real estate agency in Burkina Faso.`,
  };
}

export default async function CatalogueSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const properties = await getProperties();

  const matching = properties.filter((p) => toSlug(p.type, p.city) === slug);
  if (matching.length === 0) notFound();

  const { type, city } = matching[0];

  const typeLabel: Record<PropertyType, { fr: string; en: string }> = {
    parcelle:    { fr: 'Parcelles', en: 'Plots' },
    villa:       { fr: 'Villas', en: 'Villas' },
    terrain:     { fr: 'Terrains', en: 'Land' },
    appartement: { fr: 'Appartements', en: 'Apartments' },
    immeuble:    { fr: 'Immeubles', en: 'Buildings' },
    duplex:      { fr: 'Duplex', en: 'Duplex' },
    maison:      { fr: 'Maisons', en: 'Houses' },
    bureau:      { fr: 'Bureaux', en: 'Offices' },
    commerce:    { fr: 'Commerces', en: 'Commercial' },
    entrepot:    { fr: 'Entrepôts', en: 'Warehouses' },
    hotel:       { fr: 'Hôtels', en: 'Hotels' },
    location:    { fr: 'Locations', en: 'Rentals' },
  };

  const label = typeLabel[type]?.[locale as 'fr' | 'en'] ?? type;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">
          Catalogue
        </p>
        <h1 className="font-serif text-4xl font-semibold text-white">
          {label} — {city}
        </h1>
        <p className="text-sm text-[var(--color-white-muted)] mt-2">
          {locale === 'fr'
            ? `${matching.filter((p) => p.status === 'disponible').length} bien(s) disponible(s) à ${city}`
            : `${matching.filter((p) => p.status === 'disponible').length} propert(ies) available in ${city}`}
        </p>
      </div>

      <CatalogueClient properties={matching} />
    </div>
  );
}
