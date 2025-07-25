"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { OptionalAuthGuard } from "../../services/auth/components";
import { GET_PROPERTIES } from "../../services/property";
import { Search, Filter, MapPin, Star, Users, Bed, Bath } from "lucide-react";
import Link from "next/link";

export default function PropertiesPage() {
  return (
    <OptionalAuthGuard>
      <PropertiesContent />
    </OptionalAuthGuard>
  );
}

function PropertiesContent() {
  const [filters, setFilters] = useState<{
    search: string;
    location: string;
    minPrice?: number;
    maxPrice?: number;
    guests?: number;
    bedrooms?: number;
  }>({
    search: "",
    location: "",
    minPrice: undefined,
    maxPrice: undefined,
    guests: undefined,
    bedrooms: undefined,
  });

  const { data, loading, error, fetchMore } = useQuery(GET_PROPERTIES, {
    variables: {
      limit: 12,
      offset: 0,
      ...filters,
    },
    errorPolicy: "all",
  });

  const properties = data?.properties?.items || [];
  const hasNextPage = data?.properties?.hasNextPage || false;

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          offset: properties.length,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-rose-600">Nestly</span>
              </h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                href="/properties"
                className="text-gray-700 hover:text-rose-600"
              >
                Properties
              </Link>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-rose-600"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search & Filter Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.guests || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    guests: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              >
                <option value="">Any guests</option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="4">4 guests</option>
                <option value="6">6+ guests</option>
              </select>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && properties.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to load properties
            </h3>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {hasNextPage && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function PropertyCard({ property }: { property: any }) {
  return (
    <Link href={`/properties/${property.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-w-16 aspect-h-12 relative">
          <Image
            src={property.images[0] || "/placeholder-property.jpg"}
            alt={property.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {property.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{property.guests}</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${property.price}
              <span className="text-sm font-normal text-gray-600">/night</span>
            </span>
            <span className="text-sm text-gray-600">
              {property.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
        <div className="flex space-x-3 mb-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      </div>
    </div>
  );
}
