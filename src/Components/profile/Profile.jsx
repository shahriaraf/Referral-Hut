import React, { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import { FaRegCopy } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const Profile = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Fetch the details of the user who referred the current user.
  // This query only runs if `user.referredBy` has a value.
  const { data: referrer, isLoading: isReferrerLoading } = useQuery({
    queryKey: ["referrerDetails", user?.referredBy],
    queryFn: async () => {
      const { data } = await api.get(`/user/details/${user.referredBy}`);
      return data;
    },
    enabled: !!user?.referredBy, // This is the key to conditional fetching
  });

  // Function to copy the user's own referral ID to the clipboard
  const handleCopy = () => {
    if (user?.myReferralId) {
      navigator.clipboard.writeText(user.myReferralId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" text after 2 seconds
    }
  };

  // Display a loading state if the main user data hasn't loaded yet
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading profile...</p>
      </div>
    );
  }

  const packages = user.packages || {}; // Ensure packages is an object to prevent errors

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section - Profile Card */}
        <div className="bg-gradient-to-br from-indigo-600/30 via-gray-900 to-purple-900/40 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Profile Info */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-gray-300 text-lg mb-1">{user.email}</p>
                  
                  {/* Referred By Section */}
                  <div className="text-lg text-gray-400 h-5"> {/* h-5 to prevent layout shift */}
                    {isReferrerLoading ? (
                      <span className="animate-pulse">Loading referrer...</span>
                    ) : referrer ? (
                      <span>
                        Referred by:{" "}
                        <span className="font-semibold text-green-300">
                          {referrer.name} ({referrer.myReferralId})
                        </span>
                      </span>
                    ) : (
                      <span>No referrer information.</span>
                    )}
                  </div>

                  <p className="text-gray-400 mt-4 mb-4">
                    Top Investment Referral Partner & Financial Advisor
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">Investment Platforms</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs">Trading Apps</span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">Crypto Exchanges</span>
                    <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs">Banking Services</span>
                  </div>
                </div>
              </div>

              {/* Referral Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-gray-400 text-sm">Total Partners</div>
                  <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mt-2"></div>
                </div>

                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">${user.balance.toFixed(2)}</div>
                  <div className="text-gray-400 text-sm">Balance</div>
                  <div className="h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Profile Image & Actions */}
            <div className="flex flex-col items-center justify-between lg:w-80 space-y-4">
              <div className="relative w-full flex justify-center">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt="Profile"
                  className="w-48 h-48 rounded-2xl border-4 border-white/20 object-cover"
                />
              </div>

              <div className="w-full">
                <div className="relative w-full">
                  <div className="w-full flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold">
                    <span className="truncate">Referral ID: {user.myReferralId}</span>
                    <button onClick={handleCopy} title="Copy ID">
                      {copied ? (
                        <span className="text-emerald-400 text-xs font-medium">Copied!</span>
                      ) : (
                        <FaRegCopy className="cursor-pointer text-lg hover:text-gray-200" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-800 rounded-lg shadow-lg p-3">
                <div className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  Active Packages
                  <div className="flex items-center justify-center flex-wrap gap-3">
                    {Object.keys(packages).filter(pkgKey => packages[pkgKey].levels.some(level => level.status === "active")).length > 0 ? (
                      Object.keys(packages).map((pkgKey) => {
                        const hasActiveLevels = packages[pkgKey].levels.some(level => level.status === "active");
                        if (!hasActiveLevels) return null;
                        return (
                          <div key={pkgKey} className="bg-gray-700 rounded-full px-4 py-1 text-sm font-semibold text-emerald-400 uppercase">
                            {pkgKey}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm ml-2">None</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Programs Section */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">My Referral Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* These are static example cards */}
            <div className="bg-indigo-900/30 hover:bg-indigo-900/50 p-4 rounded-xl border border-indigo-700/30 transition-colors cursor-pointer group">
              <h3 className="text-white font-semibold mb-2">Investment Platform</h3>
              <p className="text-gray-400 text-sm mb-3">Refer friends to top investment platforms.</p>
            </div>
            <div className="bg-emerald-900/30 hover:bg-emerald-900/50 p-4 rounded-xl border border-emerald-700/30 transition-colors cursor-pointer group">
              <h3 className="text-white font-semibold mb-2">Trading App</h3>
              <p className="text-gray-400 text-sm mb-3">Commission-free trading platform referrals.</p>
            </div>
            <div className="bg-purple-900/30 hover:bg-purple-900/50 p-4 rounded-xl border border-purple-700/30 transition-colors cursor-pointer group">
              <h3 className="text-white font-semibold mb-2">Crypto Exchange</h3>
              <p className="text-gray-400 text-sm mb-3">Leading cryptocurrency exchange platform.</p>
            </div>
            <div className="bg-amber-900/30 hover:bg-amber-900/50 p-4 rounded-xl border border-amber-700/30 transition-colors cursor-pointer group">
              <h3 className="text-white font-semibold mb-2">Banking Service</h3>
              <p className="text-gray-400 text-sm mb-3">Digital banking and financial services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;