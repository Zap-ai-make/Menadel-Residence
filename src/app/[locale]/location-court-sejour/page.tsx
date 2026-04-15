import type { Metadata } from 'next';
import { ShortTermRentalForm } from '@/components/contact/ShortTermRentalForm';

interface Etape {
  title: string;
  objectif: string;
  actions: string[];
  bonnePratique?: string;
  conditionCle?: string;
}

const CONTENT = {
  fr: {
    meta: {
      title: 'Location court séjour — Procédure de location',
      description: 'Découvrez la procédure de location en court séjour chez Menadel Résidence. Gestion locative haut standing au Burkina Faso.',
    },
    eyebrow: 'Location',
    heading: 'Location court séjour',
    intro: 'Appartements et villas meublés pour vos séjours de courte durée au Burkina Faso. Durée minimum : 3 nuitées.',
    formTitle: 'Réserver un logement',
    formSubtitle: 'Décrivez votre besoin — dates, ville, nombre de personnes. Nous vous envoyons les disponibilités sous 24h.',
    pageTitle: 'Procédure de location en court séjour',
    subtitle: 'MENADEL RÉSIDENCE — Gestion locative haut standing',
    sections: {
      cadre: {
        title: '1. Cadre et principes généraux',
        intro: 'La location en court séjour (nuitée, semaine, séjour temporaire) repose sur :',
        points: [
          'Une prestation meublée, prête à l\'usage',
          'Une gestion de type para-hôtelière',
          'Une obligation de qualité, propreté et sécurité',
          'Un encaissement anticipé (total ou partiel)',
        ],
        objectif: 'Objectif : optimiser le taux d\'occupation et la rentabilité du bien',
      },
      processTitle: 'Processus opérationnel complet',
      etapes: [
        {
          title: '1. Réception de la demande client',
          objectif: 'Identifier et qualifier la réservation',
          actions: [
            'Réception via téléphone, WhatsApp, plateforme ou agence',
            'Collecte des informations : dates d\'arrivée et de départ, nombre d\'occupants, motif du séjour (professionnel / familial / touristique)',
            'Vérification de disponibilité',
          ],
          bonnePratique: 'Répondre sous moins de 30 minutes',
        },
        {
          title: '2. Proposition et validation de la réservation',
          objectif: 'Transformer la demande en réservation confirmée',
          actions: [
            'Présentation du logement disponible',
            'Communication du tarif (nuitée / séjour)',
            'Explication des conditions : heure check-in / check-out, caution éventuelle, règlement intérieur',
            'Confirmation écrite du client',
          ],
          conditionCle: 'Réservation validée uniquement après accord écrit ou paiement',
        },
        {
          title: '3. Encaissement et sécurisation',
          objectif: 'Sécuriser la transaction',
          actions: [
            'Encaissement : 100% du montant ou acompte (selon politique)',
            'Émission d\'une confirmation de réservation',
            'Enregistrement dans le planning d\'occupation',
          ],
          bonnePratique: 'Paiement avant remise des clés',
        },
        {
          title: '4. Check-out (départ du client)',
          objectif: 'Clôturer le séjour proprement',
          actions: [
            'Vérification du logement',
            'Récupération des clés',
            'Contrôle des équipements',
            'Évaluation des éventuels dégâts',
          ],
          bonnePratique: 'Inspection systématique après chaque départ',
        },
        {
          title: '5. Nettoyage post-séjour',
          objectif: 'Préparer la prochaine location',
          actions: [
            'Ménage complet',
            'Remplacement du linge',
            'Réassort des consommables',
            'Rapport d\'état du logement',
          ],
        },
        {
          title: '6. Gestion financière et reporting',
          objectif: 'Suivi de la performance',
          actions: [
            'Enregistrement des revenus',
            'Calcul des commissions MENADEL',
            'Suivi du taux d\'occupation',
            'Rapport mensuel au propriétaire : revenus générés, nombre de nuitées, taux de satisfaction',
          ],
        },
      ],
      flux: {
        title: 'Synthèse du flux',
        steps: ['Client', 'Réservation', 'Paiement', 'Préparation', 'Check-in', 'Séjour', 'Check-out', 'Nettoyage', 'Reporting'],
      },
      bonnesPratiques: {
        title: 'Bonnes pratiques Menadel (niveau premium)',
        items: [
          'Réponse rapide (< 30 min)',
          'Paiement sécurisé avant check-in',
          'Standard hôtelier de propreté',
          'Communication fluide avec client',
          'Contrôle systématique après séjour',
          'Reporting transparent au propriétaire',
        ],
      },
      positionnement: {
        title: 'Positionnement Menadel Résidence',
        intro: 'Ce processus positionne MENADEL RÉSIDENCE comme :',
        points: [
          'Une agence para-hôtelière haut de gamme',
          'Un gestionnaire de biens optimisés',
          'Un acteur orienté expérience client',
          'Un générateur de revenus locatifs maximisés',
        ],
      },
    },
  },
  en: {
    meta: {
      title: 'Short-term rental — Rental procedure',
      description: 'Discover the short-term rental procedure at Menadel Résidence. High-end property management in Burkina Faso.',
    },
    eyebrow: 'Rental',
    heading: 'Short-term rental',
    intro: 'Furnished apartments and villas for your short stays in Burkina Faso. Minimum duration: 3 nights.',
    formTitle: 'Book accommodation',
    formSubtitle: 'Describe your needs — dates, city, number of guests. We\'ll send availabilities within 24h.',
    pageTitle: 'Short-term rental procedure',
    subtitle: 'MENADEL RÉSIDENCE — High-end property management',
    sections: {
      cadre: {
        title: '1. Framework and general principles',
        intro: 'Short-term rental (nightly, weekly, temporary stay) is based on:',
        points: [
          'A furnished service, ready to use',
          'Para-hotel management',
          'A commitment to quality, cleanliness and security',
          'Advance payment (full or partial)',
        ],
        objectif: 'Objective: optimize occupancy rate and property profitability',
      },
      processTitle: 'Complete operational process',
      etapes: [
        {
          title: '1. Receiving the client request',
          objectif: 'Identify and qualify the reservation',
          actions: [
            'Reception via phone, WhatsApp, platform or agency',
            'Information collection: arrival and departure dates, number of occupants, purpose of stay (business / family / tourism)',
            'Availability check',
          ],
          bonnePratique: 'Respond within 30 minutes',
        },
        {
          title: '2. Proposal and reservation validation',
          objectif: 'Convert the request into a confirmed reservation',
          actions: [
            'Presentation of available accommodation',
            'Communication of rates (nightly / stay)',
            'Explanation of conditions: check-in / check-out time, possible deposit, house rules',
            'Written confirmation from client',
          ],
          conditionCle: 'Reservation validated only after written agreement or payment',
        },
        {
          title: '3. Collection and security',
          objectif: 'Secure the transaction',
          actions: [
            'Collection: 100% of amount or deposit (according to policy)',
            'Issue reservation confirmation',
            'Registration in occupancy schedule',
          ],
          bonnePratique: 'Payment before key handover',
        },
        {
          title: '4. Check-out (client departure)',
          objectif: 'Close the stay properly',
          actions: [
            'Property inspection',
            'Key recovery',
            'Equipment check',
            'Assessment of any damage',
          ],
          bonnePratique: 'Systematic inspection after each departure',
        },
        {
          title: '5. Post-stay cleaning',
          objectif: 'Prepare for next rental',
          actions: [
            'Complete cleaning',
            'Linen replacement',
            'Consumables restocking',
            'Property condition report',
          ],
        },
        {
          title: '6. Financial management and reporting',
          objectif: 'Performance tracking',
          actions: [
            'Revenue recording',
            'MENADEL commission calculation',
            'Occupancy rate tracking',
            'Monthly report to owner: revenue generated, number of nights, satisfaction rate',
          ],
        },
      ],
      flux: {
        title: 'Flow summary',
        steps: ['Client', 'Reservation', 'Payment', 'Preparation', 'Check-in', 'Stay', 'Check-out', 'Cleaning', 'Reporting'],
      },
      bonnesPratiques: {
        title: 'Menadel best practices (premium level)',
        items: [
          'Fast response (< 30 min)',
          'Secure payment before check-in',
          'Hotel-standard cleanliness',
          'Smooth communication with client',
          'Systematic check after stay',
          'Transparent reporting to owner',
        ],
      },
      positionnement: {
        title: 'Menadel Résidence positioning',
        intro: 'This process positions MENADEL RÉSIDENCE as:',
        points: [
          'A high-end para-hotel agency',
          'An optimized property manager',
          'A client experience-focused player',
          'A maximized rental income generator',
        ],
      },
    },
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
          {/* Header */}
          <div className="mb-8 p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
              {c.eyebrow}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight mb-4">
              {c.heading}
            </h1>
            <p className="text-[var(--color-white-muted)] text-base leading-relaxed">
              {c.intro}
            </p>
          </div>

          {/* Page Title */}
          <div className="mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--color-gold)] uppercase tracking-wide mb-2">
              {c.pageTitle}
            </h2>
            <p className="text-[var(--color-white-muted)] text-lg">{c.subtitle}</p>
          </div>

          {/* Cadre et principes généraux */}
          <section className="mb-10 p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
            <h3 className="font-serif text-xl font-semibold text-white mb-4">{c.sections.cadre.title}</h3>
            <p className="text-[var(--color-white-muted)] mb-4">{c.sections.cadre.intro}</p>
            <ul className="space-y-2 mb-4">
              {c.sections.cadre.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--color-white-muted)]">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-white font-medium italic">{c.sections.cadre.objectif}</p>
          </section>

          {/* Processus opérationnel */}
          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-[var(--color-gold)] uppercase tracking-wide mb-6 text-center">
              {c.sections.processTitle}
            </h3>

            <div className="space-y-6">
              {c.sections.etapes.map((etape, i) => (
                <div key={i} className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
                  <h4 className="font-serif text-lg font-semibold text-white mb-3">{etape.title}</h4>
                  <p className="text-sm text-[var(--color-gold)] mb-3">
                    <span className="font-medium">Objectif : </span>{etape.objectif}
                  </p>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-white mb-2">Actions :</p>
                    <ul className="space-y-1">
                      {etape.actions.map((action, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[var(--color-white-muted)]">
                          <span className="text-[var(--color-gold)] mt-0.5">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {etape.bonnePratique && (
                    <p className="text-sm text-green-400 mt-3">
                      <span className="font-medium">Bonne pratique : </span>{etape.bonnePratique}
                    </p>
                  )}
                  {etape.conditionCle && (
                    <p className="text-sm text-amber-400 mt-3">
                      <span className="font-medium">Condition clé : </span>{etape.conditionCle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Synthèse du flux */}
          <section className="mb-10 p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
            <h3 className="font-serif text-lg font-semibold text-white mb-4 text-center">{c.sections.flux.title}</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {c.sections.flux.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] text-sm font-medium">
                    {step}
                  </span>
                  {i < c.sections.flux.steps.length - 1 && (
                    <span className="text-[var(--color-white-muted)]">→</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Bonnes pratiques */}
          <section className="mb-10 p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
            <h3 className="font-serif text-lg font-semibold text-[var(--color-gold)] mb-4 flex items-center gap-2">
              <span>🔑</span> {c.sections.bonnesPratiques.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.sections.bonnesPratiques.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-white-muted)]">
                  <span className="text-green-400">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Positionnement */}
          <section className="p-6 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
            <h3 className="font-serif text-lg font-semibold text-[var(--color-gold)] mb-3">{c.sections.positionnement.title}</h3>
            <p className="text-[var(--color-white-muted)] mb-3">{c.sections.positionnement.intro}</p>
            <ul className="space-y-2">
              {c.sections.positionnement.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
