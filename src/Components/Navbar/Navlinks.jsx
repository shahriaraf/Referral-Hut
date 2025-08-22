import React from 'react';
import { NavLink } from 'react-router-dom';

const Navlinks = () => {
      const navLinks = (
    <>
      <li className="text-base font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-base font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/package">Pakage</NavLink>
      </li>
      <li className="text-base font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/deposit">Doposit</NavLink>
      </li>
      <li className="text-base font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/withdraw">Withdraw</NavLink>
      </li>
      <li className="text-base font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="text-base font-semibold capitalize md:mx-3 py-2 lg:py-0 cursor-pointer">
        <NavLink to="/register">Register</NavLink>
      </li>
     
    </>
  );

    return   navLinks;
};

export default Navlinks;