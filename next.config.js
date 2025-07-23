/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export for development to avoid generateStaticParams requirement
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for custom domain
  // basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
}

module.exports = nextConfig
