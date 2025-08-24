import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className='flex'>
            <div className='w-64 min-h-full bg-purple-500'>
                <ul className='menu'>
                    <li>
                        <NavLink to="" end className={({ isActive }) => isActive ? 'text-white font-bold' : 'text-gray-200'}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="package" className={({ isActive }) => isActive ? 'text-white font-bold' : 'text-gray-200'}>
                            Packages
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="deposit" className={({ isActive }) => isActive ? 'text-white font-bold' : 'text-gray-200'}>
                            Deposit
                        </NavLink>
                    </li>
                </ul>

            </div>
            <div className='flex-1'>
                <Outlet />
            </div>

        </div>
    );
};

export default UserDashboard;