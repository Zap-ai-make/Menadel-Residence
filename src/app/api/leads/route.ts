import { NextRequest, NextResponse } from 'next/server';
import { submitLead } from '@/lib/saas-client';
import { type Lead } from '@/lib/types';

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  const name = sanitizeString(body.name, 100);
  const phone = sanitizeString(body.phone, 30);
  const email = sanitizeString(body.email, 200);
  const message = sanitizeString(body.message, 2000);
  const source = sanitizeString(body.source, 50) || 'site-web';
  const propertyRef = sanitizeString(body.propertyRef, 20);
  const locale = sanitizeString(body.locale, 5) || 'fr';

  if (!name || !phone) {
    return NextResponse.json({ error: 'Nom et téléphone requis' }, { status: 400 });
  }

  const lead: Lead = { name, phone, email: email || undefined, message, source, propertyRef: propertyRef || undefined, locale };

  const success = await submitLead(lead);

  if (!success) {
    return NextResponse.json(
      { error: 'Service temporairement indisponible. Veuillez réessayer ou nous contacter par WhatsApp.' },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
