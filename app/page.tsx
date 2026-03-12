import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { VideoShowcase } from '@/components/video-showcase'
import { BeforeAfterGallery } from '@/components/before-after-gallery'
import { Process } from '@/components/process'
import { QuoteCalculator } from '@/components/quote-calculator'
import { Areas } from '@/components/areas'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { GoogleReviews } from '@/components/google-reviews'
import { Newsletter } from '@/components/newsletter'
import { FAQ } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { CTABar } from '@/components/cta-bar'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { ExitIntentPopup } from '@/components/exit-intent-popup'
import { BackToTop } from '@/components/back-to-top'
import { SchemaMarkup } from '@/components/schema-markup'

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
