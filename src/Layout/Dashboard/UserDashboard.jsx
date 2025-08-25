import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiUser, FiLogOut, FiDownload } from 'react-icons/fi';
import { RiVipCrownFill } from "react-icons/ri";

// Skeleton loader while fetching user data
const DashboardHeaderSkeleton = () => (
  <div className="flex items-center justify-between p-6 bg-[#161B22] rounded-lg shadow-md mb-8 animate-pulse">
    <div>
      <div className="h-8 w-48 bg-gray-700 rounded-md mb-2"></div>
      <div className="h-4 w-64 bg-gray-700 rounded-md"></div>
    </div>
    <div className="h-14 w-14 bg-gray-700 rounded-full"></div>
  </div>
);

// Header component
const DashboardHeader = ({ user }) => {
  if (!user) return <DashboardHeaderSkeleton />;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-gradient-to-r from-[#161B22] to-[#1a202c] rounded-lg shadow-lg border border-gray-800 mb-8">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold text-white">
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {user.name}!
          </span>
        </h1>
        <p className="text-gray-400 mt-1">Here's a summary of your account activity.</p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
        />
        <button className="p-3 bg-gray-700/50 rounded-full hover:bg-gray-700 transition-colors">
          <FiLogOut className="text-gray-300" size={20} />
        </button>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mock user fetch
  useEffect(() => {
    const fetchUserData = async () => {
      setTimeout(() => {
        const mockUserData = {
          name: 'Jessica',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        };
        setUser(mockUserData);
      }, 1500);
    };
    fetchUserData();
  }, []);

  // Mobile scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowMobileNav(false);
      else setShowMobileNav(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getNavLinkClass = ({ isActive }) => {
    const base = 'flex items-center justify-center md:justify-start w-full md:gap-3 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out';
    const active = 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/40';
    const inactive = 'text-gray-400 hover:bg-gray-700 hover:text-white';
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0D1117]">
      {/* Sidebar */}
      <aside
        className={`
          fixed bottom-0 left-0 right-0 h-16 bg-[#161B22] border-t border-gray-800
          flex items-center justify-around z-50 transition-transform duration-300
          md:relative md:w-64 md:h-auto md:min-h-screen md:flex-col md:items-start md:justify-start md:p-4 md:border-r md:border-t-0
          ${showMobileNav ? "translate-y-0" : "translate-y-full"} md:translate-y-0
        `}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-x-2 mb-6">
          <RiVipCrownFill className="text-4xl seondary_text_color" />
          <h2 className="text-xl font-semibold seondary_text_color">
            Referal<span className="primary_text_color">Hut</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="flex flex-row justify-around md:flex-col md:gap-2 w-full">
            <li>
              <NavLink to="/userDashboard" end className={getNavLinkClass}>
                <FiUser size={20} />
                <span className="hidden md:inline">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/userDashboard/package" className={getNavLinkClass}>
                <FiPackage size={20} />
                <span className="hidden md:inline">Packages</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/userDashboard/deposit" className={getNavLinkClass}>
                <FiDownload size={20} />
                <span className="hidden md:inline">Deposit</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/userDashboard/withdraw" className={getNavLinkClass}>
                <FiDownload size={20} />
                <span className="hidden md:inline">Withdraw</span>
              </NavLink>
            </li>


              <li>
              <NavLink to="/userDashboard/admin-dashboard" className={getNavLinkClass}>
                <FiDownload size={20} />
                <span className="hidden md:inline">admin</span>
              </NavLink>
            </li>



            <li>
              <NavLink to="/" className={getNavLinkClass}>
                <FiHome size={20} />
                <span className="hidden md:inline">Home</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4 hidden md:block">
          <button className="flex items-center w-full gap-3 py-3 px-4 rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors">
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10 pb-20 md:pb-10">
        <DashboardHeader user={user} />
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
