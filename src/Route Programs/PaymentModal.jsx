import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

// Animation variants for the backdrop and the modal itself
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    y: "-50px",
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: "0",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    y: "50px",
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess, level, programTitle }) => {
  // We use AnimatePresence to allow for exit animations
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal if backdrop is clicked
        >
          <motion.div
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <FaShoppingCart className="text-blue-400" size={24} />
                <h2 className="text-xl font-bold text-white">
                  Confirm Purchase
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <p className="text-gray-300 mb-4 text-center">
                You are about to unlock the next stage in the{' '}
                <span className="font-semibold text-white">{programTitle}</span>.
              </p>

              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 my-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-400">Level to Unlock:</span>
                  <span className="font-bold text-white">Level {level?.levelNumber}</span>
                </div>
                <hr className="border-gray-600 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xl">Amount Due:</span>
                  <span className="text-3xl font-bold text-green-400">${level?.price?.toFixed(2)}</span>
                </div>
              </div>

              {/* Modal Footer with Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all duration-300 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={onPaymentSuccess}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;