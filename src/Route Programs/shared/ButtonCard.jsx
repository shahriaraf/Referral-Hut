// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaLock, FaLockOpen } from 'react-icons/fa';
// import { colors } from '../programData';

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.95, y: 20 },
//   visible: { opacity: 1, scale: 1, y: 0 },
// };

// const ButtonCard = ({ level, counter, color, isLocked, onButtonClick }) => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       className={`bg-[#1e293b]/50 p-4 rounded-xl flex items-center justify-between shadow-lg transition-all duration-300 ${colors[color].shadow} hover:scale-105 hover:-translate-y-1 border border-slate-700 hover:border-blue-500/50 min-h-[100px]`}
//     >
//       <button 
//         onClick={() => onButtonClick(level)}
//         className={`${isLocked ? colors[color].button : colors[color].successButton} flex justify-center items-center gap-2 w-[60%] text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors duration-300 shadow-lg flex-shrink-0 cursor-pointer`}
//       >
//         {isLocked ? <FaLock className="text-sm" /> : <FaLockOpen className="text-sm" />}
//         Level {level}
//       </button>
      
//       <div className="w-[40%]">
//         <p className="text-gray-300 text-xl text-center font-medium">{counter} Persons</p>
//       </div>
//     </motion.div>
//   );
// };

// export default ButtonCard;



import React from 'react';

const ButtonCard = () => {
    return (
        <div>
            
        </div>
    );
};

export default ButtonCard;