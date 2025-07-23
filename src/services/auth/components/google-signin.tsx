"use client";

import { useCallback, useEffect } from "react";
import { useAuth } from "../hooks";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              type?: "standard" | "icon";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              width?: string;
              logo_alignment?: "left" | "center";
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleSignInProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  buttonText?: "signin_with" | "signup_with" | "continue_with" | "signin";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
}

export const GoogleSignIn: React.FC<GoogleSignInProps> = ({
  onSuccess,
  onError,
  buttonText = "continue_with",
  theme = "outline",
  size = "large",
}) => {
  const { login, isLoading } = useAuth();

  const handleGoogleResponse = useCallback(
    async (response: { credential: string }) => {
      try {
        await login(response.credential);
        onSuccess?.();
      } catch (error) {
        console.error("Google Sign-In error:", error);
        onError?.(error);
      }
    },
    [login, onSuccess, onError]
  );

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        const buttonElement = document.getElementById("google-signin-button");
        if (buttonElement) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme,
            size,
            type: "standard",
            text: buttonText,
            width: "320",
            logo_alignment: "left",
          });
        }
      }
    };

    // Load Google Sign-In script
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeGoogleSignIn();
    }
  }, [handleGoogleResponse, theme, size, buttonText]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-80 h-12 bg-gray-100 rounded-lg animate-pulse">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div id="google-signin-button" className="w-full max-w-sm" />
    </div>
  );
};
