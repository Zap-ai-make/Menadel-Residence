import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getProperties, getMarketGrid } from '@/lib/saas-client';
import { type PropertyType } from '@/lib/types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Rate limiting — simple in-memory (pour production, utiliser Vercel Edge KV)
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const limit = 10;

  const entry = rateLimitMap.get(ip);
  if (!entry || entry.reset < now) {
    rateLimitMap.set(ip, { count: 1, reset: now + window });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
      { status: 429 }
    );
  }

  let body: { query: string; locale: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  const { query, locale = 'fr' } = body;
  if (!query || typeof query !== 'string' || query.length > 500) {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  // Check if Claude API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 503 });
  }

  try {
    const [properties, marketGrid] = await Promise.all([
      getProperties(),
      getMarketGrid(),
    ]);

    // Prepare catalogue summary for Claude
    const catalogueSummary = properties
      .filter((p) => p.status === 'disponible')
      .map((p) => `ID:${p.id} REF:${p.ref} TYPE:${p.type} VILLE:${p.city} QUARTIER:${p.neighborhood ?? '-'} PRIX_XOF:${p.priceXof} SURFACE:${p.surfaceM2}m² STATUT:${p.status}`)
      .join('\n');

    const marketSummary = marketGrid
      .map((m) => `TYPE:${m.type} VILLE:${m.city} PRIX_MIN:${m.priceMinXof} PRIX_MAX:${m.priceMaxXof} TENDANCE:${m.trend} DISPONIBILITE:${m.availability}`)
      .join('\n');

    const systemPrompt = `Tu es le Configurateur Patrimonial G3 de Menadel Residence, une agence immobilière agréée au Burkina Faso.

Ton rôle : analyser le projet immobilier du visiteur et recommander les biens disponibles les plus pertinents du catalogue, en ajoutant le contexte marché local.

RÈGLES ABSOLUES :
- Répondre uniquement aux projets immobiliers au Burkina Faso
- Ne jamais inventer de biens ou de prix
- Utiliser uniquement les données du catalogue fourni
- Répondre en ${locale === 'fr' ? 'français' : 'anglais'}
- Être concis et humain (pas de jargon technique)
- Si le budget est irréaliste, le signaler poliment avec des alternatives

CATALOGUE DISPONIBLE (biens avec statut "disponible" uniquement) :
${catalogueSummary}

GRILLE MARCHÉ (données mises à jour) :
${marketSummary}

Réponds en JSON avec cette structure exacte :
{
  "propertyIds": ["id1", "id2", "id3"],  // max 3 IDs du catalogue, les plus pertinents
  "marketContext": {
    "summary": "Bref résumé du marché pour ce type/localisation",
    "priceRange": "X M – Y M FCFA",
    "trend": "stable|hausse|baisse",
    "type": "parcelle|villa|etc",
    "city": "Ville détectée"
  },
  "message": "Message personnalisé pour le visiteur (2-3 phrases, humain, en ${locale === 'fr' ? 'français' : 'anglais'})"
}`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: 'user', content: query }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ fallback: true }, { status: 503 });
    }

    // Parse Claude's JSON response
    let parsed: { propertyIds: string[]; marketContext: any; message: string };
    try {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON');
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      return NextResponse.json({ fallback: true }, { status: 503 });
    }

    // Map property IDs to full property objects
    const recommendedProperties = (parsed.propertyIds ?? [])
      .map((id: string) => properties.find((p) => p.id === id))
      .filter(Boolean);

    return NextResponse.json({
      fallback: false,
      properties: recommendedProperties,
      marketContext: parsed.marketContext ?? null,
      message: parsed.message ?? '',
    });
  } catch (error) {
    console.error('[G3] Error:', error);
    return NextResponse.json({ fallback: true }, { status: 503 });
  }
}
