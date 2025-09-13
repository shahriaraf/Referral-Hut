import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaGooglePlay } from 'react-icons/fa'; // Import Google Play icon
import api from '../services/api';

const Deposit = () => {
    const [formData, setFormData] = useState({ address: '', transactionId: '', amount: '' });
    const [isCopied, setIsCopied] = useState(false);

    const depositAddress = '0x9d420c3CB8Fa1B51267E8F2e4cEDdF62c95c66a6';
    const trustWalletLink = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCopy = () => {
        navigator.clipboard.writeText(depositAddress).then(() => {
            toast.success('Address copied to clipboard!');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(() => {
            toast.error('Failed to copy address.');
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        const toastId = toast.loading('Submitting deposit request...');
        try {
            const res = await api.post('/user/deposit', formData);
            toast.success(res.data.msg, { id: toastId });
            setFormData({ address: '', transactionId: '', amount: '' });
        } catch (err) {
             const message = err.response?.data?.msg || 'Submission failed. Please try again.';
             toast.error(message, { id: toastId });
        }
    };
    
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
                        className="text-4xl font-extrabold text-center text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Deposit Funds
                    </motion.h1>

                    <motion.div 
                        className="mb-8 p-6 bg-slate-900/70 border border-purple-800 rounded-lg text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p variants={itemVariants} className="text-purple-200 mb-4 text-sm md:text-base">
                            First, send your deposit to the address below. We recommend using Trust Wallet.
                        </motion.p>
                        
                        {/* --- NEW TRUST WALLET BUTTON --- */}
                        <motion.div variants={itemVariants} className="mb-4">
                            <a
                                href={trustWalletLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 font-semibold text-white bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-600/80 transition-all duration-300"
                            >
                                <FaGooglePlay className="text-xl text-green-400" />
                                Get Trust Wallet on Google Play
                            </a>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="relative flex items-center bg-slate-800 border border-purple-700 rounded-md">
                            <p className="flex-grow p-3 font-mono text-sm text-gray-200 truncate">
                                {depositAddress}
                            </p>
                            <button
                                type="button"
                                onClick={handleCopy}
                                disabled={isCopied}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                                    isCopied 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                                }`}
                            >
                                {isCopied ? <FaCheck /> : <FaCopy />}
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </motion.div>
                    </motion.div>
                    
                    <motion.form 
                        onSubmit={onSubmit} 
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <label className="block mb-2 text-sm font-medium text-purple-300">Your Wallet Address</label>
                            <input 
                                type="text" 
                                name="address" 
                                value={formData.address} 
                                onChange={onChange} 
                                required 
                                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                placeholder="Enter the wallet address you sent from"
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
                                    backgroundColor: "#7c3aed",
                                    boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)"
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