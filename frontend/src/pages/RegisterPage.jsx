import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiArrowRight, FiLink, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Register data:", data);
    // TODO: Integrate with backend API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 font-sans">

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">

        {/* Logo Ikon */}
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl mb-4 sm:mb-6 shadow-lg shadow-blue-500/25">
          <FiLink size={24} strokeWidth={3} />
        </div>

        {/* Header Teks */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 text-center">
          Join the elite architects of the web.
        </p>

        {/* Card Form */}
        <div className="bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-100 p-6 sm:p-8">
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
                    : "border-gray-300 focus:ring-blue-600/20"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-600 transition-colors ${
                    errors.password 
                      ? "border-red-300 focus:ring-red-500/20" 
                      : "border-gray-300 focus:ring-blue-600/20"
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

            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-600 transition-colors ${
                    errors.confirmPassword 
                      ? "border-red-300 focus:ring-red-500/20" 
                      : "border-gray-300 focus:ring-blue-600/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Tombol Sign Up */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 mt-2 sm:mt-4 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  Sign Up <FiArrowRight size={18} />
                </>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>

        {/* Tautan Login */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>

      </main>

      <Footer variant="register" />

    </div>
  );
};

export default RegisterPage;