import React, { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";

import { FaRegCopy } from "react-icons/fa";


const Profile = () => {
 const {user} = useAuth();

   const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user?.myReferralId) {
      navigator.clipboard.writeText(user.myReferralId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 সেকেন্ড পর মেসেজ হাইড হবে
    }
  };


  const packages = user.packages;
 



 



   


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section - Referral Profile */}
        <div className="bg-gradient-to-br from-indigo-600/30 via-gray-900 to-purple-900/40 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side - Profile Info */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white"> {user?.name} </h1>
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-xs font-semibold px-3 py-1 rounded-full">
                      DIAMOND AFFILIATE
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg mb-1">@sarah_investor</p>
                  <p className="text-gray-400 mb-4">Top Investment Referral Partner & Financial Advisor</p>
                  
                  {/* Performance Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} className="w-4 h-4 hidden lg:inline text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="text-white font-semibold ml-1 ">5.0</span><br />
                      <span className="text-gray-400 ">(247 referrals)</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">Investment Platforms</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs">Trading Apps</span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">Crypto Exchanges</span>
                    <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs">Banking Services</span>
                  </div>
                </div>
              </div>
              
              {/* Referral Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-gray-400 text-sm">Total Referrals</div>
                  <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-2"></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">$12,450</div>
                  <div className="text-gray-400 text-sm">Total Earnings</div>
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2"></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user?.balance} </div>
                  <div className="text-gray-400 text-sm">Balance</div>
                  <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Profile Image & Actions */}
            <div className="flex flex-col items-center space-y-4 lg:w-80">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&h=250&q=80"
                  alt="Profile"
                  className="w-48 h-48 rounded-2xl border-4 border-white/20 object-cover"
                />
                <div className="absolute -bottom-3 -right-3 bg-amber-500 rounded-full p-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"/>
                  </svg>
                </div>
              </div>
              
              {/* Action Buttons */}
               <div className="w-full space-y-3">
      <div className="relative w-full">
        <button className="w-full flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          <span>Referral Id : {user?.myReferralId}</span>
           {
            copied ?     <span className=" text-emerald-400 text-xs font-medium animate-fade">
            Copied!
          </span> :   <FaRegCopy
            onClick={handleCopy}
            className="cursor-pointer text-lg hover:text-gray-200"
            title="Copy ID"
          />
           }
        </button>


      </div>
    </div>
              
              {/* Activity Status */}
     <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-5">
  {/* Header */}
  <div className="flex items-center justify-center gap-2 text-lg font-semibold text-white mb-4">
    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
    Active Referrer
  </div>

  {/* Program Names in Flex */}
  <div className="flex items-center justify-center flex-wrap gap-3">
    {Object.keys(packages).map((pkgKey) => {
      const activeLevels = packages[pkgKey].levels.filter(
        (level) => level.status === "active"
      );

      if (activeLevels.length === 0) return null;

      return (
        <div
          key={pkgKey}
          className="bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-full px-4 py-1 text-sm font-semibold text-emerald-400 uppercase shadow-md"
        >
          {pkgKey}
        </div>
      );
    })}
  </div>
</div>


            </div>
          </div>
        </div>

        {/* Referral Programs Section */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">My Referral Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-indigo-900/30 hover:bg-indigo-900/50 p-4 rounded-xl border border-indigo-700/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-indigo-300" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48z"/>
                </svg>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full">Active</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Investment Platform</h3>
              <p className="text-gray-400 text-sm mb-3">Refer friends to top investment platforms</p>
              <div className="flex justify-between items-center">
                <div className="text-indigo-300 text-sm font-medium">$25 per referral</div>
                <div className="text-gray-400 text-xs">42 referrals</div>
              </div>
            </div>
            
            <div className="bg-emerald-900/30 hover:bg-emerald-900/50 p-4 rounded-xl border border-emerald-700/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-emerald-300" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/>
                </svg>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full">Hot</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Trading App</h3>
              <p className="text-gray-400 text-sm mb-3">Commission-free trading platform referrals</p>
              <div className="flex justify-between items-center">
                <div className="text-emerald-300 text-sm font-medium">$50 per referral</div>
                <div className="text-gray-400 text-xs">38 referrals</div>
              </div>
            </div>
            
            <div className="bg-purple-900/30 hover:bg-purple-900/50 p-4 rounded-xl border border-purple-700/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-purple-300" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32z"/>
                </svg>
                <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">Premium</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Crypto Exchange</h3>
              <p className="text-gray-400 text-sm mb-3">Leading cryptocurrency exchange platform</p>
              <div className="flex justify-between items-center">
                <div className="text-purple-300 text-sm font-medium">$40 per referral</div>
                <div className="text-gray-400 text-xs">35 referrals</div>
              </div>
            </div>
            
            <div className="bg-amber-900/30 hover:bg-amber-900/50 p-4 rounded-xl border border-amber-700/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-1 rounded-full">New</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Banking Service</h3>
              <p className="text-gray-400 text-sm mb-3">Digital banking and financial services</p>
              <div className="flex justify-between items-center">
                <div className="text-amber-300 text-sm font-medium">$30 per referral</div>
                <div className="text-gray-400 text-xs">25 referrals</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;