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

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
  joinedAt: string;
}

export interface Board {
  id: string;
  title: string;
  description: string | null;
  visibility: 'private' | 'public';
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  title: string;
  description: string | null;
  visibility: 'private' | 'public';
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  myRole: Role;
  boards: Board[];
  members: WorkspaceMember[];
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