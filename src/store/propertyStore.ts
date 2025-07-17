import { create } from "zustand";
import {
  Property,
  SearchFilters,
  SearchResult,
  PropertyType,
  RoomType,
  AmenityCategory,
} from "@/types";
import {
  graphqlClient,
  GET_PROPERTIES,
  GET_PROPERTY,
  CREATE_PROPERTY,
  PropertyFilters,
  CreatePropertyInput,
  GraphQLProperty,
} from "@/lib/graphql";
import { toast } from "@/components/ui/toast";

// Helper function to transform GraphQL property to frontend property
const transformProperty = (gqlProperty: GraphQLProperty): Property => ({
  ...gqlProperty,
  hostId: gqlProperty.host.id,
  location: {
    address: gqlProperty.address || "",
    city: gqlProperty.city,
    state: gqlProperty.state,
    country: gqlProperty.country,
    zipCode: "", // Not available in GraphQL schema
    latitude: gqlProperty.latitude || 0,
    longitude: gqlProperty.longitude || 0,
  },
  host: {
    ...gqlProperty.host,
    name: `${gqlProperty.host.firstName} ${gqlProperty.host.lastName}`,
    bio: "",
    joinedAt: new Date(gqlProperty.host.createdAt),
    createdAt: new Date(gqlProperty.host.createdAt),
    phoneNumber: "",
    location: "",
  },
  images: gqlProperty.images.map((img) => img.url), // Frontend expects array of strings
  propertyType: gqlProperty.propertyType as PropertyType, // Type casting for enum
  roomType: gqlProperty.roomType as RoomType, // Type casting for enum
  beds: gqlProperty.bedrooms, // Approximation
  cleaningFee: gqlProperty.cleaningFee || 0,
  serviceFee: gqlProperty.serviceFee || 0,
  rating: 4.5, // Mock rating
  reviewCount: 12, // Mock review count
  isAvailable: true,
  createdAt: new Date(gqlProperty.createdAt),
  updatedAt: new Date(gqlProperty.updatedAt),
  // Transform amenities to match frontend structure
  amenities: gqlProperty.amenities
    .filter((amenity) => amenity.amenity) // Filter out null amenities
    .map((amenity) => ({
      id: amenity.amenity!.id,
      name: amenity.amenity!.name,
      icon: amenity.amenity!.icon,
      category: amenity.amenity!.category as AmenityCategory,
    })),
});

interface PropertyState {
  properties: Property[];
  searchResults: SearchResult | null;
  selectedProperty: Property | null;
  favorites: string[];
  isLoading: boolean;
  searchProperties: (filters: SearchFilters) => Promise<void>;
  getProperty: (id: string) => Promise<Property | null>;
  addProperty: (property: CreatePropertyInput) => Promise<void>;
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  toggleFavorite: (propertyId: string) => void;
  setSelectedProperty: (property: Property | null) => void;
  loadProperties: () => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  searchResults: null,
  selectedProperty: null,
  favorites: [],
  isLoading: false,

  loadProperties: async () => {
    set({ isLoading: true });
    try {
      const response = await graphqlClient.query<{
        properties: GraphQLProperty[];
      }>(GET_PROPERTIES);
      const properties = response.properties.map(transformProperty);
      set({ properties, isLoading: false });
      toast.success(`Loaded ${properties.length} properties`);
    } catch (error) {
      console.error("Failed to load properties:", error);
      set({ isLoading: false });
      // Error toast is already shown by GraphQL client
    }
  },

  searchProperties: async (filters: SearchFilters) => {
    set({ isLoading: true });

    try {
      // Convert frontend filters to GraphQL filters
      const graphqlFilters: PropertyFilters = {
        search: filters.location, // Using location as general search
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        propertyType: filters.propertyTypes?.[0], // Take first property type
        roomType: filters.roomTypes?.[0], // Take first room type
        guests: filters.guests,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        limit: 20,
        offset: 0,
      };

      const response = await graphqlClient.query<{
        properties: GraphQLProperty[];
      }>(GET_PROPERTIES, { filters: graphqlFilters });

      // Transform the GraphQL response to match our frontend types
      let properties = response.properties.map(transformProperty);

      // Apply additional frontend filters that GraphQL doesn't handle
      if (filters.propertyTypes && filters.propertyTypes.length > 1) {
        properties = properties.filter((property) =>
          filters.propertyTypes!.includes(property.propertyType)
        );
      }

      if (filters.roomTypes && filters.roomTypes.length > 1) {
        properties = properties.filter((property) =>
          filters.roomTypes!.includes(property.roomType)
        );
      }

      if (filters.minRating) {
        properties = properties.filter(
          (property) => (property.rating || 0) >= filters.minRating!
        );
      }

      if (filters.amenities && filters.amenities.length > 0) {
        properties = properties.filter((property) =>
          filters.amenities!.every((amenityId) =>
            property.amenities.some((amenity) => amenity.id === amenityId)
          )
        );
      }

      const searchResults: SearchResult = {
        properties,
        total: properties.length,
        page: 1,
        limit: 20,
        hasMore: false,
      };

      set({
        searchResults,
        isLoading: false,
      });

      toast.success(
        `Found ${properties.length} properties matching your search`
      );
    } catch (error) {
      console.error("Failed to search properties:", error);
      set({ isLoading: false });
      // Error toast is already shown by GraphQL client
    }
  },

  getProperty: async (id: string): Promise<Property | null> => {
    try {
      const response = await graphqlClient.query<{
        property: GraphQLProperty | null;
      }>(GET_PROPERTY, { id });

      if (!response.property) return null;

      return transformProperty(response.property);
    } catch (error) {
      console.error("Failed to get property:", error);
      return null;
    }
  },

  addProperty: async (propertyData: CreatePropertyInput) => {
    set({ isLoading: true });

    try {
      const response = await graphqlClient.mutate<{
        createProperty: GraphQLProperty;
      }>(CREATE_PROPERTY, { input: propertyData });

      const newProperty = transformProperty(response.createProperty);

      const { properties } = get();
      set({
        properties: [...properties, newProperty],
        isLoading: false,
      });

      toast.success("Property created successfully!");
    } catch (error) {
      console.error("Failed to create property:", error);
      set({ isLoading: false });
      // Error toast is already shown by GraphQL client
    }
  },

  updateProperty: async (id: string, updates: Partial<Property>) => {
    set({ isLoading: true });

    try {
      // For now, just update locally until we implement the GraphQL mutation
      const { properties } = get();
      const updatedProperties = properties.map((property) =>
        property.id === id
          ? { ...property, ...updates, updatedAt: new Date() }
          : property
      );

      set({
        properties: updatedProperties,
        isLoading: false,
      });

      toast.success("Property updated successfully!");
    } catch (error) {
      console.error("Failed to update property:", error);
      set({ isLoading: false });
      toast.error("Failed to update property");
    }
  },

  deleteProperty: async (id: string) => {
    set({ isLoading: true });

    try {
      // For now, just delete locally until we implement the GraphQL mutation
      const { properties } = get();
      const filteredProperties = properties.filter(
        (property) => property.id !== id
      );

      set({
        properties: filteredProperties,
        isLoading: false,
      });

      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error("Failed to delete property:", error);
      set({ isLoading: false });
      toast.error("Failed to delete property");
    }
  },

  addToFavorites: (propertyId: string) => {
    const { favorites } = get();
    if (!favorites.includes(propertyId)) {
      set({ favorites: [...favorites, propertyId] });
      toast.success("Added to favorites!");
    }
  },

  removeFromFavorites: (propertyId: string) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((id) => id !== propertyId) });
    toast.success("Removed from favorites");
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
