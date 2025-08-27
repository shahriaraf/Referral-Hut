import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHashtag } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import axios from 'axios';
import { toast } from "react-toastify";
import registerAnimation from "/public/register.json";
import useAuth from "../../../CustomHooks/useAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { creatUser, updateUserProfile } = useAuth();

  const onSubmit = async (data) => {
    try {
      // Step 1: Create user in Firebase
      const result = await creatUser(data.email, data.password);
      await updateUserProfile(data.name);
      
      // Step 2: Send user data to your custom backend
      const userData = {
        name: data.name,
        email: data.email,
        // <-- CHANGED: Key is 'referredBy' and it's parsed to a number
        referredBy: data.referralId ? parseInt(data.referralId, 10) : null,
        firebaseUid: result.user.uid,
        myReferrals: [],
        role: "user",
        Date: new Date().toLocaleString(),
      };
      
      // <-- CHANGED: Corrected API endpoint URL
      await axios.post('http://localhost:5000/api/referral-creat-user', userData);
      
      toast.success('Your account has been created successfully!');
      navigate('/userDashboard');

    } catch (err) {
      console.error(err);

      let errorMessage = 'Registration failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message; // Error from your backend
      }

      setError('root.serverError', {
        type: 'manual',
        message: errorMessage
      });
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-300">Join us today and get started</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errors.root?.serverError && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">
                  {errors.root.serverError.message}
                </p>
              )}
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                <div className="relative"><FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" {...register("name", { required: "Name is required" })} className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name ? "border-red-500 focus:ring-red-500/50" : "border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50"}`} placeholder="Enter your full name" /></div>
                {errors.name && (<p className="text-red-400 text-sm mt-1">{errors.name.message}</p>)}
              </div>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <div className="relative"><FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="email" {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid email" } })} className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email ? "border-red-500 focus:ring-red-500/50" : "border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50"}`} placeholder="Enter your email" /></div>
                {errors.email && (<p className="text-red-400 text-sm mt-1">{errors.email.message}</p>)}
              </div>
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative"><FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password ? "border-red-500 focus:ring-red-500/50" : "border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50"}`} placeholder="Create a strong password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div>
                {errors.password && (<p className="text-red-400 text-sm mt-1">{errors.password.message}</p>)}
              </div>
              {/* Referral ID Field (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Referral ID <span className="text-gray-400 text-xs">(Optional)</span></label>
                <div className="relative"><FaHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" {...register("referralId")} className="w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50" placeholder="Enter referral ID if you have one" /></div>
              </div>
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (<TbFidgetSpinner className="animate-spin mx-auto text-xl" />) : "Create Account"}
                </button>
              </div>
              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-300">
                  Already have an account?{" "}
                  <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block w-[450px] h-[450px]"><Lottie animationData={registerAnimation} loop={true} className="w-full h-full" /></div>
      </div>
    </div>
  );
};

export default Signup;