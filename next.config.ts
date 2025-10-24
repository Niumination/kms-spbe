// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Hapus eslint config
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  typescript: {
    // Sementara untuk development, nanti diubah ke false untuk production
    ignoreBuildErrors: true,
  },
  
  // Konfigurasi lainnya
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  experimental: {
    // serverActions: true, // Tidak perlu di Next.js 14+
  },
}

export default nextConfig
