import React from "react";
import { FiArrowRight, FiLink } from "react-icons/fi";
import Footer from "../components/Footer";

const RegisterPage = () => {
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
          <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                required
              />
              <p className="mt-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                Minimum 6 characters
              </p>
            </div>

            {/* Input Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                required
              />
            </div>

            {/* Tombol Sign Up */}
            <button
              type="submit"
              className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 mt-2 sm:mt-4 transition-colors"
            >
              Sign Up <FiArrowRight size={18} />
            </button>

            {/* Disclaimer */}
            <p className="text-base sm:text-xs text-center text-gray-500 mt-4 leading-relaxed">
              By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>

        {/* Tautan Login */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          Already have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Log in</a>
        </p>

      </main>

      <Footer variant="register" />

    </div>
  );
};

export default RegisterPage;