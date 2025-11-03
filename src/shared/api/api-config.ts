import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/shared/utils/tokenStorage';

const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiClient: AxiosInstance = axios.create(apiConfig);

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
      data: config.data,
      hasToken: !!token,
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý lỗi chung và logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 - Unauthorized
    if (error.response?.status === 401) {
      // Xử lý refresh token
      
      window.location.href = '/login';
    }
    
    // Xử lý lỗi 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('Access Denied:', error.response.data);
    }
    
    // Xử lý lỗi 500 - Server Error
    if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data);
    }

    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    
    return Promise.reject(error);
  }
);

export default apiClient;
