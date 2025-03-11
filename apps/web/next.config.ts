import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },{
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/f/**',
      },
    ],
  },

  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: ["**/node_modules", "**/.next", "**/dist", "**/.turbo"],
    };
    return config;
  },
};

export default nextConfig;
