import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et gestion des données personnelles de Menadel Residence.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3">
          Légal
        </p>
        <h1 className="font-serif text-4xl font-semibold text-white mb-2">
          Politique de confidentialité
        </h1>
        <p className="text-xs text-[var(--color-white-muted)]/60 mb-10">
          Dernière mise à jour : mars 2026
        </p>

        <div className="space-y-10 text-[var(--color-white-muted)] leading-relaxed">
          <Section title="1. Responsable du traitement">
            <p>
              Menadel Residence SARL, agence immobilière au Burkina Faso (IFU : 00253576E,
              RCCM : BF-OUA-01-2024-B12-17129, Capital : 5 000 000 FCFA), dont le siège est situé
              Secteur 53 (Ouaga 2000), BP 9656 Ouagadougou 06, Burkina Faso.
            </p>
            <p className="mt-2">
              Contact : <a href="mailto:menadelresidence@gmail.com" className="text-[var(--color-gold)] hover:underline">menadelresidence@gmail.com</a>
            </p>
          </Section>

          <Section title="2. Données collectées">
            <p>Nous collectons uniquement les données que vous nous fournissez volontairement :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Nom et prénom (formulaires de contact)</li>
              <li>Numéro de téléphone (formulaires de contact)</li>
              <li>Adresse email (optionnel)</li>
              <li>Message décrivant votre projet immobilier</li>
            </ul>
            <p className="mt-3">
              Les cookies analytiques ne sont posés qu'avec votre consentement explicite. Aucun
              cookie publicitaire ni de traçage tiers n'est utilisé.
            </p>
          </Section>

          <Section title="3. Finalités du traitement">
            <ul className="space-y-1 list-disc list-inside">
              <li>Répondre à vos demandes de renseignements et projets immobiliers</li>
              <li>Vous présenter les biens correspondant à vos critères</li>
              <li>Améliorer l'expérience utilisateur du site (analytics anonymes, avec consentement)</li>
            </ul>
          </Section>

          <Section title="4. Durée de conservation">
            <p>
              Vos données de contact sont conservées pendant 3 ans à compter du dernier échange,
              puis supprimées ou anonymisées. Vous pouvez demander la suppression à tout moment.
            </p>
          </Section>

          <Section title="5. Partage des données">
            <p>
              Vos données ne sont jamais vendues à des tiers. Elles peuvent être transmises à nos
              partenaires notaires uniquement dans le cadre d'une transaction que vous avez initiée,
              avec votre accord préalable explicite.
            </p>
          </Section>

          <Section title="6. Vos droits">
            <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement (« droit à l'oubli »)</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à{' '}
              <a href="mailto:contact@minadel-residence.com" className="text-[var(--color-gold)] hover:underline">
                contact@minadel-residence.com
              </a>
              . Réponse sous 30 jours.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Ce site utilise des cookies analytiques anonymes (mesure d'audience) uniquement avec
              votre consentement, recueilli via le bandeau affiché lors de votre première visite.
              Vous pouvez retirer votre consentement à tout moment en vidant les données de votre
              navigateur pour ce site.
            </p>
          </Section>

          <Section title="8. Sécurité">
            <p>
              Les communications entre votre navigateur et ce site sont chiffrées via HTTPS (TLS).
              Vos données de contact sont transmises de façon sécurisée et ne sont pas stockées en
              clair dans nos journaux applicatifs.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
