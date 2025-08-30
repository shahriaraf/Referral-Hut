import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../services/api';

const Deposit = () => {
    const [formData, setFormData] = useState({ address: '', transactionId: '', amount: '' });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const toastId = toast.loading('Submitting deposit request...');
        try {
            // NOTE: Original functionality is unchanged
            const res = await api.post('/user/deposit', formData);
            toast.success(res.data.msg, { id: toastId });
            setFormData({ address: '', transactionId: '', amount: '' }); // Clear form
        } catch (err) {
             // A more user-friendly error message
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
        // Main container to center the form on the page
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-900 rounded-2xl shadow-lg shadow-purple-900/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="p-8">
                    <motion.h1 
                        className="text-4xl font-extrabold text-center text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Deposit Funds
                    </motion.h1>
                    <motion.form 
                        onSubmit={onSubmit} 
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Wallet Address</label>
                            <input 
                                type="text" 
                                name="address" 
                                value={formData.address} 
                                onChange={onChange} 
                                required 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="Enter your wallet address"
                            />
                        </motion.div>
                         <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Transaction ID (TxID)</label>
                            <input 
                                type="text" 
                                name="transactionId" 
                                value={formData.transactionId} 
                                onChange={onChange} 
                                required 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="Enter the transaction hash"
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
                                placeholder="e.g., 100"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <motion.button 
                                type="submit" 
                                className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md transition-all duration-300"
                                whileHover={{ 
                                    scale: 1.03,
                                    backgroundColor: "#7c3aed", // a slightly lighter purple
                                    boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" // hover:shadow-purple-500/40
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Submit Deposit Request
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Deposit;