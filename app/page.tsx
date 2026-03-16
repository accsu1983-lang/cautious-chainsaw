import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Footer } from '@/components/footer'
import { CTABar } from '@/components/cta-bar'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { BackToTop } from '@/components/back-to-top'
import { SchemaMarkup } from '@/components/schema-markup'

// Dynamic imports for components below the fold
const VideoShowcase = dynamic(() => import('@/components/video-showcase').then(mod => mod.VideoShowcase))
const BeforeAfterGallery = dynamic(() => import('@/components/before-after-gallery').then(mod => mod.BeforeAfterGallery))
const Process = dynamic(() => import('@/components/process').then(mod => mod.Process))
const QuoteCalculator = dynamic(() => import('@/components/quote-calculator').then(mod => mod.QuoteCalculator))
const Areas = dynamic(() => import('@/components/areas').then(mod => mod.Areas))
const About = dynamic(() => import('@/components/about').then(mod => mod.About))
const Testimonials = dynamic(() => import('@/components/testimonials').then(mod => mod.Testimonials))
const GoogleReviews = dynamic(() => import('@/components/google-reviews').then(mod => mod.GoogleReviews))
const Newsletter = dynamic(() => import('@/components/newsletter').then(mod => mod.Newsletter))
const FAQ = dynamic(() => import('@/components/faq').then(mod => mod.FAQ))
const Contact = dynamic(() => import('@/components/contact').then(mod => mod.Contact))
const ExitIntentPopup = dynamic(() => import('@/components/exit-intent-popup').then(mod => mod.ExitIntentPopup))

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
