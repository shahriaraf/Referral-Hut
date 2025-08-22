import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaHome, FaPhone, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import Navlinks from "./Navlinks";
import UserAvater from "./UserAvater";

const Navbar = () => {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const user = true;

  // Navigation items for bottom nav with icons

const bottomNavItems = [
  { name: "Home", icon: FaHome, path: "/" },
  { name: "Deposit", icon: FaMoneyBillWave, path: "/deposit" },
  { name: "Withdraw", icon: FaWallet, path: "/withdraw" },
  { name: "Pakage", icon: FaPhone, path: "/pakage" },
];


  // Handle scroll for bottom nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowBottomNav(false);
      } else {
        // Scrolling up
        setShowBottomNav(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800 shadow-2xl sticky top-0 z-50 py-2">
        <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 md:px-16 2xl:px-22 py-3 relative">
          {/* Logo - navbar-start */}
          <div className="navbar-start flex items-center gap-x-2">
            <RiVipCrownFill className="text-3xl seondary_text_color" />
            <h2 className="text-xl font-semibold seondary_text_color">
              Referal<span className="primary_text_color">Hut</span>
            </h2>
          </div>

          {/* Navlinks - navbar-center */}
          <div className="nav_link navbar-center">
            <div className="flex">
              <ul className="menu menu-horizontal px-1">
                <Navlinks />
              </ul>
            </div>
          </div>

          {/* User Avatar - navbar-end */}
          <div className="navbar-end flex items-center gap-x-4">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <FaUserCircle className="w-[35px] h-[35px] rounded-full primary_text_color" />
                </div>
                <div
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-[#151C2B] rounded-box z-1 mt-3 w-52 p-0 shadow-lg border border-gray-600"
                >
                  <UserAvater />
                </div>
              </div>
            ) : (
              <Link to="signIn">
                <button className="secondary_btn uppercase">
                  <span>Log In</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800 shadow-lg sticky top-0 z-50 py-3">
        <div className="flex justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center gap-x-2">
            <RiVipCrownFill className="text-2xl seondary_text_color" />
            <h2 className="text-lg font-semibold seondary_text_color">
              Referal<span className="primary_text_color">Hut</span>
            </h2>
          </div>

          {/* User Avatar */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <FaUserCircle className="w-[30px] h-[30px] rounded-full primary_text_color" />
              </div>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#151C2B] rounded-box z-1 mt-3 w-48 p-0 shadow-lg border border-gray-600"
              >
                <UserAvater />
              </div>
            </div>
          ) : (
            <Link to="signIn">
              <button className="text-sm secondary_btn uppercase px-3 py-1">
                <span>Log In</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800 border-t border-gray-600 transition-transform duration-300 ${
          showBottomNav ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-around items-center py-1">
          {bottomNavItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 hover:bg-white/10"
            >
              <item.icon className="text-2xl primary_text_color mb-1" />
              <span className="text-xs text-white font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind bottom nav on mobile */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Navbar;