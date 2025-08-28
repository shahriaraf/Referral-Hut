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
import Signup from './Components/login/Signup/Signup.jsx';
import Login from './Components/login/Signin/Login.jsx';
import AuthProvier from './Context/AuthProvier.jsx';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import UserDashboard from './Layout/Dashboard/UserDashboard.jsx';
import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Admin3PLevels from './Components/ThreePLevel/ThreePLevel.jsx';
import Admin6PLevels from './Components/sixplevel/SixPLevel.jsx';
import AdminVIPLevels from './Components/viplevel/VipLevel.jsx';
import WithdrawalAdminPanel from './Withdraw/WithdrawAdmin.jsx';
import DepositAdminPanel from './Deposit/DepositAdmin.jsx';

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
    element:<UserDashboard/>,
    children:[
       {
        path: "package",
        element:  <RoutePrograms />
      },
       {
        path: "deposit",
        element: <Deposit />
      },
      {
       index: true,
        element: <Profile/>
      },
       {
        path: "withdraw",
        element:  <Withdraw/>
      },
      {
        path : 'admin-dashboard',
        element : <AdminDashboard></AdminDashboard>
      },
      {
        path :   "/userDashboard/admin-withdraw",
        element : <WithdrawalAdminPanel></WithdrawalAdminPanel>
      },
      {
        path :   "/userDashboard/admin-deposit",
        element : <DepositAdminPanel></DepositAdminPanel>
      },
      {
        path : 'admin-3p',
        element : <Admin3PLevels></Admin3PLevels>
      },
      {
        path : 'admin-6p',
        element : <Admin6PLevels></Admin6PLevels>
      },
      {
        path : 'admin-vip',
        element : <AdminVIPLevels></AdminVIPLevels>
      },
    ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>  

   <AuthProvier>
            <RouterProvider router={router} />
                  <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvier>
   </QueryClientProvider>
     

  </StrictMode>,
)
