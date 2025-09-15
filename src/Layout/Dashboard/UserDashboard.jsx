import React, { useState, useRef } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  FaHome, FaBoxOpen, FaCog, FaUser, FaSignOutAlt,
  FaBars, FaTimes, FaFileUpload, FaFileDownload, FaUserShield
} from 'react-icons/fa';
import { RiVipCrownFill } from "react-icons/ri";
import useAuth from '../../CustomHooks/useAuth';
import useOnClickOutside from '../../CustomHooks/useOnClickOutside';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef();
  
  const isAdmin = user && user.myReferralId === '7e84b41e'; // আপনার অ্যাডমিন আইডি

  useOnClickOutside(sidebarRef, () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  });

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
    navigate('/login');
  };

  const getDesktopNavLinkClass = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive
      ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30'
      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`;
  
  const getMobileNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 transition-colors duration-200 ${isActive
      ? 'text-purple-400'
      : 'text-gray-500 hover:text-purple-300'
    }`;

  // --- মূল পরিবর্তন ১: অ্যাডমিনের জন্য সম্পূর্ণ মেন্যু তালিকা ---
  const adminItems = [
    { type: 'link', icon: FaHome, label: 'Profile', path: '/userDashboard' },
    { type: 'link', icon: FaBoxOpen, label: 'Packages', path: 'package' },
    { type: 'link', icon: FaFileUpload, label: 'Deposit', path: 'deposit' },
    { type: 'link', icon: FaFileDownload, label: 'Withdraw', path: 'withdraw' },
    { type: 'link', icon: FaUserShield, label: 'Admin Dashboard', path: 'admin-dashboard' },
    { type: 'link', icon: FaUserShield, label: 'Admin Withdraw', path: 'admin-withdraw' },
    { type: 'link', icon: FaUserShield, label: 'Admin Deposit', path: 'admin-deposit' },
    { type: 'link', icon: FaUserShield, label: 'Admin 3P', path: 'admin-3p' },
    { type: 'link', icon: FaUserShield, label: 'Admin 6P', path: 'admin-6p' },
    { type: 'link', icon: FaUserShield, label: 'Admin VIP', path: 'admin-vip' },
  ];

  const userItems = [
    { type: 'link', icon: FaHome, label: 'Profile', path: '/userDashboard' },
    { type: 'link', icon: FaBoxOpen, label: 'Packages', path: 'package' },
    { type: 'link', icon: FaFileUpload, label: 'Deposit', path: 'deposit' },
    { type: 'link', icon: FaFileDownload, label: 'Withdraw', path: 'withdraw' },
  ];

  if (!user) {
    return (
      <div className="flex h-screen bg-[#0D1117] items-center justify-center text-white">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0D1117] text-gray-300">
      {/* --- ডেস্কটপ এবং অ্যাডমিন মোবাইল সাইডবার (ড্রয়ার) --- */}
      <aside ref={sidebarRef} className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-50 w-72 bg-[#161B22] border-r border-gray-800 
        transform transition-transform duration-300 
        lg:w-64 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <Link to="/userDashboard" className="flex items-center gap-x-2">
            <RiVipCrownFill className="text-3xl text-purple-400" />
            <h1 className="text-xl font-bold text-white">NexoNext</h1>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md text-gray-400 hover:bg-gray-700 lg:hidden">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3 flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <div className="flex-grow">
            {(isAdmin ? adminItems : userItems).map((item) =>
              <NavLink key={item.path} to={item.path} end={item.path === '/userDashboard'} className={getDesktopNavLinkClass} onClick={() => setSidebarOpen(false)}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            )}
             <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 mb-2 rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200">
              <FaSignOutAlt className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
      
    
        </nav>
      </aside>

      {/* --- মূল কন্টেন্ট --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#161B22] border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-400 hover:bg-gray-700 lg:hidden">
              <FaBars className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4 ml-auto">
              <div className="flex items-center space-x-3">
                <Link to='/'><FaHome className='text-2xl text-purple-400 hover:text-purple-300 transition-colors'></FaHome></Link>
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-purple-500" />
                <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* --- শুধুমাত্র সাধারণ ব্যবহারকারীর জন্য মোবাইল বটম নেভিগেশন বার --- */}
      {!isAdmin && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#161B22] border-t border-gray-800 flex items-center justify-around z-40 lg:hidden">
          {userItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/userDashboard'} className={getMobileNavLinkClass}>
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
          {/* --- মূল পরিবর্তন ২: সাইন আউট বাটন --- */}
          <button onClick={handleLogout} className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-purple-300">
            <FaSignOutAlt className="w-6 h-6 mb-1" />
            <span className="text-xs">Sign Out</span>
          </button>
        </nav>
      )}

      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden" ></div>}
    </div>
  );
};

export default UserDashboard;