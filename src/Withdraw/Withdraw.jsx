import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import useAuth from '../CustomHooks/useAuth';
import api from '../services/api';


const Withdraw = () => {
    const [formData, setFormData] = useState({ accountType: 'Bkash', accountNumber: '', amount: '' });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if (!user) return toast.error("User data not loaded yet.");
        if (parseFloat(formData.amount) > user.balance) return toast.error("Withdrawal amount cannot exceed your balance.");
        setLoading(true);
        const withdrawPromise = api.post('/user/withdraw', formData);
        await toast.promise(withdrawPromise, {
            pending: 'Submitting withdrawal request...',
            success: { render({ data }) { setFormData({ accountType: 'Bkash', accountNumber: '', amount: '' }); return data.data.msg; } },
            error: { render({ data }) { return data.response?.data?.msg || 'Submission failed.'; } }
        });
        setLoading(false);
    };
    if (!user) return <p>Loading...</p>;
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-900 rounded-2xl shadow-lg" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <div className="p-8">
                    <motion.h1 className="lg:text-4xl text-2xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Request Withdrawal</motion.h1>
                    <motion.p className="text-center text-purple-300 mb-6 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Available Balance: <span className="font-bold text-white">${user.balance.toFixed(2)}</span></motion.p>
                    <motion.form onSubmit={onSubmit} className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants}><label className="block mb-2 text-sm font-medium text-purple-300">Account Type</label><select name="accountType" value={formData.accountType} onChange={onChange} className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"><option>Bkash</option><option>Nagad</option><option>Rocket</option><option>Other</option></select></motion.div>
                        <motion.div variants={itemVariants}><label className="block mb-2 text-sm font-medium text-purple-300">Account Number</label><input type="text" name="accountNumber" value={formData.accountNumber} onChange={onChange} required className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g., 01700000000" /></motion.div>
                        <motion.div variants={itemVariants}><label className="block mb-2 text-sm font-medium text-purple-300">Amount (USD)</label><input type="number" name="amount" value={formData.amount} onChange={onChange} required min="1" className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter amount to withdraw" /></motion.div>
                        <motion.div variants={itemVariants}><motion.button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md disabled:bg-purple-800 flex items-center justify-center" whileHover={{ scale: loading ? 1 : 1.03 }} whileTap={{ scale: loading ? 1 : 0.98 }}>{loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Submit Withdrawal Request'}</motion.button></motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};
export default Withdraw;