import React, { useState, useRef } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaHome, FaBoxOpen, FaCog, FaUser, FaSignOutAlt,
  FaBars, FaTimes
} from 'react-icons/fa';
import { RiVipCrownFill } from "react-icons/ri";
import useAuth from '../../CustomHooks/useAuth';
import useOnClickOutside from '../../CustomHooks/useOnClickOutside';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useOnClickOutside(sidebarRef, () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  });

  // --- 1. UPDATE THIS FUNCTION ---
  // Modify the logout handler to also close the sidebar.
  const handleLogout = () => {
    setSidebarOpen(false); // Close sidebar
    logout();
    navigate('/login');
  };

  // --- 2. ADD THIS NEW FUNCTION ---
  // A simple handler to close the sidebar when any link is clicked.
  const handleLinkClick = () => {
    setSidebarOpen(false);
  };


  const getNavLinkClass = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${isActive
      ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30'
      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`;

  const buttonClass = 'flex items-center w-full px-4 py-3 mb-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-200';

  const getSidebarItems = () => {
    // ... (This function remains unchanged)
    let baseItems = [
        { type: 'link', icon: FaHome, label: 'Profile', path: '/userDashboard' },
      ];
  
      if (user && user.myReferralId === '7e84b41e') {
        return [
          ...baseItems,
          { type: 'link', icon: FaBoxOpen, label: 'Packages', path: 'package' },
          { type: 'link', icon: FaUser, label: 'Deposit', path: 'deposit' },
          { type: 'link', icon: FaCog, label: 'Withdraw', path: 'withdraw' },
          { type: 'link', icon: FaCog, label: 'Admin', path: 'admin-dashboard' },
          { type: 'link', icon: FaCog, label: 'admin withdraw', path: "admin-withdraw" },
          { type: 'link', icon: FaCog, label: 'admin deposit', path: "admin-deposit" },
          { type: 'link', icon: FaUser, label: 'admin 3p', path: "admin-3p" },
          { type: 'link', icon: FaUser, label: 'admin 6p', path: "admin-6p" },
          { type: 'link', icon: FaUser, label: 'admin vip', path: "admin-vip" },
          { type: 'button', icon: FaSignOutAlt, label: 'Sign Out', onClick: handleLogout }
        ];
      } else {
        return [
          ...baseItems,
          { type: 'link', icon: FaBoxOpen, label: 'Packages', path: 'package' },
          { type: 'link', icon: FaUser, label: 'Deposit', path: 'deposit' },
          { type: 'link', icon: FaCog, label: 'Withdraw', path: 'withdraw' },
          { type: 'button', icon: FaSignOutAlt, label: 'Sign Out', onClick: handleLogout }
        ];
      }
  };

  const sidebarItems = getSidebarItems();

  if (!user) {
    return (
      <div className="flex h-screen bg-[#0D1117] items-center justify-center text-white">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0D1117] text-gray-300">
      <aside ref={sidebarRef} className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-72 bg-[#161B22] border-r border-gray-800 transform transition-transform duration-300 lg:w-64 lg:translate-x-0 lg:static lg:inset-0 overflow-y-auto`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center gap-x-2">
            <RiVipCrownFill className="text-3xl text-purple-400" />
            <h1 className="text-xl font-bold text-white">NexoNext</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md text-gray-400 hover:bg-gray-700 lg:hidden">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {sidebarItems.map((item) =>
            item.type === 'button' ? (
              <button key={item.label} onClick={item.onClick} className={buttonClass}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ) : (
              // --- 3. ADD onClick HERE ---
              <NavLink 
                key={item.path} 
                to={item.path} 
                end={item.path === '/userDashboard'} 
                className={getNavLinkClass}
                onClick={handleLinkClick} // Add this line
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* The rest of the component remains the same */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#161B22] border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md text-gray-400 hover:bg-gray-700 lg:hidden">
              <FaBars className="w-10 h-5" />
            </button>
            <div className="flex items-center space-x-4 ml-auto">
              <div className="flex items-center space-x-3">
                 <Link to='/'><FaHome className='text-3xl text-purple-500'></FaHome></Link>
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-purple-500" />
                <span className="text-sm font-medium text-white">{user.name}</span>
               
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden" ></div>}
    </div>
  );
};

export default UserDashboard;