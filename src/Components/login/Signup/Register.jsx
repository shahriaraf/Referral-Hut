import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../../CustomHooks/useAuth';
// --- 1. Import useQuery and api ---
import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

const AnimatedBlob = ({ className, animationProps }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-soft-light filter blur-2xl opacity-70 ${className}`}
        animate={animationProps.animate}
        transition={animationProps.transition}
    />
);

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '', referralId: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // For reading URL parameters

    // --- 2. Fetch the admin's referral ID using React Query ---
    const { data: adminData, isLoading: isAdminIdLoading } = useQuery({
        queryKey: ['adminReferralId'],
        queryFn: async () => {
            const { data } = await api.get('/auth/admin-referral-id');
            return data;
        },
        staleTime: Infinity, // This ID rarely changes, so cache it indefinitely
        refetchOnWindowFocus: false,
    });

    // --- 3. Auto-fill referral ID from URL or from admin ---
    useEffect(() => {
        // Check for a referral ID in the URL (e.g., /register?ref=xyz)
        const params = new URLSearchParams(location.search);
        const refFromUrl = params.get('ref');

        if (refFromUrl) {
            // If ID is in the URL, prioritize it
            setFormData(prev => ({ ...prev, referralId: refFromUrl }));
        } else if (adminData?.referralId) {
            // Otherwise, if the admin ID has loaded, use it
            setFormData(prev => ({ ...prev, referralId: adminData.referralId }));
        }
    }, [location.search, adminData]); // Rerun if URL or fetched admin data changes

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (!formData.referralId.trim()) {
            return toast.error('Referral ID is required.');
        }
        if (formData.password !== formData.password2) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                referralId: formData.referralId
            });
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.msg || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            <AnimatedBlob
                className="w-80 h-80 bg-purple-600 top-10 -left-20"
                animationProps={{ animate: { x: [0, 50, -50, 0], y: [0, -50, 50, 0] }, transition: { duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }}
            />
            <AnimatedBlob
                className="w-72 h-72 bg-indigo-600 bottom-10 -right-20"
                animationProps={{ animate: { x: [0, -50, 50, 0], y: [0, 50, -50, 0] }, transition: { duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }}
            />
            <motion.div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg border border-purple-900 rounded-2xl shadow-lg z-10" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <div className="p-8 space-y-6">
                    <motion.h1 className="text-4xl font-extrabold text-center text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>Create an Account</motion.h1>

                    {/* --- 4. Display the Admin ID at the top of the form --- */}
                    <div className="text-center text-sm text-gray-400 -mt-2 h-5">
                        {isAdminIdLoading ? (
                            <span className="animate-pulse">Loading default referral...</span>
                        ) : (
                            adminData?.referralId && (
                                <p>
                                    Registering under Admin ID:{" "}
                                    <code className="bg-slate-700/50 text-purple-300 px-2 py-1 rounded">
                                        {adminData.referralId}
                                    </code>
                                </p>
                            )
                        )}
                    </div>
                    
                    <motion.form onSubmit={onSubmit} className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                        {/* Name Input */}
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={onChange} required className="w-full px-4 py-3 text-gray-300 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="your name" />
                        </motion.div>
                        {/* Email Input */}
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={onChange} required className="w-full px-4 py-3 text-gray-300 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="you@example.com" />
                        </motion.div>
                        {/* Password Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block mb-2 text-sm font-medium text-purple-300">Password</label>
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={onChange} required minLength="6" className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none text-gray-300 focus:ring-2 focus:ring-purple-500" placeholder="Min. 6 characters" />
                            <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </motion.div>
                        {/* Confirm Password Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block mb-2 text-sm font-medium text-purple-300">Confirm Password</label>
                            <input type={showPassword2 ? 'text' : 'password'} name="password2" value={formData.password2} onChange={onChange} required minLength="6" className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 text-gray-300 focus:ring-purple-500" placeholder="Repeat your password" />
                            <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={() => setShowPassword2(!showPassword2)}>
                                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </motion.div>
                        {/* Referral ID Input */}
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Referral ID</label>
                            <input
                                type="text"
                                name="referralId"
                                value={formData.referralId}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
                                placeholder="Enter referral code"
                            />
                        </motion.div>
                        {/* Submit Button */}
                        <motion.div variants={itemVariants} className="pt-2">
                            <motion.button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md disabled:bg-purple-800 flex items-center justify-center" whileHover={{ scale: 1.03, backgroundColor: "#7c3aed" }} whileTap={{ scale: 0.98 }}>
                                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Register'}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                    <motion.p className="text-sm text-center text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>Already have an account?{' '}<Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">Login here</Link></motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;