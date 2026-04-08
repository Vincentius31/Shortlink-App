import React, { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import { FiX, FiPlus, FiLogOut, FiHome, FiLink, FiBarChart2 } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { BASE_URL } from "../lib/http";
import Modal from "./Modal"; 

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const avatarUrl = user?.profile_picture
        ? `${BASE_URL}/${user.profile_picture}`
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Vincent'}`;

    const confirmLogout = () => {
        logout();
        setIsLogoutModalOpen(false);
        if (onClose) onClose();
        navigate("/login");
    };

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity" onClick={onClose}></div>}

            <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <Link to="/" onClick={onClose} className="font-extrabold text-xl tracking-tight text-gray-900 hover:text-blue-600 transition-colors">ShortLink</Link>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"><FiX size={20} /></button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    {/* ... (Nav links tetap sama) ... */}
                    <nav className="flex flex-col gap-4 text-sm font-medium text-gray-600">
                        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2 hover:text-blue-600 transition-colors"><FiHome size={18} /> Dashboard</Link>
                        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2 hover:text-blue-600 transition-colors"><FiBarChart2 size={18} /> Analytics</Link>
                        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2 hover:text-blue-600 transition-colors"><FiLink size={18} /> Links</Link>
                    </nav>

                    <div className="flex flex-col gap-3 mt-4 border-t border-gray-100 pt-6">
                        {user ? (
                            <>
                                <Link to="/profile" onClick={onClose} className="flex items-center gap-3 mb-2 px-2 hover:bg-gray-50 rounded-lg py-2 transition-colors">
                                    <img src={avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full bg-blue-50 border border-gray-200 object-cover" />
                                    <div className="flex flex-col text-left">
                                        <span className="text-sm font-semibold text-gray-700">{user?.full_name || 'My Profile'}</span>
                                        <span className="text-[10px] text-gray-500">{user.email}</span>
                                    </div>
                                </Link>
                                <Link to="/create-link" onClick={onClose} className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm text-center"><FiPlus size={18} /> Create New Link</Link>

                                <button
                                    onClick={() => setIsLogoutModalOpen(true)}
                                    className="w-full text-center py-2.5 text-red-500 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors mt-2 flex items-center justify-center gap-2"
                                >
                                    <FiLogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={onClose} className="w-full text-center py-2.5 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm border border-gray-200">Login</Link>
                                <Link to="/register" onClick={onClose} className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm text-center">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Confirm Logout"
                message="Are you sure you want to sign out?"
                type="warning"
                onConfirm={confirmLogout}
            />
        </>
    );
};

export default Sidebar;