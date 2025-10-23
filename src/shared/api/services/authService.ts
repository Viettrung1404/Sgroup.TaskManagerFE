import { apiFactory, API_ENDPOINTS, type ApiResponse } from '../index';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  logout: async (): Promise<ApiResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getMe: async (): Promise<ApiResponse<any>> => {
    return apiFactory.get(API_ENDPOINTS.AUTH.ME);
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
  },

  forgotPassword: async (email: string): Promise<ApiResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<any>> => {
    return apiFactory.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },
};
