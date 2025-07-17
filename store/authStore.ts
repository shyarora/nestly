import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: Omit<User, "id" | "joinedAt" | "isVerified">
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });

    // Mock login - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email (in real app, this would be handled by backend)
    const mockUser: User = {
      id: "1",
      email,
      firstName: "John",
      lastName: "Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Travel enthusiast",
      isHost: true,
      isVerified: true,
      joinedAt: new Date(),
      location: "San Francisco, CA",
    };

    set({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  register: async (userData) => {
    set({ isLoading: true });

    // Mock registration - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      isVerified: false,
      joinedAt: new Date(),
    };

    set({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  updateProfile: async (userData) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true });

    // Mock update - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...userData };
    set({
      user: updatedUser,
      isLoading: false,
    });
  },
}));
