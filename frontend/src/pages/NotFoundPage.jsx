import React from "react";
import Footer from "../components/Footer";
import { 
  FiArrowLeft, 
  FiLink, 
  FiAlertTriangle, 
  FiBarChart2, 
  FiCodepen 
} from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans relative z-0 overflow-hidden">
      
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-4xl mx-auto text-center mt-10">
        
        <div className="relative mb-8 mt-10">
          <div className="w-24 h-24 bg-gray-100/80 rounded-full flex items-center justify-center relative overflow-hidden">
            <FiLink size={40} className="text-gray-400" />
            <div className="absolute w-16 h-1 bg-[#fbfcfd] border-t-2 border-gray-400 transform -rotate-45 shadow-sm"></div>
          </div>
          
          {/* Badge Biru Alert */}
          <div className="absolute -top-1 -right-3 bg-[#1d58d8] text-white p-2 rounded-lg transform rotate-12 shadow-md border-2 border-white">
            <FiAlertTriangle size={16} strokeWidth={3} />
          </div>
        </div>

        {/* Teks Header */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1d58d8] mb-3 tracking-tight">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
          The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-24 w-full px-4">
          <button className="w-full sm:w-auto bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
            <FiArrowLeft size={18} /> Go to Dashboard
          </button>
          <button className="w-full sm:w-auto bg-white border border-gray-200 text-[#1d58d8] font-medium py-3 px-6 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm">
            Report an Issue
          </button>
        </div>

        {/* Quick Links Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left flex flex-col gap-3 hover:shadow-md transition-shadow">
            <FiBarChart2 className="text-[#1d58d8]" size={20} strokeWidth={2.5} />
            <h3 className="text-sm font-bold text-gray-900 mt-1">Check Analytics</h3>
            <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
              Track your active links and traffic sources in real-time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left flex flex-col gap-3 hover:shadow-md transition-shadow">
            <FiLink className="text-[#1d58d8]" size={20} strokeWidth={2.5} />
            <h3 className="text-sm font-bold text-gray-900 mt-1">New ShortLink</h3>
            <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
              Create a brand new architected URL in seconds.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left flex flex-col gap-3 hover:shadow-md transition-shadow">
            <FiCodepen className="text-[#1d58d8]" size={20} strokeWidth={2.5} />
            <h3 className="text-sm font-bold text-gray-900 mt-1">Developer API</h3>
            <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
              Integrate our link infrastructure into your apps.
            </p>
          </div>

        </div>

      </main>

      <Footer />
      
    </div>
  );
};

export default NotFoundPage;