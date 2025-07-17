# Render.com Deployment Configuration

## Service Type: Web Service

### Build and Start Commands

- **Build Command**: `npm install && npm run build && npx prisma generate`
- **Start Command**: `npm start`

### Environment Variables

Add these in Render dashboard:

```
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secure-jwt-secret-for-production
CORS_ORIGINS=https://[your-username].github.io
```

### Auto-Deploy

- Enable auto-deploy from your main branch
- Connect your GitHub repository

### Health Check

Render will automatically check `/health` endpoint

### Scaling

- Start with Basic plan ($7/month)
- Can scale up based on usage

## Steps to Deploy on Render:

1. **Create Account**: Go to https://render.com and sign up
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect Repository**: Connect your GitHub account and select your repository
4. **Configure Service**:
   - Name: `nestly-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Region: Choose closest to your users
   - Branch: `main`
   - Build Command: `npm install && npm run build && npx prisma generate`
   - Start Command: `npm start`
5. **Add Environment Variables**: Copy from the list above
6. **Deploy**: Click "Create Web Service"

## Post-Deployment:

1. Note your service URL (e.g., `https://nestly-backend.onrender.com`)
2. Update your frontend environment variables
3. Test the API endpoints

## Database Migration:

After first deployment, run:

```bash
# This will be done automatically in the build process
npx prisma db push
```
