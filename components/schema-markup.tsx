export function SchemaMarkup() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://curtaincleaning.co.za',
    name: 'On The Spot Curtain Cleaning Johannesburg',
    alternateName: 'On The Spot',
    image: 'https://curtaincleaning.co.za/logo.png',
    url: 'https://curtaincleaning.co.za',
    description: 'Professional curtain cleaning Johannesburg. On-site curtain cleaning services for homes and businesses across all Johannesburg suburbs. No shrinkage guarantee.',
    telephone: '+27750119200',
    email: 'info@curtaincleaning.co.za',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Martha North Rd',
      addressLocality: 'Randburg',
      addressRegion: 'Johannesburg',
      postalCode: '2194',
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -26.1076,
      longitude: 28.0567
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      'https://fb.me/onthespot.za',
      'https://instagr.am/onthespot.za',
      'https://linkedin.com/company/onthespot-za',
      'https://x.com/onthespot_za',
      'https://youtu.be/@onthespot.za'
    ],
    areaServed: [
      { '@type': 'City', name: 'Sandton' },
      { '@type': 'City', name: 'Rosebank' },
      { '@type': 'City', name: 'Hyde Park' },
      { '@type': 'City', name: 'Morningside' },
      { '@type': 'City', name: 'Rivonia' },
      { '@type': 'City', name: 'Bryanston' },
      { '@type': 'City', name: 'Parktown' },
      { '@type': 'City', name: 'Melrose' },
      { '@type': 'City', name: 'Illovo' },
      { '@type': 'City', name: 'Dunkeld' },
      { '@type': 'City', name: 'Houghton' },
      { '@type': 'City', name: 'Craighall' },
      { '@type': 'City', name: 'Parkhurst' },
      { '@type': 'City', name: 'Greenside' },
      { '@type': 'City', name: 'Randburg' },
      { '@type': 'City', name: 'Fourways' },
      { '@type': 'City', name: 'Lonehill' },
      { '@type': 'City', name: 'Dainfern' },
      { '@type': 'City', name: 'Douglasdale' },
      { '@type': 'City', name: 'Northcliff' },
      { '@type': 'City', name: 'Emmarentia' },
      { '@type': 'City', name: 'Parkview' },
      { '@type': 'City', name: 'Saxonwold' },
      { '@type': 'City', name: 'Westcliff' },
      { '@type': 'City', name: 'Atholl' },
      { '@type': 'City', name: 'Sandhurst' },
      { '@type': 'City', name: 'Inanda' },
      { '@type': 'City', name: 'Wendywood' },
      { '@type': 'City', name: 'Sunninghill' },
      { '@type': 'City', name: 'Waterfall' },
      { '@type': 'City', name: 'Midrand' },
      { '@type': 'City', name: 'Kyalami' },
      { '@type': 'City', name: 'Bruma' },
      { '@type': 'City', name: 'Bedfordview' },
      { '@type': 'City', name: 'Edenvale' },
      { '@type': 'City', name: 'Kempton Park' },
      { '@type': 'City', name: 'Benoni' },
      { '@type': 'City', name: 'Boksburg' },
      { '@type': 'City', name: 'Germiston' },
      { '@type': 'City', name: 'Alberton' },
      { '@type': 'City', name: 'Constantia Kloof' },
      { '@type': 'City', name: 'Roodepoort' },
      { '@type': 'City', name: 'Florida' },
      { '@type': 'City', name: 'Blackheath' },
      { '@type': 'City', name: 'Little Falls' },
      { '@type': 'City', name: 'Linden' },
      { '@type': 'City', name: 'Auckland Park' },
      { '@type': 'City', name: 'Melville' },
      { '@type': 'City', name: 'Westdene' },
      { '@type': 'City', name: 'Sophiatown' }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Curtain Cleaning Johannesburg',
            description: 'Professional on-site curtain cleaning in Johannesburg for all types of curtains, drapes, and blinds. Expert curtain cleaning service covering all Johannesburg suburbs including Sandton, Rosebank, Randburg, and Fourways.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Upholstery Cleaning',
            description: 'Deep cleaning for all upholstered furniture including sofas and chairs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mattress Cleaning',
            description: 'Thorough mattress cleaning and sanitization to remove dust mites and allergens'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Carpet Cleaning',
            description: 'Professional carpet cleaning using advanced extraction methods'
          }
        }
      ]
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need to remove my curtains for cleaning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No! Our on-site cleaning service means we clean your curtains while they hang. We bring all necessary equipment to your location and perform the cleaning without removing the curtains from the rails.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does curtain cleaning take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most curtain cleaning jobs take 2-4 hours depending on the number of curtains and their condition. Drying time varies but most curtains are dry within 4-6 hours.'
        }
      },
      {
        '@type': 'Question',
        name: 'What areas of Johannesburg do you service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We service all major areas of Johannesburg including Sandton, Rosebank, Hyde Park, Bryanston, Randburg, Fourways, and surrounding suburbs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is your cleaning process safe for all fabric types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We use specialized cleaning solutions and techniques appropriate for each fabric type. We guarantee no shrinkage or damage to your curtains.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much does curtain cleaning cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pricing depends on the size, number, and condition of your curtains. We offer free no-obligation quotations. Contact us via phone, WhatsApp, or our quote form for a transparent price estimate.'
        }
      }
    ]
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://curtaincleaning.co.za/#organization',
    name: 'On The Spot Curtain Cleaning Johannesburg',
    alternateName: 'On The Spot',
    url: 'https://curtaincleaning.co.za',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://curtaincleaning.co.za/#logo',
      url: 'https://curtaincleaning.co.za/logo.png',
      width: '600',
      height: '600',
      caption: 'On The Spot Curtain Cleaning Johannesburg Logo'
    },
    image: {
      '@type': 'ImageObject',
      '@id': 'https://curtaincleaning.co.za/#logo',
      url: 'https://curtaincleaning.co.za/logo.png',
      width: '600',
      height: '600',
      caption: 'On The Spot Curtain Cleaning Johannesburg'
    },
    description: 'Professional curtain cleaning service in Johannesburg with over 15 years of experience. On-site cleaning for curtains, upholstery, mattresses, and carpets.',
    telephone: '+27750119200',
    email: 'info@curtaincleaning.co.za',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Martha North Rd',
      addressLocality: 'Randburg',
      addressRegion: 'Johannesburg',
      postalCode: '2194',
      addressCountry: 'ZA'
    },
    sameAs: [
      'https://fb.me/onthespot.za',
      'https://instagr.am/onthespot.za',
      'https://linkedin.com/company/onthespot-za',
      'https://x.com/onthespot_za',
      'https://youtu.be/@onthespot.za'
    ],
    foundingDate: '2008',
    slogan: 'Professional On-Site Curtain Cleaning Johannesburg'
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://curtaincleaning.co.za'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://curtaincleaning.co.za#services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Areas',
        item: 'https://curtaincleaning.co.za#areas'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
