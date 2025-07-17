"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PropertyType, RoomType, AmenityCategory } from "@/types";
import {
  HomeIcon,
  MapPinIcon,
  UsersIcon,
  BedIcon,
  BathIcon,
  DollarSignIcon,
  CameraIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
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
];

export default function HostOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
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
    images: [] as string[],
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit and go to dashboard
      router.push("/host/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePropertyData = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setPropertyData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      setPropertyData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setPropertyData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <HomeIcon className="h-16 w-16 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What kind of place will you host?
              </h2>
              <p className="text-gray-600">
                Choose the type of property you're listing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(PropertyType).map((type) => (
                <Card
                  key={type}
                  className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                    propertyData.propertyType === type
                      ? "ring-2 ring-rose-600 bg-rose-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => updatePropertyData("propertyType", type)}
                >
                  <div className="text-center">
                    <HomeIcon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                    <h3 className="font-semibold capitalize">
                      {type.replace("_", " ")}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                What type of room will guests have?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(RoomType).map((type) => (
                  <Card
                    key={type}
                    className={`p-4 cursor-pointer transition-all ${
                      propertyData.roomType === type
                        ? "ring-2 ring-rose-600 bg-rose-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => updatePropertyData("roomType", type)}
                  >
                    <h4 className="font-semibold capitalize">
                      {type.replace("_", " ")}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {type === RoomType.ENTIRE_PLACE &&
                        "Guests have the whole place to themselves"}
                      {type === RoomType.PRIVATE_ROOM &&
                        "Guests have their own room in a home"}
                      {type === RoomType.SHARED_ROOM &&
                        "Guests sleep in a room with others"}
                      {type === RoomType.HOTEL_ROOM &&
                        "Guests have a private room in a hotel"}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPinIcon className="h-16 w-16 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Where's your place located?
              </h2>
              <p className="text-gray-600">
                Your address is only shared with guests after they book
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Input
                placeholder="Street address"
                value={propertyData.location.address}
                onChange={(e) =>
                  updatePropertyData("location.address", e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  value={propertyData.location.city}
                  onChange={(e) =>
                    updatePropertyData("location.city", e.target.value)
                  }
                />
                <Input
                  placeholder="State"
                  value={propertyData.location.state}
                  onChange={(e) =>
                    updatePropertyData("location.state", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Country"
                  value={propertyData.location.country}
                  onChange={(e) =>
                    updatePropertyData("location.country", e.target.value)
                  }
                />
                <Input
                  placeholder="ZIP code"
                  value={propertyData.location.zipCode}
                  onChange={(e) =>
                    updatePropertyData("location.zipCode", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <UsersIcon className="h-16 w-16 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Share some basics about your place
              </h2>
              <p className="text-gray-600">
                Tell us about the size and layout of your space
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-semibold">Guests</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "maxGuests",
                          Math.max(1, propertyData.maxGuests - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">
                      {propertyData.maxGuests}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "maxGuests",
                          propertyData.maxGuests + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-semibold">Bedrooms</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "bedrooms",
                          Math.max(0, propertyData.bedrooms - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">
                      {propertyData.bedrooms}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "bedrooms",
                          propertyData.bedrooms + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-semibold">Beds</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "beds",
                          Math.max(1, propertyData.beds - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{propertyData.beds}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData("beds", propertyData.beds + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-semibold">Bathrooms</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "bathrooms",
                          Math.max(0.5, propertyData.bathrooms - 0.5)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">
                      {propertyData.bathrooms}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updatePropertyData(
                          "bathrooms",
                          propertyData.bathrooms + 0.5
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckIcon className="h-16 w-16 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Tell guests what your place has to offer
              </h2>
              <p className="text-gray-600">
                You can add more amenities after you publish your listing
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity) => (
                <Card
                  key={amenity.id}
                  className={`p-4 cursor-pointer transition-all ${
                    propertyData.amenities.includes(amenity.id)
                      ? "ring-2 ring-rose-600 bg-rose-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  <div className="text-center">
                    <div className="flex justify-center items-center h-8 mb-2">
                      {propertyData.amenities.includes(amenity.id) && (
                        <CheckIcon className="h-5 w-5 text-rose-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CameraIcon className="h-16 w-16 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Add some photos of your place
              </h2>
              <p className="text-gray-600">
                You'll need at least 5 photos to get started. You can add more
                later.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <CameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag and drop your photos here, or click to browse
                </p>
                <Button variant="outline">Upload photos</Button>
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                For now, we'll use some sample photos. You can update them later
                in your dashboard.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSignIcon className="h-16 w-16 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Set your price and publish
              </h2>
              <p className="text-gray-600">You can change your price anytime</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per night
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      className="pl-8"
                      value={propertyData.pricePerNight}
                      onChange={(e) =>
                        updatePropertyData(
                          "pricePerNight",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cleaning fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      className="pl-8"
                      value={propertyData.cleaningFee}
                      onChange={(e) =>
                        updatePropertyData(
                          "cleaningFee",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Beautiful apartment in downtown"
                    value={propertyData.title}
                    onChange={(e) =>
                      updatePropertyData("title", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                    placeholder="Describe your place to guests..."
                    value={propertyData.description}
                    onChange={(e) =>
                      updatePropertyData("description", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-rose-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <Card className="p-8 mb-8">{renderStep()}</Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-rose-600 hover:bg-rose-700 text-white flex items-center"
            disabled={
              (currentStep === 1 &&
                (!propertyData.propertyType || !propertyData.roomType)) ||
              (currentStep === 2 && !propertyData.location.address) ||
              (currentStep === 6 &&
                (!propertyData.title || !propertyData.description))
            }
          >
            {currentStep === totalSteps ? "Publish listing" : "Next"}
            {currentStep !== totalSteps && (
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
