'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import { type Property } from '@/lib/types';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { WHATSAPP_NUMBER } from '@/lib/config';

// Standard Ouaga plot = 300m²
const STANDARD_PLOT_M2 = 300;
const PLOT_TYPES = ['parcelle', 'terrain'];

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list' | 'featured';
}

export function PropertyCard({ property, variant = 'grid' }: PropertyCardProps) {
  const t = useTranslations('property');
  const tContact = useTranslations('contact');
  const { format } = useCurrency();
  const locale = useLocale();

  const isSold = property.status === 'vendu';
  const whatsappMsg = encodeURIComponent(tContact('whatsappProperty', { ref: property.ref }));
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  // Surface reference for parcelle/terrain
  const standardPlots = PLOT_TYPES.includes(property.type)
    ? Math.round(property.surfaceM2 / STANDARD_PLOT_M2)
    : null;

  const typeLabel = t(property.type === 'location' ? 'location_type' : property.type as any);

  // ── List variant (compact horizontal — used in G3 results) ──
  if (variant === 'list') {
    return (
      <article
        role="article"
        aria-label={`${typeLabel} ${property.title} — ${format(property.priceXof)}`}
        className={cn(
          'group flex gap-3 bg-[var(--color-anthracite-soft)] border border-white/10 rounded-xl overflow-hidden card-hover',
          isSold && 'opacity-70'
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-24 sm:w-32 flex-shrink-0 bg-[var(--color-anthracite-muted)]">
          {property.photos[0] ? (
            <Image
              src={property.photos[0]}
              alt={`${typeLabel} — ${property.neighborhood ?? property.city}`}
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-white-muted)]/30">
              <span className="text-2xl">🏠</span>
            </div>
          )}
          <div className="absolute top-1.5 left-1.5">
            <StatusBadge status={property.status} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col justify-between py-3 pr-3 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[9px] uppercase tracking-widest font-semibold text-[var(--color-gold)]">
                {typeLabel}
              </span>
              <span className="text-[9px] text-[var(--color-white-muted)]/50">·</span>
              <span className="text-[10px] text-[var(--color-white-muted)]/60">{property.city}</span>
            </div>
            <h3 className="font-serif text-sm font-semibold text-white leading-snug line-clamp-2 mb-1">
              {property.title}
            </h3>
            <p className="text-[10px] text-[var(--color-white-muted)]/60">
              {property.surfaceM2.toLocaleString(locale)} m²
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-semibold text-[var(--color-gold)]">
              {format(property.priceXof)}
            </span>
            {!isSold && (
              <Link
                href={`/bien/${property.id}`}
                className="text-[10px] font-medium px-2.5 py-1 rounded border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
              >
                {t('viewDetails')}
              </Link>
            )}
          </div>
        </div>
      </article>
    );
  }

  // ── Grid / Featured variant (default) ──
  return (
    <article
      role="article"
      aria-label={`${typeLabel} ${property.title} — ${format(property.priceXof)}`}
      className={cn(
        'group relative bg-[var(--color-anthracite-soft)] border border-white/10 rounded-xl overflow-hidden card-hover',
        variant === 'featured' && 'shadow-lg',
        isSold && 'opacity-70'
      )}
    >
      {/* Photo — aspect ratio 3:2 strict (CLS=0) */}
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-anthracite-muted)]">
        {property.photos[0] ? (
          <Image
            src={property.photos[0]}
            alt={`${typeLabel} — ${property.neighborhood ?? property.city}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-white-muted)]/30">
            <span className="text-4xl">🏠</span>
          </div>
        )}

        {/* Status badge — top left */}
        <div className="absolute top-2 left-2">
          <StatusBadge status={property.status} />
        </div>

        {/* Type badge — top right */}
        <div className="absolute top-2 right-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-gold)] bg-[var(--color-anthracite)]/80 px-2 py-0.5 rounded">
            {typeLabel}
          </span>
        </div>

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-[var(--color-anthracite)]/50 flex items-center justify-center">
            <span className="font-serif text-2xl text-[var(--color-status-sold)] font-semibold opacity-80">
              {t('sold')}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-white leading-snug mb-1 line-clamp-2">
          {property.title}
        </h3>

        {/* Location + surface */}
        <p className="text-xs text-[var(--color-white-muted)] mb-3">
          {property.neighborhood ? `${property.neighborhood}, ` : ''}{property.city}
          {' · '}
          {property.surfaceM2.toLocaleString(locale)} m²
          {standardPlots && standardPlots > 0 && (
            <span className="text-[var(--color-white-muted)]/60">
              {' '}({t(standardPlots > 1 ? 'standardPlots' : 'standardPlot', { count: standardPlots })})
            </span>
          )}
        </p>

        {/* Price */}
        <div className="text-lg font-semibold text-[var(--color-gold)] mb-4">
          {format(property.priceXof)}
          {property.type === 'location' && <span className="text-xs font-normal text-[var(--color-white-muted)]">/mois</span>}
        </div>

        {/* CTAs */}
        {!isSold && (
          <div className="flex gap-2">
            <Link
              href={`/bien/${property.id}`}
              className="flex-1 text-center text-xs font-medium py-2 rounded border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              {t('viewDetails')}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tContact('whatsappLabel')} — ${property.ref}`}
              className="flex items-center gap-1 px-3 py-2 rounded text-xs font-medium bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle size={12} />
              {t('contactWhatsApp')}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
