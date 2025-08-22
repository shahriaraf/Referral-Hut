import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import login from '/public/Login.json'
import Lottie from "lottie-react";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };
  return (
    <div className="flex p-6 justify-center gap-10 text-white items-center h-screen bg-slate-800">
      <div className="p-6  bg-slate-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="  rounded-xl  w-[350px] s"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {/* Email Field */}
          <div className=" py-3">
            <label className="block py-2 text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="input bg-slate-800 input-bordered"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className=" pb-3">
            <label className="block py-2 text-sm font-medium ">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input  bg-slate-800 input-bordered"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
     <div className=" flex justify-center items-center  ">
            <div className=" w-fit mx-auto">
            <button type="submit" className="btn rounded-xl px-8 w-full text-white bg-slate-800">
                        {loading ? (
                          <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner>
                        ) : (
                          "login"
                        )}
                      </button>
         </div>
          <div className=" w-fit mx-auto ">
          <button className="flex bg-slate-800 text-white items-center btn">
            <FaGoogle className="mr-2 text-amber-400" />
            {loading ? "Loading..." : "Login with Google"}
          </button>
        </div>
     </div>

          <p className=" mb-3 ml-5">
            <small>
              New Here?<Link to="/signup">Create an account</Link>
            </small>
          </p>
        </form>
       
      </div>
    <div className="w-64 h-64">
      <Lottie animationData={login} loop={true} />

    </div>
    </div>
  );
};

export default Login;
