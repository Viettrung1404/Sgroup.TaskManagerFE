import type { User } from '@/shared/types';

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
} as const;

export const tokenStorage = {
  // Access Token
  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
  },

  // User
  getUser: (): User | null => {
    const userJson = localStorage.getItem(TOKEN_KEYS.USER);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
  },

  // Clear all
  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
  },

  // Check if tokens exist
  hasTokens: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },
};

