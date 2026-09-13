// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logoutClient: () => void;
  // RBAC Helpers
  hasRole: (roles: string | string[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logoutClient: () => set({ user: null }),

  hasRole: (roles) => {
    const user = get().user;
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.some((role) => user.roles.includes(role));
    }
    return user.roles.includes(roles);
  },

  hasPermission: (permission) => {
    const user = get().user;
    if (!user) return false;
    return user.permissions.includes(permission);
  },
}));