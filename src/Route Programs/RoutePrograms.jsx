import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { programsData, colors } from './programData';
import ThreePProgram from "./Programes/ThreePProgram"; // আগের Dashboard কম্পোনেন্ট
import VipProgram from "./Programes/VipProgram"; // আপনার অন্য প্রোগ্রাম
import SixPProgram from "./Programes/SixPProgram"; // আপনার অন্য প্রোগ্রাম
import { useOutletContext } from "react-router-dom"; // ডেটা পাওয়ার জন্য এই হুকটি ইমপোর্ট করুন


const RoutePrograms = () => {
  // Outlet থেকে ডেটা এবং ফাংশন গ্রহণ করুন
  const { user, allLevels, userActivations, fetchData } = useOutletContext();

  const [activeTab, setActiveTab] = useState("3p");
  const activeProgramData = programsData[activeTab];

  // কোন প্রোগ্রাম কম্পোনেন্ট দেখাতে হবে
  const renderActiveProgram = () => {
    switch (activeTab) {
      case "3p":
        // এখানে UserDashboard থেকে পাওয়া props পাস করে দিন
        return (
          <ThreePProgram
            user={user}
            allLevels={allLevels}
            userActivations={userActivations}
            fetchData={fetchData}
          />
        );
      case "6p":
        return <SixPProgram />;
      case "vip":
        return <VipProgram />;
      default:
        return null;
    }
  };

  return (
    // মূল UI অপরিবর্তিত থাকবে
    <div className="relative min-h-full flex flex-col items-center justify-start p-4 md:p-6 text-white font-sans overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${colors[activeProgramData.color].gradient} opacity-10 blur-3xl`}></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 z-10"
      >
        <h1 className={`text-3xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${colors[activeProgramData.color].gradient}`}>
          Choose Your Program
        </h1>
        <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto">
          Each program is a journey. Select your starting point and begin your ascent.
        </p>
      </motion.div>

      <div className="flex z-10 space-x-2 md:space-x-4 mb-8 p-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-full">
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
            <span className="relative z-10 uppercase tracking-wider">{tabId}</span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-7xl z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/30 p-4 md:p-8 rounded-2xl shadow-2xl border border-slate-800"
          >
            {renderActiveProgram()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoutePrograms;