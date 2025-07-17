# Quick Fix for Render Build Issue

## Problem

The build is failing because of the GraphQL playground middleware in the TypeScript compilation.

## Solution

I've moved the `graphql-playground-middleware-express` from devDependencies to dependencies in your `package.json`. This will ensure it's available during the build process.

## Steps to Fix:

1. **Update package.json** (Already done)

   - Moved `graphql-playground-middleware-express` to dependencies

2. **Commit and Push Changes**

   ```bash
   git add .
   git commit -m "Fix: Move graphql-playground to dependencies for Render build"
   git push origin main
   ```

3. **Redeploy on Render**
   - Go to your Render dashboard
   - Click on your service
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or it will auto-deploy if you have auto-deploy enabled

## Alternative: Use Production Server Without Playground

If you still have issues, update your Render start command to use the main production server:

**Current Start Command**: `npm start`
**Alternative Start Command**: `node dist/index.js`

The main `index.js` uses Apollo Studio Sandbox instead of GraphQL Playground, which is more modern and doesn't require additional dependencies.

## Environment Variables for Render

Make sure you have these environment variables set in Render:

```
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secure-jwt-secret-for-production
CORS_ORIGINS=https://shyarora.github.io/nestly
FRONTEND_URL=https://shyarora.github.io/nestly
```

Replace:

- `[YOUR_PASSWORD]` with your Supabase database password
- `[YOUR_PROJECT_REF]` with your Supabase project reference

## Testing After Deploy

1. Visit your Render service URL (e.g., `https://nestly-backend.onrender.com`)
2. Check `/health` endpoint for health status
3. Visit `/graphql` for Apollo Studio Sandbox
4. Test a simple GraphQL query

## If Still Having Issues

Check the build logs in Render dashboard for specific error messages and let me know what you see!
