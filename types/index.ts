export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  isHost: boolean;
  isVerified: boolean;
  joinedAt: Date;
  phoneNumber?: string;
  location?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  hostId: string;
  host: User;
  images: string[];
  location: Location;
  propertyType: PropertyType;
  roomType: RoomType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  amenities: Amenity[];
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
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
  name: string;
  icon: string;
  category: AmenityCategory;
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
  HOUSE = "house",
  APARTMENT = "apartment",
  CONDO = "condo",
  VILLA = "villa",
  CABIN = "cabin",
  COTTAGE = "cottage",
  LOFT = "loft",
  TOWNHOUSE = "townhouse",
  GUESTHOUSE = "guesthouse",
  HOTEL = "hotel",
  UNIQUE = "unique",
}

export enum RoomType {
  ENTIRE_PLACE = "entire_place",
  PRIVATE_ROOM = "private_room",
  SHARED_ROOM = "shared_room",
  HOTEL_ROOM = "hotel_room",
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
