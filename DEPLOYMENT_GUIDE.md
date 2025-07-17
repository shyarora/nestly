# Complete Deployment Guide for Nestly

This guide will help you deploy your Nestly application with:

- **Frontend**: GitHub Pages (Free)
- **Backend**: Render.com (Free tier available)
- **Database**: Supabase PostgreSQL (Free tier available)

## Prerequisites

- GitHub account
- Render.com account
- Supabase account

## Step 1: Setup Supabase Database

1. **Create Supabase Project**

   - Go to https://supabase.com
   - Click "New Project"
   - Choose your organization
   - Enter project name: `nestly-production`
   - Generate a strong password
   - Select a region close to your users
   - Click "Create new project"

2. **Setup Database Schema**

   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the SQL from `SUPABASE_SETUP.md`
   - Click "Run" to create all tables

3. **Get Connection Details**
   - Go to Settings → Database
   - Copy the connection string
   - Note down:
     - Database password
     - Project reference (in the URL)

## Step 2: Deploy Backend to Render

1. **Prepare Repository**

   - Push your code to GitHub
   - Make sure `backend/` folder contains all necessary files

2. **Create Render Service**

   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `nestly-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build && npx prisma generate`
     - **Start Command**: `npm start`

3. **Add Environment Variables**

   ```
   NODE_ENV=production
   PORT=4000
   DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
   DIRECT_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres
   JWT_SECRET=your-super-secure-jwt-secret-change-this
   CORS_ORIGINS=https://[YOUR_GITHUB_USERNAME].github.io/nestly
   ```

   Create `.env.production` for production:

   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

   ```

   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://nestly-backend.onrender.com`)

## Step 3: Setup GitHub Pages for Frontend

1. **Update Frontend Configuration**

   - Open `next.config.ts`
   - Update `basePath` with your repository name
   - The file should already be configured correctly

2. **Enable GitHub Pages**

   - Go to your GitHub repository
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will run automatically on next push

3. **Update Frontend Environment**
   Create `.env.local` for development:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

   Create `.env.production` for production:

   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

## Step 4: Configure API Integration

1. **Update Frontend API calls**

   - Make sure all API calls use `process.env.NEXT_PUBLIC_API_URL`
   - Update GraphQL endpoint in your Apollo client setup

2. **Test API Connection**
   - Visit your deployed frontend
   - Check browser console for any CORS errors
   - Test a simple API call

## Step 5: Database Migration and Seeding

1. **Run Database Migration**

   - Your Render service will automatically run `prisma generate`
   - Database schema is created via SQL in Supabase

2. **Seed Database (Optional)**
   - You can run the seed script locally pointing to production DB
   - Or create a one-time job in Render to seed data

## Step 6: Testing and Verification

1. **Test Frontend**

   - Visit `https://[your-username].github.io/nestly`
   - Check all pages load correctly
   - Test user registration/login

2. **Test Backend**

   - Visit `https://your-backend.onrender.com/graphql`
   - Test GraphQL queries
   - Check database connections

3. **Test Integration**
   - Test full user flow
   - Check property listings
   - Test booking functionality

## Troubleshooting

### Frontend Issues

- Check GitHub Actions logs for build errors
- Verify Next.js configuration
- Check console for JavaScript errors

### Backend Issues

- Check Render logs for deployment errors
- Verify environment variables
- Test database connection

### Database Issues

- Check Supabase logs
- Verify connection strings
- Check if IP restrictions are set

## Post-Deployment

1. **Custom Domain (Optional)**

   - Add custom domain in GitHub Pages settings
   - Update CORS_ORIGINS in backend

2. **Monitoring**

   - Set up Render health checks
   - Monitor Supabase usage
   - Check GitHub Pages deployment status

3. **Security**
   - Rotate JWT secrets periodically
   - Monitor database access logs
   - Update dependencies regularly

## Cost Breakdown

- **Supabase**: Free tier (up to 500MB database)
- **Render**: Free tier (750 hours/month, sleeps after 15min)
- **GitHub Pages**: Free for public repositories

**Total Monthly Cost**: $0 (with limitations) or ~$7/month for Render paid plan

## Next Steps

1. Push your code to GitHub
2. Follow the steps above in order
3. Test thoroughly
4. Consider upgrading to paid tiers for production use

## Support

- Supabase Docs: https://supabase.com/docs
- Render Docs: https://render.com/docs
- GitHub Pages Docs: https://docs.github.com/pages
