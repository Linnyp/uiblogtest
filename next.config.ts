import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    typedRoutes: false, // Disable for now as it's still experimental
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
