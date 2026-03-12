import { Phone, Calendar, Sparkles, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Contact Us',
    description: 'Call, WhatsApp, or fill out our form for a free no-obligation quotation. We respond within 1 hour during business hours.'
  },
  {
    icon: Calendar,
    number: '02',
    title: 'Schedule Visit',
    description: 'Choose a convenient time for our team to visit. We offer flexible scheduling including evenings and weekends.'
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Professional Cleaning',
    description: 'Our expert team arrives with professional equipment and cleans on-site. No need to remove curtains or furniture.'
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Enjoy Fresh Results',
    description: 'Walk-through inspection to ensure satisfaction. Your curtains, upholstery, or carpets are clean, fresh, and ready to use.'
  }
]

export function Process() {
  return (
    <section id="process" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Simple 4-Step Process
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From your first call to sparkling clean results, we make the entire process hassle-free and convenient.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border"></div>
                )}

                <div className="relative bg-card rounded-xl p-6 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg font-medium text-foreground mb-4">
            Ready to get started? Contact us today for a free quote!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+27750119200"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-colors"
            >
              <Phone className="h-5 w-5" />
              075 011 9200
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
