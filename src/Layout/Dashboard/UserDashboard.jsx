import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiUser, FiLogOut, FiDownload, FiSettings } from 'react-icons/fi'; // Added FiSettings
import { RiVipCrownFill } from "react-icons/ri";

// Skeleton loader while fetching user data (No changes needed)
const DashboardHeaderSkeleton = () => (
    <div className="flex items-center justify-between p-6 bg-[#161B22] rounded-lg shadow-md mb-8 animate-pulse">
        <div>
            <div className="h-8 w-48 bg-gray-700 rounded-md mb-2"></div>
            <div className="h-4 w-64 bg-gray-700 rounded-md"></div>
        </div>
        <div className="h-14 w-14 bg-gray-700 rounded-full"></div>
    </div>
);

// Header component - Cleaned and merged
const DashboardHeader = ({ user }) => {
    if (!user) return <DashboardHeaderSkeleton />;

    return (
        <div className="flex items-center justify-between px-10 bg-gradient-to-r from-[#161B22] to-[#1a202c] rounded-lg shadow-lg border border-gray-800">
            <div className="flex-1">
                <h1 className="lg:text-2xl text-xl font-bold text-white">
                    Welcome back,{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {user.name}!
                    </span>
                </h1>
                <p className="text-gray-400 hidden lg:inline text-xs lg:text-sm mt-1">Here's a summary of your account activity.</p>
            </div>
            <div className="flex items-center gap-4">
                <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
                />
                {/* Mobile-only logout button, as desktop has one in the sidebar */}
                <button className="p-3 bg-gray-700/50 rounded-full md:hidden hover:bg-gray-700 transition-colors">
                    <FiLogOut className="text-gray-300" size={20} />
                </button>
            </div>
        </div>
    );
};

// Main Dashboard Component - Fully corrected and consolidated
const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [showMobileNav, setShowMobileNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const mainContentRef = useRef(null);

    // Mock fetching user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setTimeout(() => {
                    const mockUserData = {
                        name: 'Jessica',
                        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
                    };
                    setUser(mockUserData);
                }, 1500);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, []);

    // Scroll listener to hide/show mobile nav, attached to the main content area
    useEffect(() => {
        const contentElement = mainContentRef.current;
        if (!contentElement) return;

        const handleScroll = () => {
            const currentScrollY = contentElement.scrollTop;
            // Hide nav if scrolling down, show if scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 50) { // Added threshold
                setShowMobileNav(false);
            } else {
                setShowMobileNav(true);
            }
            setLastScrollY(currentScrollY);
        };

        contentElement.addEventListener("scroll", handleScroll);
        // Cleanup listener on component unmount
        return () => contentElement.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]); // lastScrollY is a necessary dependency here

    // Helper function for NavLink styling
    const getNavLinkClass = ({ isActive }) => {
        const baseClasses = 'flex items-center justify-center md:justify-start w-full md:gap-3 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out';
        const activeClasses = 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/40';
        const inactiveClasses = 'text-gray-400 hover:bg-gray-800 hover:text-white';
        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#0D1117] overflow-hidden">
            {/* Sidebar / Mobile Nav */}
            <aside
                className={`
                    fixed bottom-0 left-0 right-0 h-16 bg-[#161B22] border-t border-gray-800
                    flex items-center justify-around z-50
                    md:relative md:flex-col md:w-64 md:h-full md:justify-start md:p-4 md:border-r md:border-t-0
                    transition-transform duration-300 ease-in-out
                    ${showMobileNav ? "translate-y-0" : "translate-y-full"} md:translate-y-0
                `}
            >
                {/* Logo - Desktop only */}
                <div className="hidden md:flex items-center gap-x-2 mb-8 px-2">
                    <RiVipCrownFill className="text-4xl text-purple-400" />
                    <h2 className="text-xl font-semibold text-gray-200">
                        Referal<span className="text-purple-400">Hut</span>
                    </h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 w-full">
                    <ul className="flex flex-row justify-around md:flex-col md:gap-2 w-full">
                        <li><NavLink to="/userDashboard" end className={getNavLinkClass}><FiUser size={20} /><span className="hidden md:inline">Profile</span></NavLink></li>
                        <li><NavLink to="/userDashboard/package" className={getNavLinkClass}><FiPackage size={20} /><span className="hidden md:inline">Packages</span></NavLink></li>
                        <li><NavLink to="/userDashboard/deposit" className={getNavLinkClass}><FiDownload size={20} /><span className="hidden md:inline">Deposit</span></NavLink></li>
                        <li><NavLink to="/userDashboard/withdraw" className={getNavLinkClass}><FiDownload size={20} /><span className="hidden md:inline">Withdraw</span></NavLink></li>
                        <li><NavLink to="/userDashboard/admin-dashboard" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline">Admin</span></NavLink></li>
                        <li><NavLink to="/userDashboard/admin-withdraw" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline">Admin Withdraw</span></NavLink></li>
                        <li><NavLink to="/userDashboard/admin-deposit" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline"> Admin Deposite</span></NavLink></li>
                        <li><NavLink to="/userDashboard/admin-3p" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline">3p</span></NavLink></li>
                        <li><NavLink to="/userDashboard/admin-6p" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline">6p</span></NavLink></li>
                        <li><NavLink to="/userDashboard/admin-vip" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline">vip</span></NavLink></li>
                        <li><NavLink to="/" className={getNavLinkClass}><FiHome size={20} /><span className="hidden md:inline">Home</span></NavLink></li>
                    </ul>
                </nav>d

                {/* Logout Button - Desktop only */}
                <div className="hidden md:block mt-auto w-full">
                     <button className={`${getNavLinkClass({isActive: false})} w-full hover:bg-red-500/20 hover:text-red-400`}>
                        <FiLogOut size={20} />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header Container */}
                <div className=" pt-6 lg:pt-8 mb-8">
                    <DashboardHeader user={user} />
                </div>

                {/* Scrollable Inner Container */}
                <div ref={mainContentRef} className="flex-1 overflow-y-auto pb-20 md:pb-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;