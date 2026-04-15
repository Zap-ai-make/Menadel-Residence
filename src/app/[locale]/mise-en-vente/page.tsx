import type { Metadata } from 'next';
import { PropertySaleForm } from '@/components/contact/PropertySaleForm';

const CONTENT = {
  fr: {
    meta: {
      title: 'Mise en vente de votre bien — Menadel Residence',
      description: 'Confiez la vente de votre bien immobilier à Menadel Residence. Estimation gratuite, audit juridique, accompagnement jusqu\'à la signature chez le notaire.',
    },
    eyebrow: 'Service',
    heading: 'Mise en vente de votre bien',
    intro: 'Vous souhaitez vendre votre parcelle, villa, terrain ou immeuble au Burkina Faso ? Confiez-nous votre bien — nous gérons tout, de l\'estimation à la signature chez le notaire, dans le strict respect de la réglementation burkinabè.',
    steps: [
      {
        n: '1',
        title: 'Prise de mandat de vente',
        desc: 'Entretien avec le propriétaire, vérification de la qualité de propriétaire (titre foncier), signature du mandat de vente précisant le type, le prix et la commission.'
      },
      {
        n: '2',
        title: 'Audit juridique et administratif',
        desc: 'Vérification du titre foncier, certificat de non-opposition, conformité urbanistique, absence de litige ou hypothèque. Étape critique pour garantir que le bien est vendable légalement.'
      },
      {
        n: '3',
        title: 'Estimation et stratégie',
        desc: 'Analyse comparative du marché, étude de la localisation et du standing, fixation du prix juste avec le propriétaire.'
      },
      {
        n: '4',
        title: 'Préparation commerciale',
        desc: 'Mise en état du bien, shooting photo professionnel, rédaction de l\'annonce, constitution du dossier de vente complet.'
      },
      {
        n: '5',
        title: 'Commercialisation',
        desc: 'Diffusion sur notre catalogue, réseaux sociaux et base de clients qualifiés. Organisation des visites avec acquéreurs vérifiés.'
      },
      {
        n: '6',
        title: 'Négociation des offres',
        desc: 'Analyse des offres d\'achat, négociation prix et conditions, validation avec le propriétaire. La vente est formée dès accord sur la chose et le prix.'
      },
      {
        n: '7',
        title: 'Sécurisation juridique',
        desc: 'Rédaction du compromis ou promesse de vente, transmission du dossier au notaire pour l\'acte authentique obligatoire.'
      },
      {
        n: '8',
        title: 'Signature notariale',
        desc: 'Vérification finale des documents, signature de l\'acte authentique, paiement du prix et transfert officiel de propriété.'
      },
      {
        n: '9',
        title: 'Clôture et suivi',
        desc: 'Paiement de la commission (au succès uniquement), reversement au propriétaire, archivage du dossier et suivi post-vente.'
      },
    ],
    legal: {
      title: 'Cadre réglementaire',
      items: [
        'Loi n°057-2008/AN portant promotion immobilière',
        'Code de l\'urbanisme et de la construction',
        'Droit OHADA (contrats et transfert de propriété)',
        'Obligation de passer par un notaire pour sécuriser la vente',
        'Interdiction de vendre des terrains non régularisés (loi 2023)',
      ],
      principle: 'Principe clé : sécurité juridique + traçabilité + transparence',
    },
    practices: {
      title: 'Nos engagements professionnels',
      items: [
        { icon: '✓', text: 'Vérification juridique systématique' },
        { icon: '✓', text: 'Transparence totale avec les parties' },
        { icon: '✓', text: 'Reporting régulier au propriétaire' },
        { icon: '✓', text: 'Sécurisation via notaire' },
        { icon: '✓', text: 'Respect strict de la réglementation foncière' },
        { icon: '✓', text: 'Commission uniquement au résultat' },
      ],
    },
    commission: {
      title: 'Honoraires',
      text: 'Commission à la vente uniquement — aucun frais si le bien n\'est pas vendu. Pourcentage selon valeur du bien (généralement 3 à 5%).',
    },
    formTitle: 'Mettre mon bien en vente',
    formSubtitle: 'Décrivez votre bien — nous vous recontactons sous 24h pour une estimation gratuite et un audit de la situation juridique.',
  },
  en: {
    meta: {
      title: 'Sell your property — Menadel Residence',
      description: 'Entrust the sale of your property to Menadel Residence. Free valuation, legal audit, support through to notary signing.',
    },
    eyebrow: 'Service',
    heading: 'Sell your property',
    intro: 'Looking to sell your plot, villa, land or building in Burkina Faso? Entrust us with your property — we handle everything from valuation to notary signing, in strict compliance with Burkinabè regulations.',
    steps: [
      {
        n: '1',
        title: 'Sale mandate',
        desc: 'Meeting with the owner, verification of ownership (land title), signing of the sale mandate specifying type, price and commission.'
      },
      {
        n: '2',
        title: 'Legal and administrative audit',
        desc: 'Verification of land title, non-opposition certificate, urban planning compliance, absence of disputes or mortgages. Critical step to ensure the property can be legally sold.'
      },
      {
        n: '3',
        title: 'Valuation and strategy',
        desc: 'Comparative market analysis, study of location and standing, setting the right price with the owner.'
      },
      {
        n: '4',
        title: 'Commercial preparation',
        desc: 'Property staging, professional photo shoot, listing creation, complete sales file preparation.'
      },
      {
        n: '5',
        title: 'Marketing',
        desc: 'Distribution on our catalogue, social media and qualified client database. Organised viewings with verified buyers.'
      },
      {
        n: '6',
        title: 'Offer negotiation',
        desc: 'Analysis of purchase offers, price and conditions negotiation, validation with owner. Sale is formed upon agreement on the item and price.'
      },
      {
        n: '7',
        title: 'Legal securisation',
        desc: 'Drafting of preliminary contract or promise of sale, transmission of file to notary for mandatory authentic deed.'
      },
      {
        n: '8',
        title: 'Notary signing',
        desc: 'Final document verification, signing of authentic deed, price payment and official property transfer.'
      },
      {
        n: '9',
        title: 'Closing and follow-up',
        desc: 'Commission payment (on success only), disbursement to owner, file archiving and post-sale follow-up.'
      },
    ],
    legal: {
      title: 'Regulatory framework',
      items: [
        'Law n°057-2008/AN on real estate promotion',
        'Urban planning and construction code',
        'OHADA law (contracts and property transfer)',
        'Mandatory notary involvement to secure the sale',
        'Prohibition of selling unregularised land (2023 law)',
      ],
      principle: 'Key principle: legal security + traceability + transparency',
    },
    practices: {
      title: 'Our professional commitments',
      items: [
        { icon: '✓', text: 'Systematic legal verification' },
        { icon: '✓', text: 'Full transparency with all parties' },
        { icon: '✓', text: 'Regular reporting to owner' },
        { icon: '✓', text: 'Security via notary' },
        { icon: '✓', text: 'Strict compliance with land regulations' },
        { icon: '✓', text: 'Commission only on success' },
      ],
    },
    commission: {
      title: 'Fees',
      text: 'Commission on sale only — no fees if the property is not sold. Percentage based on property value (typically 3 to 5%).',
    },
    formTitle: 'List my property for sale',
    formSubtitle: 'Describe your property — we\'ll contact you within 24h for a free valuation and legal situation audit.',
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
      {/* Main Layout: Form Left, Content Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-12 lg:gap-20">
        {/* LEFT COLUMN: Form */}
        <div className="order-2 lg:order-1">
          <div className="sticky top-8">
            <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
              <h2 className="font-serif text-2xl font-semibold text-white mb-2">
                {c.formTitle}
              </h2>
              <p className="text-sm text-[var(--color-white-muted)] mb-6">
                {c.formSubtitle}
              </p>
              <PropertySaleForm source="mise-en-vente" />
            </div>

            {/* Commission info below form */}
            <div className="mt-6 p-5 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
              <h3 className="font-serif text-lg font-semibold text-[var(--color-gold)] mb-2">
                {c.commission.title}
              </h3>
              <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">
                {c.commission.text}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="order-1 lg:order-2">
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

          {/* Process Steps */}
          <div className="mb-14">
            <h2 className="font-serif text-2xl font-semibold text-white mb-6">
              {locale === 'en' ? 'Our process' : 'Notre processus'}
            </h2>
            <div className="space-y-4">
              {c.steps.map((step) => (
                <div key={step.n} className="flex gap-4 p-4 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                  <div className="w-8 h-8 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[var(--color-gold)] font-semibold">{step.n}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">{step.title}</p>
                    <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Framework */}
          <div className="mb-14 p-6 rounded-xl border border-white/10 bg-[var(--color-anthracite-soft)]">
            <h2 className="font-serif text-xl font-semibold text-white mb-4">
              {c.legal.title}
            </h2>
            <ul className="space-y-2 mb-4">
              {c.legal.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-white-muted)]">
                  <span className="text-[var(--color-gold)] flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-[var(--color-gold)] italic">
              {c.legal.principle}
            </p>
          </div>

          {/* Professional Practices */}
          <div className="p-6 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-gold)] mb-4">
              {c.practices.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {c.practices.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white">
                  <span className="text-[var(--color-gold)] font-bold">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
