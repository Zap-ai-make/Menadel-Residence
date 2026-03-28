import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Pourquoi Menadel Residence',
      description: 'Dans un marché immobilier à 80% informel au Burkina Faso, Menadel Residence est une agence agréée, transparente et engagée pour protéger vos intérêts.',
    },
    eyebrow: 'L\'agence',
    heading: 'Pourquoi Menadel Residence',
    intro: 'Au Burkina Faso, 80% des transactions immobilières passent par des intermédiaires informels — sans contrat, sans garantie, sans recours. Menadel Residence est différente.',
    informalTitle: 'Le marché informel',
    informalItems: [
      'Pas de contrat écrit ni de reçu',
      'Aucun recours en cas de litige',
      'Prix arbitraires, pas de transparence',
      'Risque de double vente',
      'Pas de vérification du titre foncier',
    ],
    formalTitle: 'Menadel Residence',
    formalItems: [
      'Agence agréée par le MHUE (Agrément officiel)',
      'Contrat signé dès le premier engagement',
      'Prix négociés transparents, confirmés par écrit',
      'Vérification systématique du titre foncier',
      'Notaire partenaire pour tous les actes',
      'Espace numérique bailleur & locataire (bientôt disponible)',
    ],
    stats: [
      { value: '8', label: 'Ans d\'expérience' },
      { value: '120+', label: 'Transactions réalisées' },
      { value: '30+', label: 'Biens disponibles' },
    ],
    digitalBadge: 'Bientôt disponible',
    digitalLabel: 'Apps mobiles exclusives',
    digitalTitle: 'Une agence du XXIe siècle',
    digitalDesc: 'Là où les autres agences s\'arrêtent à la remise des clés, Menadel Residence va plus loin : chaque propriétaire et chaque locataire dispose de sa propre application mobile.',
    digitalApps: [
      { icon: '🏠', name: 'Menadel Bailleur', desc: 'Tableau de bord patrimoine · Virements · Rapports · Documents' },
      { icon: '👤', name: 'Menadel Locataire', desc: 'Paiement loyer · Quittances · Contrat · Interventions' },
    ],
    digitalCta: 'Découvrir les apps →',
    legalTitle: 'Informations légales',
    legalItems: [
      ['IFU', '00253576E'],
      ['RCCM', 'BF-OUA-01-2024-B12-17129'],
      ['Capital', '5 000 000 FCFA (SARL)'],
      ['Adresse', 'Secteur 53 (Ouaga 2000), BP 9656 OUA 06'],
    ],
    formTitle: 'Discutons de votre projet',
    formSubtitle: 'Aucun engagement. Nous répondons dans les 24h.',
  },
  en: {
    meta: {
      title: 'Why Menadel Residence',
      description: 'In a real estate market that is 80% informal in Burkina Faso, Menadel Residence is a licensed, transparent agency committed to protecting your interests.',
    },
    eyebrow: 'The agency',
    heading: 'Why Menadel Residence',
    intro: 'In Burkina Faso, 80% of real estate transactions go through informal intermediaries — no contract, no guarantee, no recourse. Menadel Residence is different.',
    informalTitle: 'The informal market',
    informalItems: [
      'No written contract or receipt',
      'No recourse in case of dispute',
      'Arbitrary prices, no transparency',
      'Risk of double selling',
      'No land title verification',
    ],
    formalTitle: 'Menadel Residence',
    formalItems: [
      'Agency licensed by MHUE (official approval)',
      'Contract signed at the first commitment',
      'Transparent negotiated prices, confirmed in writing',
      'Systematic land title verification',
      'Partner notary for all deeds',
      'Digital owner & tenant portal (coming soon)',
    ],
    stats: [
      { value: '8', label: 'Years of experience' },
      { value: '120+', label: 'Completed transactions' },
      { value: '30+', label: 'Properties available' },
    ],
    digitalBadge: 'Coming soon',
    digitalLabel: 'Exclusive mobile apps',
    digitalTitle: 'A 21st-century agency',
    digitalDesc: 'Where other agencies stop at handing over the keys, Menadel Residence goes further: every owner and every tenant gets their own mobile app.',
    digitalApps: [
      { icon: '🏠', name: 'Menadel Bailleur', desc: 'Portfolio dashboard · Transfers · Reports · Documents' },
      { icon: '👤', name: 'Menadel Locataire', desc: 'Rent payment · Receipts · Lease · Maintenance' },
    ],
    digitalCta: 'Discover the apps →',
    legalTitle: 'Legal information',
    legalItems: [
      ['IFU', '00253576E'],
      ['RCCM', 'BF-OUA-01-2024-B12-17129'],
      ['Capital', '5,000,000 FCFA (Ltd)'],
      ['Address', 'Sector 53 (Ouaga 2000), BP 9656 OUA 06'],
    ],
    formTitle: 'Let\'s discuss your project',
    formSubtitle: 'No commitment. We reply within 24h.',
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

export default async function PourquoiMinadelPage({
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

        {/* Formel vs informel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          <div className="p-5 rounded-xl border border-[var(--color-status-sold)]/20 bg-[var(--color-status-sold)]/5">
            <h2 className="font-semibold text-[var(--color-status-sold)] mb-3">{c.informalTitle}</h2>
            <ul className="space-y-2">
              {c.informalItems.map((item) => (
                <li key={item} className="text-sm text-[var(--color-white-muted)] flex gap-2">
                  <span className="text-[var(--color-status-sold)] flex-shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
            <h2 className="font-semibold text-[var(--color-gold)] mb-3">{c.formalTitle}</h2>
            <ul className="space-y-2">
              {c.formalItems.map((item) => (
                <li key={item} className="text-sm text-[var(--color-white-muted)] flex gap-2">
                  <span className="text-[var(--color-gold)] flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-14">
          {c.stats.map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-gold)]">{s.value}</div>
              <div className="text-xs text-[var(--color-white-muted)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Apps mobiles — teaser */}
        <div className="mb-14 rounded-2xl border border-[var(--color-gold)]/20 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent p-6">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {c.digitalLabel}
            </p>
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)]">
              {c.digitalBadge}
            </span>
          </div>
          <h2 className="font-serif text-xl font-semibold text-white mb-2">{c.digitalTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] leading-relaxed mb-5 max-w-prose">
            {c.digitalDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {c.digitalApps.map((app) => (
              <div key={app.name} className="flex items-start gap-3 flex-1 p-3 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                <span className="text-2xl flex-shrink-0">{app.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{app.name}</p>
                  <p className="text-xs text-[var(--color-white-muted)] mt-0.5">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/gestion-locative"
            className="inline-flex items-center text-sm font-medium text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
          >
            {c.digitalCta}
          </Link>
        </div>

        {/* Legal info */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10 mb-12">
          <h2 className="font-serif text-xl font-semibold text-white mb-4">{c.legalTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {c.legalItems.map(([label, value]) => (
              <div key={label} className="flex gap-2 text-sm">
                <span className="text-[var(--color-white-muted)] min-w-[100px]">{label} :</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">
            {c.formSubtitle}
          </p>
          <ContactFormInline source="pourquoi-minadel" />
        </div>
      </div>
    </div>
  );
}
