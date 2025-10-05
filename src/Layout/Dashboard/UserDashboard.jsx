import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaFileUpload,
  FaFileDownload,
  FaSignOutAlt,
  FaUserShield,
  FaUsers,
  FaBars,
  FaTimes,
  FaGift,
} from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../CustomHooks/useAuth";
import Spinner from "../../Components/Spinner/Loading";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isAdmin = user && user.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDesktopNavLinkClass = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30"
        : "text-gray-400 hover:bg-gray-700 hover:text-white"
    }`;

  const getMobileNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 transition-colors duration-200 ${
      isActive ? "text-purple-400" : "text-gray-500 hover:text-purple-300"
    }`;

  const handleMobileLinkClick = () => {
    setIsMobileSidebarOpen(false);
  };

  const adminItems = [
    { icon: FaHome, label: "Profile", path: "/userDashboard" },
    { icon: FaBoxOpen, label: "Packages", path: "package" },
    { icon: FaGift, label: "Send Gift", path: "send-gifts" },
    { icon: FaUsers, label: "All Users", path: "all-users" },
    { icon: FaFileUpload, label: "Deposit", path: "deposit" },
    { icon: FaFileDownload, label: "Withdraw", path: "withdraw" },
    { icon: FaUserShield, label: "Admin Dashboard", path: "admin-dashboard" },
    { icon: FaUserShield, label: "Admin Withdraw", path: "admin-withdraw" },
    { icon: FaUserShield, label: "Admin Deposit", path: "admin-deposit" },
    { icon: FaUserShield, label: "Admin 3P", path: "admin-3p" },
    { icon: FaUserShield, label: "Admin 6P", path: "admin-6p" },
  ];

  const userItems = [
    { icon: FaHome, label: "Profile", path: "/userDashboard" },
    { icon: FaBoxOpen, label: "Packages", path: "package" },
    { icon: FaGift, label: "Send Gift", path: "send-gifts" },
    { icon: FaFileUpload, label: "Deposit", path: "deposit" },
    { icon: FaFileDownload, label: "Withdraw", path: "withdraw" },
  ];

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen bg-[#0D1117] text-gray-300 overflow-hidden">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#161B22] border-r border-gray-800 shrink-0">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800 shrink-0">
          <Link to="/userDashboard" className="flex items-center gap-x-2">
            <RiVipCrownFill className="text-3xl text-purple-400" />
            <h1 className="text-xl font-bold text-white">NexoNext</h1>
          </Link>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto no-scrollbar">
          {(isAdmin ? adminItems : userItems).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/userDashboard"}
              className={getDesktopNavLinkClass}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 mt-2 rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
          >
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </nav>
      </aside>

      <AnimatePresence>
        {isAdmin && isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#161B22] border-r border-gray-800 z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
                <Link
                  to="/userDashboard"
                  className="flex items-center gap-x-2"
                  onClick={handleMobileLinkClick}
                >
                  <RiVipCrownFill className="text-3xl text-purple-400" />
                  <h1 className="text-xl font-bold text-white">NexoNext</h1>
                </Link>
                <button onClick={() => setIsMobileSidebarOpen(false)}>
                  <FaTimes className="text-gray-400 h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 p-4 overflow-y-auto">
                {adminItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/userDashboard"}
                    className={getDesktopNavLinkClass}
                    onClick={handleMobileLinkClick}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    handleMobileLinkClick();
                  }}
                  className="flex items-center w-full px-4 py-3 mt-2 rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                >
                  <FaSignOutAlt className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col w-full min-w-0">
        <header className="bg-[#161B22] border-b border-gray-800 sticky top-0 z-20 shrink-0">
          <div className="flex items-center justify-between px-4 h-16">
            <div>
              {isAdmin && (
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <FaBars className="h-6 w-6" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="font-medium text-sm sm:text-base">
                {(user?.balance || 0).toFixed(2)}{" "}
                <span className="text-purple-400">$</span>
              </span>
              <Link to="/" className="hidden sm:block">
                <FaHome className="text-2xl text-purple-400 hover:text-purple-300 transition-colors" />
              </Link>
              <Link to="/userDashboard">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border-2 border-purple-500 hover:border-purple-300 transition-colors"
                />
              </Link>
              <span className="text-sm font-medium text-white hidden sm:block">
                {user.name}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {!isAdmin && (
        <nav className="fixed overflow-hidden bottom-0 left-0 right-0 h-16 bg-[#161B22] border-t border-gray-800 flex items-center justify-around z-40 lg:hidden">
          {userItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/userDashboard"}
              className={getMobileNavLinkClass}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center flex-1 text-gray-500 hover:text-purple-300"
          >
            <FaSignOutAlt className="w-6 h-6 mb-1" />
            <span className="text-xs">Sign Out</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default UserDashboard;