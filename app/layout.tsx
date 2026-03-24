import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Curtain Cleaning Johannesburg | On-Site Professional Service | On The Spot',
  description: 'On The Spot - Professional on-site curtain cleaning Johannesburg. 15+ years experience with 100% No-Shrinkage Guarantee. Hardware inspection & repair included. Serving 50+ Johannesburg suburbs. Free quotes: 075 011 9200',
  keywords: 'curtain cleaning johannesburg, on-site curtain cleaning, professional curtain cleaning, curtain cleaning specialists, upholstery cleaning johannesburg, mattress cleaning johannesburg, carpet cleaning johannesburg, curtain cleaning sandton, curtain cleaning rosebank, curtain cleaning randburg, fabric cleaning specialists',
  authors: [{ name: 'On The Spot Curtain Cleaning and Service', url: 'https://curtaincleaning.org' }],
  openGraph: {
    title: 'On The Spot - Professional Curtain Cleaning Johannesburg',
    description: 'On-site curtain cleaning with 100% No-Shrinkage Guarantee. 15+ years serving Johannesburg suburbs. Free quotes available.',
    url: 'https://curtaincleaning.org',
    siteName: 'On The Spot Curtain Cleaning and Service',
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
    canonical: 'https://curtaincleaning.org',
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
