export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string; // Computed field: firstName + lastName
  avatar?: string;
  bio?: string;
  isHost: boolean;
  isVerified: boolean;
  joinedAt: Date;
  createdAt?: Date; // Add for GraphQL compatibility
  phoneNumber?: string;
  location?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  order: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  hostId?: string; // Optional for GraphQL compatibility
  host: User;
  images: string[] | PropertyImage[]; // Support both formats
  location?: Location; // Optional to handle flattened structure
  // Flattened location fields (GraphQL format)
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  propertyType: PropertyType;
  roomType: RoomType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds?: number; // Optional
  amenities: Amenity[];
  pricePerNight: number;
  cleaningFee?: number; // Optional
  serviceFee?: number; // Optional
  rating?: number; // Optional, computed from reviews
  reviewCount?: number; // Optional, computed from reviews
  minimumStay?: number; // Optional
  maximumStay?: number; // Optional
  isAvailable?: boolean; // Optional
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface Amenity {
  id: string;
  name?: string; // Optional for GraphQL compatibility
  amenity?: unknown; // For GraphQL null values - using unknown instead of any
  icon?: string; // Make icon optional to match GraphQL schema
  category?: AmenityCategory; // Optional
}

export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  guestId: string;
  guest: User;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  property: Property;
  reviewerId: string;
  reviewer: User;
  rating: number;
  comment: string;
  accuracy: number;
  communication: number;
  cleanliness: number;
  location: number;
  checkIn: number;
  value: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: User[];
  lastMessage?: Message;
  updatedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  user: User;
  name: string;
  properties: Property[];
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
}

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyTypes?: PropertyType[];
  roomTypes?: RoomType[];
  amenities?: string[];
  minRating?: number;
  bedrooms?: number;
  bathrooms?: number;
  instantBook?: boolean;
}

export interface SearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Enums
export enum PropertyType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  CONDO = "CONDO",
  VILLA = "VILLA",
  CABIN = "CABIN",
  COTTAGE = "COTTAGE",
  LOFT = "LOFT",
  TOWNHOUSE = "TOWNHOUSE",
  GUESTHOUSE = "GUESTHOUSE",
  HOTEL = "HOTEL",
  BED_AND_BREAKFAST = "BED_AND_BREAKFAST",
  CHALET = "CHALET",
  ESTATE = "ESTATE",
  FARMHOUSE = "FARMHOUSE",
  INN = "INN",
  LODGE = "LODGE",
  RESORT = "RESORT",
  TREEHOUSE = "TREEHOUSE",
  TENT = "TENT",
  HOSTEL = "HOSTEL",
  UNIQUE = "UNIQUE",
}

export enum RoomType {
  ENTIRE_PLACE = "ENTIRE_PLACE",
  PRIVATE_ROOM = "PRIVATE_ROOM",
  SHARED_ROOM = "SHARED_ROOM",
  HOTEL_ROOM = "HOTEL_ROOM",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export enum AmenityCategory {
  BASICS = "basics",
  FEATURES = "features",
  LOCATION = "location",
  SAFETY = "safety",
  ACCESSIBILITY = "accessibility",
}

// Form interfaces
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BookingForm {
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export interface ReviewForm {
  rating: number;
  comment: string;
  accuracy: number;
  communication: number;
  cleanliness: number;
  location: number;
  checkIn: number;
  value: number;
}

export interface MessageForm {
  content: string;
}

export interface PropertyForm {
  title: string;
  description: string;
  propertyType: PropertyType;
  roomType: RoomType;
  location: Omit<Location, "latitude" | "longitude">;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  amenities: string[];
  pricePerNight: number;
  cleaningFee: number;
  images: File[];
}
