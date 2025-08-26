import React from "react";

import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";

const DashboardRedirect = () => {
  const user = true;

  if (!user) {
    return <Loading></Loading>;
  }

  if (user) {
    return <Navigate to="/dashboard/home"></Navigate>;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default DashboardRedirect;

// if(role === 'admin'){
//        return <Navigate to='/dashboard/admin'></Navigate>
// }else if(role === 'student'){
//     return <Navigate to='/dashboard/student'></Navigate>
// }else{
//       return <Navigate to='/dashboard/teacher'></Navigate>
// }
