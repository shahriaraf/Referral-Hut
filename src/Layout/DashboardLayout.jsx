import React from "react";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 z-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h2 className="text-2xl font-bold text-purple-600 mb-8 text-center">
          Dashboard
        </h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-purple-100"
          >
            <FaHome size={18} /> Home
          </NavLink>

          <NavLink
            to="/dashboard/package"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-purple-100"
          >
            Package
          </NavLink>

          <NavLink
            to="/dashboard/deposit"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-purple-100"
          >
            Deposit
          </NavLink>
          <NavLink
            to="/dashboard/3p"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-purple-100"
          >
            3p
          </NavLink>
          <NavLink
            to="/dashboard/6p"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-purple-100"
          >
            6p
          </NavLink>
          <NavLink
            to="/dashboard/vip"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-purple-100"
          >
            vip
          </NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
