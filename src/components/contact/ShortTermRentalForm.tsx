'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ShortTermRentalFormProps {
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

const VILLES = [
  'Ouagadougou',
  'Bobo-Dioulasso',
  'Koudougou',
  'Ouahigouya',
  'Banfora',
];

const QUARTIERS_OUAGA = [
  'Ouaga 2000',
  'Patte d\'oie',
  'Saaba',
  'Karpala',
  'Tampouy',
  'Koulouba',
  'Zone du bois',
  'Zone 1',
  'Zone 4',
  'Cissin',
];

const TYPE_LOGEMENT = [
  { value: 'villa', label: 'Villa' },
  { value: 'mini-villa', label: 'Mini villa' },
  { value: 'appartement', label: 'Appartement' },
];


const SERVICES_OPTIONNELS = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'menage', label: 'Ménage quotidien' },
  { id: 'securite', label: 'Sécurité/Gardiennage' },
  { id: 'electricite', label: 'Électricité (séjour +5 nuits, paiement à l\'usage)' },
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

export function ShortTermRentalForm({ source = 'location-court-sejour' }: ShortTermRentalFormProps) {
  const locale = useLocale();
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState(() =>
    typeof window !== 'undefined' ? detectCountryCode() : ''
  );
  const [phone, setPhone] = useState('');
  const [ville, setVille] = useState('');
  const [quartier, setQuartier] = useState('');
  const [typeLogement, setTypeLogement] = useState('');
  const [nombreChambres, setNombreChambres] = useState('');
  const [dateArrivee, setDateArrivee] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [nombrePersonnes, setNombrePersonnes] = useState('');
  const [servicesOptionnels, setServicesOptionnels] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const showQuartiers = ville === 'Ouagadougou';

  const handleServiceToggle = (serviceId: string) => {
    setServicesOptionnels((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);

    const fullPhone = `${countryCode}${phone}`.trim();

    // Build detailed message
    const detailedMessage = `
Demande de location court séjour:
- Ville: ${ville}${quartier ? ` - ${quartier}` : ''}
- Type de logement: ${typeLogement}
- Nombre de chambres: ${nombreChambres}
- Date d'arrivée: ${dateArrivee}
- Date de départ: ${dateDepart}
- Nombre de personnes: ${nombrePersonnes}
${servicesOptionnels.length > 0 ? `- Services souhaités: ${servicesOptionnels.map(s => SERVICES_OPTIONNELS.find(so => so.id === s)?.label).join(', ')}` : ''}

Message additionnel:
${message || 'Aucun message additionnel'}
    `.trim();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          message: detailedMessage,
          source,
          locale,
          metadata: {
            ville,
            quartier,
            typeLogement,
            nombreChambres,
            dateArrivee,
            dateDepart,
            nombrePersonnes,
            servicesOptionnels,
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
          ✓ Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Name */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-name">
          Votre nom *
        </label>
        <input
          id="str-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Votre nom"
        />
      </div>

      {/* Phone with country code */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-phone">
          Téléphone *
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
            id="str-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className={cn(inputClass, 'flex-1')}
            placeholder="XX XX XX XX"
          />
        </div>
      </div>

      {/* Ville */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-ville">
          Ville *
        </label>
        <select
          id="str-ville"
          value={ville}
          onChange={(e) => {
            setVille(e.target.value);
            setQuartier(''); // Reset quartier when ville changes
          }}
          required
          className={inputClass}
        >
          <option value="">Sélectionnez une ville</option>
          {VILLES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* Quartier (only for Ouagadougou) */}
      {showQuartiers && (
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-quartier">
            Quartier (optionnel)
          </label>
          <select
            id="str-quartier"
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
            className={inputClass}
          >
            <option value="">Sélectionnez un quartier</option>
            {QUARTIERS_OUAGA.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Type de logement */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-type">
          Type de logement *
        </label>
        <select
          id="str-type"
          value={typeLogement}
          onChange={(e) => setTypeLogement(e.target.value)}
          required
          className={inputClass}
        >
          <option value="">Sélectionnez le type</option>
          {TYPE_LOGEMENT.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Nombre de chambres */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-chambres">
          Nombre de chambres *
        </label>
        <input
          id="str-chambres"
          type="number"
          min="1"
          max="10"
          value={nombreChambres}
          onChange={(e) => setNombreChambres(e.target.value)}
          required
          className={inputClass}
          placeholder="Ex: 3"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-arrivee">
            Date d'arrivée *
          </label>
          <input
            id="str-arrivee"
            type="date"
            value={dateArrivee}
            onChange={(e) => setDateArrivee(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-depart">
            Date de départ *
          </label>
          <input
            id="str-depart"
            type="date"
            value={dateDepart}
            onChange={(e) => setDateDepart(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Nombre de personnes */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-personnes">
          Nombre de personnes *
        </label>
        <input
          id="str-personnes"
          type="number"
          min="1"
          value={nombrePersonnes}
          onChange={(e) => setNombrePersonnes(e.target.value)}
          required
          className={inputClass}
          placeholder="Ex: 4"
        />
      </div>

      {/* Services optionnels */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-2">
          Services souhaités (optionnel)
        </label>
        <div className="space-y-2">
          {SERVICES_OPTIONNELS.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={servicesOptionnels.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                className="w-4 h-4 rounded border-white/15 bg-[var(--color-anthracite)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] focus:ring-offset-0"
              />
              <span className="text-sm text-white group-hover:text-[var(--color-gold)] transition-colors">
                {service.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Message additionnel */}
      <div>
        <label className="text-xs text-[var(--color-white-muted)] block mb-1" htmlFor="str-message">
          Message additionnel (optionnel)
        </label>
        <textarea
          id="str-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={cn(inputClass, 'resize-none')}
          placeholder="Informations complémentaires..."
        />
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="text-xs text-[var(--color-status-sold)]">
          ⚠ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={
          sending ||
          !name ||
          !phone ||
          !ville ||
          !typeLogement ||
          !nombreChambres ||
          !dateArrivee ||
          !dateDepart ||
          !nombrePersonnes
        }
        className="py-3 text-sm font-semibold rounded-lg bg-[var(--color-gold)] text-[var(--color-anthracite)] hover:bg-[var(--color-gold-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
      >
        {sending ? 'Envoi en cours...' : 'Envoyer la demande'}
      </button>
    </form>
  );
}

const inputClass =
  'w-full px-3 py-2.5 text-sm rounded-lg bg-[var(--color-anthracite)] border border-white/15 text-white placeholder-[var(--color-white-muted)]/40 focus:outline-none focus:border-[var(--color-gold)] transition-colors';
