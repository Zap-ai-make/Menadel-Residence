import { NextResponse } from 'next/server';
import { fetchExchangeRates } from '@/lib/currency';

export const revalidate = 86400; // 24h

export async function GET() {
  const rates = await fetchExchangeRates();
  return NextResponse.json({ rates });
}
