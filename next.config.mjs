/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khnbsjuczeylcjrlrtni.storage.supabase.co',
        pathname: '/storage/v1/object/public/**'
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
