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

import Withdraw from './Withdraw/Withdraw.jsx';
import Profile from './Components/profile/Profile.jsx';
import Signup from './Components/login/Signup/Signup.jsx';
import Login from './Components/login/Signin/Login.jsx';
import AuthProvier from './Context/AuthProvier.jsx';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import UserDashboard from './Layout/Dashboard/UserDashboard.jsx';
import UserHome from './DashbordHome/UserHome.jsx';
import Deposit from './Deposit/Deposit';

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
        path: "/withdraw",
        element:  <PrivateRoute> <Withdraw></Withdraw> </PrivateRoute>
      },
       {
        path: "/profile",
        element:  <PrivateRoute> <Profile></Profile> </PrivateRoute>
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
    path:'userDashboard',
    element:<PrivateRoute><UserDashboard/></PrivateRoute>,
    children:[
       {
        path: "package",
        element:  <RoutePrograms />
      },
      {
        path: "deposit",
        element: <Deposit />
      },
  
      
    ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
        <AuthProvier>
            <RouterProvider router={router} />
                  <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvier>

  </StrictMode>,
)
