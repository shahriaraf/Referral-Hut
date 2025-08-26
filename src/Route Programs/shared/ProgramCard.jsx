import React from 'react';
import { motion } from 'framer-motion';
import LevelBadge from './LevelBadge';
import { colors } from '../programData';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const ProgramCard = ({ level, title, description, color }) => {
  return (
    <motion.div
      variants={cardVariants}
      className={`bg-[#1e293b]/50 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg transition-all duration-300 ${colors[color].shadow} hover:scale-105 hover:-translate-y-2 border border-slate-700 hover:border-${color}-500/50`}
    >
      <LevelBadge level={level} color={color} />
      <h3 className="text-xl font-bold mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ProgramCard;