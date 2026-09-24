import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.250.237'],
  async rewrites() {
    return [
      {
        source: '/trpc_api/:path*',
        destination: 'http://localhost:8000/trpc/:path*',
      },
    ];
  },
};

export default nextConfig;
