import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://curtaincleaning.co.za'
  const currentDate = new Date()

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ]

  // Add future service area pages when created
  // These would be actual pages, not hash fragments
  const serviceAreas = [
    'sandton',
    'rosebank', 
    'randburg',
    'fourways',
    'midrand',
    'centurion'
  ]

  // Uncomment when service area pages are created
  // serviceAreas.forEach(area => {
  //   routes.push({
  //     url: `${baseUrl}/areas/${area}`,
  //     lastModified: currentDate,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.8,
  //   })
  // })

  // Service pages (for future implementation)
  const services = [
    'curtain-cleaning',
    'upholstery-cleaning',
    'mattress-cleaning',
    'carpet-cleaning'
  ]

  // Uncomment when service pages are created
  // services.forEach(service => {
  //   routes.push({
  //     url: `${baseUrl}/services/${service}`,
  //     lastModified: currentDate,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.9,
  //   })
  // })

  return routes
}
