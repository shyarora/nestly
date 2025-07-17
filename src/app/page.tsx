"use client";

import React, { useEffect } from "react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { usePropertyStore } from "@/store/propertyStore";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { properties, loadProperties, isLoading } = usePropertyStore();

  useEffect(() => {
    // Load initial properties from GraphQL
    loadProperties();
  }, [loadProperties]);

  const featuredProperties = properties.slice(0, 8);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find your perfect
              <span className="text-rose-500"> stay</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover unique accommodations and unforgettable experiences
              around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
              <div className="relative">
                <div className="flex items-center px-6 py-4">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-xs font-medium text-gray-900">
                      Where
                    </label>
                    <Input
                      type="text"
                      placeholder="Search destinations"
                      className="border-0 p-0 focus:ring-0 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="relative border-l border-gray-200">
                <div className="flex items-center px-6 py-4">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-xs font-medium text-gray-900">
                      Check in
                    </label>
                    <Input
                      type="date"
                      className="border-0 p-0 focus:ring-0 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="relative border-l border-gray-200">
                <div className="flex items-center px-6 py-4">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-xs font-medium text-gray-900">
                      Check out
                    </label>
                    <Input
                      type="date"
                      className="border-0 p-0 focus:ring-0 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="relative border-l border-gray-200">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="block text-xs font-medium text-gray-900">
                        Who
                      </label>
                      <Input
                        type="number"
                        placeholder="Add guests"
                        min="1"
                        className="border-0 p-0 focus:ring-0 text-sm w-20"
                      />
                    </div>
                  </div>
                  <Button className="bg-rose-500 hover:bg-rose-600 rounded-full h-12 w-12">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured stays
          </h2>
          <p className="text-lg text-gray-600">
            Discover our most popular accommodations
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore by category
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect accommodation type for your trip
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Houses", icon: "🏠", count: "2,340" },
              { name: "Apartments", icon: "🏢", count: "1,890" },
              { name: "Villas", icon: "🏖️", count: "567" },
              { name: "Cabins", icon: "🏕️", count: "423" },
              { name: "Unique stays", icon: "🦄", count: "234" },
              { name: "Luxury", icon: "💎", count: "156" },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">{category.count} stays</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join millions of travelers who trust Nestly for their perfect
            getaway
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
            >
              Start exploring
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 text-lg font-medium"
            >
              Become a host
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
