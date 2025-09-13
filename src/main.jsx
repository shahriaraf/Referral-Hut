import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout.jsx';
import Home from './HomePage/Home.jsx';
import RoutePrograms from './Route Programs/RoutePrograms.jsx';
import Deposit from './Deposit/Deposit.jsx';
import Withdraw from './Withdraw/Withdraw.jsx';
import Profile from './Components/profile/Profile.jsx';
import Signup from './Components/login/Signup/Register.jsx';
import Login from './Components/login/Signin/Login.jsx';
import { ToastContainer } from 'react-toastify';
import UserDashboard from './Layout/Dashboard/UserDashboard.jsx';
import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Admin3PLevels from './Components/ThreePLevel/ThreePLevel.jsx';
import Admin6PLevels from './Components/sixplevel/SixPLevel.jsx';
import AdminVIPLevels from './Components/viplevel/VipLevel.jsx';
import WithdrawalAdminPanel from './Withdraw/WithdrawAdmin.jsx';
import DepositAdminPanel from './Deposit/DepositAdmin.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';
import Packages from './Route Programs/Programes/Pakages.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';


const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
  path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      
      
     
     
       {
        path: "/login",
        element: <Login></Login>
      },
       {
        path: "/register",
        element: <Signup></Signup>
      },
    ]
  },
{
  path:'/userDashboard',
  element:<PrivateRoute><UserDashboard/></PrivateRoute>,
  children:[
    { index: true, element: <Profile /> },
    { path: "package", element: <Packages /> },
    { path: "deposit", element: <Deposit /> },
    { path: "withdraw", element: <Withdraw /> },
    { path: "admin-dashboard", element: <AdminDashboard /> },
    { path: "admin-withdraw", element: <WithdrawalAdminPanel /> },
    { path: "admin-deposit", element: <DepositAdminPanel /> },
    { path: "admin-3p", element: <Admin3PLevels /> },
    { path: "admin-6p", element: <Admin6PLevels /> },
    { path: "admin-vip", element: <AdminVIPLevels /> },
  ]
}

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>  

   <AuthProvider>
            <RouterProvider router={router} />
                  <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
   </QueryClientProvider>
     

  </StrictMode>,
)
