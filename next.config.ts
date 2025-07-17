import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/app-clone" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/app-clone/" : "",
};

export default nextConfig;
