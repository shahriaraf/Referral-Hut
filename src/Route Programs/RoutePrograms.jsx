import React, { useState } from "react";

const RoutePrograms = () => {
  const [activeTab, setActiveTab] = useState("3p");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Toggle Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("3p")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "3p"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 border"
          }`}
        >
          3P
        </button>

        <button
          onClick={() => setActiveTab("4p")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "4p"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 border"
          }`}
        >
          4P
        </button>

        <button
          onClick={() => setActiveTab("6p")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "6p"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 border"
          }`}
        >
          6P
        </button>

        <button
          onClick={() => setActiveTab("vip")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "vip"
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-white text-gray-700 border"
          }`}
        >
          VIP
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-md text-gray-800 text-center">
        {activeTab === "3p" && (
          <div>
            <h2 className="text-xl font-bold mb-2">3P Information</h2>
            <p>
              3P related information 
            </p>
          </div>
        )}

        {activeTab === "4p" && (
          <div>
            <h2 className="text-xl font-bold mb-2">4P Information</h2>
            <p>
             4P related information 
             
            </p>
          </div>
        )}

        {activeTab === "6p" && (
          <div>
            <h2 className="text-xl font-bold mb-2">6P Information</h2>
            <p>
              6P related information 
            </p>
          </div>
        )}

        {activeTab === "vip" && (
          <div>
            <h2 className="text-xl font-bold mb-2">VIP Information</h2>
            <p>
               VIP related information 
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePrograms;
