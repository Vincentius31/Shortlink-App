import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FiArrowLeft,
  FiLink,
  FiEye,
  FiZap,
  FiTrendingUp,
  FiGrid
} from "react-icons/fi";

const CreateLinkPage = () => {
  // State untuk mengontrol live preview dari custom slug
  const [customSlug, setCustomSlug] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans">

      <Navbar isLoggedIn={true} activePage="dashboard" />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Tombol Back */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mb-6"
        >
          <FiArrowLeft size={16} /> Back to Dashboard
        </a>

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Create New Short Link
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Transform your long URLs into clean, manageable assets.
          </p>
        </div>

        {/* Card Form Utama */}
        <div className="bg-white border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] rounded-2xl p-6 sm:p-8 mb-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* Input Destination URL */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-widest uppercase mb-2">
                Destination URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiLink size={18} />
                </div>
                <input
                  type="url"
                  placeholder="https://example.com/your-long-url-here"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  required
                />
              </div>
              <p className="mt-2 text-[11px] italic text-gray-400">
                Ensure your URL starts with http:// or https://
              </p>
            </div>

            {/* Input Custom Slug */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-widest uppercase mb-2">
                Custom Slug (Optional)
              </label>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-shadow">
                <span className="bg-gray-50 px-4 py-3 border-r border-gray-200 text-gray-600 text-sm font-medium flex items-center">
                  short.link/
                </span>
                <input
                  type="text"
                  placeholder="my-custom-slug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm outline-none placeholder-gray-300"
                />
              </div>
              <p className="mt-2 text-[11px] italic text-gray-400">
                Leave blank to generate a random unique identifier.
              </p>
            </div>

            {/* Live Preview Box */}
            <div className="bg-[#f5f8fc] border border-blue-100 rounded-lg p-4 sm:p-5 flex gap-3 items-start mt-2">
              <div className="text-blue-600 mt-0.5">
                <FiEye size={18} />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-1">
                  Live Preview
                </h4>
                <p className="text-sm text-gray-700">
                  Your short link will be:{" "}
                  <a href="#" className="text-blue-600 font-semibold break-all">
                    https://short.link/{customSlug || <span className="text-gray-400 font-normal italic">random-id</span>}
                  </a>
                </p>
              </div>
            </div>

            {/* Actions Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Create Link <FiZap size={16} />
              </button>
              <button
                type="button"
                className="w-full sm:w-auto bg-transparent hover:bg-gray-50 text-gray-600 font-medium py-3 px-8 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

        {/* Feature Highlights (Bottom Section) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">

          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full shrink-0 mt-1">
              <FiTrendingUp size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Real-time Analytics</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Track every click, geographical location, and referral source instantly.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-full shrink-0 mt-1">
              <FiGrid size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Auto-generated QR</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Every link automatically creates a high-resolution QR code for print.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Utama */}
      <Footer />

    </div>
  );
};

export default CreateLinkPage;