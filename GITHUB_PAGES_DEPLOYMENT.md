# GitHub Pages Deployment Guide

This guide explains how to deploy the Nestly frontend to GitHub Pages.

## Overview

The project uses Next.js 15 with static export configuration to generate static files that can be deployed to GitHub Pages.

## Build Process

1. **Next.js Configuration**: The `next.config.ts` file is configured with:

   - `output: 'export'` for static site generation
   - GitHub Pages specific base path settings
   - Image optimization disabled for static export

2. **Build Script**: The `npm run build:static` command:

   - Builds the Next.js app with GitHub Pages environment variables
   - Copies static files from `.next/server/app/` to `dist/`
   - Copies static assets and public files

3. **GitHub Actions**: The workflow automatically:
   - Installs dependencies
   - Builds the static site
   - Deploys to GitHub Pages

## Manual Deployment

To deploy manually:

```bash
# Clean previous builds
npm run clean

# Build for GitHub Pages
npm run build:static

# The dist/ directory will contain all static files
```

## Workflow Files

- `.github/workflows/deploy-frontend.yml` - Main deployment workflow
- `.github/workflows/deploy-frontend-fallback.yml` - Backup workflow with multiple strategies

## Troubleshooting

### Common Issues

1. **"dist: Cannot open: No such file or directory"**

   - Solution: The build script now correctly generates the `dist` directory

2. **Assets not loading**

   - Check that `basePath` and `assetPrefix` are correctly set in `next.config.ts`
   - Ensure `.nojekyll` file is present in the deployment

3. **Build failures**
   - Check that all dependencies are installed
   - Verify TypeScript compilation passes
   - Review ESLint warnings (they won't block the build)

### Environment Variables

- `GITHUB_PAGES=true` - Enables GitHub Pages specific configuration
- `NODE_ENV=production` - Production build mode
- `NEXT_PUBLIC_GRAPHQL_URL` - GraphQL endpoint (optional)

## File Structure

```
dist/                     # Generated static files
├── index.html           # Home page
├── _next/               # Next.js static assets
├── *.html               # Page HTML files
└── ...                  # Other static assets
```

## Next.js 15 Changes

Next.js 15 changed how static export works:

- `output: 'export'` generates files in `.next/server/app/` instead of `out/`
- The build script manually copies files to `dist/` for consistency
- Static assets are copied from `.next/static/` to `dist/_next/`
