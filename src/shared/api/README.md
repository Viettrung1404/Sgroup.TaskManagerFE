# 🏭 API Factory Pattern

Cấu trúc **Factory Pattern** để quản lý API calls một cách chuyên nghiệp và dễ bảo trì.

## 📁 Cấu trúc thư mục

```
src/shared/api/
├── api-config.ts          # ⚙️  Cấu hình Axios instance + Interceptors
├── api-endpoint.ts        # 🔗 Tập trung tất cả các endpoint
├── api-factory.ts         # 🏭 Factory tạo các API methods (GET, POST, PUT, DELETE...)
├── index.ts               # 📦 Export tất cả
└── services/              # 🔧 Các service sử dụng factory
    ├── authService.ts
    ├── workspaceService.ts
    └── ...
```

---

## 🎯 Giải thích từng file

### 1️⃣ **api-config.ts** - Cấu hình Axios

```typescript
// Tạo axios instance với:
// - Base URL từ environment variable
// - Timeout
// - Headers mặc định
// - Request/Response Interceptors (thêm token, xử lý error...)
```

**Chức năng:**

- ✅ Tự động thêm Bearer Token vào header
- ✅ Log request/response để debug
- ✅ Xử lý lỗi 401 → redirect về login
- ✅ Xử lý lỗi 403, 500

---

### 2️⃣ **api-endpoint.ts** - Định nghĩa Endpoints

```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USERS: {
    BY_ID: (id: string) => `/users/${id}`, // Dynamic endpoint
  },
};
```

**Lợi ích:**

- ✅ Tập trung tất cả URL tại 1 chỗ
- ✅ Dễ thay đổi khi API thay đổi
- ✅ Tránh hardcode URL khắp nơi
- ✅ Type-safe với TypeScript

---

### 3️⃣ **api-factory.ts** - Factory tạo API methods

```typescript
class ApiFactory {
  get(url, params) { ... }
  post(url, data) { ... }
  put(url, data) { ... }
  delete(url) { ... }
  uploadFile(url, file) { ... }
  downloadFile(url, filename) { ... }
}
```

**Lợi ích:**

- ✅ Tái sử dụng code
- ✅ Consistent error handling
- ✅ Hỗ trợ upload/download file
- ✅ Type-safe responses

---

### 4️⃣ **services/** - Các service sử dụng factory

```typescript
// authService.ts
export const authService = {
  login: (email, password) => {
    return apiFactory.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  },
};
```

---

## 🚀 Cách sử dụng

### **Bước 1: Import service**

```typescript
import { authService } from "@/shared/api/services/authService";
```

### **Bước 2: Gọi API trong component**

```typescript
// Component hoặc React Hook
const handleLogin = async () => {
  try {
    const response = await authService.login(email, password);
    console.log("✅ Login success:", response);

    // Lưu token
    localStorage.setItem("authToken", response.data.token);
  } catch (error: any) {
    console.error("❌ Login failed:", error.response?.data?.message);
  }
};
```

### **Bước 3: Sử dụng trong React Query (recommended)**

```typescript
import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/shared/api/services/authService";

// Query
const { data, isLoading } = useQuery({
  queryKey: ["user", "me"],
  queryFn: authService.getMe,
});

// Mutation
const loginMutation = useMutation({
  mutationFn: (credentials: LoginRequest) => authService.login(credentials),
  onSuccess: (data) => {
    console.log("Login success:", data);
  },
  onError: (error) => {
    console.error("Login failed:", error);
  },
});

// Sử dụng
loginMutation.mutate({ email, password });
```

---

## 📝 Ví dụ đầy đủ

### **Tạo service mới**

```typescript
// userService.ts
import { apiFactory, API_ENDPOINTS, ApiResponse } from "../index";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const userService = {
  // GET /users/:id
  getById: (id: string): Promise<ApiResponse<User>> => {
    return apiFactory.get(API_ENDPOINTS.USERS.BY_ID(id));
  },

  // PUT /users/profile
  updateProfile: (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiFactory.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
  },

  // POST /users/avatar (upload file)
  uploadAvatar: (file: File): Promise<ApiResponse<any>> => {
    return apiFactory.uploadFile(
      API_ENDPOINTS.USERS.UPLOAD_AVATAR,
      file,
      "avatar"
    );
  },
};
```

### **Sử dụng trong component**

```tsx
import { useState } from "react";
import { userService } from "@/shared/api/services/userService";

export const ProfilePage = () => {
  const [loading, setLoading] = useState(false);

  const handleUploadAvatar = async (file: File) => {
    setLoading(true);
    try {
      const response = await userService.uploadAvatar(file);
      console.log("✅ Upload success:", response);
    } catch (error) {
      console.error("❌ Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUploadAvatar(file);
        }}
      />
    </div>
  );
};
```

---

## ✨ Best Practices

### ✅ DO's

```typescript
// ✅ Sử dụng service
const data = await authService.login(email, password);

// ✅ Sử dụng API_ENDPOINTS
const data = await apiFactory.get(API_ENDPOINTS.USERS.BY_ID(userId));

// ✅ Type-safe
const response: ApiResponse<User> = await userService.getById("123");
```

### ❌ DON'Ts

```typescript
// ❌ Hardcode URL
const data = await apiFactory.get("/users/123");

// ❌ Gọi axios trực tiếp
import axios from "axios";
const data = await axios.get("http://localhost:3000/api/users/123");

// ❌ Không xử lý error
const data = await authService.login(email, password); // No try-catch
```

---

## 🎓 Tại sao dùng Factory Pattern?

### ❌ Không dùng Pattern (Bad)

```typescript
// Component 1
const response = await axios.get("http://localhost:3000/api/users/123", {
  headers: { Authorization: `Bearer ${token}` },
});

// Component 2
const response = await axios.get("http://localhost:3000/api/users/456", {
  headers: { Authorization: `Bearer ${token}` },
});

// Component 3
const response = await axios.get("http://localhost:3000/api/users/789", {
  headers: { Authorization: `Bearer ${token}` },
});

// ❌ Vấn đề:
// - Code lặp lại
// - Khó bảo trì khi URL thay đổi
// - Khó thêm logic chung (token, error handling...)
```

### ✅ Dùng Pattern (Good)

```typescript
// Component 1
const response = await userService.getById("123");

// Component 2
const response = await userService.getById("456");

// Component 3
const response = await userService.getById("789");

// ✅ Lợi ích:
// - Code clean, ngắn gọn
// - Thay đổi 1 chỗ → áp dụng toàn bộ
// - Tự động có token, error handling
```

---

## 🔧 Mở rộng

### Thêm endpoint mới

```typescript
// api-endpoint.ts
export const API_ENDPOINTS = {
  // ... existing endpoints

  TASKS: {
    BASE: "/tasks",
    BY_ID: (id: string) => `/tasks/${id}`,
  },
};
```

### Tạo service mới

```typescript
// taskService.ts
export const taskService = {
  getAll: () => apiFactory.get(API_ENDPOINTS.TASKS.BASE),
  getById: (id: string) => apiFactory.get(API_ENDPOINTS.TASKS.BY_ID(id)),
  create: (data: any) => apiFactory.post(API_ENDPOINTS.TASKS.BASE, data),
  update: (id: string, data: any) =>
    apiFactory.put(API_ENDPOINTS.TASKS.BY_ID(id), data),
  delete: (id: string) => apiFactory.delete(API_ENDPOINTS.TASKS.BY_ID(id)),
};
```

---

## 📚 Tài liệu thêm

- [Axios Documentation](https://axios-http.com/)
- [Factory Pattern](https://refactoring.guru/design-patterns/factory-method)
- [React Query](https://tanstack.com/query/latest)

---

**Được tạo bởi GitHub Copilot** 🤖
