// app/layout.tsx

import { ReactNode } from 'react';
import { Inter, Great_Vibes } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sweetlovebakery.com'),
  title: {
    default: 'Sweet Love Bakery',
    template: '%s | Sweet Love Bakery',
  },
  description: 'Toko kue spesial dengan sentuhan romantis untuk setiap momen berharga',
  keywords: ['kue romantis', 'valentine cake', 'anniversary cake', 'toko kue spesial'],
  openGraph: {
    title: 'Sweet Love Bakery',
    description: 'Toko kue romantis untuk momen spesial',
    url: 'https://sweetlovebakery.com',
    siteName: 'Sweet Love Bakery',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sweet Love Bakery',
    description: 'Toko kue romantis untuk momen spesial',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${greatVibes.variable}`}>
      <head>
        {/* Meta theme color untuk browser mobile dan desktop */}
        <meta name="theme-color" content="#f43f5e" />
      </head>
      <body className="font-sans bg-rose-50 text-rose-900 antialiased min-h-screen flex flex-col">
        {children}

        {/* Structured data JSON-LD untuk SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Sweet Love Bakery",
            "image": "/images/logo/logo.png",
            "url": "https://sweetlovebakery.com",
            "telephone": "+628123456789",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Romantis No. 123",
              "addressLocality": "Jakarta",
              "postalCode": "12345",
              "addressCountry": "ID"
            }
          })
        }} />
      </body>
    </html>
  );
}
