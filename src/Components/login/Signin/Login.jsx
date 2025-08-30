import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../../CustomHooks/useAuth'; // Adjusted path

// A simple component for the animated background shapes
const AnimatedBlob = ({ className, animationProps }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-soft-light filter blur-2xl opacity-70 ${className}`}
        animate={animationProps}
    />
);

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/'); // Navigate to dashboard or home on successful login
        } catch (err) { 
            // Error is handled by a global interceptor, but you could add a toast here if you wish
            console.error("Login failed:", err);
        }
    };

    // Animation variants for the form elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <AnimatedBlob 
                className="w-72 h-72 bg-purple-500 top-1/4 left-1/4"
                animationProps={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />
            <AnimatedBlob 
                className="w-64 h-64 bg-indigo-500 bottom-1/4 right-1/4"
                animationProps={{ x: [0, -80, 0], y: [0, 40, 0], rotate: [0, -90, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            />

            <motion.div
                className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg border border-purple-900 rounded-2xl shadow-lg shadow-purple-900/20 z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="p-8 space-y-6">
                    <motion.h1 
                        className="text-4xl font-extrabold text-center text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Welcome Back
                    </motion.h1>
                    <motion.form 
                        onSubmit={onSubmit} 
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={onChange} required 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="you@example.com"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={onChange} required 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="••••••••"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <motion.button 
                                type="submit" 
                                className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md transition-all duration-300"
                                whileHover={{ scale: 1.03, backgroundColor: "#7c3aed", boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Login
                            </motion.button>
                        </motion.div>
                    </motion.form>
                    <motion.p 
                        className="text-sm text-center text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                            Register here
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;