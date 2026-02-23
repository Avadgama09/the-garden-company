import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/components/cart-provider';
import JsonLd from '@/components/JsonLd';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generators';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thegardencompany.in'),
  title: {
    default: 'The Garden Company — Plants, Guides & Tools',
    template: '%s | The Garden Company',
  },
  description:
    'Quality plants, tools, and step-by-step guides for every home garden. Shop indoor plants, outdoor plants, succulents, gardening kits and more.',
  keywords: [
    'plants',
    'gardening',
    'indoor plants',
    'outdoor plants',
    'succulents',
    'gardening tools',
    'plant care',
    'home garden India',
  ],
  authors: [{ name: 'The Garden Company', url: 'https://thegardencompany.in' }],
  creator: 'The Garden Company',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://thegardencompany.in',
    siteName: 'The Garden Company',
    title: 'The Garden Company — Plants, Guides & Tools',
    description:
      'Quality plants, tools, and step-by-step guides for every home garden.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'The Garden Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Garden Company — Plants, Guides & Tools',
    description:
      'Quality plants, tools, and step-by-step guides for every home garden.',
    images: ['/og-default.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#1a3a2f',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
