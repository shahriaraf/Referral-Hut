import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// --- Data Structure for Programs ---

const programsData = {
  "3p": {
    title: "3P Program",
    color: "blue",
    description: "Foundational programs designed for rapid skill acquisition.",
    cards: [{}, {}, {}], 
  },
  "6p": {
    title: "6P Program",
    color: "blue",
    description: "Advanced programs for deep specialization and expertise.",
    cards: [{}, {}, {}, {}], 
  },
  "vip": {
    title: "VIP Program",
    color: "purple",
    description: "Exclusive, personalized coaching for elite performance.",
    cards: [{}, {}, {}, {}, {},{}],
  },
};

// --- Color mapping ---
const colors = {
  blue: {
    bg: "bg-blue-600",
    shadow: "hover:shadow-blue-500/40",
    text: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-600",
    shadow: "hover:shadow-purple-500/40",
    text: "text-purple-400",
  },
};

// --- Program Card (Placeholder সহ) ---
const ProgramCard = ({ icon:  title, description, color }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

 
  if (!title) {
    return (
      <motion.div
        variants={cardVariants}
        className="bg-[#0f172a] p-6 rounded-2xl shadow-lg flex items-center justify-center h-48" 
      >
        <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-slate-700 rounded-lg animate-pulse mb-4"></div>
            <div className="w-32 h-4 mx-auto bg-slate-700 rounded-md animate-pulse mb-2"></div>
            <div className="w-40 h-3 mx-auto bg-slate-700 rounded-md animate-pulse"></div>
        </div>
      </motion.div>
    );
  }

 
  return (
    <motion.div
      variants={cardVariants}
      className={`bg-[#0f172a] p-6 rounded-2xl flex flex-col items-center text-center shadow-lg transition-all duration-300 ${colors[color].shadow} hover:scale-105 hover:-translate-y-2`}
    >
      <div className={`mb-4 text-4xl ${colors[color].text}`}>
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

// --- Main Component ---
const RoutePrograms = () => {
  const [activeTab, setActiveTab] = useState("3p");
  const activeProgram = programsData[activeTab];

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-start p-6 pt-16 md:pt-24 text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Programs</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Choose the path that's right for you. Each program is crafted to deliver results.
        </p>
      </motion.div>

      {/* Tab Buttons */}
      <div className="flex space-x-2 md:space-x-4 mb-12 p-2 bg-[#1e293b] rounded-full">
        {Object.keys(programsData).map((tabId) => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            className={`relative px-6 py-3 text-md md:px-8 md:py-3 md:text-lg font-semibold rounded-full transition-colors duration-300 focus:outline-none ${
              activeTab === tabId ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === tabId && (
              <motion.div
                layoutId="active-pill"
                className={`absolute inset-0 rounded-full ${colors[programsData[tabId].color].bg}`}
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 uppercase">{tabId}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1e293b] p-8 md:p-12 rounded-2xl shadow-2xl"
          >
            <h2 className={`text-3xl font-bold mb-2 text-center ${colors[activeProgram.color].text}`}>
              {activeProgram.title}
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">{activeProgram.description}</p>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
              initial="hidden"
              animate="visible"
            >
              {activeProgram.cards.map((card, i) => (
                <ProgramCard key={i} {...card} color={activeProgram.color} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoutePrograms;