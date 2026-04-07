import React, { useState } from "react";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc] font-sans">
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 sm:mb-8 tracking-tight">
          ShortLink
        </h1>

        {/* Card Login */}
        <div className="bg-white w-full max-w-105 rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Please enter your details to sign in.
          </p>

          <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 mt-2 transition-colors"
            >
              Log In <FiArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5 sm:my-6">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="px-3 sm:px-4 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
              Or continue with
            </span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>

          {/* Tombol Google */}
          <button
            type="button"
            className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>
        </div>

        {/* Tautan Sign Up */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
          Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">sign up</a>
        </p>

      </main>

      <Footer variant="login" />
      
    </div>
  );
};

export default LoginPage;