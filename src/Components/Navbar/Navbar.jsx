import React from "react"; // Removed useState and useEffect as they are no longer needed
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Removed icons that were only for the bottom nav
import { RiVipCrownFill } from "react-icons/ri";
import Navlinks from "./Navlinks";
import UserAvater from "./UserAvater";
import useAuth from "../../CustomHooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  

  const authBtn = (
    <>
      <Link to="/login">
        <button className=" primary_btn  ">
          <span>Log In</span>
        </button>
      </Link>

          <Link to="/register">
        <button className=" secondary_btn  ">
          <span>Register</span>
        </button>
      </Link>
    </>
  );

  return (
    <>

            {/* desktop layout */}
      <div className="hidden md:block bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800 shadow-2xl sticky top-0 z-50 ">
        <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 md:px-16 2xl:px-22 py-4 relative">
          <div className="navbar-start flex items-center gap-x-2">
            <RiVipCrownFill className="text-3xl seondary_text_color" />
            <h2 className="text-xl font-semibold seondary_text_color">
              Nexo<span className="primary_text_color">Next</span>
            </h2>
          </div>
          <div className="nav_link navbar-center">
            <div className="flex">
              <ul className="menu menu-horizontal px-1">
                <Navlinks />
              </ul>
            </div>
          </div>
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
              <div className="flex gap-2">
                  {authBtn}
              </div>
            )}
          </div>
        </div>
      </div>

                {/* mobail layout */}
      <div className="md:hidden bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800 shadow-lg sticky top-0 z-50 py-3">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-x-2">
            <RiVipCrownFill className="text-2xl seondary_text_color" />
            <h2 className="text-lg font-semibold seondary_text_color">
              Nexo<span className="primary_text_color">Next</span>
            </h2>
          </div>
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
            <div className="flex gap-2">
                  {authBtn}
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
