import { useCallback, useState } from "react";
import { authService } from "@/shared/api/services/authService";
import { tokenStorage } from "@/shared/utils/tokenStorage";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login function - CẬP NHẬT GLOBAL STATE
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ email, password });
      const { accessToken } = response.responseObject;

      // Lưu access token vào localStorage
      // Refresh token đã được backend lưu vào cookie tự động
      tokenStorage.setAccessToken(accessToken);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      tokenStorage.clearTokens();
      setIsLoading(false);
    }
  }, []);

  // Value được share cho toàn app
  return {
    isAuthenticated: !!tokenStorage.getAccessToken(),
    isLoading,
    error,
    login,
    logout,
  };

};