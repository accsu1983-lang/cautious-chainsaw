import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Curtain Cleaning Johannesburg | Professional On-Site Service | On The Spot',
  description: 'Curtain cleaning Johannesburg - Professional on-site service. Expert curtain cleaning in Johannesburg, Sandton, Rosebank & all suburbs. No removal needed. 15+ years experience. Free quotes: 075 011 9200. Also: upholstery, mattress & carpet cleaning.',
  keywords: 'curtain cleaning johannesburg, curtain cleaning in johannesburg, professional curtain cleaning johannesburg, on-site curtain cleaning, johannesburg curtain cleaning, curtain cleaners johannesburg, upholstery cleaning johannesburg, mattress cleaning johannesburg, carpet cleaning johannesburg, curtain cleaning sandton, curtain cleaning rosebank, curtain cleaning randburg',
  authors: [{ name: 'On The Spot Curtain Cleaning' }],
  openGraph: {
    title: 'Curtain Cleaning Johannesburg | On The Spot',
    description: 'Professional on-site curtain cleaning services in Johannesburg. No shrinkage, no damage guarantee.',
    url: 'https://curtaincleaning.co.za',
    siteName: 'On The Spot',
    locale: 'en_ZA',
    type: 'website',
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://curtaincleaning.co.za',
  },
  other: {
    'geo.region': 'ZA-GT',
    'geo.placename': 'Johannesburg',
    'geo.position': '-26.1076;28.0567',
    'ICBM': '-26.1076, 28.0567',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
