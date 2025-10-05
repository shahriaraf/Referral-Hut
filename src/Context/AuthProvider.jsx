// src/Context/AuthProvider.js

import React, { createContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import Spinner from '../Components/Spinner/Loading';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery({
        // The queryKey uniquely identifies this data
        queryKey: ['authUser'],
        // The queryFn is the async function that fetches the data
        queryFn: async () => {
            const { data } = await api.get('/auth');
            return data;
        },
        // Only run this query if a token exists
        enabled: !!token,
        // If it fails once (e.g., network blip), don't retry immediately
        retry: 1,
        // Keep user data considered "fresh" for 5 minutes to avoid unnecessary refetches
        staleTime: 1000 * 60 * 5, 
    });

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        // Invalidate the query to force a fresh fetch of user data with the new token
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
    };
    
    const register = (userData) => {
        return api.post('/auth/register', userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        // Completely remove the user data from the cache on logout
        queryClient.removeQueries({ queryKey: ['authUser'] });
    };

    // --- THE NEW REFRESH FUNCTION ---
    // This function can be called from any component to trigger a refetch of the user data.
    // It works by telling React Query that the 'authUser' data is now stale.
    const refreshUser = () => {
        return queryClient.invalidateQueries({ queryKey: ['authUser'] });
    };
    
    // A robust check: if fetching the user fails and we think we have a token,
    // it means the token is invalid/expired. Log the user out.
    if (isError && token) {
        logout();
    }

    // Show a loading spinner for the whole app while the initial user data is being fetched.
    if (isLoading && token) {
        return <Spinner />;
    }

    // This is the value that will be provided to all consuming components.
    const authInfo = {
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        refreshUser // <-- Export the new function
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};