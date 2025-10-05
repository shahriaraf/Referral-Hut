import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";


const MainLayout = () => {
  const location = useLocation();
  
  // Define routes where navbar and footer should be hidden
  const authRoutes = ['/login', '/register'];
  
  // Check if current route is an auth route
  const isAuthRoute = authRoutes.includes(location.pathname.toLowerCase());

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!isAuthRoute && <Navbar />}

      <Outlet />

      
      {/* Conditionally render Footer */}
      {!isAuthRoute && <Footer />}

    </div>
  );
};

export default MainLayout;