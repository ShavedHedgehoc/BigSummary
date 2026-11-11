import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['localhost', '192.168.250.237'],

  async rewrites() {
    const apiHost = process.env.INTERNAL_API_URL || 'http://localhost:8000';
    return [
      {
        source: '/trpc_api/:path*',
        destination: `${apiHost}/trpc/:path*`,
      },
    ];
  },
};

export default nextConfig;
