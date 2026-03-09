import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const areas = [
  'Sandton', 'Rosebank', 'Hyde Park', 'Morningside', 'Rivonia',
  'Bryanston', 'Parktown', 'Melrose', 'Illovo', 'Dunkeld',
  'Houghton', 'Craighall', 'Parkhurst', 'Greenside', 'Randburg',
  'Fourways', 'Lonehill', 'Dainfern', 'Douglasdale', 'Northcliff',
  'Emmarentia', 'Parkview', 'Saxonwold', 'Westcliff', 'Atholl',
  'Sandhurst', 'Inanda', 'Wendywood', 'Sunninghill', 'Waterfall',
  'Midrand', 'Kyalami', 'Bruma', 'Bedfordview', 'Edenvale',
  'Kempton Park', 'Benoni', 'Boksburg', 'Germiston', 'Alberton',
  'Constantia Kloof', 'Roodepoort', 'Florida', 'Blackheath', 'Little Falls',
  'Linden', 'Auckland Park', 'Melville', 'Westdene', 'Sophiatown'
]

export function Areas() {
  return (
    <section id="areas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Curtain Cleaning Johannesburg - All Areas Covered
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Professional curtain cleaning services in Johannesburg covering Sandton, Rosebank, Randburg, Fourways, and 50+ suburbs across Johannesburg. Our mobile curtain cleaning service in Johannesburg comes to you - serving all premium suburbs and surrounding areas. If you don&apos;t see your area listed, contact us for curtain cleaning in your Johannesburg location!
          </p>
        </div>

        {/* Areas Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {areas.map((area) => (
            <Badge 
              key={area} 
              variant="secondary" 
              className="px-4 py-2 text-sm font-medium bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
              {area}
            </Badge>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-secondary/50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Our Service Area</h3>
          <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115313.08699262896!2d27.94419!3d-26.10764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="On The Spot Curtain Cleaning Service Areas in Johannesburg"
            ></iframe>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Service Address:</strong> Martha North Rd, Randburg, Johannesburg, 2194
            </p>
            <p className="text-sm text-muted-foreground">
              We travel to you! No need to visit our location - all services are performed on-site at your home or business.
            </p>
          </div>
        </div>

        {/* Service Radius Info */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
            <h4 className="text-xl font-bold text-foreground mb-3">
              Can&apos;t Find Your Area?
            </h4>
            <p className="text-muted-foreground mb-4">
              We service a wide radius around Johannesburg. Contact us to confirm if we cover your specific location.
            </p>
            <a 
              href="tel:+27750119200" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <MapPin className="h-5 w-5" />
              Call us at 075 011 9200
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
