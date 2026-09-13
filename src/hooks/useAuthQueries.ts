import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { baseAPI } from '@/utils/api';
import { UserSchema, User, LoginInput } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect } from 'react';

export const useUserQuery = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await baseAPI.get('/user');
      return UserSchema.parse(res.data.data);
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // Sync data dari TanStack Query ke Zustand Store
  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    } else if (query.isError) {
      setUser(null);
    }
  }, [query.data, query.isError, setUser]);

  return query;
};

// Login Mutation
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginInput) => {
      await baseAPI.get('/sanctum/csrf-cookie', {
        baseURL: import.meta.env.VITE_API_URL
      });
      const res = await baseAPI.post('/api/login', credentials);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate query agar React Query fetch ulang data user terbaru
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });
};

// Logout Mutation
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const logoutClient = useAuthStore((state) => state.logoutClient);

  return useMutation({
    mutationFn: async () => {
      await baseAPI.post('/api/logout');
    },
    onSuccess: () => {
      logoutClient();
      queryClient.clear(); // Bersihkan seluruh cache TanStack Query saat logout
    },
  });
};