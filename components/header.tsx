'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, Mail } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/highly-20polished-203d-20v.png"
              alt="On The Spot Curtain Cleaning Johannesburg"
              width={60}
              height={60}
              className="h-14 w-14"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">On The Spot</span>
              <span className="text-xs text-muted-foreground">Curtain Cleaning Specialists</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#process" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Our Process
            </Link>
            <Link href="#areas" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Areas
            </Link>
            <Link href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+27750119200" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>075 011 9200</span>
            </a>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="#contact">Get Free Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#services"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#process"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Process
              </Link>
              <Link
                href="#areas"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Areas
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <a href="tel:+27750119200" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>075 011 9200</span>
                </a>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Get Free Quote</a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
