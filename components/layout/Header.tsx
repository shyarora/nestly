"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, User, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?location=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Nestly
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 rounded-l-full focus:ring-0 focus:border-0 px-6 py-3"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-r-full bg-rose-500 hover:bg-rose-600 text-white border-0 h-12 w-12"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/host"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Become a Host
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.push("/help")}
            >
              <Globe className="h-4 w-4" />
            </Button>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => router.push("/favorites")}
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center space-x-2 rounded-full border-gray-300 px-4 py-2 hover:shadow-md transition-shadow"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-4 w-4" />
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/trips"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Your trips
                        </Link>
                        <Link
                          href="/favorites"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Wishlists
                        </Link>
                        {user?.isHost && (
                          <Link
                            href="/host/properties"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Manage listings
                          </Link>
                        )}
                        <hr className="my-1" />
                        <button
                          onClick={() => {
                            handleAuthAction();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Log in
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign up
                        </Link>
                        <hr className="my-1" />
                        <Link
                          href="/host"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Host your home
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Where are you going?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-rose-500 hover:bg-rose-600"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/trips"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your trips
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlists
                  </Link>
                  <button
                    onClick={() => {
                      handleAuthAction();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                  <Link
                    href="/host"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Host your home
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
