# AI Assistant Instructions for Nestly Project

## Overview

This file contains specific instructions for AI assistants (GitHub Copilot, Claude, ChatGPT, etc.) working on the Nestly project. All AI assistants MUST read and follow these guidelines.

## Before Starting Any Work

### 1. Required Reading

- Read `FEATURES.md` completely to understand the project architecture
- Review `README.md` for setup and technical details
- Check `src/types/index.ts` for current type definitions
- Examine existing code patterns in similar components

### 2. Context Gathering

- Always use file search tools to understand existing structure
- Read current file contents before making changes
- Check for recent changes in related files
- Understand the user's current workflow

## Development Guidelines

### Code Quality Standards

1. **TypeScript First**: Never compromise on type safety
2. **Functional Components**: Use React hooks consistently
3. **Responsive Design**: Test on mobile, tablet, and desktop
4. **Accessibility**: Include proper ARIA labels and semantic HTML
5. **Error Handling**: Always implement loading and error states
6. **Validation**: Client-side validation with user-friendly messages

### Component Development Pattern

```typescript
// 1. Imports (external libraries first, then internal)
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'

// 2. Interface definitions
interface ComponentProps {
  // All props must be typed
}

// 3. Component implementation
export default function ComponentName({ ...props }: ComponentProps) {
  // 4. Hooks (in order: state, router, stores, effects)
  const [state, setState] = useState()
  const router = useRouter()
  const { user } = useAuthStore()

  // 5. Event handlers
  const handleAction = async () => {
    // Implementation
  }

  // 6. Conditional rendering helpers
  const renderSection = () => {
    // Complex JSX
  }

  // 7. Main render
  return (
    // JSX with proper Tailwind classes
  )
}
```

### State Management Rules

1. Use Zustand for global state
2. Use React state for component-specific state
3. Always include loading states for async operations
4. Handle errors gracefully with user feedback
5. Implement optimistic updates where appropriate

### Navigation Standards

1. All new pages must be accessible through UI navigation
2. Update both Header.tsx and Footer.tsx when adding new routes
3. Implement proper role-based access control
4. Add mobile navigation support
5. Include breadcrumbs for complex flows

## Specific Feature Guidelines

### Authentication

- Always check authentication status before protected actions
- Implement proper redirects (login → intended page)
- Handle role-based access (guest vs host)
- Provide clear error messages for failed authentication

### Host Features

- Protect all host routes with isHost check
- Redirect non-hosts to /become-host
- Include progress indicators for multi-step flows
- Validate all form inputs with helpful error messages

### Property Management

- Use consistent property interfaces from types/index.ts
- Implement proper image handling (mock for now)
- Include all required fields with validation
- Support both create and edit operations

### UI/UX Requirements

- Follow existing design patterns (colors, spacing, typography)
- Use consistent button styles and interactions
- Implement proper loading states
- Add hover effects and transitions
- Ensure keyboard navigation works

## File Organization Rules

### New Pages

- Use Next.js App Router conventions (page.tsx)
- Place in appropriate directory structure
- Include proper metadata and SEO tags
- Implement error boundaries where needed

### New Components

- Place in appropriate component directory
- Use descriptive, PascalCase names
- Include comprehensive prop interfaces
- Add JSDoc comments for complex components

### State Stores

- Follow existing store patterns
- Include mock API functions
- Implement proper error handling
- Add loading states for async operations

## Testing Requirements

### Before Submitting Changes

1. TypeScript compilation must pass
2. ESLint warnings should be addressed
3. All new routes must be navigable through UI
4. Forms must handle validation and errors
5. Mobile responsiveness must be tested
6. Authentication flows must work correctly

### User Flow Testing

- Test the complete user journey
- Verify navigation works on all screen sizes
- Check that forms submit correctly
- Ensure error states display properly
- Validate loading states appear and disappear

## Documentation Maintenance

### Always Update

1. `FEATURES.md` - When adding new features or changing architecture
2. `README.md` - When changing setup or installation
3. Component comments - For complex logic or unusual patterns
4. This file - When establishing new patterns or rules

### Documentation Standards

- Use clear, concise language
- Include code examples where helpful
- Explain the "why" not just the "what"
- Keep examples up-to-date with current code

## Common Patterns to Follow

### Form Handling

```typescript
const [formData, setFormData] = useState({
  /* initial state */
});
const [errors, setErrors] = useState<Record<string, string>>({});
const [isSubmitting, setIsSubmitting] = useState(false);

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  // Validation logic
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  try {
    // API call
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setIsSubmitting(false);
  }
};
```

### Navigation with Authentication

```typescript
const { user, isAuthenticated } = useAuthStore();
const router = useRouter();

const handleProtectedAction = () => {
  if (!isAuthenticated) {
    router.push("/login?redirect=" + encodeURIComponent(currentPath));
    return;
  }
  // Protected action
};
```

### Responsive Design Classes

```typescript
// Use consistent breakpoints
className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  p-4 md:p-6 lg:p-8
  text-sm md:text-base lg:text-lg
"
```

## Error Prevention

### Common Mistakes to Avoid

1. Don't create components without proper TypeScript interfaces
2. Don't implement features without navigation paths
3. Don't skip mobile responsiveness testing
4. Don't forget loading and error states
5. Don't hardcode values that should be configurable
6. Don't skip form validation
7. Don't ignore accessibility requirements

### Red Flags

- TypeScript errors or warnings
- Missing navigation to new features
- Forms without validation
- Missing error handling
- Hardcoded strings that should be constants
- Components without proper prop types
- Missing mobile responsiveness

## Communication Guidelines

### When Working with Users

1. Explain what you're building and why
2. Ask for clarification on ambiguous requirements
3. Suggest improvements based on UX best practices
4. Provide progress updates for complex tasks
5. Explain trade-offs when they exist

### Code Comments

```typescript
// Good: Explains why, not what
// Mock API call simulation - replace with real API in production
await new Promise((resolve) => setTimeout(resolve, 1000));

// Bad: Explains what (obvious from code)
// Set loading to true
setIsLoading(true);
```

## Version Control

### Commit Standards

- Make focused, atomic commits
- Write descriptive commit messages
- Include context for why changes were made
- Reference related issues or features

### File Changes

- Always check existing file contents before editing
- Preserve existing patterns and conventions
- Update related files when making changes
- Test navigation paths after adding new routes

## Emergency Procedures

### If Something Breaks

1. Check TypeScript compilation errors first
2. Review recent changes for obvious issues
3. Test in development environment
4. Check console for runtime errors
5. Verify all navigation paths still work
6. Ensure authentication flows are intact

### Recovery Steps

1. Identify the last working state
2. Isolate the problematic changes
3. Fix issues systematically
4. Test thoroughly before marking complete
5. Update documentation if patterns changed

---

## Quick Reference Checklist

Before completing any task:

- [ ] Read FEATURES.md for context
- [ ] Checked existing code patterns
- [ ] Implemented proper TypeScript types
- [ ] Added navigation paths to new features
- [ ] Tested mobile responsiveness
- [ ] Included loading and error states
- [ ] Validated form handling
- [ ] Updated documentation
- [ ] Tested authentication flows
- [ ] Verified accessibility basics

**Remember**: Quality over speed. It's better to build features correctly the first time than to rush and create technical debt.

---

**Last Updated**: July 16, 2025
**Version**: 1.0.0
