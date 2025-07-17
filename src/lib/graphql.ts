// GraphQL client setup using fetch
import { toast } from "@/components/ui/toast";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
    extensions?: {
      code?: string;
    };
  }>;
}

class GraphQLClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        toast.error(`Network Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }

      const result: GraphQLResponse<T> = await response.json();

      if (result.errors) {
        const errorMessage = result.errors[0].message;
        const errorCode = result.errors[0].extensions?.code;

        // Show user-friendly error messages
        if (errorCode === "GRAPHQL_VALIDATION_FAILED") {
          toast.error(`Query Error: ${errorMessage}`);
        } else if (errorMessage.includes("Cannot query field")) {
          toast.error("Data structure mismatch. Please refresh the page.");
        } else {
          toast.error(`Error: ${errorMessage}`);
        }

        throw new Error(errorMessage);
      }

      return result.data!;
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        toast.error(
          "Unable to connect to server. Please check if the backend is running."
        );
      } else if (!(error as Error).message.includes("Error:")) {
        // Only show toast for errors that haven't already been shown
        toast.error(`Unexpected error: ${(error as Error).message}`);
      }

      throw error;
    }
  }

  async mutate<T>(
    mutation: string,
    variables?: Record<string, any>
  ): Promise<T> {
    return this.query<T>(mutation, variables);
  }
}

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);

// GraphQL Queries
export const GET_PROPERTIES = `
  query GetProperties($filters: PropertyFilters) {
    properties(filters: $filters) {
      id
      title
      description
      propertyType
      roomType
      maxGuests
      bedrooms
      bathrooms
      pricePerNight
      cleaningFee
      serviceFee
      city
      state
      country
      address
      latitude
      longitude
      minimumStay
      maximumStay
      createdAt
      updatedAt
      host {
        id
        firstName
        lastName
        avatar
        isVerified
      }
      images {
        id
        url
        caption
        order
      }
      amenities {
        id
        amenity {
          id
          name
          icon
          category
        }
      }
    }
  }
`;

export const GET_PROPERTY = `
  query GetProperty($id: String!) {
    property(id: $id) {
      id
      title
      description
      propertyType
      roomType
      maxGuests
      bedrooms
      bathrooms
      pricePerNight
      cleaningFee
      serviceFee
      city
      state
      country
      address
      latitude
      longitude
      minimumStay
      maximumStay
      createdAt
      updatedAt
      host {
        id
        firstName
        lastName
        avatar
        isVerified
        createdAt
      }
      images {
        id
        url
        caption
        order
      }
      amenities {
        id
        amenity {
          id
          name
          icon
          category
        }
      }
    }
  }
`;

export const CREATE_PROPERTY = `
  mutation CreateProperty($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      id
      title
      description
      propertyType
      roomType
      maxGuests
      bedrooms
      bathrooms
      pricePerNight
      cleaningFee
      serviceFee
      city
      state
      country
      address
      latitude
      longitude
      minimumStay
      maximumStay
      createdAt
      updatedAt
      host {
        id
        firstName
        lastName
        avatar
        isVerified
      }
      images {
        id
        url
        caption
        order
      }
      amenities {
        id
        amenity {
          id
          name
          icon
          category
        }
      }
    }
  }
`;

export const GET_USERS = `
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      avatar
      isHost
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER = `
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      avatar
      isHost
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const GET_AMENITIES = `
  query GetAmenities {
    amenities {
      id
      name
      icon
      category
    }
  }
`;

// Types for the GraphQL responses (these match the GraphQL schema)
export interface GraphQLProperty {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  roomType: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  cleaningFee?: number;
  serviceFee?: number;
  city: string;
  state: string;
  country: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  minimumStay: number;
  maximumStay?: number;
  createdAt: string;
  updatedAt: string;
  host: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    isVerified: boolean;
    email: string;
    isHost: boolean;
    createdAt: string;
    updatedAt: string;
  };
  images: Array<{
    id: string;
    url: string;
    caption?: string;
    order: number;
  }>;
  amenities: Array<{
    id: string;
    amenity?: {
      id: string;
      name: string;
      icon?: string;
      category: string;
    };
  }>;
}

export interface PropertyFilters {
  search?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  roomType?: string;
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  limit?: number;
  offset?: number;
}

export interface CreatePropertyInput {
  title: string;
  description: string;
  propertyType: string;
  roomType: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  cleaningFee?: number;
  serviceFee?: number;
  city: string;
  state: string;
  country: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  minimumStay?: number;
  maximumStay?: number;
}

export interface UserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
