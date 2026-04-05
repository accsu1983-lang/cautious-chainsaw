import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AssessmentCTA } from '@/components/assessment-cta'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 86400 // ISR: revalidate every 24 hours

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${siteConfig.shortName}`,
  description: 'Find answers to common questions about our curtain cleaning services in Johannesburg.',
  openGraph: {
    title: `FAQ | ${siteConfig.shortName}`,
    description: 'Answers to your curtain cleaning questions.',
    url: `${siteConfig.url}/faq`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
}

const faqCategories = [
  {
    category: 'General Questions',
    faqs: [
      {
        question: 'How does on-site curtain cleaning work?',
        answer: 'Our technicians bring specialized equipment to your home or business and clean your curtains right where they hang. We use a dry-cleaning process that does not require water, which means no shrinkage and no need to remove your curtains.',
      },
      {
        question: 'Do I need to remove my curtains before you arrive?',
        answer: 'No, absolutely not! That is the beauty of our service. We clean your curtains while they hang, so you do not need to do anything except let us in.',
      },
      {
        question: 'How long does the cleaning process take?',
        answer: 'For a typical home, we can complete the cleaning in 2-4 hours depending on the number and size of curtains. We will give you a time estimate during your free assessment.',
      },
      {
        question: 'Will my curtains shrink?',
        answer: 'No. We guarantee 100% no shrinkage. Our dry-cleaning process does not use water or heat that could cause shrinkage. If your curtains do shrink (which has never happened), we will replace them.',
      },
    ],
  },
  {
    category: 'Pricing & Booking',
    faqs: [
      {
        question: 'How much does curtain cleaning cost?',
        answer: 'Pricing depends on the number, size, and type of curtains you have. We provide a free on-site assessment where we can give you an accurate, no-obligation quote. There are no hidden fees.',
      },
      {
        question: 'Is the assessment really free?',
        answer: 'Yes, completely free with no obligation. Our assessor will visit your property, inspect your curtains, and provide a detailed quote. You are under no pressure to proceed.',
      },
      {
        question: 'How do I book an assessment?',
        answer: 'You can book by calling us at ' + siteConfig.contact.primary.phone + ', sending a WhatsApp message, or filling out our online form. We will contact you to arrange a convenient time.',
      },
      {
        question: 'Do you offer same-day service?',
        answer: 'Yes, we offer same-day service where our schedule allows. Contact us early in the day for the best chance of same-day availability.',
      },
    ],
  },
  {
    category: 'Services',
    faqs: [
      {
        question: 'What types of curtains can you clean?',
        answer: 'We can clean all types of curtains including sheers, blockouts, lined curtains, heavy drapes, velvet, silk, and specialty fabrics. Our assessor will determine the best cleaning method for your specific curtains.',
      },
      {
        question: 'Do you clean blinds as well?',
        answer: 'Yes! We clean all types of blinds including venetian, vertical, roller, and wooden blinds. We also clean upholstery, mattresses, and carpets.',
      },
      {
        question: 'Can you remove stains?',
        answer: 'Yes, stain removal is part of our service. We pre-treat stains before the main clean. While we can significantly improve most stains, some very old or set-in stains may not come out completely.',
      },
      {
        question: 'Do you repair curtain rails and hooks?',
        answer: 'Yes! We include a free hardware inspection with every curtain cleaning service. Minor repairs and adjustments are included at no extra charge. For major repairs, we will provide a separate quote.',
      },
    ],
  },
  {
    category: 'Service Areas',
    faqs: [
      {
        question: 'Which areas do you service?',
        answer: 'We service all of Johannesburg including North, South, East, West, and Central suburbs. We also cover Midrand, Centurion, and parts of Pretoria.',
      },
      {
        question: 'Do you charge extra for different areas?',
        answer: 'No, we do not charge extra based on location within our service area. The quote you receive is the price you pay.',
      },
      {
        question: 'Do you service commercial properties?',
        answer: 'Yes! We service hotels, offices, healthcare facilities, schools, theatres, and other commercial properties. We offer flexible scheduling and can work around your business hours.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li>/</li>
                <li className="text-foreground font-medium">FAQ</li>
              </ol>
            </nav>

            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                Help Center
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Find answers to common questions about our curtain cleaning services. 
                Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.category}-${index}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is happy to help. Get in touch and we&apos;ll respond as soon as possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Contact Us
              </Link>
              <a 
                href={`tel:${siteConfig.contact.primary.phoneFormatted}`}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Call {siteConfig.contact.primary.phone}
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AssessmentCTA />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
