import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import useAuth from '../CustomHooks/useAuth';
import api from '../services/api';

const Withdraw = () => {
    const [formData, setFormData] = useState({ accountType: 'Bkash', accountNumber: '', amount: '' });
    const { user } = useAuth(); // Assuming user object has a 'balance' property

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        // Check if user and user.balance are available before comparing
        if (user && parseFloat(formData.amount) > user.balance) {
            return toast.error("Withdrawal amount cannot exceed your balance.");
        }
        const toastId = toast.loading('Submitting withdrawal request...');
        try {
            const res = await api.post('/user/withdraw', formData);
            toast.success(res.data.msg, { id: toastId });
            setFormData({ accountType: 'Bkash', accountNumber: '', amount: '' });
        } catch (err) {
            // Enhanced, more specific error feedback
            const message = err.response?.data?.msg || 'Submission failed. Please try again.';
            toast.error(message, { id: toastId });
        }
    };

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-900 rounded-2xl shadow-lg shadow-purple-900/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="p-8">
                    <motion.h1 
                        className="text-4xl font-extrabold text-center text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Request Withdrawal
                    </motion.h1>

                    {/* Helpful display of user's current balance */}
                    <motion.p 
                        className="text-center text-purple-300 mb-6 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Available Balance: <span className="font-bold text-white">${user ? user.balance.toFixed(2) : '0.00'}</span>
                    </motion.p>
                    
                    <motion.form 
                        onSubmit={onSubmit} 
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Account Type</label>
                            <select 
                                name="accountType" 
                                value={formData.accountType} 
                                onChange={onChange} 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            >
                                <option>Bkash</option>
                                <option>Nagad</option>
                                <option>Rocket</option>
                                <option>Other</option>
                            </select>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Account Number</label>
                            <input 
                                type="text" 
                                name="accountNumber" 
                                value={formData.accountNumber} 
                                onChange={onChange} 
                                required 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="e.g., 01700000000"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Amount (USD)</label>
                            <input 
                                type="number" 
                                name="amount" 
                                value={formData.amount} 
                                onChange={onChange} 
                                required 
                                min="1" 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="Enter amount to withdraw"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            {/* --- BUTTON COLOR CHANGED HERE --- */}
                            <motion.button 
                                type="submit" 
                                className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md transition-all duration-300"
                                whileHover={{ 
                                    scale: 1.03,
                                    backgroundColor: "#7c3aed", // Lighter purple for hover
                                    boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" // Purple shadow
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Submit Withdrawal Request
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Withdraw;