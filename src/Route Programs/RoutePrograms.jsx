import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Data and colors remain the same
const programsData = {
  "3p": {
    title: "3P Program",
    color: "blue",
    description: "Click on each level to explore the dynamic structure.",
    levels: [
      { level: 1, price: "$1" },
      { level: 2, price: "$2" },
      { level: 3, price: "$4" },
      { level: 4, price: "$8" },
      { level: 5, price: "$16" },
      { level: 6, price: "$32" },
    ],
  },
  "6p": {
    title: "6P Program",
    color: "blue",
    description: "Advanced programs for deep specialization and achieving mastery.",
    cards: [{}, {}, {}, {}, {}, {}],
  },
  "vip": {
    title: "VIP Program",
    color: "purple",
    description: "Exclusive, personalized coaching for elite performance.",
    cards: [{}, {}, {}, {}],
  },
};

const colors = {
  blue: {
    bg: "bg-blue-600",
    shadow: "shadow-blue-500/40",
    text: "text-blue-400",
    gradient: "from-blue-400 to-cyan-400",
    ring: "ring-blue-500",
  },
  purple: {
    bg: "bg-purple-600",
    shadow: "shadow-purple-500/40",
    text: "text-purple-400",
    gradient: "from-purple-400 to-pink-400",
    ring: "ring-purple-500",
  },
};

// --- NEW UI-ENHANCED COMPONENTS START HERE ---

// New Icon Components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

// Redesigned Member Node component with "Filled" and "Open" states
const MemberNode = ({ type, status = 'open', userId }) => {
  const isUpline = type === 'upline';
  const isFilled = status === 'filled';

  const baseClasses = "relative rounded-xl p-4 w-full h-36 flex flex-col items-center justify-center space-y-2 transition-all duration-300 backdrop-blur-sm overflow-hidden";
  const borderGradient = isUpline 
    ? "bg-gradient-to-br from-green-400 to-blue-500" 
    : "bg-gradient-to-br from-red-400 to-purple-500";
  
  const content = isFilled ? (
    <>
      <UserIcon />
      <p className="font-bold text-slate-100">{isUpline ? "Upline" : "Downline"}</p>
      <p className="text-xs text-slate-400 font-mono">ID: {userId}</p>
    </>
  ) : (
    <>
      <PlusIcon />
      <p className="font-semibold text-slate-300">Open Slot</p>
      <button className="text-xs text-cyan-400 hover:text-cyan-300">Join Now</button>
    </>
  );

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
      className="p-[2px] rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 hover:scale-105 transition-transform duration-300"
    >
      <div className={`${baseClasses} ${isFilled ? 'bg-slate-800/80' : 'bg-slate-800/50 border-2 border-dashed border-slate-600'}`}>
        {content}
      </div>
    </motion.div>
  );
};


// Animated Connecting Lines Component
const ConnectingLines = () => {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };
    return (
        <motion.svg 
            width="100%" 
            height="60" 
            viewBox="0 0 200 60" 
            className="absolute top-1/2 left-0 -translate-y-1/2"
            initial="hidden"
            animate="visible"
        >
            {/* Vertical Line */}
            <motion.line x1="100" y1="0" x2="100" y2="30" stroke="#475569" strokeWidth="2" variants={pathVariants} />
            {/* Horizontal Line */}
            <motion.line x1="50" y1="30" x2="150" y2="30" stroke="#475569" strokeWidth="2" variants={pathVariants} />
            {/* Downward Lines */}
            <motion.line x1="50" y1="30" x2="50" y2="60" stroke="#475569" strokeWidth="2" variants={pathVariants} />
            <motion.line x1="150" y1="30" x2="150" y2="60" stroke="#475569" strokeWidth="2" variants={pathVariants} />
        </motion.svg>
    );
};

const ChevronIcon = ({ isOpen }) => (
  <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </motion.svg>
);


// Heavily Enhanced 3P Program Layout
const ThreePProgramLayout = ({ program }) => {
  const [openLevel, setOpenLevel] = useState(0);

  // Dummy data to showcase filled vs open slots
  const levelStatusData = {
    0: { upline: { status: 'filled', userId: 'A1B2C3D4' }, downlines: [{ status: 'filled', userId: 'E5F6G7H8' }, { status: 'open' }] },
    1: { upline: { status: 'filled', userId: 'I9J0K1L2' }, downlines: [{ status: 'open' }, { status: 'open' }] },
    // Add more statuses for other levels if needed
  };

  const handleToggle = (index) => setOpenLevel(openLevel === index ? null : index);
  const colorTheme = colors[program.color];

  const levelBoxVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0 },
    open: { opacity: 1, height: "auto", marginTop: "1rem", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="space-y-4">
      {program.levels.map((levelData, index) => {
        const isOpen = openLevel === index;
        const status = levelStatusData[index] || { upline: { status: 'open' }, downlines: [{ status: 'open' }, { status: 'open' }] };
        
        return (
          <div key={index} className={`rounded-xl transition-all duration-500 ${isOpen ? `bg-slate-800/50 ring-2 ring-slate-700 ${colorTheme.shadow}` : 'bg-slate-800/30'}`}>
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
            >
              <div className="flex items-center space-x-4">
                <span className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-slate-900 ${colorTheme.bg}`}>{levelData.level}</span>
                <span className={`text-lg font-bold text-slate-200`}>Level {levelData.level}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-300 bg-slate-700/80 px-3 py-1.5 rounded-full">{levelData.price}</span>
                <div className={`p-2 rounded-full ${isOpen ? `bg-blue-500/20 text-blue-400` : 'bg-slate-700/50 text-slate-400'}`}>
                   <ChevronIcon isOpen={isOpen} />
                </div>
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="content" initial="collapsed" animate="open" exit="collapsed" variants={levelBoxVariants}>
                  <div className="border-t border-slate-700/50 p-6">
                    <motion.div
                      className="flex flex-col items-center gap-12"
                      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                      initial="hidden" animate="visible"
                    >
                      <div className="w-48">
                        <MemberNode type="upline" status={status.upline.status} userId={status.upline.userId} />
                      </div>
                      
                      <div className="w-full max-w-lg h-12 relative">
                        <ConnectingLines />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-12 w-full max-w-lg">
                        <MemberNode type="downline" status={status.downlines[0].status} userId={status.downlines[0].userId} />
                        <MemberNode type="downline" status={status.downlines[1].status} userId={status.downlines[1].userId} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  );
};

// --- EXISTING COMPONENTS (NO CHANGES) ---
const LevelBadge = ({ level, color }) => { /* ... no changes ... */
    const colorClass = colors[color].bg;
    return (
        <div className="relative w-20 h-24 mb-4">
        <svg className="absolute w-full h-full" viewBox="0 0 80 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0L79.3728 23.75V71.25L40 95L0.627197 71.25V23.75L40 0Z" className={`fill-current ${colorClass} opacity-20`} />
            <path d="M40 4L75.5885 25.9375V69.0625L40 91L4.41154 69.0625V25.9375L40 4Z" className={`stroke-current ${colorClass}`} strokeWidth="4" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tighter">{level}</span>
        </div>
        </div>
    );
};
const ProgramCard = ({ level, title, description, color }) => { /* ... no changes ... */
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };
    return (
        <motion.div variants={cardVariants} className={`bg-[#1e293b]/50 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg transition-all duration-300 ${colors[color].shadow} hover:scale-105 hover:-translate-y-2 border border-slate-700 hover:border-${color}-500/50`}>
        <LevelBadge level={level} color={color} />
        <h3 className="text-xl font-bold mb-2 text-gray-100">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
};
const RoutePrograms = () => { /* ... no changes, just a padding adjustment ... */
    const [activeTab, setActiveTab] = useState("3p");
    const activeProgram = programsData[activeTab];

    return (
        <div className="relative min-h-screen bg-[#0f172a] flex flex-col items-center justify-start p-6 pt-16 md:pt-24 text-white font-sans overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${colors[activeProgram.color].gradient} opacity-10 blur-3xl`}></div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12 z-10">
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${colors[activeProgram.color].gradient}`}>
            Choose Your Path
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Each program is a journey. Select your starting point and begin your ascent.
            </p>
        </motion.div>
        <div className="flex z-10 space-x-2 md:space-x-4 mb-12 p-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-full">
            {Object.keys(programsData).map((tabId) => (
            <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`relative px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base font-semibold rounded-full transition-colors duration-300 focus:outline-none ${activeTab === tabId ? "text-white" : "text-gray-400 hover:text-white"}`}
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
        <div className="w-full max-w-4xl z-10">
            <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-800"
            >
                <h2 className={`text-3xl font-bold mb-2 text-center ${colors[activeProgram.color].text}`}>
                {activeProgram.title}
                </h2>
                <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">{activeProgram.description}</p>
                
                {activeTab === '3p' ? (
                <ThreePProgramLayout program={activeProgram} />
                ) : (
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
                )}
            </motion.div>
            </AnimatePresence>
        </div>
        </div>
    );
};

export default RoutePrograms;