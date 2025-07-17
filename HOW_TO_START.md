# 🚀 How to Start the Full-Stack Nestly Application

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## Step-by-Step Setup Guide

### 1. 📁 Navigate to Project Directory

```bash
cd /Users/shyarora/Documents/personal/app-clone
```

### 2. 🗄️ Start the Backend Database

#### Option A: Using Docker (Recommended)

```bash
# Navigate to backend directory
cd backend

# Start PostgreSQL, Redis, and pgAdmin services
docker compose up -d

# Check if services are running
docker compose ps
```

#### Option B: Local PostgreSQL (Alternative)

If you have PostgreSQL installed locally:

```bash
# Create database
createdb stayhub

# Update .env file with your local database URL
# DATABASE_URL="postgresql://username:password@localhost:5432/stayhub"
```

### 3. 🔧 Setup Backend Environment

```bash
# Navigate to backend directory (if not already there)
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Required environment variables in `.env`:**

```env
DATABASE_URL="postgresql://stayhub_user:stayhub_password@localhost:5432/stayhub"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=4000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

### 4. 🗃️ Setup Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates tables)
npx prisma db push

# Optional: Seed database with sample data
npx prisma db seed
```

### 5. 🚀 Start Backend Server

```bash
# Build TypeScript (check for errors)
npm run build

# Start development server
npm run dev

# Or start production server
npm run start
```

**Expected output:**

```
✅ Connected to database
🚀 Server ready at http://localhost:4000
📊 GraphQL endpoint: http://localhost:4000/graphql
🎮 GraphQL Playground: http://localhost:4000/graphql
```

### 6. 🖥️ Setup and Start Frontend

```bash
# Open new terminal and navigate to frontend
cd /Users/shyarora/Documents/personal/app-clone

# Install frontend dependencies
npm install

# Start Next.js development server
npm run dev
```

**Expected output:**

```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.1s
```

### 7. 🧪 Test the Application

#### Frontend Testing:

1. Open browser: `http://localhost:3000`
2. Navigate to "Become a Host" link in header
3. Test property search and filtering
4. Check host dashboard functionality

#### Backend Testing:

1. Open GraphQL Playground: `http://localhost:4000/graphql`
2. Test user registration:

```graphql
mutation {
  register(
    input: {
      email: "test@example.com"
      password: "password123"
      firstName: "John"
      lastName: "Doe"
      isHost: true
    }
  )
}
```

3. Test property queries:

```graphql
query {
  properties {
    properties {
      id
      title
      pricePerNight
      host {
        firstName
        lastName
      }
    }
    total
  }
}
```

## 🔧 Troubleshooting Common Issues

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker compose ps

# View database logs
docker compose logs postgres

# Restart database services
docker compose restart
```

### Backend Compilation Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit

# Fix Prisma client issues
npx prisma generate
```

### Frontend Issues

```bash
# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev
```

## 📊 Development Tools

### Database Management

- **pgAdmin**: `http://localhost:5050`
  - Email: `admin@stayhub.com`
  - Password: `admin123`

### API Documentation

- **GraphQL Playground**: `http://localhost:4000/graphql`
- **API Health Check**: `http://localhost:4000/health`

### Useful Commands

```bash
# Backend commands
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npx prisma studio    # Open Prisma database browser

# Frontend commands
cd ../
npm run dev          # Start Next.js development
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌟 What Should Work

After successful setup, you should have:

1. **✅ Frontend** running on `http://localhost:3000`

   - Property listings with search/filtering
   - User authentication flow
   - Host dashboard and property management
   - Booking system interface

2. **✅ Backend** running on `http://localhost:4000`

   - GraphQL API with all resolvers
   - User authentication with JWT
   - Property CRUD operations
   - Booking management system

3. **✅ Database** running on `localhost:5432`
   - All tables created via Prisma schema
   - Relations properly set up
   - Ready for data operations

## 🔄 Development Workflow

1. **Make changes** to frontend components or backend resolvers
2. **Auto-reload** will pick up changes (both frontend and backend support hot reload)
3. **Test changes** in browser and GraphQL playground
4. **Commit changes** when ready

## 📝 Next Steps for Full Integration

1. **Connect Frontend to Backend**: Update Zustand stores to use GraphQL instead of mock data
2. **Add Authentication Flow**: Implement login/register forms with JWT handling
3. **Real-time Features**: Add WebSocket support for live updates
4. **File Uploads**: Implement image upload for property photos
5. **Payment Integration**: Add Stripe or similar payment processing

Your full-stack application foundation is now complete and ready for development! 🎉
