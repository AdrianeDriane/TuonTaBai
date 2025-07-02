import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { setupInterceptors } from "../utils/axiosInstance";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Ref so interceptors always have access to the latest token
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setAccessToken(res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      console.error("Failed to refresh token", err);
      setAccessToken(null);
      throw err;
    }
  };

  // interceptors single setup
  useEffect(() => {
    setupInterceptors(
      () => tokenRef.current,   // always get the latest token
      refreshAccessToken
    );
  }, []);

  // tries to refresh token on app initialization
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        // No valid refresh token, user needs to login
        console.log(err + ": No valid refresh token found");
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // don't render children until we've tried to initialize auth
  if (!isInitialized) {
    return <div>Loading...</div>; // TODO: replace with a proper loading spinner
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};