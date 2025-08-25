import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header - Profile Card */}
        <div className="bg-gradient-to-br from-indigo-600/30 via-gray-900 to-purple-900/40 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
                  alt="Profile"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-white/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1">
                  <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Jhone Doe</h2>
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-xs px-2 py-1 rounded-full w-fit">
                    DIAMOND
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-300">@sarah_investor</p>
              </div>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors self-end sm:self-auto">
              Edit
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800/70 rounded-xl p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Active Plans</p>
            <p className="text-xl sm:text-2xl font-bold text-white">3</p>
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-2"></div>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">Total Profit</p>
            <p className="text-xl sm:text-2xl font-bold text-white">$2,450</p>
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2"></div>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-4 border border-white/10">
            <p className="text-gray-400 text-sm mb-1">VIP Level</p>
            <p className="text-xl sm:text-2xl font-bold text-white">Diamond</p>
            <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2"></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="bg-indigo-900/30 hover:bg-indigo-900/50 p-3 sm:p-4 rounded-xl border border-indigo-700/30 flex flex-col items-center gap-2 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300" fill="currentColor" viewBox="0 0 384 512">
              <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48z"/>
            </svg>
            <span className="text-xs text-white text-center">Deposit</span>
          </button>
          <button className="bg-purple-900/30 hover:bg-purple-900/50 p-3 sm:p-4 rounded-xl border border-purple-700/30 flex flex-col items-center gap-2 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" fill="currentColor" viewBox="0 0 640 512">
              <path d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32z"/>
            </svg>
            <span className="text-xs text-white text-center">Withdraw</span>
          </button>
          <button className="bg-emerald-900/30 hover:bg-emerald-900/50 p-3 sm:p-4 rounded-xl border border-emerald-700/30 flex flex-col items-center gap-2 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" fill="currentColor" viewBox="0 0 512 512">
              <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/>
            </svg>
            <span className="text-xs text-white text-center">Invest</span>
          </button>
          <button className="bg-amber-900/30 hover:bg-amber-900/50 p-3 sm:p-4 rounded-xl border border-amber-700/30 flex flex-col items-center gap-2 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <span className="text-xs text-white text-center">Security</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
         <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-cyan-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > {" "} <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>{" "} </svg>
                  <span className="text-white font-medium">Transaction History</span>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-gray-500 group-hover:text-indigo-300 transition-colors" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path> </svg>
                </div>
                <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">New</span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48z"/>
                  </svg>
                  <span className="text-white font-medium">My Portfolio</span>
                </div>
                <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">3</span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div className="flex justify-between items-center gap-3">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-emerald-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path> </svg>
                <span className="text-white font-medium">Investment Analytics</span>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-gray-500 group-hover:text-indigo-300 transition-colors" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path> </svg>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div className="flex  justify-between items-center gap-3">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" class="text-purple-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"></path> </svg>
                <span className="text-white font-medium">Withdraw Details</span>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-gray-500 group-hover:text-indigo-300 transition-colors" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path> </svg>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div >
                <div className="flex justify-between items-center gap-3">
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-yellow-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M256 464c22.779 0 41.411-18.719 41.411-41.6h-82.823c0 22.881 18.633 41.6 41.412 41.6zm134.589-124.8V224.8c0-63.44-44.516-117.518-103.53-131.041V79.2c0-17.682-13.457-31.2-31.059-31.2s-31.059 13.518-31.059 31.2v14.559c-59.015 13.523-103.53 67.601-103.53 131.041v114.4L80 380.8v20.8h352v-20.8l-41.411-41.6z"></path> </svg>
                 <p>
                   <span className="text-white font-medium">Notifications</span> <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">5</span>
                 </p>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-gray-500 group-hover:text-indigo-300 transition-colors" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > {" "} <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>{" "} </svg>
                </div>
               
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:bg-gray-800/70 transition-colors cursor-pointer">
              <div className="flex justify-between items-center gap-3">
               <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-pink-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path> </svg>
                <span className="text-white font-medium">Account Settings</span>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-gray-500 group-hover:text-indigo-300 transition-colors" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path> </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Membership Card */}
        <div className="bg-gradient-to-br from-amber-100 via-white to-yellow-100 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
              <div className="bg-amber-200/60 p-2 sm:p-3 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-black text-base sm:text-lg">Black Card Membership</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Unlock premium benefits and exclusive rewards</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto">
              Upgrade to Elite
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;