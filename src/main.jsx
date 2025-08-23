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
        path: "/package",
        element: <RoutePrograms />
      },
       {
        path: "/Deposit",
        element: <Deposit></Deposit>
      },
       {
        path: "/withdraw",
        element: <Withdraw></Withdraw>
      },
       {
        path: "/profile",
        element: <Profile></Profile>
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className=' '>
          <RouterProvider router={router} />
      </div>
  </StrictMode>,
)
