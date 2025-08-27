import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    const response = await api.post('/auth/login', { email, password });
    // Backend returns data directly, not wrapped in 'data' property
    return {
      success: true,
      data: {
        token: response.data.token,
        user: response.data.user
      },
      message: response.data.message
    };
  },

  register: async (userData: { name: string; email: string; password: string; role: string }): Promise<ApiResponse<{ token: string; user: any }>> => {
    const response = await api.post('/auth/register', userData);
    // Backend returns data directly, not wrapped in 'data' property
    return {
      success: true,
      data: {
        token: response.data.token,
        user: response.data.user
      },
      message: response.data.message
    };
  },

  getProfile: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/auth/profile');
    return {
      success: true,
      data: response.data.user,
      message: 'Profile retrieved successfully'
    };
  },

  updateProfile: async (userData: Partial<any>): Promise<ApiResponse<any>> => {
    const response = await api.put('/auth/profile', userData);
    return {
      success: true,
      data: response.data.user,
      message: 'Profile updated successfully'
    };
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; search?: string }): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (projectData: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  update: async (id: string, projectData: any): Promise<ApiResponse<any>> => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; priority?: string; assignee?: string; search?: string }): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (taskData: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  update: async (id: string, taskData: any): Promise<ApiResponse<any>> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  markComplete: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.patch(`/tasks/${id}/complete`);
    return response.data;
  },
};

// Teams API
export const teamsAPI = {
  getAll: async (params?: { page?: number; limit?: number; project?: string; search?: string }): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/teams', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  },

  create: async (teamData: any): Promise<ApiResponse<any>> => {
    const response = await api.post('/teams', teamData);
    return response.data;
  },

  update: async (id: string, teamData: any): Promise<ApiResponse<any>> => {
    const response = await api.put(`/teams/${id}`, teamData);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  },

  addMember: async (teamId: string, memberData: any): Promise<ApiResponse<any>> => {
    const response = await api.post(`/teams/${teamId}/members`, memberData);
    return response.data;
  },

  removeMember: async (teamId: string, memberId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/teams/${teamId}/members/${memberId}`);
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getRecentActivity: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/dashboard/recent-activity');
    return response.data;
  },

  getQuickActions: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get('/dashboard/quick-actions');
    return response.data;
  },
};

export default api;
