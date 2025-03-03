import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true, // Khuyến nghị bật lên
  images: {
    domains: ['images.pexels.com']
  }
}

export default nextConfig
