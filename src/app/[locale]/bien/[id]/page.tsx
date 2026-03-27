import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getPropertyById, getProperties } from '@/lib/saas-client';
import { StatusBadge } from '@/components/properties/StatusBadge';
import { PriceDisplay } from '@/components/properties/PriceDisplay';
import { ContactFormInline } from '@/components/contact/ContactFormInline';
import { WhatsAppCTA } from '@/components/contact/WhatsAppCTA';
import { WHATSAPP_NUMBER, SITE_URL } from '@/lib/config';

export const revalidate = 300;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description ?? `${property.type} à ${property.city} — ${property.surfaceM2}m²`,
  };
}

const STANDARD_PLOT_M2 = 300;
const PLOT_TYPES = ['parcelle', 'terrain'];

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id, locale } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  const t = await getTranslations('property');
  const tContact = await getTranslations('contact');

  const standardPlots = PLOT_TYPES.includes(property.type)
    ? Math.round(property.surfaceM2 / STANDARD_PLOT_M2)
    : null;

  const whatsappMsg = tContact('whatsappProperty', { ref: property.ref });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/${locale}/bien/${property.id}`,
    price: property.priceXof,
    priceCurrency: 'XOF',
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.surfaceM2,
      unitCode: 'MTK',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      addressCountry: 'BF',
    },
    ...(property.gpsLat && property.gpsLng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: property.gpsLat,
        longitude: property.gpsLng,
      },
    }),
  };

  const labels = {
    surface: locale === 'fr' ? 'Surface' : 'Area',
    equiv: locale === 'fr' ? 'Équivalent' : 'Equivalent',
    type: locale === 'fr' ? 'Type' : 'Type',
    city: locale === 'fr' ? 'Ville' : 'City',
    neighborhood: locale === 'fr' ? 'Quartier' : 'Neighbourhood',
    description: locale === 'fr' ? 'Description' : 'Description',
    surroundings: locale === 'fr' ? 'Environs' : 'Surroundings',
    salePrice: locale === 'fr' ? 'Prix de vente' : 'Sale price',
    enquiry: locale === 'fr' ? 'Demande de renseignements' : 'Enquiry',
    ref: locale === 'fr' ? 'Réf.' : 'Ref.',
    standardUnit: locale === 'fr' ? 'parcelle' : 'plot',
    standardUnits: locale === 'fr' ? 'parcelles' : 'plots',
    standardLabel: locale === 'fr' ? 'standard Ouaga' : 'standard Ouaga',
    contactLabel: tContact('whatsappLabel'),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: photos + details */}
          <div className="lg:col-span-2">
            {/* Main photo */}
            {property.photos[0] && (
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-4 bg-[var(--color-anthracite-muted)]">
                <Image
                  src={property.photos[0]}
                  alt={`${property.type} — ${property.neighborhood ?? property.city}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Extra photos */}
            {property.photos.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mb-8">
                {property.photos.slice(1).map((photo, i) => (
                  <div key={i} className="relative aspect-[3/2] rounded-lg overflow-hidden bg-[var(--color-anthracite-muted)]">
                    <Image
                      src={photo}
                      alt={`Photo ${i + 2} — ${property.title}`}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div>
                <StatusBadge status={property.status} className="mb-2" />
                <h1 className="font-serif text-3xl font-semibold text-white leading-tight">
                  {property.title}
                </h1>
                <p className="text-[var(--color-white-muted)] mt-1">
                  {property.neighborhood ? `${property.neighborhood}, ` : ''}{property.city}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--color-white-muted)] uppercase tracking-wider">
                  {labels.ref} {property.ref}
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10 mb-6">
              <Spec label={labels.surface} value={`${property.surfaceM2.toLocaleString(locale)} m²`} />
              {standardPlots && standardPlots > 0 && (
                <Spec
                  label={labels.equiv}
                  value={`≈ ${standardPlots} ${standardPlots > 1 ? labels.standardUnits : labels.standardUnit} ${labels.standardLabel}`}
                />
              )}
              <Spec
                label={labels.type}
                value={property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              />
              <Spec label={labels.city} value={property.city} />
              {property.neighborhood && <Spec label={labels.neighborhood} value={property.neighborhood} />}
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-6">
                <h2 className="font-serif text-xl font-semibold text-white mb-2">{labels.description}</h2>
                <p className="text-[var(--color-white-muted)] leading-relaxed max-w-prose">
                  {property.description}
                </p>
              </div>
            )}

            {/* Points of interest */}
            {property.pointsOfInterest && property.pointsOfInterest.length > 0 && (
              <div className="mb-6">
                <h2 className="font-serif text-xl font-semibold text-white mb-3">{labels.surroundings}</h2>
                <ul className="space-y-1">
                  {property.pointsOfInterest.map((poi) => (
                    <li key={poi} className="flex items-center gap-2 text-sm text-[var(--color-white-muted)]">
                      <span className="text-[var(--color-gold)]">·</span>
                      {poi}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: price + contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                <p className="text-xs text-[var(--color-white-muted)] uppercase tracking-wider mb-1">
                  {labels.salePrice}
                </p>
                <PriceDisplay priceXof={property.priceXof} perMonth={property.type === 'location'} />
                <StatusBadge status={property.status} className="mt-3" />
              </div>

              {/* WhatsApp CTA */}
              {property.status !== 'vendu' && (
                <WhatsAppCTA
                  phone={WHATSAPP_NUMBER}
                  message={whatsappMsg}
                  variant="sheet"
                  label={labels.contactLabel}
                />
              )}

              {/* Contact form */}
              {property.status !== 'vendu' && (
                <div className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                  <h2 className="font-serif text-lg font-semibold text-white mb-4">
                    {labels.enquiry}
                  </h2>
                  <ContactFormInline propertyRef={property.ref} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[var(--color-white-muted)] uppercase tracking-wider">{label}</p>
      <p className="text-sm text-white font-medium mt-0.5">{value}</p>
    </div>
  );
}
