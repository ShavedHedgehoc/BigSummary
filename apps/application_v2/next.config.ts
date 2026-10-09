// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   allowedDevOrigins: ['192.168.250.237'],
//   async rewrites() {
//     return [
//       {
//         source: '/trpc_api/:path*',
//         destination: 'http://localhost:8000/trpc/:path*',
//       },
//     ];
//   },
// };

// export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['localhost'],

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
