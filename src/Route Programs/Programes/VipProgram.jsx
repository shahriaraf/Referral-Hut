import React from 'react';
import { motion } from 'framer-motion';
import { programsData, colors } from '../programData';
import ProgramCard from '../shared/ProgramCard';

const VipProgram = () => {
  const programInfo = programsData['vip'];

  return (
    <>
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-2 ${colors[programInfo.color].text}`}>
          {programInfo.title}
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          {programInfo.description}
        </p>
      </div>
      
      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
      >
        {programInfo.levels.map((level) =>
          level.cards.map((card, index) => (
            <ProgramCard 
              key={card.id || index}
              level={level.level}   // comes from the parent "level"
              title={card.title}
              description={card.description}
              color={programInfo.color}
            />
          ))
        )}
      </motion.div>
    </>
  );
};

export default VipProgram;
