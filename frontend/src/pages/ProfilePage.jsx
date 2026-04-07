import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FiEdit2, 
  FiLink, 
  FiBell, 
  FiShield, 
  FiLogOut 
} from "react-icons/fi";

const ProfilePage = () => {
  // State untuk toggle switch notifikasi
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans">
      
      {/* Navbar Mode Login */}
      <Navbar isLoggedIn={true} activePage="" />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Section Label */}
        <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 pl-2">
          Account Management
        </h3>

        {/* Profile Card Utama */}
        <div className="bg-white border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] rounded-2xl p-6 sm:p-8 mb-6">
          
          {/* Header Profile & Badge */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Profile
            </h2>
            <span className="bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Pro Member
            </span>
          </div>

          {/* User Info Section */}
          <div className="flex items-center gap-5 mb-8">
            {/* Avatar dengan Edit Button */}
            <div className="relative">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent" 
                alt="Profile Avatar" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#1a2b4c] object-cover border-2 border-white shadow-sm"
              />
              <button className="absolute -bottom-2 -right-2 bg-white text-blue-600 p-2 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
                <FiEdit2 size={14} />
              </button>
            </div>
            
            {/* Name & Role */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                Vincent
              </h3>
              <p className="text-sm text-gray-500">
                Fullstack Developer
              </p>
            </div>
          </div>

          {/* Info Grid (Email & Tenure) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Email Address
              </h4>
              <p className="text-sm font-medium text-gray-900">
                user@example.com
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Account Tenure
              </h4>
              <p className="text-sm font-medium text-gray-900">
                Member since: January 1, 2026
              </p>
            </div>
          </div>

          {/* Active Assets Banner */}
          <div className="bg-[#0b4dce] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 text-white p-3 rounded-lg">
                <FiLink size={20} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-0.5">
                  Active Assets
                </h4>
                <p className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                  12
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-[11px] uppercase tracking-wider py-2.5 px-6 rounded-lg transition-colors">
              View Links
            </button>
          </div>

          {/* Settings List */}
          <div className="space-y-6 mb-8">
            
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiBell className="text-gray-400" size={20} />
                <span className="text-sm font-medium text-gray-900">Email Notifications</span>
              </div>
              {/* Custom Tailwind Toggle Switch */}
              <button 
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  emailNotifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div 
                  className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${
                    emailNotifications ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            {/* 2FA Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiShield className="text-gray-400" size={20} />
                <span className="text-sm font-medium text-gray-900">Two-Factor Authentication</span>
              </div>
              <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
                Disabled
              </span>
            </div>

          </div>

          {/* Logout Session Button */}
          <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
            <FiLogOut size={16} className="text-gray-400" /> Logout Session
          </button>

        </div>

        {/* Security Disclaimer */}
        <p className="text-center text-xs text-gray-400">
          Your data is encrypted using AES-256 standards. <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>

      </main>

      {/* Footer Utama */}
      <Footer />
      
    </div>
  );
};

export default ProfilePage;