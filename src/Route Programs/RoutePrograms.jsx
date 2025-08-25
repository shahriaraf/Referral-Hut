import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const programsData = {
  "3p": {
    title: "3P Program",
    color: "blue",
    description: "Intermediate programs for building robust, real-world applications.",
    cards: [
      { level: 1, title: "Architect", description: "Learn to structure and design systems." },
      { level: 2, title: "Implement", description: "Build and test a complete feature set." },
      { level: 3, title: "Refine", description: "Optimize your code for performance and readability." },
    ],
  },
  "6p": {
    title: "6P Program",
    color: "blue",
    description: "Advanced programs for deep specialization and achieving mastery.",
    cards: [
      { level: 1, title: "Innovate", description: "Explore cutting-edge techniques." },
      { level: 2, title: "Lead", description: "Mentor and guide project development." },
      { level: 3, title: "Specialize", description: "Focus on a niche, high-demand area." },
      { level: 4, title: "Master", description: "Achieve expert-level proficiency." },
      { level: 5, title: "Synthesize", description: "Combine multiple disciplines to solve complex problems." },
      { level: 6, title: "Pioneer", description: "Create new patterns and contribute to the field." },
    ],
  },
  "vip": {
    title: "VIP Program",
    color: "purple",
    description: "Exclusive, personalized coaching for elite performance and industry leadership.",
    cards: [
      { level: 'VIP', title: "Strategy", description: "Define your long-term career trajectory." },
      { level: 'VIP', title: "Execution", description: "Receive 1-on-1 guidance on major projects." },
      { level: 'VIP', title: "Networking", description: "Access an exclusive professional network." },
      { level: 'VIP', title: "Branding", description: "Build your personal brand as an expert." },
      { level: 'VIP', title: "Influence", description: "Shape industry standards and practices." },
      { level: 'VIP', title: "Legacy", description: "Create a lasting impact with your work." },
    ],
  },
};

const colors = {
  blue: {
    bg: "bg-blue-600",
    shadow: "hover:shadow-blue-500/40",
    text: "text-blue-400",
    gradient: "from-blue-400 to-cyan-400",
  },
  purple: {
    bg: "bg-purple-600",
    shadow: "hover:shadow-purple-500/40",
    text: "text-purple-400",
    gradient: "from-purple-400 to-pink-400",
  },
};


const LevelBadge = ({ level, color }) => {
  const colorClass = colors[color].bg;
  return (
    <div className="relative w-20 h-24 mb-4">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 80 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 0L79.3728 23.75V71.25L40 95L0.627197 71.25V23.75L40 0Z"
          className={`fill-current ${colorClass} opacity-20`}
        />
        <path
          d="M40 4L75.5885 25.9375V69.0625L40 91L4.41154 69.0625V25.9375L40 4Z"
          className={`stroke-current ${colorClass}`}
          strokeWidth="4"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white tracking-tighter">
          {level}
        </span>
      </div>
    </div>
  );
};


const ProgramCard = ({ level, title, description, color }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

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


const RoutePrograms = () => {
  const [activeTab, setActiveTab] = useState("3p");
  const activeProgram = programsData[activeTab];

  return (
    <div className="relative min-h-screen bg-[#0f172a] flex flex-col items-center justify-start p-6 pt-16 md:pt-24 text-white font-sans overflow-hidden">
     
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${colors[activeProgram.color].gradient} opacity-10 blur-3xl`}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 z-10"
      >
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${colors[activeProgram.color].gradient}`}>
          Choose Your Path
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Each program is a journey. Select your starting point and begin your ascent.
        </p>
      </motion.div>

      {/* Tab Buttons */}
      <div className="flex z-10 space-x-2 md:space-x-4 mb-12 p-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-full">
        {Object.keys(programsData).map((tabId) => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            className={`relative px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base font-semibold rounded-full transition-colors duration-300 focus:outline-none ${
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

      <div className="w-full max-w-6xl z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/30 p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-800"
          >
            <h2 className={`text-3xl font-bold mb-2 text-center ${colors[activeProgram.color].text}`}>
              {activeProgram.title}
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">{activeProgram.description}</p>
            
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
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