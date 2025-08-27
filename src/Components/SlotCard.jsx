import React from 'react';
import { motion } from 'framer-motion';

const SlotCard = ({ slot, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
  };

  const getSlotStyle = (status) => {
    switch (status) {
      case 'paid_to_user':
        return { bg: 'bg-green-500/20 border-green-500', text: 'text-green-300', message: 'Slot Filled! Payment Received.' };
      case 'paid_to_upliner':
        return { bg: 'bg-yellow-500/20 border-yellow-500', text: 'text-yellow-300', message: 'Re-Cycle Slot! Payment sent to upline.' };
      default:
        return { bg: 'bg-gray-800/50 border-gray-700', text: 'text-gray-400', message: 'Waiting for a new referral...' };
    }
  };

  const style = getSlotStyle(slot?.status);

  return (
    <motion.div variants={cardVariants} className={`p-6 rounded-xl w-full h-48 shadow-lg border-2 ${style.bg} flex flex-col justify-center items-center text-center`}>
      <h3 className={`text-2xl font-bold mb-2 ${style.text}`}>Slot {index + 1}</h3>
      <p className="text-gray-300">{style.message}</p>
    </motion.div>
  );
};

export default SlotCard;