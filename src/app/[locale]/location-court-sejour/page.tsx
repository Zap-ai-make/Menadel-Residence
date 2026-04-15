import type { Metadata } from 'next';
import { ShortTermRentalForm } from '@/components/contact/ShortTermRentalForm';

const CONTENT = {
  fr: {
    meta: {
      title: 'Location court séjour — Appartements & villas meublés',
      description: 'Louez un appartement ou une villa meublée au Burkina Faso pour 3 nuits minimum. Idéal pour voyages d\'affaires, tourisme ou séjours temporaires.',
    },
    eyebrow: 'Location',
    heading: 'Location court séjour',
    intro: 'Appartements et villas meublés pour vos séjours de courte durée au Burkina Faso. Durée minimum : 3 nuitées.',
    features: [
      { icon: '🏨', title: 'Logements meublés', desc: 'Appartements et villas entièrement équipés — climatisation, wifi, cuisine, linge de maison.' },
      { icon: '📅', title: 'Flexibilité', desc: 'Réservation à partir de 3 nuits. Idéal pour missions professionnelles ou tourisme.' },
      { icon: '🧹', title: 'Services inclus', desc: 'Ménage régulier, gardiennage, et assistance 24h/24 sur demande.' },
      { icon: '📍', title: 'Emplacements premium', desc: 'Quartiers sécurisés à Ouagadougou, Bobo-Dioulasso et autres villes.' },
    ],
    conditions: [
      ['Durée minimum', '3 nuits'],
      ['Paiement', 'À l\'avance (Mobile Money, virement)'],
      ['Caution', '10% du montant total (à partir de 5 nuitées)'],
      ['Annulation', '48h avant l\'arrivée (remboursement intégral)'],
    ],
    formTitle: 'Réserver un logement',
    formSubtitle: 'Décrivez votre besoin — dates, ville, nombre de personnes. Nous vous envoyons les disponibilités sous 24h.',
  },
  en: {
    meta: {
      title: 'Short-term rental — Furnished apartments & villas',
      description: 'Rent a furnished apartment or villa in Burkina Faso for 3 nights minimum. Ideal for business trips, tourism or temporary stays.',
    },
    eyebrow: 'Rental',
    heading: 'Short-term rental',
    intro: 'Furnished apartments and villas for your short stays in Burkina Faso. Minimum duration: 3 nights.',
    features: [
      { icon: '🏨', title: 'Furnished accommodation', desc: 'Fully equipped apartments and villas — air conditioning, wifi, kitchen, linens.' },
      { icon: '📅', title: 'Flexibility', desc: 'Bookings from 3 nights. Ideal for business trips or tourism.' },
      { icon: '🧹', title: 'Services included', desc: 'Regular cleaning, security, and 24/7 assistance on request.' },
      { icon: '📍', title: 'Premium locations', desc: 'Secure neighbourhoods in Ouagadougou, Bobo-Dioulasso and other cities.' },
    ],
    conditions: [
      ['Minimum stay', '3 nights'],
      ['Payment', 'In advance (Mobile Money, wire transfer)'],
      ['Deposit', '10% of total amount (from 5 nights)'],
      ['Cancellation', '48h before arrival (full refund)'],
    ],
    formTitle: 'Book accommodation',
    formSubtitle: 'Describe your needs — dates, city, number of guests. We\'ll send availabilities within 24h.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function LocationCourtSejourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
          {c.eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4">
          {c.heading}
        </h1>
        <p className="text-[var(--color-white-muted)] text-lg leading-relaxed max-w-2xl">
          {c.intro}
        </p>
      </div>

      {/* Main Layout: Form Left, Content Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-20">
        {/* LEFT COLUMN: Form */}
        <div className="order-2 lg:order-1">
          <div className="sticky top-8">
            <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
              <p className="text-sm text-[var(--color-white-muted)] mb-6">{c.formSubtitle}</p>
              <ShortTermRentalForm source="location-court-sejour" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="order-1 lg:order-2">
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {c.features.map((f) => (
              <div key={f.title} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h2 className="font-semibold text-white mb-1">{f.title}</h2>
                <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Conditions */}
          <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
            <h2 className="font-serif text-xl font-semibold text-white mb-4">Conditions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.conditions.map(([label, value]) => (
                <div key={label} className="flex gap-2 text-sm">
                  <span className="text-[var(--color-white-muted)] min-w-[120px]">{label} :</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
