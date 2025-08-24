import React from 'react';
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../CustomHooks/useAuth';
import Swal from 'sweetalert2';

const UserAvater = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Logging out will end your session. You’ll need to log in again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!"
    });

    if (result.isConfirmed) {
      try {
        await logOut(); // Auth logout function
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/'); // Redirect to login page
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong.",
          icon: "error"
        });
      }
    }
  };

  const avaterLinks = (
    <>
      <Link
        to="/profile"
        className="text-base font-semibold capitalize primary_text_color flex items-center gap-x-3 px-2 py-3 hover:bg-gray-950"
      >
        <FaUser /> Profile
      </Link>
      <Link
        to="/userDashboard"
        className="text-base font-semibold capitalize primary_text_color flex items-center gap-x-3 px-2 py-3 hover:bg-gray-950"
      >
        <MdDashboard /> Dashboard
      </Link>
      <button
        onClick={handleLogOut}
        className="w-full text-left text-base font-semibold capitalize primary_text_color flex items-center gap-x-3 px-2 py-3 hover:bg-gray-950"
      >
        <FaSignOutAlt /> Logout
      </button>
    </>
  );

  return avaterLinks;
};

export default UserAvater;
