import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiArrowRight, FiLink, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Modal from "../components/Modal"; 
import http from "../lib/http";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords do not match")
    .required("Confirm password is required")
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
  });

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");

    try {
      const result = await http("/api/register", {
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
          confirm_password: data.confirmPassword
        }
      });

      if (result && result.success) {
        setModalConfig({
          isOpen: true,
          title: "Registration Successful!",
          message: "Your account has been created. Please log in to continue.",
          type: "success",
          onConfirm: () => navigate("/login"),
        });
      } else {
        setApiError(result.message || "Failed to register");
      }
    } catch (error) {
      console.error("Register error:", error);
      setApiError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc] font-sans">

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">

        {/* Logo Ikon */}
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full mb-4 sm:mb-6">
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
        <div className="bg-white w-full max-w-105 rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {apiError && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 border border-red-200 text-sm">
              {apiError}
            </div>
          )}

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  {...register("password")}
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
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
              <p className="mt-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                Minimum 6 characters
              </p>
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
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  {...register("confirmPassword")}
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
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Tombol Sign Up */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1d58d8] hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 mt-2 sm:mt-4 transition-colors"
            >
              {isLoading ? "Creating account..." : "Sign Up"} <FiArrowRight size={18} />
            </button>

            {/* Disclaimer */}
            <p className="text-base sm:text-xs text-center text-gray-500 mt-4 leading-relaxed">
              By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>

        {/* Tautan Login */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </p>

      </main>

      <Footer variant="register" />

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
      />
    </div>
  );
};

export default RegisterPage;