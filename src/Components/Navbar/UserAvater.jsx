import React from 'react';

import { FaSignOutAlt, FaUser } from "react-icons/fa";
import {MdDashboard } from "react-icons/md";

import { Link } from 'react-router-dom';

const UserAvater = () => {
    // const {user,logOut} = useAuth();

      const avaterLinks = (
        <>
          <Link
            to="/profile"
            className="text-base font-semibold capitalize primary_text_color flex items-center gap-x-3  px-2 py-3  hover:bg-gray-950"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/dashboard"
            className="text-base font-semibold capitalize primary_text_color flex items-center gap-x-3  px-2 py-3 hover:bg-gray-950"
          >
            <MdDashboard /> Dashboard
          </Link>
          <Link
            // onClick={logOut}
            className="text-base font-semibold capitalize primary_text_color flex items-center gap-x-3  px-2 py-3 hover:bg-gray-950"
          >
            <FaSignOutAlt /> Logout
          </Link>
        </>
      );


    return avaterLinks;
};

export default UserAvater;