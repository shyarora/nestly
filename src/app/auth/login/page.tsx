"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleSignIn } from "../../../services/auth/components";
import { useAuth } from "../../../services/auth";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-rose-100">
            <svg
              className="h-8 w-8 text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome to <span className="text-rose-600">Nestly</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-6">
                  Sign in with Google
                </h3>
                <GoogleSignIn
                  onSuccess={() => {
                    console.log("Google Sign-In successful");
                  }}
                  onError={(error) => {
                    console.error("Google Sign-In error:", error);
                  }}
                  buttonText="signin_with"
                  theme="outline"
                  size="large"
                />
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-rose-600 hover:text-rose-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-rose-600 hover:text-rose-500">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              New to Nestly?{" "}
              <span className="text-rose-600 font-medium">
                Sign up automatically with Google
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
