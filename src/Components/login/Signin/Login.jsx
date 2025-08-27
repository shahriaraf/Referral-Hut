import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import loginAnimation from '/public/Login.json';
import useAuth from "../../../CustomHooks/useAuth"; // <-- ১. useAuth হুক ইমপোর্ট করুন

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useAuth(); // <-- ২. Context থেকে logIn ফাংশন নিন

  const from = location.state?.from?.pathname || "/userDashboard";

  // ৩. onSubmit ফাংশনটি এখন useAuth এর logIn ব্যবহার করবে
  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password); // <-- ৪. Firebase দিয়ে লগইন করুন

      toast.success('You have successfully signed in!');
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      
      // ৫. Firebase থেকে আসা এরর হ্যান্ডেল করা
      let errorMessage = 'Login failed. Please try again.';
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
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
        {/* Login Form UI অপরিবর্তিত থাকবে */}
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-300">Sign in to your account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errors.root?.serverError && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg">
                  {errors.root.serverError.message}
                </p>
              )}
              {/* ... বাকি ফর্মের কোড অপরিবর্তিত ... */}
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Invalid email address" } })} className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'}`} placeholder="Enter your email" />
                </div>
                {errors.email && (<p className="text-red-400 text-sm mt-1">{errors.email.message}</p>)}
              </div>
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50'}`} placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"><FaEyeSlash /></button>
                </div>
                {errors.password && (<p className="text-red-400 text-sm mt-1">{errors.password.message}</p>)}
              </div>
              {/* Submit Button & Links */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">Forgot your password?</Link>
              </div>
              <div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <TbFidgetSpinner className="animate-spin mx-auto text-xl" /> : "Sign In"}
                </button>
              </div>
              <div className="text-center pt-4">
                <p className="text-gray-300">Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">Create one here</Link></p>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block w-96 h-96"><Lottie animationData={loginAnimation} loop={true} className="w-full h-full" /></div>
      </div>
    </div>
  );
};

export default Login;