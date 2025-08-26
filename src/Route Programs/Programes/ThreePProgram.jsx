import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock } from 'react-icons/fa'; // Using an icon for locked state
import { programsData, colors } from '../programData';
import PaymentModal from '../PaymentModal';

// A new, simpler component for displaying content inside a level.
const ContentCard = ({ title, description, color }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`p-6 rounded-lg shadow-lg h-full ${colors[color].bgLight}`}
    >
      <h3 className={`text-xl font-bold mb-2 ${colors[color].text}`}>
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};


const ThreePProgram = () => {
  // 3P প্রোগ্রামের ডাটা programData.js থেকে নিচ্ছি
  const programInfo = programsData['3p'];
  
  // State management
  const [modalOpen, setModalOpen] = useState(false);
  const [levelToUnlock, setLevelToUnlock] = useState(null);
  
  // CHANGE 1: Start with an empty array. No levels are unlocked by default.
  const [unlockedLevels, setUnlockedLevels] = useState([]); 
  
  // CHANGE 2: No level is active by default.
  const [activeLevel, setActiveLevel] = useState(null);

  // বাটন ক্লিক করলে মডেল খোলার ফাংশন
  const handleOpenModal = (level) => {
    setLevelToUnlock(level);
    setModalOpen(true);
  };

  // মডেল বন্ধ করার ফাংশন
  const handleCloseModal = () => {
    setModalOpen(false);
    setLevelToUnlock(null);
  };

  // পেমেন্ট সফল হওয়ার ফাংশন
  const handlePaymentSuccess = (unlockedLevel) => {
    // Add the new level to the unlocked list
    setUnlockedLevels(prevLevels => [...prevLevels, unlockedLevel]);
    // Automatically switch to the newly unlocked level
    setActiveLevel(unlockedLevel);
    handleCloseModal();
  };
  
  // This function handles clicks on the level toggle buttons
  const handleLevelSelect = (level) => {
    const isUnlocked = unlockedLevels.includes(level);
    if (isUnlocked) {
      // If unlocked, just switch the view
      setActiveLevel(level);
    } else {
      // If locked, open the payment modal
      handleOpenModal(level);
    }
  };

  // Find the data for the currently active level to display its cards
  const activeLevelData = programInfo.levels.find(l => l.level === activeLevel);

  return (
    <>
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-2 ${colors[programInfo.color].text}`}>
          {programInfo.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          {programInfo.description}
        </p>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          {programInfo.price}
        </p>
      </div>

    
    {/* Level Toggle Buttons Section */}
    <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
      {programInfo.levels.map(({ level, price }) => {
        const isUnlocked = unlockedLevels.includes(level);
        const isActive = activeLevel === level;
        
        return (
          <button
            key={level}
            onClick={() => handleLevelSelect(level)}
            className={`
              px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all duration-300
              ${
                isActive
                  ? `${colors[programInfo.color].bg} text-white shadow-lg`
                  : isUnlocked
                  ? `bg-gray-700 text-gray-300 hover:${colors[programInfo.color].bgLight} hover:text-white`
                  : `bg-gray-800 text-gray-500 border border-dashed border-gray-600 cursor-pointer hover:border-solid hover:${colors[programInfo.color].border}`
              }
            `}
          >
            {/* Conditional rendering for the icon and price */}
            {isUnlocked ? (
              `Level ${level}`
            ) : (
              <>
                <FaLock size={12} />
                <span>Unlock for {price}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
    
    
      
      {/* Content Boxes Section - shows cards for the active level or a prompt */}
      {activeLevelData ? (
        <motion.div
          key={activeLevel} 
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={{ 
            visible: { transition: { staggerChildren: 0.1 } } 
          }}
          initial="hidden"
          animate="visible"
        >
          {activeLevelData.cards.map((card) => (
            <ContentCard 
              key={card.id} 
              title={card.title}
              description={card.description}
              color={programInfo.color}
            />
          ))}
        </motion.div>
      ) : (
        // UX IMPROVEMENT: Show this message when no level is selected
        <div className="text-center py-10 px-6 bg-gray-800/50 rounded-lg">
          <p className="text-gray-400">Please unlock a level to begin your journey!</p>
        </div>
      )}

      <PaymentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        level={levelToUnlock}
        programTitle={programInfo.title}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default ThreePProgram;