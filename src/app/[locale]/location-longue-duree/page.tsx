import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Location longue durée — Maisons à louer',
      description: 'Trouvez une maison à louer au Burkina Faso pour 12 mois minimum. Villas, appartements et maisons dans les meilleurs quartiers.',
    },
    eyebrow: 'Location',
    heading: 'Location longue durée',
    intro: 'Maisons, villas et appartements à louer pour des séjours de longue durée. Durée minimum : 12 mois.',
    features: [
      { icon: '🏠', title: 'Large choix', desc: 'Villas, maisons, appartements dans tous les quartiers — du studio au domaine familial.' },
      { icon: '📋', title: 'Bail sécurisé', desc: 'Contrat de bail notarié, état des lieux photographié, conditions claires.' },
      { icon: '🔧', title: 'Suivi locatif', desc: 'Interlocuteur dédié pour toute la durée du bail — interventions, renouvellement, questions.' },
      { icon: '💰', title: 'Tarifs négociés', desc: 'Prix marché vérifié. Pas de surcoût diaspora. Transparence totale sur les charges.' },
    ],
    process: [
      { n: '1', t: 'Définir vos critères', d: 'Ville, quartier, budget, nombre de chambres, équipements souhaités.' },
      { n: '2', t: 'Sélection personnalisée', d: 'Nous vous envoyons une liste de biens correspondants avec photos et vidéos.' },
      { n: '3', t: 'Visite (ou visite virtuelle)', d: 'Visite sur place ou visite vidéo en direct pour la diaspora.' },
      { n: '4', t: 'Signature du bail', d: 'Contrat chez notre notaire partenaire. État des lieux et remise des clés.' },
    ],
    conditions: [
      ['Durée minimum', '12 mois'],
      ['Dépôt de garantie', '2 à 3 mois de loyer (selon le bien)'],
      ['Paiement', 'Mensuel ou trimestriel d\'avance'],
      ['Préavis', '3 mois avant la fin du bail'],
    ],
    formTitle: 'Trouver un logement',
    formSubtitle: 'Décrivez vos critères — nous vous envoyons une sélection personnalisée sous 48h.',
  },
  en: {
    meta: {
      title: 'Long-term rental — Houses for rent',
      description: 'Find a house for rent in Burkina Faso for 12 months minimum. Villas, apartments and houses in the best neighbourhoods.',
    },
    eyebrow: 'Rental',
    heading: 'Long-term rental',
    intro: 'Houses, villas and apartments for rent for long-term stays. Minimum duration: 12 months.',
    features: [
      { icon: '🏠', title: 'Wide selection', desc: 'Villas, houses, apartments in all neighbourhoods — from studios to family estates.' },
      { icon: '📋', title: 'Secure lease', desc: 'Notarised lease contract, photographic condition report, clear terms.' },
      { icon: '🔧', title: 'Rental support', desc: 'Dedicated contact for the entire lease — maintenance, renewal, questions.' },
      { icon: '💰', title: 'Negotiated rates', desc: 'Verified market price. No diaspora surcharge. Full transparency on charges.' },
    ],
    process: [
      { n: '1', t: 'Define your criteria', d: 'City, neighbourhood, budget, number of bedrooms, desired amenities.' },
      { n: '2', t: 'Personalised selection', d: 'We send you a list of matching properties with photos and videos.' },
      { n: '3', t: 'Visit (or virtual tour)', d: 'On-site visit or live video tour for diaspora.' },
      { n: '4', t: 'Lease signing', d: 'Contract at our partner notary. Condition report and key handover.' },
    ],
    conditions: [
      ['Minimum duration', '12 months'],
      ['Security deposit', '2 to 3 months rent (depending on property)'],
      ['Payment', 'Monthly or quarterly in advance'],
      ['Notice period', '3 months before lease end'],
    ],
    formTitle: 'Find accommodation',
    formSubtitle: 'Describe your criteria — we\'ll send a personalised selection within 48h.',
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

export default async function LocationLongueDureePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = locale === 'en' ? CONTENT.en : CONTENT.fr;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
          {c.eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white leading-tight mb-4">
          {c.heading}
        </h1>
        <p className="text-[var(--color-white-muted)] text-lg leading-relaxed mb-12 max-w-prose">
          {c.intro}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {c.features.map((f) => (
            <div key={f.title} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h2 className="font-semibold text-white mb-1">{f.title}</h2>
              <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-semibold text-white mb-6">
            {locale === 'fr' ? 'Comment ça marche' : 'How it works'}
          </h2>
          <div className="space-y-4">
            {c.process.map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="w-8 h-8 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-[var(--color-gold)] font-semibold">{step.n}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{step.t}</p>
                  <p className="text-sm text-[var(--color-white-muted)]">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10 mb-12">
          <h2 className="font-serif text-xl font-semibold text-white mb-4">Conditions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {c.conditions.map(([label, value]) => (
              <div key={label} className="flex gap-2 text-sm">
                <span className="text-[var(--color-white-muted)] min-w-[140px]">{label} :</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">{c.formSubtitle}</p>
          <ContactFormInline source="location-longue-duree" />
        </div>
      </div>
    </div>
  );
}
