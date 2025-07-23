import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  host: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  search?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  amenities?: string[];
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
}

interface PropertyState {
  properties: Property[];
  currentProperty: Property | null;
  filters: PropertyFilters;
  isLoading: boolean;
  totalCount: number;
  hasNextPage: boolean;
}

interface PropertyActions {
  setProperties: (properties: Property[]) => void;
  addProperties: (properties: Property[]) => void;
  setCurrentProperty: (property: Property | null) => void;
  setFilters: (filters: PropertyFilters) => void;
  setLoading: (loading: boolean) => void;
  setPagination: (totalCount: number, hasNextPage: boolean) => void;
  clearProperties: () => void;
}

type PropertyStore = PropertyState & PropertyActions;

export const usePropertyStore = create<PropertyStore>()(
  devtools(
    (set, get) => ({
      // State
      properties: [],
      currentProperty: null,
      filters: {},
      isLoading: false,
      totalCount: 0,
      hasNextPage: false,

      // Actions
      setProperties: (properties) =>
        set({ properties }, false, "setProperties"),

      addProperties: (newProperties) =>
        set(
          (state) => ({
            properties: [...state.properties, ...newProperties],
          }),
          false,
          "addProperties"
        ),

      setCurrentProperty: (property) =>
        set({ currentProperty: property }, false, "setCurrentProperty"),

      setFilters: (filters) => set({ filters }, false, "setFilters"),

      setLoading: (loading) => set({ isLoading: loading }, false, "setLoading"),

      setPagination: (totalCount, hasNextPage) =>
        set({ totalCount, hasNextPage }, false, "setPagination"),

      clearProperties: () =>
        set(
          {
            properties: [],
            currentProperty: null,
            totalCount: 0,
            hasNextPage: false,
          },
          false,
          "clearProperties"
        ),
    }),
    {
      name: "property-store",
    }
  )
);
