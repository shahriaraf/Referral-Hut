import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiHome, FiPackage, FiUser, FiLogOut, FiDownload, FiSettings } from 'react-icons/fi';
import { RiVipCrownFill } from "react-icons/ri";

// হেডার এবং স্কেলিটন কম্পোনেন্ট অপরিবর্তিত থাকবে
const DashboardHeaderSkeleton = () => (
    <div className="flex items-center justify-between p-6 bg-[#161B22] rounded-lg shadow-md mb-8 animate-pulse">
        <div> <div className="h-8 w-48 bg-gray-700 rounded-md mb-2"></div> <div className="h-4 w-64 bg-gray-700 rounded-md"></div> </div>
        <div className="h-14 w-14 bg-gray-700 rounded-full"></div>
    </div>
);

const DashboardHeader = ({ user }) => {
    if (!user) return <DashboardHeaderSkeleton />;
    return (
        <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-gradient-to-r from-[#161B22] to-[#1a202c] rounded-lg shadow-lg border border-gray-800">
            <div className="flex-1">
                <h1 className="lg:text-2xl text-xl font-bold text-white">
                    Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{user.name}!</span>
                </h1>
                <p className="text-gray-400 hidden lg:inline text-xs lg:text-sm mt-1">Here's a summary of your account activity.</p>
            </div>
            <div className="flex items-center gap-4">
                <img src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"/>
                <button className="p-3 bg-gray-700/50 rounded-full md:hidden hover:bg-gray-700 transition-colors"><FiLogOut className="text-gray-300" size={20} /></button>
            </div>
        </div>
    );
};

const UserDashboard = () => {
    // এখানে সব স্টেটগুলো থাকবে
    const [user, setUser] = useState(null);
    const [allLevels, setAllLevels] = useState([]);
    const [userActivations, setUserActivations] = useState([]);
    const [showMobileNav, setShowMobileNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const mainContentRef = useRef(null);
    const navigate = useNavigate();

    // ডেটা ফেচ করার ফাংশনটি এখানে থাকবে
    const fetchData = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const config = { headers: { 'x-auth-token': token } };
        try {
            const [userRes, levelsRes, activationsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/users/me', config),
                axios.get('http://localhost:5000/api/levels/', config),
                axios.get('http://localhost:5000/api/levels/my-activations', config),
            ]);
            setUser(userRes.data);
            setAllLevels(levelsRes.data);
            setUserActivations(activationsRes.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    // কম্পোনেন্ট লোড হওয়ার সময় ডেটা ফেচ করা হবে
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // মোবাইল নেভিগেশন হাইড/শো করার লজিক
    useEffect(() => {
        const contentElement = mainContentRef.current;
        if (!contentElement) return;
        const handleScroll = () => {
            const currentScrollY = contentElement.scrollTop;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowMobileNav(false);
            } else {
                setShowMobileNav(true);
            }
            setLastScrollY(currentScrollY);
        };
        contentElement.addEventListener("scroll", handleScroll);
        return () => contentElement.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const getNavLinkClass = ({ isActive }) => {
        const baseClasses = 'flex items-center justify-center md:justify-start w-full md:gap-3 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out';
        return `${baseClasses} ${isActive ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/40' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`;
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#0D1117] overflow-hidden">
            {/* সাইডবার অপরিবর্তিত */}
            <aside className={`fixed bottom-0 left-0 right-0 h-16 bg-[#161B22] border-t border-gray-800 flex items-center justify-around z-50 md:relative md:flex-col md:w-64 md:h-full md:justify-start md:p-4 md:border-r md:border-t-0 transition-transform duration-300 ease-in-out ${showMobileNav ? "translate-y-0" : "translate-y-full"} md:translate-y-0`}>
                <div className="hidden md:flex items-center gap-x-2 mb-8 px-2">
                    <RiVipCrownFill className="text-4xl text-purple-400" />
                    <h2 className="text-xl font-semibold text-gray-200">Referal<span className="text-purple-400">Hut</span></h2>
                </div>
                <nav className="flex-1 w-full"><ul className="flex flex-row justify-around md:flex-col md:gap-2 w-full">
                    <li><NavLink to="/userDashboard" end className={getNavLinkClass}><FiUser size={20} /><span className="hidden md:inline">Profile</span></NavLink></li>
                    <li><NavLink to="/userDashboard/package" className={getNavLinkClass}><FiPackage size={20} /><span className="hidden md:inline">Packages</span></NavLink></li>
                    <li><NavLink to="/userDashboard/deposit" className={getNavLinkClass}><FiDownload size={20} /><span className="hidden md:inline">Deposit</span></NavLink></li>
                    <li><NavLink to="/userDashboard/withdraw" className={getNavLinkClass}><FiDownload size={20} /><span className="hidden md:inline">Withdraw</span></NavLink></li>
                    <li><NavLink to="/userDashboard/admin-dashboard" className={getNavLinkClass}><FiSettings size={20} /><span className="hidden md:inline">Admin</span></NavLink></li>
                    <li><NavLink to="/" className={getNavLinkClass}><FiHome size={20} /><span className="hidden md:inline">Home</span></NavLink></li>
                </ul></nav>

                <div className="hidden md:block mt-auto w-full">
                     <button className={`${getNavLinkClass({isActive: false})} w-full hover:bg-red-500/20 hover:text-red-400`}><FiLogOut size={20} /><span className="hidden md:inline">Logout</span></button>
                </div>
            </aside>

            {/* মূল কনটেন্ট */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="px-4 pt-6 lg:pt-8">
                    {/* এখানে আসল ইউজার ডেটা পাস করা হচ্ছে */}
                    <DashboardHeader user={user} />
                </div>
                <div ref={mainContentRef} className="flex-1 overflow-y-auto pb-20 md:pb-10">
                    {/* Outlet-কে context এর মাধ্যমে ডেটা এবং ফাংশন পাঠানো হচ্ছে */}
                    <Outlet context={{ user, allLevels, userActivations, fetchData }} />
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;