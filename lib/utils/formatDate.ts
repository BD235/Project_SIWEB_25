// lib/utils/formatDate.ts

export function formatDate(dateString: string, locale = 'id-ID'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
