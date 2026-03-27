import type { Metadata } from 'next';
import { ContactFormInline } from '@/components/contact/ContactFormInline';

const CONTENT = {
  fr: {
    meta: {
      title: 'Démarches administratives',
      description: 'Titre foncier, mutation, bornage, viabilisation, permis de construire au Burkina Faso. Menadel Residence vous accompagne dans toutes vos démarches foncières.',
    },
    eyebrow: 'Service',
    heading: 'Démarches administratives',
    intro: 'Les démarches foncières au Burkina Faso peuvent être longues et complexes. Notre équipe connaît les procédures, les interlocuteurs et les délais réels — nous gérons tout pour vous.',
    services: [
      {
        icon: '📋',
        title: 'Obtention du titre foncier',
        desc: 'Accompagnement complet de la demande initiale jusqu\'à la délivrance du TF : dossier, suivi en mairie, relances, remise de l\'original.',
      },
      {
        icon: '🔄',
        title: 'Mutation de propriété',
        desc: 'Transfert du titre foncier au nom de l\'acquéreur après achat. Nous gérons le dossier complet avec le notaire partenaire.',
      },
      {
        icon: '📐',
        title: 'Bornage & délimitation',
        desc: 'Intervention d\'un géomètre agréé pour définir et matérialiser les limites officielles de votre parcelle.',
      },
      {
        icon: '💡',
        title: 'Viabilisation',
        desc: 'Connexion eau (ONEA), électricité (SONABEL), assainissement — coordination des dossiers et suivi des travaux.',
      },
      {
        icon: '🏗️',
        title: 'Permis de construire',
        desc: 'Constitution et dépôt du dossier PC auprès des services compétents. Suivi jusqu\'à l\'obtention de l\'autorisation.',
      },
      {
        icon: '✅',
        title: 'Vérification de titre',
        desc: 'Audit de la chaîne de propriété d\'un bien avant achat : vérification des droits réels, servitudes, hypothèques éventuelles.',
      },
    ],
    timelineTitle: 'Délais indicatifs',
    timelineNote: 'Ces délais sont indicatifs et dépendent de la charge des services administratifs.',
    timeline: [
      { label: 'Demande de TF simple', duration: '3–6 mois' },
      { label: 'Mutation de propriété', duration: '2–4 mois' },
      { label: 'Permis de construire', duration: '1–3 mois' },
      { label: 'Bornage officiel', duration: '3–6 semaines' },
    ],
    formTitle: 'Démarrer mes démarches',
    formSubtitle: 'Décrivez votre situation — nous vous indiquons les étapes et délais dans les 24h.',
  },
  en: {
    meta: {
      title: 'Administrative assistance',
      description: 'Land title, property transfer, boundary survey, utilities connection, building permit in Burkina Faso. Menadel Residence guides you through all land procedures.',
    },
    eyebrow: 'Service',
    heading: 'Administrative assistance',
    intro: 'Land procedures in Burkina Faso can be lengthy and complex. Our team knows the processes, the right contacts and the real timelines — we handle everything for you.',
    services: [
      {
        icon: '📋',
        title: 'Land title registration',
        desc: 'Full support from initial application to title delivery: file preparation, municipal follow-up, reminders, delivery of the original.',
      },
      {
        icon: '🔄',
        title: 'Property transfer',
        desc: 'Transfer of the land title to the buyer\'s name after purchase. We manage the complete file with our partner notary.',
      },
      {
        icon: '📐',
        title: 'Boundary survey',
        desc: 'A licensed surveyor defines and marks the official boundaries of your plot.',
      },
      {
        icon: '💡',
        title: 'Utilities connection',
        desc: 'Water (ONEA), electricity (SONABEL), drainage — file coordination and works follow-up.',
      },
      {
        icon: '🏗️',
        title: 'Building permit',
        desc: 'Preparation and submission of the building permit application to the relevant authorities. Follow-up until authorisation is granted.',
      },
      {
        icon: '✅',
        title: 'Title verification',
        desc: 'Audit of the property ownership chain before purchase: verification of real rights, easements, possible mortgages.',
      },
    ],
    timelineTitle: 'Indicative timelines',
    timelineNote: 'These timelines are indicative and depend on administrative capacity.',
    timeline: [
      { label: 'Simple land title application', duration: '3–6 months' },
      { label: 'Property transfer', duration: '2–4 months' },
      { label: 'Building permit', duration: '1–3 months' },
      { label: 'Official boundary survey', duration: '3–6 weeks' },
    ],
    formTitle: 'Start my procedures',
    formSubtitle: 'Describe your situation — we outline the steps and timelines within 24h.',
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

export default async function DemarchesAdministrativesPage({
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
            <div
              key={s.title}
              className="p-5 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <h2 className="font-semibold text-white mb-1">{s.title}</h2>
              <p className="text-sm text-[var(--color-white-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Délais indicatifs */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-[var(--color-gold)]/20 mb-14">
          <h2 className="font-serif text-xl font-semibold text-white mb-4">
            {c.timelineTitle}
          </h2>
          <p className="text-xs text-[var(--color-white-muted)]/70 mb-4">
            {c.timelineNote}
          </p>
          <div className="space-y-3">
            {c.timeline.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-white-muted)]">{item.label}</span>
                <span className="text-sm font-medium text-[var(--color-gold)]">{item.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="p-6 rounded-xl bg-[var(--color-anthracite-soft)] border border-white/10">
          <h2 className="font-serif text-2xl font-semibold text-white mb-2">
            {c.formTitle}
          </h2>
          <p className="text-sm text-[var(--color-white-muted)] mb-6">
            {c.formSubtitle}
          </p>
          <ContactFormInline source="demarches-administratives" />
        </div>
      </div>
    </div>
  );
}
