// src/Components/Withdraw.js

import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import useAuth from "../CustomHooks/useAuth";
import api from "../services/api";

const Withdraw = () => {
  const [formData, setFormData] = useState({
    accountType: "USDT TRC20",
    accountNumber: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  // Get the user object and the new refreshUser function from our custom hook
  const { user, refreshUser } = useAuth();

  // Calculate the true available balance using useMemo for efficiency.
  // This value will only be recalculated when the `user` object changes.
  const availableForWithdrawal = useMemo(() => {
    if (!user) return 0;
    // Available = Total Balance - Sum of Pending Withdrawals
    return user.balance - (user.pendingWithdrawalsTotal || 0);
  }, [user]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User data not loaded yet.");

    const amount = parseFloat(formData.amount);
    // CRITICAL: Validate against the calculated available balance, not the total balance.
    if (amount > availableForWithdrawal) {
      return toast.error("Withdrawal amount cannot exceed your available balance.");
    }
    if (amount <= 0 || !formData.amount) {
      return toast.error("Please enter a valid positive withdrawal amount.");
    }

    setLoading(true);
    try {
      const withdrawPromise = api.post("/user/withdraw", formData);

      await toast.promise(withdrawPromise, {
        pending: "Submitting withdrawal request...",
        success: {
          render({ data }) {
            setFormData({ accountType: "USDT TRC20", accountNumber: "", amount: "" });
            // On success, call refreshUser to refetch data from the server.
            // This will update the pending total and available balance on the screen.
            if (refreshUser) {
              refreshUser();
            }
            return data.data.msg;
          },
        },
        error: {
          render({ data }) {
            return data.response?.data?.msg || "Submission failed.";
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-purple-900 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <motion.h1
            className="lg:text-4xl text-2xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            Request Withdrawal
          </motion.h1>

          {/* --- UPDATED BALANCE DISPLAY --- */}
          <motion.div
            className="text-center text-purple-300 mb-6 text-lg space-y-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            <div>Total Balance: <span className="font-bold text-white">${user.balance.toFixed(2)}</span></div>
            <div>Pending Withdrawals: <span className="font-bold text-yellow-400">-${(user.pendingWithdrawalsTotal || 0).toFixed(2)}</span></div>
            <div className="mt-2 text-xl border-t border-purple-800 pt-2">Available for Withdrawal: <span className="font-bold text-green-400">${availableForWithdrawal.toFixed(2)}</span></div>
          </motion.div>
          
          <motion.form onSubmit={onSubmit} className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-purple-300">Withdrawal Method</label>
              <select name="accountType" value={formData.accountType} onChange={onChange} className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
               <option value="USDT TRC20">USDT (TRC20)</option>
               <option value="USDT BEP20">USDT (BEP20)</option>
              </select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-purple-300">Wallet Address</label>
              <input type="text" name="accountNumber" value={formData.accountNumber} onChange={onChange} required className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your wallet address"/>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-purple-300">Amount (USDT)</label>
              <input type="number" name="amount" value={formData.amount} onChange={onChange} required min="1" step="0.01" max={availableForWithdrawal.toFixed(2)} className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter amount to withdraw"/>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md disabled:bg-purple-800 disabled:cursor-not-allowed flex items-center justify-center" whileHover={{ scale: loading ? 1 : 1.03 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Submit Withdrawal Request"}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Withdraw;