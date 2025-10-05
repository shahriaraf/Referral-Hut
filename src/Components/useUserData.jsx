import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import useAuth from './useAuth';

// This function fetches the user data from the backend
const fetchUser = async () => {
  const { data } = await api.get('/auth'); // Uses GET /api/auth to get logged-in user
  return data;
};

export const useUserData = () => {
  const { token } = useAuth();

  return useQuery({
    // THE KEY: This query key 'user' is what we will invalidate later
    queryKey: ['user'], 
    queryFn: fetchUser,
    // Only run this query if the user has a token (is logged in)
    enabled: !!token, 
    // Configuration to prevent issues on window refocus or network changes
    refetchOnWindowFocus: false,
    retry: 1, // Retry once on failure
  });
};