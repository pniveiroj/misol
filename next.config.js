/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    // Optimizar imágenes locales
    unoptimized: false,
    // Configuración para mejor rendimiento
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Calidad de compresión (por defecto 75, pero se puede especificar en cada Image)
    // minimumCacheTTL: 60 segundos (por defecto)
    // Aumentar el TTL para mejor rendimiento en producción
    minimumCacheTTL: 31536000, // 1 año (las imágenes no cambian frecuentemente)
  },
  // Optimizaciones adicionales
  compress: true, // Habilitar compresión Gzip
  poweredByHeader: false, // Ocultar header X-Powered-By por seguridad
}

module.exports = nextConfig

