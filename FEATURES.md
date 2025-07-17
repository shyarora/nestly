# Nestly Feature Documentation

## Overview

This document serves as a comprehensive guide for understanding the Nestly application architecture, features, and development guidelines. All AI assistants and developers should refer to and update this documentation when working on the project.

## Project Structure

```
src/
├── app/                          # Next.js App Router - Main application pages
│   ├── (auth)/                   # Authentication group
│   │   ├── login/               # User login page
│   │   └── register/            # User registration page
│   ├── become-host/             # Host onboarding landing page
│   ├── host/                    # Host-specific pages
│   │   ├── dashboard/           # Host admin panel
│   │   ├── onboarding/          # Property creation wizard
│   │   └── properties/
│   │       └── new/             # Add new property form
│   ├── property/[id]/           # Dynamic property detail pages
│   ├── layout.tsx               # Root layout with header/footer
│   └── page.tsx                 # Homepage
├── components/                   # Reusable React components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header
│   │   └── Footer.tsx           # Site footer
│   ├── property/                # Property-related components
│   │   └── PropertyCard.tsx     # Property listing card
│   └── ui/                      # Base UI components
│       ├── button.tsx           # Button component
│       ├── input.tsx            # Input component
│       └── card.tsx             # Card component
├── store/                       # Zustand state management
│   ├── authStore.ts             # Authentication state
│   ├── propertyStore.ts         # Property management
│   ├── bookingStore.ts          # Booking system
│   └── reviewStore.ts           # Reviews and ratings
├── data/                        # Mock data and API layer
│   └── mockData.ts             # Comprehensive mock data
├── types/                       # TypeScript type definitions
│   └── index.ts                # All application types
└── lib/                         # Utility functions
    └── utils.ts                # Helper functions
```

## Feature Documentation

### 1. Authentication System

**Location**: `src/app/(auth)/`, `src/store/authStore.ts`

**Purpose**: Handle user authentication, registration, and session management

**Components**:

- Login page with email/password authentication
- Registration page with form validation
- Mock authentication for development
- Role-based access (guest vs host)

**Key Features**:

- Form validation with error handling
- Password visibility toggle
- Social login placeholders (Google, Facebook)
- Automatic redirection after login
- User profile management

**State Management**:

- User information storage
- Authentication status tracking
- Profile update functionality
- Logout handling

### 2. Host Onboarding System

**Location**: `src/app/become-host/`, `src/app/host/onboarding/`

**Purpose**: Convert guests to hosts through guided property setup

**Components**:

- Marketing landing page (`/become-host`)
- 6-step property creation wizard (`/host/onboarding`)
- Progress tracking and validation
- Property type and room type selection
- Location input with address fields
- Property details (guests, bedrooms, bathrooms, beds)
- Amenity selection with categories
- Photo upload placeholder
- Pricing setup (nightly rate, cleaning fee)

**Key Features**:

- Progressive disclosure design
- Visual progress bar
- Form validation at each step
- Conditional navigation (disabled next until required fields filled)
- Responsive design for all devices
- Integration with property store

### 3. Host Dashboard & Admin Panel

**Location**: `src/app/host/dashboard/`

**Purpose**: Comprehensive admin interface for hosts to manage their business

**Components**:

- Sidebar navigation with sections:
  - Overview (analytics and quick stats)
  - Properties (listing management)
  - Bookings (reservation management)
  - Earnings (financial analytics)
  - Messages (guest communication)
  - Settings (account preferences)

**Key Features**:

- Real-time statistics dashboard
- Property management with CRUD operations
- Booking calendar and guest management
- Revenue tracking and analytics
- Quick action buttons
- Recent activity feeds
- Mobile-responsive design

**Access Control**:

- Host-only access with authentication check
- Redirect non-hosts to become-host page
- Role-based menu items

### 4. Property Management

**Location**: `src/app/host/properties/new/`, `src/store/propertyStore.ts`

**Purpose**: Create, edit, and manage property listings

**Components**:

- Comprehensive property creation form
- Property type selection
- Location management
- Amenity selection
- Pricing configuration
- Photo management
- Property validation

**Key Features**:

- Form validation with real-time feedback
- Interactive counter controls
- Amenity categorization
- Sample photo integration
- Auto-generated property IDs
- Integration with mock backend

**State Management**:

- Property CRUD operations
- Search and filtering
- Favorites management
- Property status tracking

### 5. Navigation & User Experience

**Location**: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`

**Purpose**: Provide intuitive navigation throughout the application

**Components**:

- Responsive header with search functionality
- Dynamic navigation based on user role
- User menu with contextual options
- Footer with organized link sections
- Mobile-optimized navigation

**Key Features**:

- Role-based menu items
- Search functionality
- Favorites access
- Host dashboard links
- Responsive design
- Dropdown menus

## Development Guidelines

### Code Standards

1. **TypeScript**: All components must be fully typed
2. **Functional Components**: Use React hooks, no class components
3. **Zustand**: State management for global state
4. **Tailwind CSS**: Utility-first styling approach
5. **Responsive Design**: Mobile-first approach
6. **Accessibility**: Proper ARIA labels and semantic HTML

### Component Structure

```typescript
// Standard component structure
interface ComponentProps {
  // Define all props with types
}

export default function Component({ ...props }: ComponentProps) {
  // Hooks first
  // Event handlers
  // Render methods
  // Return JSX
}
```

### State Management Patterns

```typescript
// Zustand store structure
interface StoreState {
  // State properties
  // Action methods
}

export const useStore = create<StoreState>((set, get) => ({
  // State initialization
  // Action implementations with mock API calls
}));
```

### File Naming Conventions

- Pages: `page.tsx` (Next.js App Router convention)
- Components: `PascalCase.tsx`
- Stores: `camelCaseStore.ts`
- Types: `index.ts` in types folder
- Utilities: `camelCase.ts`

### Mock Data Strategy

- Realistic data structures matching real backend
- Comprehensive coverage of all features
- Consistent data relationships
- Performance considerations for large datasets

## Integration Points

### Backend Integration (Future)

All components are structured for easy backend integration:

- Mock functions can be replaced with actual API calls
- Proper error handling already implemented
- Loading states included
- TypeScript interfaces ready for API contracts

### Authentication Flow

- JWT token storage (localStorage/cookies)
- Role-based access control
- Session management
- Refresh token handling

### File Upload

- Photo upload for properties
- Profile picture management
- Document verification for hosts

## Testing Strategy

- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user flows
- E2E tests for critical paths

## Performance Considerations

- Image optimization with Next.js
- Code splitting with App Router
- Lazy loading for large components
- Efficient state management

## Deployment

- Vercel deployment configuration
- Environment variable management
- Build optimization
- Error monitoring setup

## Maintenance Guidelines

### Adding New Features

1. Update this documentation first
2. Create TypeScript interfaces
3. Implement state management if needed
4. Build components with proper validation
5. Add navigation links where appropriate
6. Test on all device sizes
7. Update README.md if necessary

### Code Review Checklist

- [ ] TypeScript compilation without errors
- [ ] ESLint warnings addressed
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Error handling implemented
- [ ] Loading states included
- [ ] Documentation updated

### AI Assistant Guidelines

When working on this project:

1. Always read this documentation first
2. Understand the existing architecture
3. Follow established patterns
4. Update documentation after changes
5. Maintain TypeScript type safety
6. Consider mobile responsiveness
7. Test all navigation paths
8. Validate form handling

## Current Status

### Completed Features ✅

- User authentication (login/register)
- Host onboarding flow
- Host dashboard with analytics
- Property creation and management
- Responsive navigation
- Mock data integration
- TypeScript type system

### In Progress 🚧

- Backend integration
- Advanced search functionality
- Booking system completion
- Review system enhancement

### Planned Features 📋

- Real-time messaging
- Payment integration
- Email notifications
- Advanced analytics
- Mobile app considerations
- SEO optimization

## Contact & Support

For questions about this codebase or feature development, refer to:

- This documentation
- README.md for setup instructions
- Type definitions in `src/types/index.ts`
- Individual component comments

---

**Last Updated**: July 16, 2025
**Version**: 1.0.0
**Maintainer**: AI Development Team
