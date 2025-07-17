import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Enable static export - this creates an 'out' directory by default
  output: "export",

  // GitHub Pages specific settings
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },

  // Base path for GitHub Pages (only in production)
  basePath: isProd && isGitHubPages ? "/nestly" : "",
  assetPrefix: isProd && isGitHubPages ? "/nestly/" : "",

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // Exclude backend directory from watching and compilation
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/backend/**",
        "**/node_modules/**",
        "**/.git/**",
        "**/dist/**",
        "**/out/**",
      ],
    };

    return config;
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["src", "components", "lib", "store", "types"],
  },

  // Experimental features
  experimental: {
    typedRoutes: false,
  },

  // Environment variables that should be available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || "",
  },
};

export default nextConfig;
