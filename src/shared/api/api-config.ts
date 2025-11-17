import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError } from 'axios';
import { tokenStorage } from '@/shared/utils/tokenStorage';

interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
  success?: boolean;
}

const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const apiClient: AxiosInstance = axios.create(apiConfig);

// Refresh Token Logic với Queue Pattern
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor - Thêm token vào mỗi request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!token,
    });
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý refresh token
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
    });
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const errorData = error.response?.data as ApiErrorResponse | undefined;

    // Xử lý lỗi 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('Access Denied:', errorData);
      return Promise.reject(error);
    }

    // Xử lý lỗi 500 - Server Error
    if (error.response?.status === 500) {
      console.error('Server Error:', errorData);
      return Promise.reject(error);
    }

    // Xử lý lỗi 401 - Unauthorized (Refresh Token Logic)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip refresh token cho các endpoint auth
      if (originalRequest.url?.includes('/auth/login') || 
          originalRequest.url?.includes('/auth/refreshToken') ||
          originalRequest.url?.includes('/auth/register')) {
        tokenStorage.clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Nếu đang refresh, add request vào queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Attempting to refresh token...');
        
        // Gọi API refresh token - Refresh token sẽ được gửi tự động qua cookie
        const response = await axios.post(
          `${apiConfig.baseURL}auth/refreshToken`,
          {}, // Empty body vì refresh token ở trong cookie
          { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // Quan trọng: gửi cookies kèm theo request
          }
        );

        const { accessToken } = response.data.responseObject;

        if (!accessToken) {
          throw new Error('No access token in refresh response');
        }

        // Lưu access token mới (refresh token vẫn ở cookie)
        tokenStorage.setAccessToken(accessToken);

        console.log('Token refreshed successfully');

        // Process queue với token mới
        processQueue(null, accessToken);

        // Retry original request với token mới
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        
        // Xóa tokens và redirect về login
        processQueue(refreshError as AxiosError, null);
        tokenStorage.clearTokens();
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error('API Error:', {
      status: error.response?.status,
      message: errorData?.message || (error as Error).message,
      url: originalRequest?.url,
    });
    
    return Promise.reject(error);
  }
);

export default apiClient;
