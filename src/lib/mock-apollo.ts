import { InMemoryCache, ApolloClient } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PROPERTIES, GET_PROPERTY_BY_ID } from "../services/property/queries";
import { mockProperties } from "../services/property/mock-data";

// Mock resolvers for property queries
export const propertyMocks = [
  {
    request: {
      query: GET_PROPERTIES,
      variables: {
        limit: 12,
        offset: 0,
      },
    },
    result: {
      data: {
        properties: {
          items: mockProperties,
          hasNextPage: false,
          totalCount: mockProperties.length,
        },
      },
    },
  },
  // Mock for individual property queries
  ...mockProperties.map((property) => ({
    request: {
      query: GET_PROPERTY_BY_ID,
      variables: { id: property.id },
    },
    result: {
      data: {
        property,
      },
    },
  })),
  // Mock for filtered queries
  {
    request: {
      query: GET_PROPERTIES,
      variables: {
        limit: 12,
        offset: 0,
        search: "",
        location: "",
        minPrice: undefined,
        maxPrice: undefined,
        guests: undefined,
        bedrooms: undefined,
      },
    },
    result: {
      data: {
        properties: {
          items: mockProperties,
          hasNextPage: false,
          totalCount: mockProperties.length,
        },
      },
    },
  },
];
