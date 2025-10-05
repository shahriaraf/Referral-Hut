import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../CustomHooks/useAuth';
import Loading from '../Components/Loading';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const toastShown = useRef(false); // Track if toast has been shown

  useEffect(() => {
    if (!loading && !user && !toastShown.current) {
      toast.error('You must be logged in to access this page!');
      toastShown.current = true; // Mark toast as shown
    }
    
    // Reset when user logs in
    if (user) {
      toastShown.current = false;
    }
  }, [loading, user]);

  if (loading) {
    return <Loading/>;
  }

  if (!user) {
    return <Navigate to="/logIn" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;