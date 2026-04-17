const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.xsnapster.store/v1'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khnbsjuczeylcjrlrtni.storage.supabase.co',
        pathname: '/storage/v1/object/public/**',
      }
    ],
    formats: ['image/avif', 'image/webp']
  },
  reactStrictMode: false,
  async rewrites () {
    return [
      {
        source: '/v1/:path*',
        destination: `${API_URL}/:path*`
      }
    ]
  },
  async redirects () {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'xsnapster.store'
          }
        ],
        destination: 'https://www.xsnapster.store/:path*',
        permanent: true
      }
    ]
  }
}

export default nextConfig
