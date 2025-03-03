import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  distDir: '.next',
  output: 'standalone',
  images: {
    domains: ['images.pexels.com']
  }
}

export default nextConfig
