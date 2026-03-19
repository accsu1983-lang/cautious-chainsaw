/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ⚡ Bolt: Enable Next.js built-in image optimization to reduce payload size.
  // This helps improve LCP and overall page load performance.
  images: {
    unoptimized: false,
  },
}

export default nextConfig
