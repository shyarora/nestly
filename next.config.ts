import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? (process.env.PAGES_BASE_PATH || "") : "",
  basePath: process.env.PAGES_BASE_PATH || "",
};

export default nextConfig;
