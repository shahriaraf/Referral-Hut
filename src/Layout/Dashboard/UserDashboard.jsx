import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaBoxOpen, FaCog, FaUser, FaSignOutAlt, 
  FaBars, FaTimes
} from 'react-icons/fa';
import { RiVipCrownFill } from "react-icons/ri";
import useAuth from '../../CustomHooks/useAuth';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }) => 
    `flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`;
  
  // Base sidebar items visible to all users
  let sidebarItems = [
    { icon: FaHome, label: 'Profile', path: '/userDashboard' },
    { icon: FaBoxOpen, label: 'Packages', path: 'package' },
    { icon: FaUser, label: 'Deposit', path: 'deposit' },
    { icon: FaCog, label: 'Withdraw', path: 'withdraw' },
  ];

  // --- CONDITIONAL LOGIC ADDED HERE ---
  // If the user object exists and their referral ID matches, add the Admin link.
  if (user && user.myReferralId === '7e84b41e') {  
    sidebarItems.push({ icon: FaCog, label: 'Admin', path: 'admin-dashboard' });
  }

  // Show a loading state until the user object is available
  if (!user) {
    return (
      <div className="flex h-screen bg-[#0D1117] items-center justify-center text-white">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0D1117] text-gray-300">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-[#161B22] border-r border-gray-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center gap-x-2">
            <RiVipCrownFill className="text-3xl text-purple-400" />
            <h1 className="text-xl font-bold text-white">ReferalHut</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md text-gray-400 hover:bg-gray-700 lg:hidden">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/userDashboard'} className={getNavLinkClass}>
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors">
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden mx-10">
        {/* Header */}
        <header className="bg-[#161B22] border-b border-gray-800">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-400 hover:bg-gray-700 lg:hidden">
              <FaBars className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4 ml-auto">
              
              <div className="flex items-center space-x-3">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-purple-500" />
                <span className="text-sm font-medium text-white">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Child Components Render Here */}
        <main className="flex-1 overflow-y-auto p-6 mt-4">
          <Outlet /> {/* Profile, Packages, etc. will render here */}
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default UserDashboard;