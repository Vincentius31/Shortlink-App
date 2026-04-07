import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import http from "../lib/http"; 
import { FiArrowLeft, FiLink, FiEye, FiZap, FiTrendingUp, FiGrid } from "react-icons/fi";

const CreateLinkPage = () => {
  const navigate = useNavigate();
  
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
      alert("URL must start with http:// or https://");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        original_url: originalUrl,
        slug: customSlug || undefined
      };

      const response = await http("/api/links", {
        method: "POST",
        body: payload
      });

      if (response.success) {
        alert("Link successfully created!");
        navigate("/dashboard"); 
      } else {
        alert(response.message || "Failed to create link.");
      }
    } catch (error) {
      console.error("Error creating link:", error);
      alert("An error occurred while creating the link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans">
      
      <Navbar isLoggedIn={true} activePage="dashboard" />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        
        {/* Tombol Back */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mb-6 focus:outline-none"
        >
          <FiArrowLeft size={16} /> Back to Dashboard
        </button>

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
          <form className="space-y-6" onSubmit={handleSubmit}>
            
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
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  required
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  <span className="text-blue-600 font-semibold break-all">
                    https://short.link/{customSlug || <span className="text-gray-400 font-normal italic">random-id</span>}
                  </span>
                </p>
              </div>
            </div>

            {/* Actions Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Creating..." : "Create Link"} <FiZap size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-transparent hover:bg-gray-50 text-gray-600 font-medium py-3 px-8 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

        {/* Feature Highlights (Bottom Section) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
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

      <Footer />
    </div>
  );
};

export default CreateLinkPage;