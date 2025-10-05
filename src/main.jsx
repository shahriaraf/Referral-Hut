import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS ইম্পোর্ট করা ভালো

// Context


// Layouts
import MainLayout from './Layout/MainLayout.jsx';
import UserDashboard from './Layout/Dashboard/UserDashboard.jsx';

// Routes & Components
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Home from './HomePage/Home.jsx';
import Login from './Components/login/Signin/Login.jsx';
import Signup from './Components/login/Signup/Register.jsx';
import Profile from './Components/profile/Profile.jsx';
import Packages from './Route Programs/Programes/Pakages.jsx';
import Deposit from './Deposit/Deposit.jsx';
import Withdraw from './Withdraw/Withdraw.jsx';
import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard.jsx';
import WithdrawalAdminPanel from './Withdraw/WithdrawAdmin.jsx';
import DepositAdminPanel from './Deposit/DepositAdmin.jsx';
import Admin3PLevels from './Components/ThreePLevel/ThreePLevel.jsx';
import Admin6PLevels from './Components/sixplevel/SixPLevel.jsx';
import AllUsers from './Components/AllUsers.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';
import SendGift from './Components/SendGift.jsx';
// SignOut কম্পোনেন্ট আর প্রয়োজন নেই, তাই ইম্পোর্ট সরানো হলো

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
    ],
  },
  {
    path: '/userDashboard',
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "package",
        element: <Packages />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "admin-withdraw",
        element: <WithdrawalAdminPanel />,
      },
      {
        path: "admin-deposit",
        element: <DepositAdminPanel />,
      },
      {
        path: "admin-3p",
        element: <Admin3PLevels />,
      },
      {
        path: "admin-6p",
        element: <Admin6PLevels />,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "send-gifts",
        element: <SendGift></SendGift>,
      },
      // অপ্রয়োজনীয় 'sign-out' রাউটটি সরিয়ে ফেলা হয়েছে
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);