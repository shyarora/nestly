"use client";

import { useAuth } from "../services/auth";
import { LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-rose-500">Nestly</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Your premium property rental platform is ready to transform how you
          book and manage accommodations.
        </p>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          </div>
        ) : isAuthenticated && user ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Welcome back,{" "}
              <span className="font-semibold text-rose-600">
                {user.firstName}
              </span>
              !
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-700 mb-6">
              Sign in to start your journey with us.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Link>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Browse Properties
            </h3>
            <p className="text-gray-600 mb-4">
              Discover amazing places to stay around the world.
            </p>
            <Link
              href="/properties"
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              View Properties →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Modern Authentication
            </h3>
            <p className="text-gray-600">
              Secure Google-based authentication for seamless access.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Next.js 15
            </h3>
            <p className="text-gray-600">
              Built with the latest Next.js and React 19 features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
