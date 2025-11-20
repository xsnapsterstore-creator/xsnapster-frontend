const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.xsnapster.store/v1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // images: {
  //   unoptimized: true,
  // },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
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
