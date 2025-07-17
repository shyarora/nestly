# Render.com Deployment Visual Guide

## Getting Started with Render

### Step 1: Create Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

### Step 2: Connect GitHub Repository

1. Once logged in, click "New +" button in the top right
2. Select "Web Service"
3. Click "Connect a repository"
4. Authorize Render to access your GitHub account
5. Select your repository from the list

### Step 3: Configure Service Settings

```
Service Name: nestly-backend
Root Directory: backend
Environment: Node
Region: Oregon (US West) or closest to your users
Branch: main
Build Command: npm install && npm run build && npx prisma generate
Start Command: npm start
```

### Step 4: Add Environment Variables

Click "Advanced" and add these environment variables:

| Key          | Value                                                                       |
| ------------ | --------------------------------------------------------------------------- |
| NODE_ENV     | production                                                                  |
| PORT         | 4000                                                                        |
| DATABASE_URL | postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres |
| DIRECT_URL   | postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres |
| JWT_SECRET   | your-super-secure-jwt-secret                                                |
| CORS_ORIGINS | https://[your-username].github.io                                           |

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (usually 5-10 minutes)
3. Your service will be available at `https://[service-name].onrender.com`

## Important Notes

### Free Tier Limitations

- Service sleeps after 15 minutes of inactivity
- 750 hours per month (enough for most hobby projects)
- Cold start delay when service wakes up

### Paid Plans

- **Starter Plan**: $7/month - Always on, no sleep
- **Standard Plan**: $25/month - More resources
- **Pro Plan**: $85/month - High performance

### Getting Your Service URL

After deployment:

1. Go to your Render dashboard
2. Click on your service
3. Copy the URL from the top (looks like `https://service-name.onrender.com`)
4. Use this URL in your frontend environment variables

### Monitoring Your Service

- Check logs in the Render dashboard
- Set up health checks
- Monitor usage and performance

### Troubleshooting Common Issues

1. **Build Failures**: Check build logs for dependency issues
2. **Database Connection**: Verify environment variables
3. **CORS Errors**: Update CORS_ORIGINS with correct frontend URL
4. **Service Not Starting**: Check start command and port configuration

## Screenshots Guide

### Dashboard Overview

```
[Render Dashboard]
├── New + (Create new service)
├── Services (Your deployed services)
├── Static Sites
└── Databases
```

### Service Configuration

```
[Web Service Setup]
├── Repository Connection
├── Basic Settings
│   ├── Name
│   ├── Root Directory
│   ├── Environment
│   └── Branch
├── Build & Deploy
│   ├── Build Command
│   └── Start Command
└── Advanced Settings
    ├── Environment Variables
    ├── Auto-Deploy
    └── Health Checks
```

### Environment Variables Section

```
Key: NODE_ENV          Value: production
Key: PORT              Value: 4000
Key: DATABASE_URL      Value: postgresql://...
Key: JWT_SECRET        Value: your-secret-key
Key: CORS_ORIGINS      Value: https://username.github.io
```

This visual guide should help you navigate Render's interface and deploy your backend successfully!
