import { useCallback, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useAuthStore } from "./store";
import { GET_ME, GOOGLE_AUTH, REFRESH_TOKEN, LOGOUT } from "./queries";
import toast from "react-hot-toast";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    setUser,
    setTokens,
    setLoading,
    logout: logoutStore,
    initialize,
  } = useAuthStore();

  const [getMe, { loading: getMeLoading }] = useLazyQuery(GET_ME, {
    onCompleted: (data) => {
      if (data.me) {
        setUser(data.me);
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error("Get me error:", error);
      setLoading(false);

      // If token is invalid, clear auth state
      if (error.networkError && "statusCode" in error.networkError) {
        if (error.networkError.statusCode === 401) {
          logoutStore();
        }
      }
    },
  });

  const [googleAuthMutation, { loading: googleAuthLoading }] = useMutation(
    GOOGLE_AUTH,
    {
      onCompleted: (data) => {
        const { user, accessToken, refreshToken } = data.googleAuth;
        setTokens(accessToken, refreshToken);
        setUser(user);
        toast.success(`Welcome back, ${user.firstName}!`);
      },
      onError: (error) => {
        console.error("Google auth error:", error);
        toast.error("Authentication failed. Please try again.");
      },
    }
  );

  const [refreshTokenMutation, { loading: refreshTokenLoading }] =
    useMutation(REFRESH_TOKEN);

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => {
      logoutStore();
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Force logout even if mutation fails
      logoutStore();
    },
  });

  // Initialize auth state on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Check if user is authenticated when tokens are available
  useEffect(() => {
    if (accessToken && !user && !getMeLoading) {
      getMe();
    } else if (!accessToken) {
      setLoading(false);
    }
  }, [accessToken, user, getMe, getMeLoading, setLoading]);

  const login = useCallback(
    async (googleIdToken: string) => {
      try {
        await googleAuthMutation({
          variables: {
            input: {
              googleIdToken,
            },
          },
        });
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [googleAuthMutation]
  );

  const tryRefreshToken = useCallback(async () => {
    if (!refreshToken) {
      return false;
    }

    try {
      const result = await refreshTokenMutation({
        variables: {
          token: refreshToken,
        },
      });

      if (result.data?.refreshToken) {
        const {
          user,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = result.data.refreshToken;
        setTokens(newAccessToken, newRefreshToken);
        setUser(user);
        return true;
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      logoutStore();
    }

    return false;
  }, [refreshToken, refreshTokenMutation, setTokens, setUser, logoutStore]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout mutation error:", error);
      // Force logout even if mutation fails
      logoutStore();
    }
  }, [logoutMutation, logoutStore]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading:
      isLoading || getMeLoading || googleAuthLoading || refreshTokenLoading,

    // Actions
    login,
    logout,
    tryRefreshToken,
  };
};
