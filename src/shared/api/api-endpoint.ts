export const API_ENDPOINTS = {
  // ========== AUTH ENDPOINTS ==========
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },

  // ========== USER ENDPOINTS ==========
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    UPLOAD_AVATAR: '/users/avatar',
  },

  // ========== WORKSPACE ENDPOINTS ==========
  WORKSPACES: {
    BASE: '/workspaces',
    BY_ID: (id: string) => `/workspaces/${id}`,
    MEMBERS: (workspaceId: string) => `/workspaces/${workspaceId}/members`,
    ADD_MEMBER: (workspaceId: string) => `/workspaces/${workspaceId}/members`,
    REMOVE_MEMBER: (workspaceId: string, memberId: string) => 
      `/workspaces/${workspaceId}/members/${memberId}`,
  },

  // ========== BOARD ENDPOINTS ==========
  BOARDS: {
    BASE: '/boards',
    BY_ID: (id: string) => `/boards/${id}`,
    BY_WORKSPACE: (workspaceId: string) => `/workspaces/${workspaceId}/boards`,
    LISTS: (boardId: string) => `/boards/${boardId}/lists`,
    MEMBERS: (boardId: string) => `/boards/${boardId}/members`,
  },

  // ========== LIST ENDPOINTS ==========
  LISTS: {
    BASE: '/lists',
    BY_ID: (id: string) => `/lists/${id}`,
    CARDS: (listId: string) => `/lists/${listId}/cards`,
    REORDER: (listId: string) => `/lists/${listId}/reorder`,
  },

  // ========== CARD ENDPOINTS ==========
  CARDS: {
    BASE: '/cards',
    BY_ID: (id: string) => `/cards/${id}`,
    COMMENTS: (cardId: string) => `/cards/${cardId}/comments`,
    ATTACHMENTS: (cardId: string) => `/cards/${cardId}/attachments`,
    MEMBERS: (cardId: string) => `/cards/${cardId}/members`,
  },

  // ========== COMMENT ENDPOINTS ==========
  COMMENTS: {
    BASE: '/comments',
    BY_ID: (id: string) => `/comments/${id}`,
  },

  // ========== NOTIFICATION ENDPOINTS ==========
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
