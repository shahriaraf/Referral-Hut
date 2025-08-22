import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaSearch, FaSearchDollar, FaUserCircle } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";


// import nav__logo from "../../assets/navLogo/Nav_logo.png";
import Navlinks from "./Navlinks";
import UserAvater from "./UserAvater";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const user = true;

  const handleMenuIcon = () => setIsActive(true);

  return (
  <div className="primary_bg_color border-b shadow-2xl sticky top-0 z-50 py-2">
  <div className="navbar px-4 sm:px-6 md:px-16 2xl:px-22 py-3 relative">

    {/* Logo - navbar-start */}
    <div className="navbar-start flex items-center gap-x-2">
      <RiVipCrownFill className="text-3xl seondary_text_color" />
      <h2 className="text-xl font-semibold seondary_text_color">
        Referal<span className="primary_text_color">Hut</span>
      </h2>
    </div>

    {/* Navlinks - navbar-center */}
    <div className=" nav_link navbar-center">
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <Navlinks />
        </ul>
      </div>
    </div>

    {/* User Avatar - navbar-end */}
    <div className="navbar-end flex items-center gap-x-4">
      {/* Mobile Menu Icon */}
      <div className="md:hidden text-4xl cursor-pointer primary_text_color">
        {!isActive && <IoMenu onClick={handleMenuIcon} />}
      </div>

      {/* Desktop Avatar */}
      <div className="hidden md:block">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
                <FaUserCircle className="w-[35px] h-[35px] rounded-full  primary_text_color "> </FaUserCircle>
                {/* className="" */}
            </div>
            <div
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#151C2B]  rounded-box z-1 mt-3 w-52 p-0 shadow-lg border border-gray-600"
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

    {/* Mobile Sidebar */}
    <div
      tabIndex={0}
      className={`h-[100vh] bg-black/30 absolute left-0 top-0 transition-all duration-300 ease-in-out ${
        isActive ? "w-full" : "w-0 overflow-hidden"
      }`}
      onClick={() => setIsActive(false)}
    >
      <div
        className={`h-full bg-gradient-to-b from-[#151C2B] via-[#2C3548] to-gray-800 px-5 transition-all duration-500 ease-in-out ${
          isActive ? "w-[80%]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center pt-2 mb-6">
                {/* logo */}

                    <div className="navbar-start pl-3 flex items-center gap-x-2">
      <RiVipCrownFill className="text-3xl seondary_text_color" />
      <h2 className="text-xl font-semibold seondary_text_color">
        Referal<span className="primary_text_color">Hut</span>
      </h2>
    </div>


          <MdClose
            className="text-5xl pr-4 cursor-pointer primary_text_color"
            onClick={() => setIsActive(false)}
          />
        </div>
                    {/* sidebar navlinks */}
        <ul className="nav_link">
          <Navlinks />
        </ul>
        <div className="divider"></div>

        {user ? (
          <div className="responsive_user_avater pl-4">
            <div className="img flex items-center gap-x-3 mb-5">
                      <FaUserCircle className="w-[35px] h-[35px] rounded-full  primary_text_color "> </FaUserCircle>
                            <h2 className="text-xl capitalize primary_text_color">Jon Doe</h2>
              <div>
                {/* <p className="capitalize">{user?.displayName}</p> */}
                {/* <p className="text-sm">{data?.role}</p> */}
              </div>
            </div>
            <div className="avater_link ">
              <UserAvater />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Link to="signIn">
              <button className="secondary_btn uppercase">
                <span>Log In / Sign Up</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Navbar;
