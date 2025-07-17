# Project Structure Fix

## Problem

Next.js was trying to compile backend TypeScript files during frontend build, causing errors.

## Solution Applied

### 1. **Updated next.config.ts**

- Added webpack configuration to exclude backend directory
- Set up proper fallbacks for Node.js modules

### 2. **Updated tsconfig.json**

- Excluded backend directory from TypeScript compilation
- Frontend and backend now have separate TypeScript configs

### 3. **Environment Variables**

- Updated GraphQL endpoint to use environment variables
- Added `.env.local` for development
- Updated GitHub Actions to use production environment variables

### 4. **Build Process**

- Updated lint script to only check frontend directories
- Separated frontend and backend build processes

## GitHub Secrets to Add

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret:

**Name**: `NEXT_PUBLIC_GRAPHQL_URL`
**Value**: `https://your-backend-name.onrender.com/graphql`

Replace `your-backend-name` with your actual Render service name.

## File Structure

```
/
├── src/                    # Frontend source (Next.js)
├── components/             # Shared components
├── lib/                   # Frontend utilities
├── store/                 # Frontend state management
├── types/                 # Frontend types
├── backend/               # Backend source (Node.js/GraphQL)
│   ├── src/              # Backend TypeScript files
│   ├── prisma/           # Database schema
│   └── tsconfig.json     # Backend TypeScript config
├── tsconfig.json         # Frontend TypeScript config
└── next.config.ts        # Next.js configuration
```

## Deployment Steps

1. **Backend** (Render.com):

   - Deploys from `/backend` directory
   - Uses `backend/package.json`
   - Has its own `tsconfig.json`

2. **Frontend** (GitHub Pages):
   - Deploys from root directory
   - Uses root `package.json`
   - Excludes backend from compilation

This separation ensures clean builds for both frontend and backend!
