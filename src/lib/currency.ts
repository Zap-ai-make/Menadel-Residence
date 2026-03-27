export type Currency = 'FCFA' | 'EUR' | 'USD';

export const FALLBACK_RATES: Record<Currency, number> = {
  FCFA: 1,
  EUR: 0.001524,  // ~655 FCFA = 1 EUR
  USD: 0.001648,  // ~607 FCFA = 1 USD
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  FCFA: 'FCFA',
  EUR: '€',
  USD: '$',
};

export function formatPrice(amountXof: number, currency: Currency, rates: Record<Currency, number>): string {
  const rate = rates[currency] ?? FALLBACK_RATES[currency];
  const converted = amountXof * rate;

  if (currency === 'FCFA') {
    // Format FCFA in millions for large amounts
    if (converted >= 1_000_000) {
      const millions = converted / 1_000_000;
      return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M FCFA`;
    }
    return `${new Intl.NumberFormat('fr-FR').format(Math.round(converted))} FCFA`;
  }

  return new Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(converted));
}

export async function fetchExchangeRates(): Promise<Record<Currency, number>> {
  try {
    const res = await fetch(
      'https://api.frankfurter.app/latest?from=XOF&to=EUR,USD',
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error('Frankfurter API error');
    const data = await res.json();
    return {
      FCFA: 1,
      EUR: data.rates.EUR,
      USD: data.rates.USD,
    };
  } catch {
    return FALLBACK_RATES;
  }
}
