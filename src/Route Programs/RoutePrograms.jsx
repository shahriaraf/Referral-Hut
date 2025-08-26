import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { programsData, colors } from './programData'; // ডাটা ইমপোর্ট
import ThreePProgram from "./Programes/ThreePProgram";
import VipProgram from "./Programes/VipProgram";
import SixPProgram from "./Programes/SixPProgram";




const RoutePrograms = () => {
  // শুধু কোন ট্যাব active আছে, সেই state এখানে রাখব
  const [activeTab, setActiveTab] = useState("3p");
  
  const activeProgramData = programsData[activeTab];

  // কোন প্রোগ্রাম কম্পোনেন্ট দেখাতে হবে, তা ঠিক করার জন্য একটি ফাংশন
  const renderActiveProgram = () => {
    if (activeTab === "3p") {
      return <ThreePProgram />;
    }
    if (activeTab === "6p") {
      return <SixPProgram></SixPProgram>
    }
    if (activeTab === "vip") {
      return <VipProgram />;
    }
    return null; // ডিফল্ট কিছুই দেখাবে না
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] flex flex-col items-center justify-start p-6 pt-16 md:pt-24 text-white font-sans overflow-hidden">
      {/* Background Gradient - activeTab অনুযায়ী পরিবর্তন হবে */}
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${colors[activeProgramData.color].gradient} opacity-10 blur-3xl`}></div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 z-10"
      >
        <h1 className={`text-4xl md:text-5xl font-extold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${colors[activeProgramData.color].gradient}`}>
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

      {/* Tab Content */}
      <div className="w-full max-w-6xl z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // key পরিবর্তন হলে AnimatePresence কাজ করে
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/30 p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-800"
          >
            {/* এখানে activeTab অনুযায়ী সঠিক কম্পোনেন্ট রেন্ডার হবে */}
            {renderActiveProgram()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoutePrograms;





