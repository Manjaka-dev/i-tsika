/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Activer les optimisations d'images de Next.js
    formats: ['image/webp'], // Priorité au format WebP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Tailles d'appareils pour responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Tailles d'images pour responsive images
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours de cache
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
  },
}

export default nextConfig
