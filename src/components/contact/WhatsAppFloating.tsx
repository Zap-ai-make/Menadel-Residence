'use client';

import { useTranslations } from 'next-intl';
import { WhatsAppCTA } from './WhatsAppCTA';
import { WHATSAPP_NUMBER } from '@/lib/config';

export function WhatsAppFloating() {
  const t = useTranslations('contact');
  return (
    <WhatsAppCTA
      phone={WHATSAPP_NUMBER}
      message={t('whatsappGeneric')}
      variant="floating"
    />
  );
}
