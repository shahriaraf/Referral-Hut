import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import useAuth from './../../CustomHooks/useAuth';

const UserAvater = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    });

    if (result.isConfirmed) {
      try {
        await logout(); // Auth logout function
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/login'); // Redirect to login page
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong.",
          icon: "error"
        });
      }
    }
  };

  return (
    <>
      <Link
        to="/userDashboard"
        className="text-base font-semibold capitalize primary_text_color flex items-center gap-x-3 px-2 py-3 hover:bg-gray-950"
      >
        <MdDashboard /> Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className="w-full text-left text-base font-semibold capitalize primary_text_color flex items-center gap-x-3 px-2 py-3 hover:bg-gray-950"
      >
        <FaSignOutAlt /> Logout
      </button>
    </>
  );
};

export default UserAvater;
