// lib/utils/formatCurrency.ts

export function formatCurrency(amount: number, locale = 'id-ID', currency = 'IDR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
