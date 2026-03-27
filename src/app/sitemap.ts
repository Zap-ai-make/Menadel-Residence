import type { MetadataRoute } from 'next';
import { getProperties } from '@/lib/saas-client';
import { type PropertyType } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://minadel-residence.com';
const LOCALES = ['fr', 'en'];

const STATIC_PAGES = [
  '',
  '/catalogue',
  '/acheter-depuis-etranger',
  '/avec-representant',
  '/gestion-locative',
  '/pourquoi-minadel',
  '/expertise',
  '/demarches-administratives',
  '/contact',
  '/politique-confidentialite',
];

function slug(type: PropertyType, city: string): string {
  return `/${type.toLowerCase().replace('é', 'e')}-${city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  // Property pages
  for (const locale of LOCALES) {
    for (const property of properties) {
      const url = `${BASE_URL}/${locale}/bien/${property.id}`;
      entries.push({
        url,
        lastModified: new Date(property.updatedAt),
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/bien/${property.id}`])
          ),
        },
        changeFrequency: 'daily',
        priority: 0.9,
      });
    }
  }

  // SEO pages type×city
  const combos = new Set<string>();
  for (const p of properties) {
    combos.add(`${p.type}::${p.city}`);
  }

  for (const combo of combos) {
    const [type, city] = combo.split('::') as [PropertyType, string];
    const path = `/catalogue${slug(type, city)}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    }
  }

  return entries;
}
