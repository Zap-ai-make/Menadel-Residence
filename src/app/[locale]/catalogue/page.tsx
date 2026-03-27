import type { Metadata } from 'next';
import { getProperties } from '@/lib/saas-client';
import { CatalogueClient } from '@/components/catalogue/CatalogueClient';

export const revalidate = 300; // 5 min ISR

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? 'Catalogue — Tous nos biens' : 'Catalogue — All properties',
    description:
      locale === 'fr'
        ? 'Parcelles, villas, terrains, appartements disponibles à Ouagadougou, Bobo-Dioulasso et partout au Burkina Faso.'
        : 'Plots, villas, land, apartments available in Ouagadougou, Bobo-Dioulasso and across Burkina Faso.',
  };
}

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const properties = await getProperties();
  const heading = locale === 'fr' ? 'Tous nos biens' : 'All properties';

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-2">
          Catalogue
        </p>
        <h1 className="font-serif text-4xl font-semibold text-white">
          {heading}
        </h1>
      </div>

      <CatalogueClient properties={properties} />
    </div>
  );
}
