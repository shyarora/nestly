/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for custom domain
  // basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
}

module.exports = nextConfig
