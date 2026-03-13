import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Do I need to remove my curtains for cleaning?',
    answer: 'No! Our on-site cleaning service means we clean your curtains while they hang. We bring all necessary equipment to your location and perform the cleaning without removing the curtains from the rails.'
  },
  {
    question: 'How long does curtain cleaning take?',
    answer: 'Most curtain cleaning jobs take 2-4 hours depending on the number of curtains and their condition. We work efficiently while ensuring thorough cleaning. Drying time varies but most curtains are dry within 4-6 hours.'
  },
  {
    question: 'What areas of Johannesburg do you service?',
    answer: 'We service all major areas of Johannesburg including Sandton, Rosebank, Hyde Park, Bryanston, Randburg, Fourways, and surrounding suburbs. Contact us to confirm if we cover your specific location.'
  },
  {
    question: 'Is your cleaning process safe for all fabric types?',
    answer: 'Yes! We use specialized cleaning solutions and techniques appropriate for each fabric type. Our team is trained to identify fabric requirements and adjust our methods accordingly. We guarantee no shrinkage or damage to your curtains.'
  },
  {
    question: 'How much does curtain cleaning cost?',
    answer: 'Pricing depends on the size, number, and condition of your curtains. We offer free no-obligation quotations. Contact us via phone, WhatsApp, or our quote form, and we\'ll provide you with a transparent price estimate.'
  },
  {
    question: 'Do you clean blinds and shutters too?',
    answer: 'Yes! In addition to curtains, we clean venetian blinds, roller blinds, vertical blinds, and plantation shutters. We also offer upholstery, mattress, and carpet cleaning services.'
  },
  {
    question: 'How often should I have my curtains professionally cleaned?',
    answer: 'We recommend professional curtain cleaning every 6-12 months depending on your environment. Homes near busy roads or with pets may benefit from more frequent cleaning, while low-traffic areas may need less frequent service.'
  },
  {
    question: 'Do you offer same-day service?',
    answer: 'Yes, subject to availability. Contact us early in the day, and we\'ll do our best to accommodate same-day bookings. We also offer flexible scheduling including evenings and weekends.'
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Curtain Cleaning Johannesburg - Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Common questions about curtain cleaning in Johannesburg. Everything you need to know about our professional curtain cleaning services in Johannesburg. Can&apos;t find your answer about curtain cleaning? Contact us directly.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 hover:border-primary transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our friendly team is here to help! Contact us for personalized advice and a free no-obligation quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+27750119200"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Call 075 011 9200
              </a>
              <a
                href="https://wa.me/27750119200"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 rounded-lg transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
