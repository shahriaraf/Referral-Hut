import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import Lottie from "lottie-react";
import login from '/public/register.json'

const Signup = () => {
const [loading, setLoading] = useState(false);   
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    return (
       <div className="hero  bg-slate-800
    hover:shadow-purple-500
    text-fuchsia-600 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
 <div className=" w-96 h-96">
      <Lottie animationData={login} loop={true} />

    </div>        </div>
        <div className="card bg-slate-700 text-xl
    text-gray-200  w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body ">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                aria-label="Enter your name"
                {...register("name", { required: true })}
                className="input bg-slate-800 input-bordered"
              />
              {errors.name && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input bg-slate-800 input-bordered"
              />
              {errors.email && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                })}
                className="input bg-slate-800 input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">The password must be at least 6 characters</span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">The password must not exceed 20 characters</span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  The password must include one uppercase, one lowercase, one digit, and one special character
                </span>
              )}
              <label className="label">
                <button
                //   onClick={() => navigate("/reset-password")}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </button>
              </label>
            </div>
            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                {...register("file", { required: true })}
                className="file-input bg-slate-800  w-full max-w-xs"
              />
              {errors.file && <span className="text-red-600">Please upload an image file</span>}
            </div>
            <div className="form-control w-fit mx-auto mt-6">
              <button type="submit" className="btn rounded-xl px-8 text-white bg-slate-800">
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className=' w-fit mx-auto mb-4'>
            <button  className="flex bg-slate-800 text-white items-center btn">
              <FaGoogle className="mr-2 text-amber-400" />
          {loading ? "Loading..." : "Login with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Signup