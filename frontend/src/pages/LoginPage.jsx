import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Login data:", data);
    // TODO: Integrate with backend API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 font-sans">
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">ShortLink</span>
        </Link>

        {/* Card Login */}
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-600 transition-colors ${
                  errors.email 
                    ? "border-red-300 focus:ring-red-500/20" 
                    : "border-gray-200 focus:ring-blue-600/20"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-600 transition-colors ${
                    errors.password 
                      ? "border-red-300 focus:ring-red-500/20" 
                      : "border-gray-200 focus:ring-blue-600/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 mt-2 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  Log In <FiArrowRight size={18} />
                </>
              )}
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
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </main>

      <Footer variant="login" />
      
    </div>
  );
};

export default LoginPage;