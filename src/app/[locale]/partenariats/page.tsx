import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Nos partenariats — Menadel Residence',
      description: 'Découvrez les partenaires institutionnels et professionnels de Menadel Residence. Notaires, banques, experts géomètres.',
    },
    eyebrow: 'L\'agence',
    heading: 'Nos partenariats',
    intro: 'Menadel Residence travaille avec un réseau de partenaires de confiance pour sécuriser vos transactions immobilières.',
    categories: [
      {
        title: 'Notaires partenaires',
        icon: '⚖️',
        partners: [
          { name: 'Étude Maître OUEDRAOGO', role: 'Notaire titulaire — Ouagadougou', desc: 'Actes de vente, compromis, procurations diaspora' },
          { name: 'Étude Maître SANOGO', role: 'Notaire — Bobo-Dioulasso', desc: 'Transactions région Hauts-Bassins' },
        ],
      },
      {
        title: 'Institutions financières',
        icon: '🏦',
        partners: [
          { name: 'Coris Bank International', role: 'Banque partenaire', desc: 'Comptes séquestre, financement immobilier' },
          { name: 'Banque Agricole du Faso', role: 'Partenaire financement', desc: 'Crédit habitat, prêt acquisition terrain' },
        ],
      },
      {
        title: 'Experts techniques',
        icon: '📐',
        partners: [
          { name: 'Cabinet Géo-Expert', role: 'Géomètre agréé', desc: 'Bornage, levée topographique, morcellement' },
          { name: 'BTP Expertise', role: 'Bureau d\'études', desc: 'Diagnostic technique, estimation valeur' },
        ],
      },
      {
        title: 'Institutions publiques',
        icon: '🏛️',
        partners: [
          { name: 'Ministère de l\'Habitat (MHUE)', role: 'Agrément officiel', desc: 'Agence immobilière agréée' },
          { name: 'Direction du Cadastre', role: 'Partenaire administratif', desc: 'Vérification titres fonciers' },
        ],
      },
    ],
    partnerCta: {
      title: 'Devenir partenaire',
      text: 'Vous êtes notaire, banque, expert ou institution ? Rejoignez notre réseau de partenaires.',
    },
    formTitle: 'Contact partenariat',
    formSubtitle: 'Présentez votre structure et vos services — nous vous recontactons.',
  },
  en: {
    meta: {
      title: 'Our partnerships — Menadel Residence',
      description: 'Discover the institutional and professional partners of Menadel Residence. Notaries, banks, surveying experts.',
    },
    eyebrow: 'The agency',
    heading: 'Our partnerships',
    intro: 'Menadel Residence works with a network of trusted partners to secure your real estate transactions.',
    categories: [
      {
        title: 'Partner notaries',
        icon: '⚖️',
        partners: [
          { name: 'Maître OUEDRAOGO Office', role: 'Titular notary — Ouagadougou', desc: 'Sale deeds, contracts, diaspora powers of attorney' },
          { name: 'Maître SANOGO Office', role: 'Notary — Bobo-Dioulasso', desc: 'Hauts-Bassins region transactions' },
        ],
      },
      {
        title: 'Financial institutions',
        icon: '🏦',
        partners: [
          { name: 'Coris Bank International', role: 'Partner bank', desc: 'Escrow accounts, real estate financing' },
          { name: 'Banque Agricole du Faso', role: 'Financing partner', desc: 'Housing loans, land acquisition credit' },
        ],
      },
      {
        title: 'Technical experts',
        icon: '📐',
        partners: [
          { name: 'Géo-Expert Office', role: 'Licensed surveyor', desc: 'Boundary marking, topographic survey, subdivision' },
          { name: 'BTP Expertise', role: 'Engineering firm', desc: 'Technical assessment, value estimation' },
        ],
      },
      {
        title: 'Public institutions',
        icon: '🏛️',
        partners: [
          { name: 'Ministry of Housing (MHUE)', role: 'Official license', desc: 'Licensed real estate agency' },
          { name: 'Land Registry Office', role: 'Administrative partner', desc: 'Land title verification' },
        ],
      },
    ],
    partnerCta: {
      title: 'Become a partner',
      text: 'Are you a notary, bank, expert or institution? Join our partner network.',
    },
    formTitle: 'Partnership contact',
    formSubtitle: 'Present your organisation and services — we\'ll get back to you.',
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

export default async function PartenariatsPage({
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

        {/* Partner categories */}
        <div className="space-y-8 mb-14">
          {c.categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="font-serif text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                {cat.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.partners.map((p) => (
                  <div key={p.name} className="p-4 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                    <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                    <p className="text-xs text-[var(--color-gold)] mb-1">{p.role}</p>
                    <p className="text-xs text-[var(--color-white-muted)]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partner CTA */}
        <div className="p-6 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 mb-12">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-gold)] mb-2">{c.partnerCta.title}</h2>
          <p className="text-sm text-[var(--color-white-muted)]">{c.partnerCta.text}</p>
        </div>

        {/* Contact form */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">{c.formSubtitle}</p>
          <ContactFormInline source="partenariats" />
        </div>
      </div>
    </div>
  );
}
