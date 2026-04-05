import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.shortName}`,
  description: 'Privacy policy for On The Spot Curtain Cleaning Specialists.',
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li className="text-foreground font-medium">Privacy Policy</li>
            </ol>
          </nav>

          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              On The Spot Curtain Cleaning Specialists (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting 
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground">We may collect information about you in various ways:</p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and address when you fill out our contact or quote forms.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
              <li><strong>Device Data:</strong> Information about the device you use to access our website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our services</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Send you quotes, confirmations, and service-related communications</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information with:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third parties who assist us in operating our business (e.g., email services, payment processors).</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal 
              information. However, no method of transmission over the Internet is 100% secure, and 
              we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground">Under POPIA (Protection of Personal Information Act), you have the right to:</p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Cookies</h2>
            <p className="text-muted-foreground">
              Our website may use cookies and similar tracking technologies to enhance your experience. 
              You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the 
              privacy practices of these external sites.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not directed to individuals under 18. We do not knowingly collect 
              personal information from children.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="text-muted-foreground list-none space-y-2">
              <li><strong>Email:</strong> {siteConfig.contact.email}</li>
              <li><strong>Phone:</strong> {siteConfig.contact.primary.phone}</li>
              <li><strong>Address:</strong> {siteConfig.contact.address.street}, {siteConfig.contact.address.city}, {siteConfig.contact.address.postalCode}</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
