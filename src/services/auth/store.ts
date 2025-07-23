import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  phone?: string | null;
  isPhoneVerified: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  initialize: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        isAuthenticated: false,
        isLoading: true,
        accessToken: null,
        refreshToken: null,

        // Actions
        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: !!user,
            },
            false,
            "setUser"
          ),

        setTokens: (accessToken, refreshToken) => {
          // Store tokens in cookies for SSR support
          Cookies.set("accessToken", accessToken, {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          Cookies.set("refreshToken", refreshToken, {
            expires: 30, // 30 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          set(
            {
              accessToken,
              refreshToken,
            },
            false,
            "setTokens"
          );
        },

        setLoading: (loading) =>
          set(
            {
              isLoading: loading,
            },
            false,
            "setLoading"
          ),

        logout: () => {
          // Clear cookies
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          set(
            {
              user: null,
              isAuthenticated: false,
              accessToken: null,
              refreshToken: null,
            },
            false,
            "logout"
          );
        },

        initialize: () => {
          // Initialize tokens from cookies
          const accessToken = Cookies.get("accessToken");
          const refreshToken = Cookies.get("refreshToken");

          set(
            {
              accessToken,
              refreshToken,
              isLoading: false,
            },
            false,
            "initialize"
          );
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);
