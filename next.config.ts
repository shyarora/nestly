import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/nestly' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nestly/' : '',
  // Exclude backend directory from compilation
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Exclude backend directory
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/backend/**', '**/node_modules/**'],
    };
    
    return config;
  },
  // Exclude backend from TypeScript compilation
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
