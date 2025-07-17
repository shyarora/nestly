import { create } from "zustand";
import { Booking, BookingForm, BookingStatus, Property, User } from "@/types";
import { mockBookings } from "@/data/mockData";

interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  isLoading: boolean;
  createBooking: (
    bookingData: BookingForm & { propertyId: string; guestId: string }
  ) => Promise<Booking>;
  getBookingsByUser: (userId: string) => Booking[];
  getBookingsByProperty: (propertyId: string) => Booking[];
  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus
  ) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  setSelectedBooking: (booking: Booking | null) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: mockBookings,
  selectedBooking: null,
  isLoading: false,

  createBooking: async (bookingData) => {
    set({ isLoading: true });

    // Mock booking creation - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: bookingData.propertyId,
      property: {} as Property, // Will be populated in real app
      guestId: bookingData.guestId,
      guest: {} as User, // Will be populated in real app
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      totalPrice: 0, // Will be calculated in real app
      status: BookingStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { bookings } = get();
    set({
      bookings: [...bookings, newBooking],
      isLoading: false,
    });

    return newBooking;
  },

  getBookingsByUser: (userId: string) => {
    const { bookings } = get();
    return bookings.filter((booking) => booking.guestId === userId);
  },

  getBookingsByProperty: (propertyId: string) => {
    const { bookings } = get();
    return bookings.filter((booking) => booking.propertyId === propertyId);
  },

  updateBookingStatus: async (bookingId: string, status: BookingStatus) => {
    set({ isLoading: true });

    // Mock status update - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { bookings } = get();
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status, updatedAt: new Date() }
        : booking
    );

    set({
      bookings: updatedBookings,
      isLoading: false,
    });
  },

  cancelBooking: async (bookingId: string) => {
    const { updateBookingStatus } = get();
    await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
  },

  setSelectedBooking: (booking: Booking | null) => {
    set({ selectedBooking: booking });
  },
}));
