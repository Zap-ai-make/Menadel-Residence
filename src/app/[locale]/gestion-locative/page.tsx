import type { Metadata } from 'next';
import { PropertyManagementForm } from '@/components/contact/PropertyManagementForm';

const CONTENT = {
  fr: {
    meta: {
      title: 'Confier en gestion locative',
      description: 'Déléguez la gestion de votre bien immobilier au Burkina Faso à Menadel Residence. Recherche locataire, encaissement loyers, reporting mensuel, virements internationaux.',
    },
    eyebrow: 'Service',
    heading: 'Notre procédure de prise en charge d\'un bien en gestion immobilière',
    intro: 'Points clés de différenciation MENADEL Résidence : Approche haut de gamme et standardisée • Optimisation de la rentabilité du propriétaire • Gestion clé en main (de A à Z) • Transparence financière et reporting régulier conformément à la loi en vigueur.',
    steps: [
      {
        n: '1',
        title: 'Prise de contact et qualification du besoin',
        items: [
          'Réception de la demande du propriétaire (physique ou morale)',
          'Recueil des informations clés : type de bien, localisation, objectif (location courte/longue durée/mixte), niveau de standing',
          'Planification d\'un rendez-vous pour visite',
        ],
      },
      {
        n: '2',
        title: 'Visite technique et évaluation du bien',
        items: [
          'Inspection complète : état général, structure, équipements, finitions',
          'Conformité aux standards de MENADEL Résidence',
          'Prise de photos et collecte de documents (titre foncier, plans, etc.)',
          'Identification des travaux éventuels (mise à niveau, ameublement, sécurité)',
        ],
      },
      {
        n: '3',
        title: 'Étude de rentabilité et proposition commerciale',
        items: [
          'Analyse du marché local (comparables, zone, standing)',
          'Détermination du positionnement tarifaire',
          'Simulation de revenus (occupation estimée, rendement)',
          'Présentation au propriétaire : stratégie d\'exploitation, modèle de gestion (commission ou loyer garanti), conditions contractuelles',
        ],
      },
      {
        n: '4',
        title: 'Validation et signature du mandat de gestion',
        items: [
          'Signature du contrat de gestion immobilière : durée du mandat, obligations des parties, modalités financières',
          'Constitution du dossier administratif : pièces d\'identité, documents de propriété, coordonnées bancaires',
        ],
      },
      {
        n: '5',
        title: 'Mise à niveau et préparation du bien',
        items: [
          'Réalisation des travaux si nécessaire : rénovation, décoration, ameublement et équipements',
          'Installation des standards MENADEL : linge, kits d\'accueil, connexion internet, TV, sécurité',
          'Mise en conformité opérationnelle',
        ],
      },
      {
        n: '6',
        title: 'Création du produit commercial',
        items: [
          'Shooting photo professionnel',
          'Rédaction des descriptifs marketing',
          'Intégration sur les canaux de diffusion : plateformes digitales, réseau clients MENADEL',
          'Définition des procédures d\'accueil client',
        ],
      },
      {
        n: '7',
        title: 'Mise en exploitation',
        items: [
          'Lancement de la commercialisation',
          'Gestion des réservations',
          'Accueil et check-in des clients',
          'Suivi de la satisfaction client',
        ],
      },
      {
        n: '8',
        title: 'Gestion opérationnelle continue',
        items: [
          'Entretien et maintenance du bien',
          'Gestion du personnel (ménage, sécurité)',
          'Gestion des incidents et réclamations',
          'Optimisation du taux d\'occupation',
        ],
      },
      {
        n: '9',
        title: 'Suivi financier et reporting',
        items: [
          'Encaissement des loyers / recettes',
          'Paiement des charges (si mandaté)',
          'Reversement au propriétaire',
          'Transmission de rapports périodiques : revenus, taux d\'occupation, état du bien',
        ],
      },
      {
        n: '10',
        title: 'Évaluation et amélioration continue',
        items: [
          'Analyse des performances',
          'Ajustement des tarifs et stratégies',
          'Recommandations d\'investissement (amélioration du bien)',
          'Renouvellement ou révision du mandat',
        ],
      },
    ],
    appsEyebrow: 'Outils numériques exclusifs',
    appsHeading: 'Deux apps mobiles incluses dans votre mandat',
    appsSubtitle: 'Aucune agence au Burkina Faso ne vous offre ça. En confiant votre bien à Menadel Residence, vous et votre locataire accédez chacun à une application mobile dédiée — transparence totale, zéro friction.',
    appsBadge: 'Bientôt disponible',
    bailleur: {
      tag: 'Pour le propriétaire',
      name: 'Menadel Bailleur',
      tagline: 'Votre patrimoine dans votre poche',
      desc: 'Suivez vos biens, vos revenus locatifs et vos locataires en temps réel depuis n\'importe où dans le monde.',
      screens: [
        { label: 'Tableau de bord', value: '3 biens · 285 000 FCFA/mois' },
        { label: 'Dernier virement', value: '5 mars · reçu ✓' },
        { label: 'État des biens', value: 'Tous occupés' },
      ],
      features: [
        { icon: '📊', text: 'Tableau de bord patrimonial en temps réel' },
        { icon: '💸', text: 'Historique des virements et relevés mensuels' },
        { icon: '📋', text: 'Contrats de bail et documents légaux' },
        { icon: '🔔', text: 'Notifications : loyer reçu, impayé, travaux' },
        { icon: '📸', text: 'Rapports photographiques des états des lieux' },
        { icon: '📞', text: 'Contact direct avec votre gestionnaire dédié' },
      ],
      storeLabel: 'Disponible sur',
      notifyLabel: 'Me prévenir au lancement',
    },
    locataire: {
      tag: 'Pour le locataire',
      name: 'Menadel Locataire',
      tagline: 'Votre loyer, vos documents, tout en un',
      desc: 'Payer le loyer, récupérer sa quittance, consulter son contrat — tout depuis le téléphone, sans se déplacer à l\'agence.',
      screens: [
        { label: 'Loyer du mois', value: '95 000 FCFA · à payer' },
        { label: 'Quittance mars', value: 'Télécharger PDF ↓' },
        { label: 'Contrat de bail', value: 'En cours · 12 mois' },
      ],
      features: [
        { icon: '💳', text: 'Paiement du loyer en ligne (Mobile Money, virement)' },
        { icon: '🧾', text: 'Quittances et reçus de paiement téléchargeables' },
        { icon: '📄', text: 'Contrat de bail accessible à tout moment' },
        { icon: '🔧', text: 'Demandes d\'intervention et suivi en temps réel' },
        { icon: '📅', text: 'Historique complet des paiements' },
        { icon: '💬', text: 'Messagerie directe avec l\'agence' },
      ],
      storeLabel: 'Disponible sur',
      notifyLabel: 'Me prévenir au lancement',
    },
    formTitle: 'Confier mon bien',
    formSubtitle: 'Décrivez votre bien et votre situation — nous vous rappelons dans les 24h.',
  },
  en: {
    meta: {
      title: 'Property management',
      description: 'Delegate management of your Burkina Faso property to Menadel Residence. Tenant search, rent collection, monthly reporting, international transfers.',
    },
    eyebrow: 'Service',
    heading: 'Our property management onboarding procedure',
    intro: 'MENADEL Residence key differentiators: Premium and standardized approach • Owner profitability optimization • Turnkey management (A to Z) • Financial transparency and regular reporting in compliance with applicable laws.',
    steps: [
      {
        n: '1',
        title: 'Initial contact and needs assessment',
        items: [
          'Receiving the owner\'s request (individual or company)',
          'Gathering key information: property type, location, objective (short/long term/mixed rental), standing level',
          'Scheduling a visit appointment',
        ],
      },
      {
        n: '2',
        title: 'Technical visit and property evaluation',
        items: [
          'Complete inspection: general condition, structure, equipment, finishes',
          'Compliance with MENADEL Residence standards',
          'Photo documentation and document collection (land title, plans, etc.)',
          'Identification of potential work (upgrades, furnishing, security)',
        ],
      },
      {
        n: '3',
        title: 'Profitability study and commercial proposal',
        items: [
          'Local market analysis (comparables, area, standing)',
          'Pricing positioning',
          'Revenue simulation (estimated occupancy, yield)',
          'Presentation to owner: operating strategy, management model (commission or guaranteed rent), contractual terms',
        ],
      },
      {
        n: '4',
        title: 'Validation and management mandate signing',
        items: [
          'Signing of property management contract: mandate duration, party obligations, financial terms',
          'Administrative file compilation: ID documents, property documents, bank details',
        ],
      },
      {
        n: '5',
        title: 'Property upgrade and preparation',
        items: [
          'Carrying out work if needed: renovation, decoration, furnishing and equipment',
          'Installing MENADEL standards: linens, welcome kits, internet, TV, security',
          'Operational compliance',
        ],
      },
      {
        n: '6',
        title: 'Commercial product creation',
        items: [
          'Professional photo shoot',
          'Marketing description writing',
          'Integration on distribution channels: digital platforms, MENADEL client network',
          'Client welcome procedures definition',
        ],
      },
      {
        n: '7',
        title: 'Launch of operations',
        items: [
          'Marketing launch',
          'Reservation management',
          'Client welcome and check-in',
          'Client satisfaction monitoring',
        ],
      },
      {
        n: '8',
        title: 'Ongoing operational management',
        items: [
          'Property maintenance and upkeep',
          'Staff management (cleaning, security)',
          'Incident and complaint handling',
          'Occupancy rate optimization',
        ],
      },
      {
        n: '9',
        title: 'Financial monitoring and reporting',
        items: [
          'Rent/revenue collection',
          'Charges payment (if mandated)',
          'Owner disbursement',
          'Periodic report transmission: revenues, occupancy rate, property condition',
        ],
      },
      {
        n: '10',
        title: 'Evaluation and continuous improvement',
        items: [
          'Performance analysis',
          'Pricing and strategy adjustments',
          'Investment recommendations (property improvement)',
          'Mandate renewal or revision',
        ],
      },
    ],
    appsEyebrow: 'Exclusive digital tools',
    appsHeading: 'Two mobile apps included with your mandate',
    appsSubtitle: 'No agency in Burkina Faso offers this. When you entrust your property to Menadel Residence, both you and your tenant get a dedicated mobile app — full transparency, zero friction.',
    appsBadge: 'Coming soon',
    bailleur: {
      tag: 'For the owner',
      name: 'Menadel Bailleur',
      tagline: 'Your portfolio in your pocket',
      desc: 'Track your properties, rental income and tenants in real time from anywhere in the world.',
      screens: [
        { label: 'Dashboard', value: '3 properties · 285,000 FCFA/mo' },
        { label: 'Last transfer', value: 'March 5 · received ✓' },
        { label: 'Property status', value: 'All occupied' },
      ],
      features: [
        { icon: '📊', text: 'Real-time portfolio dashboard' },
        { icon: '💸', text: 'Transfer history and monthly statements' },
        { icon: '📋', text: 'Lease contracts and legal documents' },
        { icon: '🔔', text: 'Notifications: rent received, arrears, works' },
        { icon: '📸', text: 'Photographic condition reports' },
        { icon: '📞', text: 'Direct contact with your dedicated manager' },
      ],
      storeLabel: 'Available on',
      notifyLabel: 'Notify me at launch',
    },
    locataire: {
      tag: 'For the tenant',
      name: 'Menadel Locataire',
      tagline: 'Your rent, your documents, all in one',
      desc: 'Pay rent, get receipts, view your lease — all from your phone, no need to visit the agency.',
      screens: [
        { label: 'This month\'s rent', value: '95,000 FCFA · due' },
        { label: 'March receipt', value: 'Download PDF ↓' },
        { label: 'Lease contract', value: 'Active · 12 months' },
      ],
      features: [
        { icon: '💳', text: 'Online rent payment (Mobile Money, transfer)' },
        { icon: '🧾', text: 'Downloadable rent receipts and acknowledgements' },
        { icon: '📄', text: 'Lease contract accessible at any time' },
        { icon: '🔧', text: 'Maintenance requests with real-time tracking' },
        { icon: '📅', text: 'Full payment history' },
        { icon: '💬', text: 'Direct messaging with the agency' },
      ],
      storeLabel: 'Available on',
      notifyLabel: 'Notify me at launch',
    },
    formTitle: 'Entrust my property',
    formSubtitle: 'Describe your property and situation — we call you back within 24h.',
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

function PhoneMockup({ screens }: { screens: { label: string; value: string }[] }) {
  return (
    <div className="relative mx-auto" style={{ width: '160px' }}>
      {/* Phone shell */}
      <div
        className="relative rounded-[2rem] border-[3px] border-[var(--color-anthracite-muted)] bg-[#111] overflow-hidden"
        style={{ paddingTop: '12px', paddingBottom: '12px' }}
      >
        {/* Notch */}
        <div className="flex justify-center mb-2">
          <div className="w-10 h-1.5 rounded-full bg-[var(--color-anthracite-muted)]" />
        </div>
        {/* Status bar */}
        <div className="flex justify-between items-center px-3 mb-3">
          <span className="text-[9px] text-white/40">9:41</span>
          <span className="text-[9px] text-white/40">●●●</span>
        </div>
        {/* App header */}
        <div className="px-3 mb-3">
          <div className="h-1.5 w-16 rounded bg-[var(--color-gold)]/60 mb-1" />
          <div className="h-1 w-10 rounded bg-white/20" />
        </div>
        {/* Screens / data rows */}
        <div className="px-3 space-y-2">
          {screens.map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 px-2.5 py-2">
              <div className="text-[8px] text-white/40 mb-0.5">{s.label}</div>
              <div className="text-[9px] text-white/80 font-medium leading-tight">{s.value}</div>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="flex justify-center gap-3 mt-4 mb-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-6 h-6 rounded-lg ${i === 1 ? 'bg-[var(--color-gold)]/30' : 'bg-white/10'}`} />
          ))}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-8 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function AppStoreBadges({ label, notifyLabel }: { label: string; notifyLabel: string }) {
  return (
    <div className="mt-5 space-y-2">
      <p className="text-xs text-[var(--color-white-muted)]/60 uppercase tracking-wider">{label}</p>
      <div className="flex gap-2">
        {/* App Store */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 opacity-50 cursor-not-allowed select-none">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
          </svg>
          <span className="text-[10px] text-white/60 font-medium">App Store</span>
        </div>
        {/* Google Play */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 opacity-50 cursor-not-allowed select-none">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
            <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
          </svg>
          <span className="text-[10px] text-white/60 font-medium">Google Play</span>
        </div>
      </div>
      <p className="text-[10px] text-[var(--color-gold)]/70 italic">{notifyLabel} →</p>
    </div>
  );
}

export default async function GestionLocativePage({
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
              <PropertyManagementForm source="gestion-locative" />
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

          {/* 10 étapes du parcours propriétaire */}
          <div className="space-y-4">
            {c.steps.map((step) => (
              <div key={step.n} className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[var(--color-gold)] font-bold">{step.n}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <ul className="space-y-1">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-[var(--color-white-muted)] leading-relaxed flex gap-2">
                          <span className="text-[var(--color-gold)] flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Apps mobiles — section pleine largeur ── */}
      <div className="rounded-2xl border border-[var(--color-gold)]/15 bg-gradient-to-br from-[var(--color-anthracite-soft)] to-[var(--color-anthracite)] px-4 sm:px-10 py-8 sm:py-12">
        {/* Section header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
            {c.appsEyebrow}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              {c.appsHeading}
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)] whitespace-nowrap">
              {c.appsBadge}
            </span>
          </div>
          <p className="text-[var(--color-white-muted)] text-sm leading-relaxed">
            {c.appsSubtitle}
          </p>
        </div>

        {/* Two app cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── App Bailleur ── */}
          <div className="relative rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-gold)]/5 p-6 overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-[var(--color-gold)]/5 pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Phone mockup */}
              <div className="flex-shrink-0">
                <PhoneMockup screens={c.bailleur.screens} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded-full mb-2">
                  {c.bailleur.tag}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  {c.bailleur.name}
                </h3>
                <p className="text-[var(--color-gold)] text-sm font-medium mb-2">
                  {c.bailleur.tagline}
                </p>
                <p className="text-xs text-[var(--color-white-muted)] leading-relaxed mb-4">
                  {c.bailleur.desc}
                </p>

                <ul className="space-y-1.5">
                  {c.bailleur.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2 text-sm text-[var(--color-white-muted)]">
                      <span className="flex-shrink-0 text-base leading-tight">{f.icon}</span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <AppStoreBadges label={c.bailleur.storeLabel} notifyLabel={c.bailleur.notifyLabel} />
              </div>
            </div>
          </div>

          {/* ── App Locataire ── */}
          <div className="relative rounded-2xl border border-white/10 bg-[var(--color-anthracite-soft)] p-6 overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-white/3 pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Phone mockup */}
              <div className="flex-shrink-0">
                <PhoneMockup screens={c.locataire.screens} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-white-muted)]/70 bg-white/5 px-2 py-0.5 rounded-full mb-2 border border-white/10">
                  {c.locataire.tag}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  {c.locataire.name}
                </h3>
                <p className="text-[var(--color-white-muted)] text-sm font-medium mb-2">
                  {c.locataire.tagline}
                </p>
                <p className="text-xs text-[var(--color-white-muted)] leading-relaxed mb-4">
                  {c.locataire.desc}
                </p>

                <ul className="space-y-1.5">
                  {c.locataire.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2 text-sm text-[var(--color-white-muted)]">
                      <span className="flex-shrink-0 text-base leading-tight">{f.icon}</span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <AppStoreBadges label={c.locataire.storeLabel} notifyLabel={c.locataire.notifyLabel} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
