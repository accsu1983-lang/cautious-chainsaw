import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Process } from '@/components/process'
import { Areas } from '@/components/areas'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { GoogleReviews } from '@/components/google-reviews'
import { Newsletter } from '@/components/newsletter'
import { FAQ } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { CTABar } from '@/components/cta-bar'
import { SchemaMarkup } from '@/components/schema-markup'

const VideoShowcase = dynamic(() => import('@/components/video-showcase').then(mod => mod.VideoShowcase))
const BeforeAfterGallery = dynamic(() => import('@/components/before-after-gallery').then(mod => mod.BeforeAfterGallery))
const QuoteCalculator = dynamic(() => import('@/components/quote-calculator').then(mod => mod.QuoteCalculator))
const WhatsAppWidget = dynamic(() => import('@/components/whatsapp-widget').then(mod => mod.WhatsAppWidget))
const ExitIntentPopup = dynamic(() => import('@/components/exit-intent-popup').then(mod => mod.ExitIntentPopup))
const BackToTop = dynamic(() => import('@/components/back-to-top').then(mod => mod.BackToTop))

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Services />
        <VideoShowcase />
        <BeforeAfterGallery />
        <Process />
        <QuoteCalculator />
        <Areas />
        <About />
        <Testimonials />
        <GoogleReviews />
        <Newsletter />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CTABar />
      <WhatsAppWidget />
      <BackToTop />
      <ExitIntentPopup />
    </>
  )
}
