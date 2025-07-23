import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import { mockProperties } from "../../services/property/mock-data";

// Create different HTTP links for different services
const authLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:5002/graphql",
});

const propertyLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_PROPERTY_API_URL || "http://localhost:5003/graphql",
});

// Mock link for property queries when service is not available
const mockPropertyLink = new ApolloLink((operation, forward) => {
  const { operationName } = operation;
  
  if (operationName === "GetProperties") {
    const variables = operation.variables;
    let filteredProperties = [...mockProperties];
    
    // Apply filters
    if (variables.search) {
      filteredProperties = filteredProperties.filter(p => 
        p.title.toLowerCase().includes(variables.search.toLowerCase()) ||
        p.description.toLowerCase().includes(variables.search.toLowerCase()) ||
        p.location.toLowerCase().includes(variables.location.toLowerCase())
      );
    }
    
    if (variables.guests) {
      filteredProperties = filteredProperties.filter(p => p.guests >= variables.guests);
    }
    
    if (variables.bedrooms) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= variables.bedrooms);
    }
    
    if (variables.minPrice) {
      filteredProperties = filteredProperties.filter(p => p.price >= variables.minPrice);
    }
    
    if (variables.maxPrice) {
      filteredProperties = filteredProperties.filter(p => p.price <= variables.maxPrice);
    }
    
    const offset = variables.offset || 0;
    const limit = variables.limit || 12;
    const items = filteredProperties.slice(offset, offset + limit);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            properties: {
              items,
              hasNextPage: offset + limit < filteredProperties.length,
              totalCount: filteredProperties.length,
            },
          },
        });
      }, 500);
    }) as any;
  }
  
  if (operationName === "GetPropertyById") {
    const property = mockProperties.find(p => p.id === operation.variables.id);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { property: property || null },
        });
      }, 300);
    }) as any;
  }
  
  // For non-property queries, continue to the next link
  return forward(operation);
});

// Auth context link
const authContextLink = setContext((_, { headers }) => {
  const token = Cookies.get("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Error handling link
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        // Handle authentication errors
        if (
          extensions?.code === "UNAUTHENTICATED" ||
          extensions?.code === "FORBIDDEN"
        ) {
          // Clear tokens and redirect to login
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          // Redirect to login page
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);

      // Handle network errors (like 401, 403)
      if (
        "statusCode" in networkError &&
        (networkError.statusCode === 401 || networkError.statusCode === 403)
      ) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }
  }
);

// Route queries to appropriate services or mock
const routingLink = ApolloLink.split(
  (operation) => {
    const definition = operation.query.definitions[0];
    if (definition.kind === "OperationDefinition") {
      const operationName = operation.operationName;
      // Route property queries to mock for now
      if (operationName?.includes("Property") || operationName?.includes("Properties")) {
        return true; // Use mock
      }
    }
    return false; // Use auth service
  },
  mockPropertyLink,
  authLink
);

export const apolloClient = new ApolloClient({
  link: from([errorLink, authContextLink, routingLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          me: {
            keyArgs: false,
          },
          properties: {
            keyArgs: ["search", "location", "minPrice", "maxPrice", "guests", "bedrooms"],
            merge(existing, incoming, { args }) {
              const offset = args?.offset || 0;
              if (offset === 0) {
                return incoming;
              }
              return {
                ...incoming,
                items: existing ? [...existing.items, ...incoming.items] : incoming.items,
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
