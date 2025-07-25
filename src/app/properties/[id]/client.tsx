"use client";

import { useQuery } from "@apollo/client";
import Image from "next/image";
import { GET_PROPERTY_BY_ID } from "../../../services/property";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PropertyDetailClient() {
  const params = useParams();
  const propertyId = params.id as string;

  const { data, loading, error } = useQuery(GET_PROPERTY_BY_ID, {
    variables: { id: propertyId },
    errorPolicy: "all",
  });

  const property = data?.property;

  if (loading) {
    return <PropertyDetailSkeleton />;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Property not found
          </h2>
          <p className="text-gray-600 mb-6">
            The property you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: Car,
    kitchen: Coffee,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/properties"
              className="flex items-center text-gray-600 hover:text-rose-600"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Properties
            </Link>
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <span className="text-rose-600">Nestly</span>
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-rose-600"
            >
              Sign In to Book
            </Link>
          </div>
        </div>
      </header>

      {/* Property Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Property Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="aspect-w-16 aspect-h-12">
              <Image
                src={property.images[0] || "/placeholder-property.jpg"}
                alt={property.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images
                .slice(1, 5)
                .map((image: string, index: number) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    width={300}
                    height={200}
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                  />
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Property Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-gray-600 ml-1">
                      ({property.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{property.guests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>
              </div>

              {/* Host Info */}
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Hosted by {property.host.firstName}
                </h3>
                <div className="flex items-center">
                  {property.host.avatar ? (
                    <Image
                      src={property.host.avatar}
                      alt={`${property.host.firstName} ${property.host.lastName}`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-rose-600 font-semibold">
                        {property.host.firstName[0]}
                        {property.host.lastName[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {property.host.firstName} {property.host.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Host since{" "}
                      {new Date(property.host.joinedAt).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this place
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity: string) => {
                    const IconComponent =
                      amenityIcons[amenity.toLowerCase()] || Coffee;
                    return (
                      <div key={amenity} className="flex items-center">
                        <IconComponent className="h-5 w-5 text-gray-600 mr-3" />
                        <span className="text-gray-700 capitalize">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      ${property.price}
                    </span>
                    <span className="text-gray-600 ml-1">/night</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                    </select>
                  </div>
                </div>

                <Link
                  href="/auth/login"
                  className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors text-center block"
                >
                  Sign in to Book
                </Link>

                <p className="text-center text-sm text-gray-600 mt-3">
                  You won&apos;t be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b h-16"></header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-32 md:h-40 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
