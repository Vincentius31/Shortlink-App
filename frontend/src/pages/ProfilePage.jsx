import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiEdit2, FiLink, FiBell, FiShield, FiLogOut, FiCheck, FiX } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import http, { BASE_URL } from "../lib/http";

const ProfilePage = () => {
  const { logout, updateUser } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ full_name: "", bio: "" });

  const [profile, setProfile] = useState({
    email: "loading...",
    full_name: "",
    bio: "",
    profile_picture: "",
    link_count: 0,
    created_at: "..."
  });

  // 1. Fetch Profile: Mengambil data dan sinkron ke Global Context
  const fetchProfile = useCallback(async () => {
    try {
      const response = await http("/api/me");
      if (response.success && response.results) {
        const data = response.results;
        setProfile(data);
        setEditData({
          full_name: data.full_name || "",
          bio: data.bio || ""
        });
        // Sinkronkan ke Navbar & Sidebar via Context
        updateUser(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data profil:", error);
    }
  }, [updateUser]);

  // 2. Lifecycle: Hanya jalan sekali saat mount
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (isMounted) {
        await fetchProfile();
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [fetchProfile]);

  // 3. Update Profile (POST Multipart)
  const submitUpdate = async (file = null) => {
    const formData = new FormData();
    formData.append("full_name", editData.full_name || profile.full_name || "");
    formData.append("bio", editData.bio || profile.bio || "");

    if (file) {
      formData.append("avatar", file);
    }

    try {
      const response = await http("/api/profile/update", {
        method: "POST",
        body: formData,
      });

      if (response.success) {
        setIsEditing(false);
        await fetchProfile(); // Ambil data terbaru
      }
    } catch (error) {
      console.error("Gagal update profil:", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) submitUpdate(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans">
      <Navbar isLoggedIn={true} activePage="profile" />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 pl-2">
          Account Management
        </h3>

        <div className="bg-white border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Profile</h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button onClick={() => submitUpdate()} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <FiCheck /> SAVE
                  </button>
                  <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                    <FiX /> CANCEL
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="text-blue-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                  <FiEdit2 size={12} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <img
                src={profile.profile_picture ? `${BASE_URL}/${profile.profile_picture}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`}
                alt="Profile Avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#1a2b4c] object-cover border-2 border-white shadow-sm"
              />
              <input type="file" id="avatarInput" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              <button
                onClick={() => document.getElementById("avatarInput").click()}
                className="absolute -bottom-2 -right-2 bg-white text-blue-600 p-2 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <FiEdit2 size={14} />
              </button>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    className="w-full text-lg font-bold border-b-2 border-blue-500 focus:outline-none bg-blue-50/30 px-2 py-1 rounded"
                    value={editData.full_name}
                    onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                  />
                  <input
                    className="w-full text-sm text-gray-500 border-b border-gray-300 focus:outline-none px-2 py-1 rounded"
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{profile.full_name || "New User"}</h3>
                  <p className="text-sm text-gray-500">{profile.bio || "No bio yet"}</p>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</h4>
              <p className="text-sm font-medium text-gray-900">{profile.email}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Account Tenure</h4>
              <p className="text-sm font-medium text-gray-900">Member since: {profile.created_at}</p>
            </div>
          </div>

          <div className="bg-[#0b4dce] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 text-white p-3 rounded-lg"><FiLink size={20} /></div>
              <div>
                <h4 className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-0.5">Active Assets</h4>
                <p className="text-2xl sm:text-3xl font-extrabold text-white leading-none">{profile.link_count}</p>
              </div>
            </div>
            <button onClick={() => window.location.href = '/dashboard'} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-[11px] uppercase tracking-wider py-2.5 px-6 rounded-lg transition-colors">View Links</button>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><FiBell className="text-gray-400" size={20} /><span className="text-sm font-medium text-gray-900">Email Notifications</span></div>
              <button onClick={() => setEmailNotifications(!emailNotifications)} className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${emailNotifications ? "bg-blue-600" : "bg-gray-300"}`}><div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${emailNotifications ? "translate-x-5" : "translate-x-0"}`}></div></button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><FiShield className="text-gray-400" size={20} /><span className="text-sm font-medium text-gray-900">Two-Factor Authentication</span></div>
              <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">Disabled</span>
            </div>
          </div>

          <button onClick={logout} className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
            <FiLogOut size={16} className="text-gray-400" /> Logout Session
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;