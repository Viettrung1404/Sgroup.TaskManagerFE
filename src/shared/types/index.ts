export interface User {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
//   isActive: boolean;
//   googleId: string | null;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
}

// DTO for login/register responses
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// DTO for login request
export interface LoginRequest {
  email: string;
  password: string;
}

// DTO for register request
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// DTO for update user profile
export interface UpdateUserRequest {
  name?: string;
  bio?: string;
  avatarUrl?: string;
}