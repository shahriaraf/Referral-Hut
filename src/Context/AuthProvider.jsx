// AuthProvider.jsx
import { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // <-- useQuery ইম্পোর্ট করুন
import api from '../services/api';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // --- মূল পরিবর্তন: useEffect এর পরিবর্তে useQuery ---
    const { data: user, isLoading, refetch } = useQuery({
        queryKey: ['authUser'], // <-- এই ডেটার জন্য একটি ইউনিক কী
        queryFn: async () => {
            const { data } = await api.get('/auth');
            return data;
        },
        enabled: !!token, // শুধুমাত্র টোকেন থাকলেই এই কোয়েরিটি চলবে
        retry: 1, // একবার ফেইল করলে আবার চেষ্টা করবে
        staleTime: 1000 * 60 * 5, // ৫ মিনিটের জন্য ডেটা ফ্রেশ থাকবে
    });

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        // React Query ক্যাশ পরিষ্কার করার জন্য
        queryClient.removeQueries(['authUser']);
    };

    if (isLoading && token) {
        return <p>Loading...</p>; // অথবা একটি স্পিনার কম্পোনেন্ট ব্যবহার করুন
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setUser: refetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;