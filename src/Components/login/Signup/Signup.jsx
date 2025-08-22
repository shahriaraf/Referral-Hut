import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaImage } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import login from '/public/register.json'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        
        {/* Signup Form */}
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-300">Join us today and get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    {...register("name", { 
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must not exceed 20 characters"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                        message: "Password must include uppercase, lowercase, digit, and special character"
                      }
                    })}
                    className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Profile Image
                </label>
                <div className="relative">
                  <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <input
                    type="file"
                    accept="image/*"
                    {...register("file", { required: "Please upload a profile image" })}
                    onChange={handleFileChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.file 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'
                    }`}
                  />
                </div>
                {selectedFile && (
                  <p className="text-green-400 text-sm mt-1 flex items-center">
                    <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                    {selectedFile.name}
                  </p>
                )}
                {errors.file && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.file.message}
                  </p>
                )}
              </div>

             

              {/* Submit Buttons */}
              <div className="space-y-4">
                {/* Signup Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin mx-auto text-xl" />
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Signup Button */}
                <button 
                  type="button"
                  disabled={loading}
                  className="w-full py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  <FaGoogle className="text-red-400" />
                  {loading ? "Loading..." : "Sign up with Google"}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="hidden lg:block w-[450px] h-[450px]">
          <Lottie 
            animationData={login} 
            loop={true} 
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;