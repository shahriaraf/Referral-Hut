import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaTimes, FaCreditCard, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
// Assuming these custom hooks are set up in your project
import useAuth from "../CustomHooks/useAuth"; 
import useAxiosPublic from "../CustomHooks/Api/useAxiosPublic";

const PaymentModal = ({ isOpen, onClose, level, programTitle, onPaymentSuccess }) => {
  // Pricing logic for the 3P Program
  const pricing = { 1: 25, 2: 35, 3: 45, 4: 55, 5: 65, 6: 75 };
  const amount = (programTitle === "3P Program" && pricing[level]) ? pricing[level] : 0;

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useAuth(); // Get user info from your auth context
  const axiosPublic = useAxiosPublic(); // Get your configured axios instance

  const onSubmit = async (data) => {
    // Prepare the data to be sent to the backend
    const paymentData = {
      email: user?.email,
      program: programTitle,
      levelNumber: level,
      amount: parseInt(data.amount),
      date: new Date(),
    };

    try {
      // Make the API call to your payment endpoint
      const res = await axiosPublic.post("/api/payment", paymentData);
      
      if (res.data?.insertedId) {
        toast.success(`Level ${level} unlocked successfully!`);
        // If the API call is successful, call the onPaymentSuccess callback
        // This will update the state in the ThreePProgram component
        if (onPaymentSuccess) {
          onPaymentSuccess(level);
        }
      } else {
        toast.error("Payment submission failed!");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("An error occurred while submitting payment data.");
    }
    reset(); // Reset the form fields after submission
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close modal on overlay click
        >
          <motion.div
            className="bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-slate-700"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
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
                  <p className="text-2xl font-bold text-green-400">${amount}</p>
                  <p className="text-xs text-gray-500">Projects • Support • Certificate</p>
                </div>
              )}

              {/* Payment Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Amount (USD)
                </label>
                
                {amount > 0 && (
                  <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-md mb-3 text-yellow-400 border border-dashed border-slate-700">
                    <FaInfoCircle />
                    <p className="text-xs">
                      Please enter the required amount: <span className="font-bold text-white">${amount}</span>
                    </p>
                  </div>
                )}

                <div className="relative">
                  <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                  <input
                    type="number"
                    defaultValue={amount || ""}
                    {...register("amount", {
                      required: "Amount is required",
                      validate: (value) => 
                        parseInt(value) === amount || `Please enter the exact amount: $${amount}`
                    })}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 ${errors.amount ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="Enter amount"
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
                )}
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
                  Pay ${amount || "Amount"}
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