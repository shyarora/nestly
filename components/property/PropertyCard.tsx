"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin } from "lucide-react";
import { Property, PropertyImage } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePropertyStore } from "@/store/propertyStore";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

// Helper function to get image URL from either string or PropertyImage object
const getImageUrl = (image: string | PropertyImage): string => {
  return typeof image === 'string' ? image : image.url;
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { favorites, toggleFavorite } = usePropertyStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const isFavorited = favorites.includes(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <Link href={`/property/${property.id}`}>
      <Card
        className={cn(
          "group cursor-pointer hover:shadow-lg transition-shadow duration-200",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          {/* Main Image */}
          {!imageError && property.images.length > 0 ? (
            <Image
              src={getImageUrl(property.images[currentImageIndex])}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}

          {/* Image Navigation */}
          {property.images.length > 1 && !imageError && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          {property.images.length > 1 && !imageError && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white p-2"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors duration-200",
                isFavorited ? "fill-rose-500 text-rose-500" : "text-gray-600"
              )}
            />
          </Button>
        </div>

        <CardContent className="p-4">
          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <MapPin className="h-3 w-3 mr-1" />
            {property.location?.city || property.city}, {property.location?.state || property.state}
          </div>

          {/* Title */}
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
            {property.title}
          </h3>

          {/* Property Details */}
          <div className="text-sm text-gray-600 mb-2">
            {property.maxGuests} guests · {property.bedrooms} bedrooms ·{" "}
            {property.bathrooms} bathrooms
          </div>

          {/* Rating */}
          {property.rating && (
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium text-gray-900">
                {property.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600 ml-1">
                ({property.reviewCount || 0} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(property.pricePerNight)}
            </span>
            <span className="text-sm text-gray-600 ml-1">/ night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
