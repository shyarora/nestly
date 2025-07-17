"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PropertyType, RoomType, AmenityCategory } from "@/types";
import { usePropertyStore } from "@/store/propertyStore";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowLeftIcon,
  SaveIcon,
  ImageIcon,
  MapPinIcon,
  HomeIcon,
  DollarSignIcon,
} from "lucide-react";

const amenities = [
  { id: "wifi", name: "WiFi", category: AmenityCategory.BASICS },
  { id: "kitchen", name: "Kitchen", category: AmenityCategory.BASICS },
  { id: "washer", name: "Washer", category: AmenityCategory.BASICS },
  { id: "dryer", name: "Dryer", category: AmenityCategory.BASICS },
  {
    id: "air_conditioning",
    name: "Air conditioning",
    category: AmenityCategory.FEATURES,
  },
  { id: "heating", name: "Heating", category: AmenityCategory.FEATURES },
  { id: "tv", name: "TV", category: AmenityCategory.FEATURES },
  { id: "parking", name: "Free parking", category: AmenityCategory.LOCATION },
  { id: "pool", name: "Pool", category: AmenityCategory.FEATURES },
  { id: "hot_tub", name: "Hot tub", category: AmenityCategory.FEATURES },
  { id: "gym", name: "Gym", category: AmenityCategory.FEATURES },
  {
    id: "workspace",
    name: "Dedicated workspace",
    category: AmenityCategory.FEATURES,
  },
  { id: "bbq", name: "BBQ grill", category: AmenityCategory.FEATURES },
  { id: "fireplace", name: "Fireplace", category: AmenityCategory.FEATURES },
  { id: "balcony", name: "Balcony", category: AmenityCategory.FEATURES },
  { id: "garden", name: "Garden", category: AmenityCategory.FEATURES },
];

export default function NewPropertyPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addProperty } = usePropertyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "" as PropertyType,
    roomType: "" as RoomType,
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    maxGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    amenities: [] as string[],
    pricePerNight: 50,
    cleaningFee: 25,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
  });

  const updateFormData = (field: string, value: unknown) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      // Create property data
      const propertyData = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        roomType: formData.roomType,
        maxGuests: formData.maxGuests,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        pricePerNight: formData.pricePerNight,
        cleaningFee: formData.cleaningFee,
        city: formData.location.city,
        state: formData.location.state,
        country: formData.location.country,
        address: formData.location.address,
        latitude: 37.7749, // Mock coordinates
        longitude: -122.4194,
        minimumStay: 1,
        maximumStay: 30,
      };

      await addProperty(propertyData);
      router.push("/host/dashboard");
    } catch (error) {
      console.error("Error creating property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.propertyType &&
      formData.roomType &&
      formData.location.address &&
      formData.location.city &&
      formData.location.state &&
      formData.location.country &&
      formData.pricePerNight > 0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Property
            </h1>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="bg-rose-600 hover:bg-rose-700"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            {isSubmitting ? "Publishing..." : "Publish Property"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <HomeIcon className="h-5 w-5 text-rose-600 mr-2" />
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <Input
                  placeholder="Beautiful apartment in downtown"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.propertyType}
                  onChange={(e) =>
                    updateFormData("propertyType", e.target.value)
                  }
                  required
                >
                  <option value="">Select property type</option>
                  {Object.values(PropertyType).map((type) => (
                    <option key={type} value={type}>
                      {type
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type *
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.roomType}
                  onChange={(e) => updateFormData("roomType", e.target.value)}
                  required
                >
                  <option value="">Select room type</option>
                  {Object.values(RoomType).map((type) => (
                    <option key={type} value={type}>
                      {type
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
                  placeholder="Describe your property to guests..."
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData("description", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <MapPinIcon className="h-5 w-5 text-rose-600 mr-2" />
              <h2 className="text-xl font-semibold">Location</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <Input
                  placeholder="123 Main Street"
                  value={formData.location.address}
                  onChange={(e) =>
                    updateFormData("location.address", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <Input
                  placeholder="San Francisco"
                  value={formData.location.city}
                  onChange={(e) =>
                    updateFormData("location.city", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <Input
                  placeholder="California"
                  value={formData.location.state}
                  onChange={(e) =>
                    updateFormData("location.state", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <Input
                  placeholder="United States"
                  value={formData.location.country}
                  onChange={(e) =>
                    updateFormData("location.country", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <Input
                  placeholder="94102"
                  value={formData.location.zipCode}
                  onChange={(e) =>
                    updateFormData("location.zipCode", e.target.value)
                  }
                />
              </div>
            </div>
          </Card>

          {/* Property Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Property Details</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Guests
                </label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData(
                        "maxGuests",
                        Math.max(1, formData.maxGuests - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="mx-4 font-semibold">
                    {formData.maxGuests}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData("maxGuests", formData.maxGuests + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData(
                        "bedrooms",
                        Math.max(0, formData.bedrooms - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="mx-4 font-semibold">
                    {formData.bedrooms}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData("bedrooms", formData.bedrooms + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beds
                </label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData("beds", Math.max(1, formData.beds - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="mx-4 font-semibold">{formData.beds}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateFormData("beds", formData.beds + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData(
                        "bathrooms",
                        Math.max(0.5, formData.bathrooms - 0.5)
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="mx-4 font-semibold">
                    {formData.bathrooms}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateFormData("bathrooms", formData.bathrooms + 0.5)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Amenities */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Amenities</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity) => (
                <div
                  key={amenity.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.amenities.includes(amenity.id)
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <DollarSignIcon className="h-5 w-5 text-rose-600 mr-2" />
              <h2 className="text-xl font-semibold">Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per night ($) *
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.pricePerNight}
                  onChange={(e) =>
                    updateFormData(
                      "pricePerNight",
                      parseInt(e.target.value) || 0
                    )
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cleaning fee ($)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.cleaningFee}
                  onChange={(e) =>
                    updateFormData("cleaningFee", parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </Card>

          {/* Photos */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <ImageIcon className="h-5 w-5 text-rose-600 mr-2" />
              <h2 className="text-xl font-semibold">Photos</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium">
                    {index === 0 ? "Cover" : `Photo ${index + 1}`}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Sample photos are being used. You can upload your own photos after
              publishing.
            </p>
          </Card>
        </form>
      </div>
    </div>
  );
}
