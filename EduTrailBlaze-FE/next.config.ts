import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true, // Khuyến nghị bật lên
  images: {
    domains: ['images.pexels.com']
  },
  compiler: {
    removeConsole: false // Giữ lại console.log trong production
  }
}

export default nextConfig
