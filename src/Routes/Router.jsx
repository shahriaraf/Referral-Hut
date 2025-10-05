// import { createBrowserRouter } from "react-router-dom";

// import MainLayout from "../Layout/MainLayout.jsx";
// import Home from "../HomePage/Home.jsx";
// import RoutePrograms from "../Route Programs/RoutePrograms.jsx";

// import Withdraw from "../Withdraw/Withdraw.jsx";
// import Profile from "../Components/profile/Profile.jsx";
// import Signup from "../Components/login/Signup/Signup.jsx";
// import Login from "../Components/login/Signin/Login.jsx";
// import PrivateRoute from "../Routes/PrivateRoute.jsx";
// // import UserDashboard from "../Layout/Dashboard/UserDashboard.jsx";
// // import UserHome from "../DashbordHome/UserHome.jsx";
// import Deposit from "../Deposit/Deposit";
// import DashboardLayout from "../Layout/DashboardLayout.jsx";
// import DashboardRedirect from "../Dashboard/DashboardRedirect.jsx";
// import DashboardHome from "../Dashboard/UserDashboard/DashboardHome.jsx";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },

//       {
//         path: "/withdraw",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <Withdraw></Withdraw>{" "}
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/profile",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <Profile></Profile>{" "}
//           </PrivateRoute>
//         ),
//       },

//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/register",
//         element: <Signup></Signup>,
//       },
//     ],
//   },

//   // dashboard route
//   {
//     path: "dashboard",
//     element: <DashboardLayout></DashboardLayout>,
//     children: [
//       {
//         path: "/dashboard",
//         element: <DashboardRedirect></DashboardRedirect>,
//       },

//           {
//         path: "/dashboard/home",
//         element: <DashboardHome />,
//       },

//       {
//         path: "/dashboard/package",
//         element: <RoutePrograms />,
//       },
//       {
//         path: "/dashboard/deposit",
//         element: <Deposit />,
//       },
//     //   {
//     //     index: true,
//     //     element: <UserHome />,
//     //   },
//     ],
//   },
// ]);
