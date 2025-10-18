import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    //dynamicIO: true,
    useCache: true,
  },
  // ignore ts errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // ignore eslint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
}

export default nextConfig
