import { create } from 'zustand';
import { users } from '../mockData';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // This is a mock authentication
    // In a real app, you would have a proper authentication system
    // For now, we'll just check if the email exists in our users array
    // and assume the password is correct (for demo purposes)
    
    const user = users.find(u => u.email === email);
    
    if (user) {
      set({ user, isAuthenticated: true });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));