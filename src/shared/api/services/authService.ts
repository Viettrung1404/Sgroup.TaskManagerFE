/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFactory, API_ENDPOINTS } from '../index';
import type { ServiceResponse } from '@/shared/model/service-response';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  tokenType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ✅ FIX: authService return ServiceResponse trực tiếp (không có ApiResponse wrapper)
export type LoginResponse = ServiceResponse<TokenData>;

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  // ✅ FIX: Return type là ServiceResponse<TokenData>
  login: async (credentials: LoginRequest): Promise<ServiceResponse<TokenData>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (data: RegisterRequest): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  logout: async (): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
  },

  forgotPassword: async (email: string): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (accessToken: string, newPassword: string): Promise<ServiceResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { accessToken, newPassword });
  },
};