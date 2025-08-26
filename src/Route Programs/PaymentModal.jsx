import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

// Define the icons as inline SVG to avoid external dependencies.
const FaTimes = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
  </svg>
);

const FaCreditCard = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm160 96h320c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H224c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16zM64 160c0-8.8 7.2-16 16-16h80c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-32zm448 240H64c-8.8 0-16-7.2-16-16v-96c0-8.8 7.2-16 16-16H512c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16z"></path>
  </svg>
);

const FaInfoCircle = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 144h80c13.3 0 24 10.7 24 24v24c0 13.3-10.7 24-24 24h-8v112h-8v16c0 13.3-10.7 24-24 24h-8c-13.3 0-24-10.7-24-24v-16h-8v-112h-8c-13.3 0-24-10.7-24-24v-24c0-13.3 10.7-24 24-24zM256 400a28 28 0 1 1 0-56 28 28 0 1 1 0 56z"></path>
  </svg>
);


// Mock data and hooks to make the component self-contained
const programsData = {
  '3p': {
    levels: [
      { level: 1, price: "৳25" },
      { level: 2, price: "৳35" },
      { level: 3, price: "৳45" },
      { level: 4, price: "৳55" },
      { level: 5, price: "৳65" },
      { level: 6, price: "৳75" },
    ],
  },
};

const useAuth = () => ({
  user: {
    email: "test.user@example.com"
  },
});

const useAxiosPublic = () => ({
  post: (url, data) => new Promise((resolve) => {
    console.log(`Mock API call to ${url} with data:`, data);
    setTimeout(() => {
      resolve({ data: { insertedId: "mock-id-12345" } });
    }, 1000);
  }),
});

const PaymentModal = ({ isOpen, onClose, level, programTitle, onPaymentSuccess }) => {
  const programInfo = programsData['3p'];
  const levelData = programInfo.levels.find(l => l.level === level);
  const amount = levelData ? parseFloat(levelData.price.replace('৳', '').trim()) : 0;

  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const paymentData = {
      email: user?.email,
      program: programTitle,
      levelNumber: level,
      amount: amount,
      date: new Date(),
    };

    try {
      const res = await axiosPublic.post("/api/payment", paymentData);
      
      if (res.data?.insertedId) {
        // Simulating a success message
        console.log(`SUCCESS: Level ${level} unlocked successfully!`);
        if (onPaymentSuccess) {
          onPaymentSuccess(level);
        }
      } else {
        // Simulating an error message
        console.log("ERROR: Payment submission failed!");
      }
    } catch (error) {
      console.error("ERROR: An error occurred while submitting payment data.", error);
    }
    reset();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-inter"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-slate-700"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Payment</h2>
                <p className="text-gray-400">{programTitle} - Level {level}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Amount Display */}
              {amount > 0 && (
                <div className="bg-slate-800 p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Required Amount</p>
                  <p className="text-2xl font-bold text-green-400">৳{amount}</p>
                  <p className="text-xs text-gray-500">Projects • Support • Certificate</p>
                </div>
              )}

              {/* Payment Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Amount (BDT)
                </label>
                
                {amount > 0 && (
                  <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-md mb-3 text-yellow-400 border border-dashed border-slate-700">
                    <FaInfoCircle />
                    <p className="text-xs">
                      Please note that the amount cannot be changed.
                    </p>
                  </div>
                )}

                <div className="relative">
                  <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                  <input
                    type="number"
                    value={amount}
                    readOnly
                    {...register("amount")}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 border-slate-600 cursor-not-allowed`}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaCreditCard />
                  Pay ৳{amount || "Amount"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;