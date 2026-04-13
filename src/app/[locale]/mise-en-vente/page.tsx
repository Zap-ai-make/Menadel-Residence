import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Mise en vente de votre bien — Menadel Residence',
      description: 'Confiez la vente de votre bien immobilier à Menadel Residence. Estimation gratuite, diffusion large, accompagnement jusqu\'à la signature.',
    },
    eyebrow: 'Service',
    heading: 'Mise en vente de votre bien',
    intro: 'Vous souhaitez vendre votre parcelle, villa, terrain ou immeuble au Burkina Faso ? Confiez-nous votre bien — nous gérons tout, de l\'estimation à la signature chez le notaire.',
    services: [
      { icon: '📊', title: 'Estimation gratuite', desc: 'Analyse du marché local, comparables récents, prix de vente recommandé.' },
      { icon: '📸', title: 'Mise en valeur', desc: 'Photos HD, vidéo drone si pertinent, fiche descriptive complète.' },
      { icon: '📢', title: 'Diffusion large', desc: 'Publication sur notre catalogue, réseaux sociaux, base de clients qualifiés.' },
      { icon: '🔍', title: 'Qualification acheteurs', desc: 'Vérification solvabilité, motivation réelle, accompagnement visites.' },
      { icon: '📋', title: 'Négociation', desc: 'Défense de vos intérêts, négociation prix, compromis écrit.' },
      { icon: '✍️', title: 'Signature', desc: 'Accompagnement chez le notaire, vérification titre foncier, transfert sécurisé.' },
    ],
    commission: {
      title: 'Honoraires',
      text: 'Commission à la vente uniquement — aucun frais si le bien n\'est pas vendu. Pourcentage selon valeur du bien (généralement 3 à 5%).',
    },
    formTitle: 'Décrire mon bien',
    formSubtitle: 'Type de bien, localisation, surface, prix souhaité. Nous vous recontactons pour une estimation gratuite.',
  },
  en: {
    meta: {
      title: 'Sell your property — Menadel Residence',
      description: 'Entrust the sale of your property to Menadel Residence. Free valuation, wide exposure, support through to signing.',
    },
    eyebrow: 'Service',
    heading: 'Sell your property',
    intro: 'Looking to sell your plot, villa, land or building in Burkina Faso? Entrust us with your property — we handle everything from valuation to notary signing.',
    services: [
      { icon: '📊', title: 'Free valuation', desc: 'Local market analysis, recent comparables, recommended sale price.' },
      { icon: '📸', title: 'Property showcase', desc: 'HD photos, drone video if relevant, complete listing sheet.' },
      { icon: '📢', title: 'Wide exposure', desc: 'Published on our catalogue, social media, qualified client database.' },
      { icon: '🔍', title: 'Buyer qualification', desc: 'Solvency check, genuine motivation, visit support.' },
      { icon: '📋', title: 'Negotiation', desc: 'Defending your interests, price negotiation, written agreement.' },
      { icon: '✍️', title: 'Signing', desc: 'Notary support, land title verification, secure transfer.' },
    ],
    commission: {
      title: 'Fees',
      text: 'Commission on sale only — no fees if the property is not sold. Percentage based on property value (typically 3 to 5%).',
    },
    formTitle: 'Describe my property',
    formSubtitle: 'Property type, location, area, desired price. We\'ll contact you for a free valuation.',
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

export default async function MiseEnVentePage({
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

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {c.services.map((s) => (
            <div key={s.title} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <div className="text-2xl mb-2">{s.icon}</div>
              <h2 className="font-semibold text-white mb-1">{s.title}</h2>
              <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Commission info */}
        <div className="p-6 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 mb-12">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-gold)] mb-2">{c.commission.title}</h2>
          <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{c.commission.text}</p>
        </div>

        {/* Contact form */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">{c.formTitle}</h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">{c.formSubtitle}</p>
          <ContactFormInline source="mise-en-vente" />
        </div>
      </div>
    </div>
  );
}
