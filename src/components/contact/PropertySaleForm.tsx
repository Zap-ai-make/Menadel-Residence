'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PropertySaleFormProps {
  source?: string;
}

const COUNTRY_CODES = [
  { code: '+226', country: 'BF', flag: '🇧🇫' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+32', country: 'BE', flag: '🇧🇪' },
  { code: '+1', country: 'CA/US', flag: '🇨🇦' },
  { code: '+212', country: 'MA', flag: '🇲🇦' },
  { code: '+221', country: 'SN', flag: '🇸🇳' },
  { code: '+225', country: 'CI', flag: '🇨🇮' },
];

function detectCountryCode(): string {
  try {
    const lang = navigator.language || '';
    if (lang.includes('fr-BF') || lang.includes('bf')) return '+226';
    if (lang.includes('fr-FR') || lang.startsWith('fr')) return '+33';
    if (lang.includes('fr-BE')) return '+32';
    if (lang.startsWith('en')) return '+1';
  } catch {
    // ignore
  }
  return '';
}

export function PropertySaleForm({ source = 'mise-en-vente' }: PropertySaleFormProps) {
  const locale = useLocale();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [countryCode, setCountryCode] = useState(() =>
    typeof window !== 'undefined' ? detectCountryCode() : ''
  );
  const [contact, setContact] = useState('');
  const [ville, setVille] = useState('');
  const [quartier, setQuartier] = useState('');
  const [typeBien, setTypeBien] = useState('');
  const [surface, setSurface] = useState('');
  const [prixSouhaite, setPrixSouhaite] = useState('');
  const [titreFoncier, setTitreFoncier] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);

    const fullContact = `${countryCode}${contact}`.trim();

    // Build detailed message
    const detailedMessage = `
Demande de mise en vente:
- Propriétaire: ${prenom} ${nom}
- Type de bien: ${typeBien}
- Localisation: ${ville}${quartier ? ` - ${quartier}` : ''}
- Surface: ${surface || 'Non précisée'}
- Prix souhaité: ${prixSouhaite || 'À estimer'}
- Titre foncier: ${titreFoncier ? 'Oui' : 'Non / À vérifier'}

Message additionnel:
${message || 'Aucun message additionnel'}
    `.trim();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${prenom} ${nom}`,
          phone: fullContact,
          message: detailedMessage,
          source,
          locale,
          metadata: {
            nom,
            prenom,
            ville,
            quartier,
            typeBien,
            surface,
            prixSouhaite,
            titreFoncier,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Une erreur est survenue');
        return;
      }

      setSent(true);
      toast.success('Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h.');
    } catch {
      setError('Une erreur est survenue lors de l\'envoi');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="py-6 text-center">
        <p className="text-[var(--color-status-available)] text-sm font-medium">
          Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h pour une estimation gratuite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Nom et Prénom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-prenom">
            Prénom *
          </label>
          <input
            id="ps-prenom"
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            autoComplete="given-name"
            className={inputClass}
            placeholder="Prénom"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-nom">
            Nom *
          </label>
          <input
            id="ps-nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            autoComplete="family-name"
            className={inputClass}
            placeholder="Nom"
          />
        </div>
      </div>

      {/* Contact with country code */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-contact">
          Contact *
        </label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            aria-label="Code pays"
            className="px-2 py-2.5 text-sm rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white focus:outline-none focus:border-[var(--color-gold)] w-28 min-h-[44px]"
          >
            <option value=""></option>
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            id="ps-contact"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            autoComplete="tel"
            className={cn(inputClass, 'flex-1')}
            placeholder="XX XX XX XX"
          />
        </div>
      </div>

      {/* Type de bien */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-type">
          Type de bien *
        </label>
        <input
          id="ps-type"
          type="text"
          value={typeBien}
          onChange={(e) => setTypeBien(e.target.value)}
          required
          className={inputClass}
          placeholder="Ex: Parcelle, Villa, Terrain, Immeuble..."
        />
      </div>

      {/* Ville et Quartier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-ville">
            Ville *
          </label>
          <input
            id="ps-ville"
            type="text"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            required
            className={inputClass}
            placeholder="Ex: Ouagadougou"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-quartier">
            Quartier *
          </label>
          <input
            id="ps-quartier"
            type="text"
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
            required
            className={inputClass}
            placeholder="Ex: Ouaga 2000"
          />
        </div>
      </div>

      {/* Surface et Prix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-surface">
            Surface (m²)
          </label>
          <input
            id="ps-surface"
            type="text"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            className={inputClass}
            placeholder="Ex: 500"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-prix">
            Prix souhaité (FCFA)
          </label>
          <input
            id="ps-prix"
            type="text"
            value={prixSouhaite}
            onChange={(e) => setPrixSouhaite(e.target.value)}
            className={inputClass}
            placeholder="Ex: 25 000 000"
          />
        </div>
      </div>

      {/* Checkbox titre foncier */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={titreFoncier}
            onChange={(e) => setTitreFoncier(e.target.checked)}
            className="w-4 h-4 rounded border-white/15 bg-[var(--color-anthracite)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] focus:ring-offset-0"
          />
          <span className="text-sm text-white group-hover:text-[var(--color-gold)] transition-colors">
            Le bien possède un titre foncier
          </span>
        </label>
      </div>

      {/* Message additionnel */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="ps-message">
          Message additionnel (optionnel)
        </label>
        <textarea
          id="ps-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={cn(inputClass, 'resize-none')}
          placeholder="Informations complémentaires sur votre bien..."
        />
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="text-xs text-[var(--color-status-sold)]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={
          sending ||
          !nom ||
          !prenom ||
          !contact ||
          !ville ||
          !quartier ||
          !typeBien
        }
        className="py-3 text-sm font-semibold rounded-lg bg-[var(--color-gold)] text-[var(--color-anthracite)] hover:bg-[var(--color-gold-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
      >
        {sending ? 'Envoi en cours...' : 'Demander une estimation gratuite'}
      </button>
    </form>
  );
}

const inputClass =
  'w-full px-3 py-2.5 text-sm rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white placeholder-[var(--color-white-muted)]/40 focus:outline-none focus:border-[var(--color-gold)] transition-colors';
