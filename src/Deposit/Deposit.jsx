import  { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaCopy, FaCheck, FaGooglePlay } from "react-icons/fa";
import api from "../services/api";
import Spinner from "../Components/Spinner/Loading";

const Deposit = () => {
  const [formData, setFormData] = useState({
    address: "",
    transactionId: "",
    amount: "",
  });
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const depositAddress = "0x9d420c3CB8Fa1B51267E8F2e4cEDdF62c95c66a6";
  const trustWalletLink =
    "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp";

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress).then(() => {
      toast.success("Address copied to clipboard!");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submitPromise = api.post("/user/deposit", formData);
    await toast.promise(submitPromise, {
      pending: "Submitting deposit request...",
      success: {
        render({ data }) {
          setFormData({ address: "", transactionId: "", amount: "" });
          return data.data.msg;
        },
      },
      error: {
        render({ data }) {
          return data.response?.data?.msg || "Submission failed.";
        },
      },
    });
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md sm:max-w-sm md:max-w-2xl mx-auto bg-slate-800/60 backdrop-blur-md border border-purple-900 rounded-2xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8 md:p-10">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Deposit Funds
          </motion.h1>

          <motion.div
            className="mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-900/70 border border-purple-800 rounded-lg text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="text-purple-200 mb-4 text-sm sm:text-base md:text-lg"
            >
              First, send your deposit to the address below. We recommend using
              Trust Wallet.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-4">
              <a
                href={trustWalletLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col sm:flex-row sm:text-xl items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 font-semibold text-white bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-600/80 transition-all"
              >
                <FaGooglePlay className="text-2xl sm:text-xl text-green-400" />
                <span className="mt-1 sm:mt-0">Get Trust Wallet on Google Play</span>
              </a>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            >
              <p className="flex-1 p-3 font-mono text-sm sm:text-base bg-slate-800 border border-purple-700 rounded-md text-gray-200 break-words text-center sm:text-left">
                {depositAddress}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                disabled={isCopied}
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-semibold rounded-md transition-colors ${
                  isCopied
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isCopied ? <FaCheck /> : <FaCopy />}{" "}
                {isCopied ? "Copied" : "Copy"}
              </button>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="space-y-4 sm:space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm sm:text-base font-medium text-purple-300">
                Your Wallet Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                required
                className="w-full px-4 py-3 sm:py-4 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                placeholder="Enter the wallet address you sent from"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm sm:text-base font-medium text-purple-300">
                Transaction ID (TxID)
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={onChange}
                required
                className="w-full px-4 py-3 sm:py-4 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                placeholder="Enter the transaction hash"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm sm:text-base font-medium text-purple-300">
                Amount (USDT)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={onChange}
                required
                min="1"
                className="w-full px-4 py-3 sm:py-4 bg-slate-900/70 border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                placeholder="e.g., 100"
              />
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

export default Deposit;
