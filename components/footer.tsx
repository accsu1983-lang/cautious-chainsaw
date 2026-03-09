import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube, Twitter, MessageCircle, Paintbrush as Pinterest, Blinds, Sofa, Bed, Grip, Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/highly-20polished-203d-20v.png"
                alt="On The Spot"
                width={50}
                height={50}
                className="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight">On The Spot</span>
                <span className="text-xs text-background/70">Curtain Cleaning</span>
              </div>
            </Link>
            <p className="text-sm text-background/80 leading-relaxed">
              Johannesburg&apos;s trusted curtain cleaning specialists. Over 15 years of professional on-site cleaning services.
            </p>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-background uppercase tracking-wide">Follow Us</p>
              <div className="flex flex-wrap gap-2">
                <a href="https://fb.me/onthespot.za" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-[#1877F2] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://instagr.am/onthespot.za" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://tiktok.com/@onthespot.za" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-[#000000] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="TikTok">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="https://youtu.be/@onthespot.za" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-[#FF0000] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="https://pin.it/onthespot" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-[#E60023] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="Pinterest">
                  <Pinterest className="h-4 w-4" />
                </a>
                <a href="https://x.com/onthespot_za" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-[#000000] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="X (Twitter)">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com/company/onthespot-za" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-background/10 hover:bg-[#0A66C2] rounded-lg flex items-center justify-center transition-all hover:scale-110" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-accent rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="#services" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2 group">
                  <Blinds className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition-transform" />
                  Curtain Cleaning
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2 group">
                  <Sofa className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition-transform" />
                  Upholstery Cleaning
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2 group">
                  <Bed className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition-transform" />
                  Mattress Cleaning
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2 group">
                  <Grip className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition-transform" />
                  Carpet Cleaning
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-background/80 hover:text-background transition-colors flex items-center gap-2 group">
                  <Blinds className="h-3.5 w-3.5 text-accent group-hover:scale-110 transition-transform" />
                  Blind Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-accent rounded-full"></div>
              Company
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="#about" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link href="#process" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Our Process</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Service Areas</Link></li>
              <li><Link href="#faq" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">FAQ</Link></li>
              <li><Link href="#contact" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Get a Quote</Link></li>
              <li><Link href="#about" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Why Choose Us</Link></li>
              <li><Link href="#testimonials" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Testimonials</Link></li>
              <li><Link href="#newsletter" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Newsletter</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-accent rounded-full"></div>
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Sandton</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Rosebank</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Randburg</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Fourways</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Midrand</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">Centurion</Link></li>
              <li><Link href="#areas" className="text-sm text-background/80 hover:text-background hover:translate-x-1 transition-all inline-block">View All Areas</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-accent rounded-full"></div>
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent transition-colors">
                    <Phone className="h-4 w-4 text-accent group-hover:text-background" />
                  </div>
                  <div>
                    <p className="text-background/70 text-xs mb-1">Call Us</p>
                    <a href="tel:+27750119200" className="text-background font-semibold hover:text-accent transition-colors">075 011 9200</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent transition-colors">
                    <Mail className="h-4 w-4 text-accent group-hover:text-background" />
                  </div>
                  <div>
                    <p className="text-background/70 text-xs mb-1">Email</p>
                    <a href="mailto:info@curtaincleaning.co.za" className="text-background font-semibold hover:text-accent transition-colors break-all">info@curtaincleaning.co.za</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent transition-colors">
                    <MapPin className="h-4 w-4 text-accent group-hover:text-background" />
                  </div>
                  <div>
                    <p className="text-background/70 text-xs mb-1">Location</p>
                    <span className="text-background font-semibold">Martha North Rd, Randburg<br />Johannesburg, 2194</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent transition-colors">
                    <Clock className="h-4 w-4 text-accent group-hover:text-background" />
                  </div>
                  <div>
                    <p className="text-background/70 text-xs mb-1">Hours</p>
                    <span className="text-background font-semibold">Mon-Fri: 8AM-6PM<br />Sat: 9AM-3PM</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
            <p>
              &copy; {new Date().getFullYear()} On The Spot Curtain Cleaning. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#about" className="hover:text-background transition-colors">Privacy</Link>
              <Link href="#about" className="hover:text-background transition-colors">Terms</Link>
              <Link href="/sitemap.xml" className="hover:text-background transition-colors">Sitemap</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-background/60">
            <p>Professional curtain cleaning Johannesburg | Upholstery cleaning | Mattress cleaning | Carpet cleaning</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
