import React, { createContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import Spinner from '../Components/Spinner/Loading';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await api.get('/auth');
            return data;
        },
        enabled: !!token,
        retry: 1,
        refetchOnWindowFocus: true,
        refetchInterval: 30000, 
    });

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
    };
    
    const register = (userData) => {
        return api.post('/auth/register', userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        queryClient.removeQueries({ queryKey: ['authUser'] });
    };

    const refreshUser = () => {
        return queryClient.invalidateQueries({ queryKey: ['authUser'] });
    };
    
    if (isError && token) {
        logout();
    }

    if (isLoading && token) {
        return <Spinner />;
    }

    const authInfo = {
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        refreshUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};