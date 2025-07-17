import { create } from "zustand";
import { Property, SearchFilters, SearchResult } from "@/types";
import { mockProperties } from "@/data/mockData";

interface PropertyState {
  properties: Property[];
  searchResults: SearchResult | null;
  selectedProperty: Property | null;
  favorites: string[];
  isLoading: boolean;
  searchProperties: (filters: SearchFilters) => Promise<void>;
  getProperty: (id: string) => Property | undefined;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  toggleFavorite: (propertyId: string) => void;
  setSelectedProperty: (property: Property | null) => void;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: mockProperties,
  searchResults: null,
  selectedProperty: null,
  favorites: [],
  isLoading: false,

  searchProperties: async (filters: SearchFilters) => {
    set({ isLoading: true });

    // Mock search - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredProperties = [...mockProperties];

    // Apply filters
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.location.city.toLowerCase().includes(searchTerm) ||
          property.location.state.toLowerCase().includes(searchTerm) ||
          property.location.country.toLowerCase().includes(searchTerm) ||
          property.title.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.guests) {
      filteredProperties = filteredProperties.filter(
        (property) => property.maxGuests >= filters.guests!
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.pricePerNight >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.pricePerNight <= filters.maxPrice!
      );
    }

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.propertyTypes!.includes(property.propertyType)
      );
    }

    if (filters.roomTypes && filters.roomTypes.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.roomTypes!.includes(property.roomType)
      );
    }

    if (filters.minRating) {
      filteredProperties = filteredProperties.filter(
        (property) => property.rating >= filters.minRating!
      );
    }

    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(
        (property) => property.bedrooms >= filters.bedrooms!
      );
    }

    if (filters.bathrooms) {
      filteredProperties = filteredProperties.filter(
        (property) => property.bathrooms >= filters.bathrooms!
      );
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.amenities!.every((amenityId) =>
          property.amenities.some((amenity) => amenity.id === amenityId)
        )
      );
    }

    const searchResults: SearchResult = {
      properties: filteredProperties,
      total: filteredProperties.length,
      page: 1,
      limit: 20,
      hasMore: false,
    };

    set({
      searchResults,
      isLoading: false,
    });
  },

  getProperty: (id: string) => {
    const { properties } = get();
    return properties.find((property) => property.id === id);
  },

  addToFavorites: (propertyId: string) => {
    const { favorites } = get();
    if (!favorites.includes(propertyId)) {
      set({ favorites: [...favorites, propertyId] });
    }
  },

  removeFromFavorites: (propertyId: string) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((id) => id !== propertyId) });
  },

  toggleFavorite: (propertyId: string) => {
    const { favorites, addToFavorites, removeFromFavorites } = get();
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  },

  setSelectedProperty: (property: Property | null) => {
    set({ selectedProperty: property });
  },
}));
