"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  allowedRoles = [],
  fallback,
  redirectTo = "/auth/login",
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (allowedRoles.length > 0 && user) {
        const hasRequiredRole = allowedRoles.some((role) =>
          user.roles.includes(role)
        );
        if (!hasRequiredRole) {
          router.push("/unauthorized");
          return;
        }
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    requireAuth,
    allowedRoles,
    router,
    redirectTo,
  ]);

  if (isLoading) {
    return fallback || <LoadingScreen />;
  }

  if (requireAuth && !isAuthenticated) {
    return fallback || <LoadingScreen />;
  }

  if (allowedRoles.length > 0 && user) {
    const hasRequiredRole = allowedRoles.some((role) =>
      user.roles.includes(role)
    );
    if (!hasRequiredRole) {
      return fallback || <UnauthorizedScreen />;
    }
  }

  return <>{children}</>;
};

// Optional Guard for pages that should be accessible to both authenticated and unauthenticated users
export const OptionalAuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading...</h2>
      <p className="text-gray-600">
        Please wait while we verify your authentication.
      </p>
    </div>
  </div>
);

const UnauthorizedScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
);
