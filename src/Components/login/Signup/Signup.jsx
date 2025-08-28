// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', referralId: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/referral-creat-user', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/userDashboard');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    return (
        <div className="min-h-screen py-5 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 flex items-center justify-center px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-600/20 blur-3xl transform -translate-y-12"></div>
                
                <motion.div
                    variants={itemVariants}
                    className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Join Our Platform</h1>
                        <p className="text-gray-300">Create your account to get started</p>
                    </motion.div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Name Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your full name"
                                    onChange={onChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200"
                                />
                            </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    onChange={onChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Create a secure password"
                                    onChange={onChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200"
                                />
                            </div>
                        </motion.div>

                        {/* Referral ID Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="referralId">
                                Referral Code <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="referralId"
                                    id="referralId"
                                    placeholder="Enter referral code if you have one"
                                    onChange={onChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200"
                                />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 px-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                            >
                                <span className="flex items-center justify-center">
                                    Create Account
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Footer */}
                    <motion.div variants={itemVariants} className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-300">Already have an account?</span>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <Link 
                                to="/login" 
                                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
                            >
                                Sign in instead →
                            </Link>
                        </div>
                    </motion.div>

                    {/* Terms Notice */}
                    <motion.div variants={itemVariants} className="mt-6">
                        <p className="text-xs text-gray-400 text-center">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="text-purple-400 hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                ></motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="absolute bottom-10 right-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
                ></motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="absolute top-1/2 right-5 w-12 h-12 bg-purple-400/10 rounded-full blur-lg"
                ></motion.div>
            </motion.div>
        </div>
    );
};

export default Signup;