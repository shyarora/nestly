"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  Share,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Tv,
  Coffee,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePropertyStore } from "@/store/propertyStore";
import { useAuthStore } from "@/store/authStore";
import { useReviewStore } from "@/store/reviewStore";
import { PropertyImage, Property } from "@/types";
import { formatCurrency, formatDate, calculateDaysBetween } from "@/lib/utils";

export default function PropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;

  const { toggleFavorite, favorites, getProperty } = usePropertyStore();
  const { isAuthenticated } = useAuthStore();
  const { getReviewsByProperty, getAverageRating, getRatingBreakdown } =
    useReviewStore();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reviews = getReviewsByProperty(propertyId);
  const averageRating = getAverageRating(propertyId);
  const ratingBreakdown = getRatingBreakdown(propertyId);

  const isFavorited = favorites.includes(propertyId);

  // Helper function to get image URL from either string or object format
  const getImageUrl = (image: string | PropertyImage): string => {
    if (typeof image === "string") {
      return image;
    }
    return image.url;
  };

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const fetchedProperty = await getProperty(propertyId);
        setProperty(fetchedProperty);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, getProperty]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property not found
          </h1>
          <p className="text-gray-600">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const days = calculateDaysBetween(new Date(checkIn), new Date(checkOut));
    const subtotal = property.pricePerNight * days;
    const cleaningFee = property.cleaningFee || 0;
    const serviceFee = property.serviceFee || 0;
    return subtotal + cleaningFee + serviceFee;
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }

    // In a real app, this would create a booking
    alert("Booking functionality would be implemented here");
  };

  const amenityIcons = {
    WiFi: Wifi,
    "Free parking": Car,
    TV: Tv,
    Kitchen: Coffee,
    Pool: Waves,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Property Images */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        <div className="lg:col-span-3">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(property.images[currentImageIndex])}
              alt={property.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {property.images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={getImageUrl(image)}
                alt={`${property.title} - Image ${index + 2}`}
                fill
                className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentImageIndex(index + 1)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {property.title}
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFavorite(propertyId)}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      isFavorited ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  {isFavorited ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="ml-1">
                  ({property.reviewCount || 0} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location
                  ? `${property.location.city}, ${property.location.state}, ${property.location.country}`
                  : `${property.city}, ${property.state}, ${property.country}`}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-gray-600">
              <span>{property.maxGuests} guests</span>
              <span>•</span>
              <span>{property.bedrooms} bedrooms</span>
              <span>•</span>
              <span>{property.bathrooms} bathrooms</span>
              {property.beds && (
                <>
                  <span>•</span>
                  <span>{property.beds} beds</span>
                </>
              )}
            </div>
          </div>

          {/* Host Info */}
          <div className="border-b pb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={property.host.avatar || "/placeholder-avatar.jpg"}
                  alt={`${property.host.firstName} ${property.host.lastName}`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Hosted by {property.host.firstName} {property.host.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  Host since {formatDate(property.host.joinedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-b pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About this place
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="border-b pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.slice(0, 10).map((amenity) => {
                const IconComponent =
                  amenityIcons[amenity.name as keyof typeof amenityIcons];
                return (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    {IconComponent ? (
                      <IconComponent className="h-5 w-5 text-gray-600" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-300 rounded" />
                    )}
                    <span className="text-gray-700">
                      {amenity.name || "Amenity"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-gray-600 ml-1">
                  ({property.reviewCount || 0} reviews)
                </span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {Object.entries(ratingBreakdown).map(([category, rating]) => (
                <div
                  key={category}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700 capitalize">{category}</span>
                  <div className="flex items-center">
                    <div className="w-24 h-1 bg-gray-200 rounded-full mr-3">
                      <div
                        className="h-1 bg-gray-900 rounded-full"
                        style={{ width: `${(rating / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={
                          review.reviewer.avatar || "/placeholder-avatar.jpg"
                        }
                        alt={`${review.reviewer.firstName} ${review.reviewer.lastName}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.reviewer.firstName} {review.reviewer.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">
                  {formatCurrency(property.pricePerNight)}
                </span>
                <span className="text-base font-normal text-gray-600">
                  / night
                </span>
              </CardTitle>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-gray-600">
                  ({property.reviewCount || 0} reviews)
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2">
                  <span className="text-sm">
                    {guests} guest{guests !== 1 ? "s" : ""}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        setGuests(Math.min(property.maxGuests, guests + 1))
                      }
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {checkIn && checkOut && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>
                      {formatCurrency(property.pricePerNight)} ×{" "}
                      {calculateDaysBetween(
                        new Date(checkIn),
                        new Date(checkOut)
                      )}{" "}
                      nights
                    </span>
                    <span>
                      {formatCurrency(
                        property.pricePerNight *
                          calculateDaysBetween(
                            new Date(checkIn),
                            new Date(checkOut)
                          )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cleaning fee</span>
                    <span>{formatCurrency(property.cleaningFee || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>{formatCurrency(property.serviceFee || 0)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t">
                    <span>Total</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleBooking}
                disabled={!checkIn || !checkOut}
              >
                {!checkIn || !checkOut ? "Select dates" : "Reserve"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                You won&apos;t be charged yet
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
