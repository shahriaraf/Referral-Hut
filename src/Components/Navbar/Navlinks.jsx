import React from 'react';
import { NavLink } from 'react-router-dom';

const Navlinks = () => {
      const navLinks = (
    <>
      <li className="text-base text-purple-600 hover:text-white transition-all ease-in-out  font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-base text-purple-600 hover:text-white transition-all ease-in-out  font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/allClass">All Class</NavLink>
      </li>
      <li className="text-base text-purple-600 hover:text-white transition-all ease-in-out  font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/TeachOn">Teach On</NavLink>
      </li>
      <li className="text-base text-purple-600 hover:text-white transition-all ease-in-out  font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

    return   navLinks;
};

export default Navlinks;