const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.xsnapster.store/v1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khnbsjuczeylcjrlrtni.storage.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
