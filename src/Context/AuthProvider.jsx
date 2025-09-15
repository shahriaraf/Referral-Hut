import React, { createContext, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api'; // আপনার api.js ফাইলের সঠিক পাথ দিন


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await api.get('/auth');
            return data;
        },
        enabled: !!token,
        retry: 1,
    });

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
    };

    // --- মূল ফিক্স: register ফাংশনটি এখানে ডিফাইন করা হচ্ছে ---
    const register = (userData) => {
        // register ফাংশনটি api.post কল করে এবং সেই promise-টি রিটার্ন করে
        return api.post('/auth/register', userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        queryClient.removeQueries({ queryKey: ['authUser'] });
    };
    
    // AuthProvider লোড হওয়ার সময় একটি স্পিনার দেখানো হচ্ছে
    if (isLoading && token) {
        return <p>Loading...</p>;
    }

    // --- মূল ফিক্স: value-এর ভেতরে register ফাংশনটি যোগ করা হয়েছে ---
    const authInfo = {
        user,
        token,
        login,
        register, // <-- এখানে যোগ করা হয়েছে
        logout
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;