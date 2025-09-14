import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [programData, setProgramData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

      

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const res = await api.get('/auth');
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);


       // ২️⃣ Packages / Collections fetch
    useEffect(() => {
        const loadProgrames = async () => {
            if (token) {
                try {
                    const res = await api.get('/admin/programs', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setProgramData(res.data); 
                } catch (err) {
                    console.error("Failed to load packages:", err);
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
        };
        loadProgrames();
    }, [token]);

    
    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const register = (userData) => api.post('/auth/register', userData);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };
    
    const refreshUser = async () => {
        if (token) {
            try {
                const res = await api.get('/auth');
                setUser(res.data);
            } catch (error) {
                console.error("Failed to refresh user data", error);
            }
        }
    }

    if (loading) return "Loading";

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser,programData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;