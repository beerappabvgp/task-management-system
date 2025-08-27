import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { authAPI } from '../services/api';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_PROFILE'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'UPDATE_PROFILE':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          dispatch({ type: 'AUTH_START' });
          const response = await authAPI.getProfile();
          if (response.success) {
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user: response.data, token },
            });
          } else {
            // Invalid token, clear it
            localStorage.removeItem('authToken');
            dispatch({ type: 'AUTH_FAILURE', payload: 'Invalid token' });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('authToken');
          dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication failed' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []); // Empty dependency array - only run once on mount

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token },
        });
        
        return { success: true };
      } else {
        // Handle error response
        const errorMessage = response.message || 'Login failed';
        dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
        return { success: false, message: errorMessage };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData: { name: string; email: string; password: string; role: string }) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authAPI.register(userData);
      
      if (response.success) {
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token },
        });
        
        return { success: true };
      } else {
        // Handle error response
        const errorMessage = response.message || 'Registration failed';
        dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
        return { success: false, message: errorMessage };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (userData: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(userData);
      if (response.success) {
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
        // Update local storage
        const updatedUser = { ...state.user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error: any) {
      console.error('Profile update failed:', error);
      throw error;
    }
  }, [state.user]);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
