import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaUserSlash } from 'react-icons/fa';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const SlotCard = ({ index, isFilled }) => {
    return (
        <motion.div
            variants={cardVariants}
            className={`p-4 rounded-lg border-2 ${
                isFilled
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-gray-800/50 border-dashed border-gray-700'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-400">Slot {index + 1}</span>
                    <span className={`text-lg font-bold ${isFilled ? 'text-green-400' : 'text-gray-500'}`}>
                        {isFilled ? 'Filled' : 'Empty'}
                    </span>
                </div>
                <div className={`text-3xl ${isFilled ? 'text-green-500' : 'text-gray-600'}`}>
                    {isFilled ? <FaUserCheck /> : <FaUserSlash />}
                </div>
            </div>
        </motion.div>
    );
};

export default SlotCard;