# GraphQL Playground Sample Queries

## Available Queries & Mutations

### 🔍 **User Queries**

```graphql
# Get all users
query GetAllUsers {
    users {
        id
        email
        firstName
        lastName
        isHost
        isVerified
        createdAt
    }
}

# Get a specific user by ID
query GetUser($id: String!) {
    user(id: $id) {
        id
        email
        firstName
        lastName
        isHost
        isVerified
        createdAt
    }
}
```

### 🏠 **Property Queries**

```graphql
# Get all properties
query GetAllProperties {
    properties {
        id
        title
        description
        pricePerNight
        city
        state
        country
        propertyType
        roomType
        maxGuests
        bedrooms
        bathrooms
        host {
            id
            firstName
            lastName
            email
        }
        images {
            id
            url
            alt
            order
        }
        amenities {
            id
            name
            icon
        }
    }
}

# Get properties with filters
query GetFilteredProperties($filters: PropertyFilters) {
    properties(filters: $filters) {
        id
        title
        description
        pricePerNight
        city
        state
        country
        propertyType
        roomType
        maxGuests
        bedrooms
        bathrooms
    }
}

# Get a specific property by ID
query GetProperty($id: String!) {
    property(id: $id) {
        id
        title
        description
        pricePerNight
        address
        city
        state
        country
        zipCode
        latitude
        longitude
        propertyType
        roomType
        maxGuests
        bedrooms
        bathrooms
        host {
            id
            firstName
            lastName
            email
        }
        images {
            id
            url
            alt
            order
        }
        amenities {
            id
            name
            icon
        }
    }
}
```

### 🎯 **Amenity Queries**

```graphql
# Get all amenities
query GetAllAmenities {
    amenities {
        id
        name
        icon
        category
    }
}
```

### ✏️ **Mutations**

```graphql
# Create a new user
mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
        id
        email
        firstName
        lastName
        isHost
        isVerified
        createdAt
    }
}

# Create a new property (requires authentication)
mutation CreateProperty($input: CreatePropertyInput!) {
    createProperty(input: $input) {
        id
        title
        description
        pricePerNight
        city
        state
        country
        propertyType
        roomType
        maxGuests
        bedrooms
        bathrooms
    }
}
```

### 📝 **Sample Variables**

For **GetFilteredProperties**:

```json
{
    "filters": {
        "search": "beach",
        "location": "California",
        "minPrice": 50,
        "maxPrice": 200,
        "propertyType": "HOUSE",
        "guests": 2,
        "bedrooms": 1,
        "limit": 10,
        "offset": 0
    }
}
```

For **CreateUser**:

```json
{
    "input": {
        "email": "test@example.com",
        "password": "password123",
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

For **CreateProperty**:

```json
{
    "input": {
        "title": "Beautiful Beach House",
        "description": "Amazing oceanfront property with stunning views",
        "pricePerNight": 150,
        "address": "123 Beach Ave",
        "city": "Malibu",
        "state": "California",
        "country": "USA",
        "zipCode": "90265",
        "latitude": 34.0259,
        "longitude": -118.7798,
        "propertyType": "HOUSE",
        "roomType": "ENTIRE_PLACE",
        "maxGuests": 6,
        "bedrooms": 3,
        "bathrooms": 2
    }
}
```

## 🎮 **How to Use in Playground**

1. Copy any of the above queries/mutations into the left panel
2. If the query uses variables, add them in the "Variables" panel at the bottom
3. Click the "Play" button to execute
4. View results in the right panel

## 🔍 **Schema Explorer**

Use the "Schema" tab on the right side to explore:

- All available types
- Query and mutation signatures
- Input types and their fields
- Documentation for each field
