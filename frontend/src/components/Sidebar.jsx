import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiX, FiPlus, FiLogOut, FiHome, FiLink, FiBarChart2, FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate("/login");
            if (onClose) onClose();
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden`}
            >
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <Link to="/" onClick={onClose} className="font-extrabold text-xl tracking-tight text-gray-900 hover:text-blue-600 transition-colors">
                        ShortLink
                    </Link>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    {/* Navigation - SELALU ditampilkan (tanpa kondisi user) */}
                    <nav className="flex flex-col gap-4 text-sm font-medium text-gray-600">
                        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <FiHome size={18} /> Dashboard
                        </Link>
                        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <FiBarChart2 size={18} /> Analytics
                        </Link>
                        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <FiLink size={18} /> Links
                        </Link>
                    </nav>

                    <div className="flex flex-col gap-3 mt-4 border-t border-gray-100 pt-6">
                        {user ? (
                            <>
                                {/* Avatar dan Email - klik ke profile */}
                                <Link
                                    to="/profile"
                                    onClick={onClose}
                                    className="flex items-center gap-3 mb-2 px-2 hover:bg-gray-50 rounded-lg py-2 transition-colors"
                                >
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent"
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full bg-blue-50 border border-gray-200"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">{user.email}</span>
                                </Link>
                                <Link
                                    to="/create-link"
                                    onClick={onClose}
                                    className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                                >
                                    <FiPlus size={18} /> Create New Link
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-center py-2.5 text-red-500 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors mt-2 flex items-center justify-center gap-2"
                                >
                                    <FiLogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login dan Register ketika belum login */}
                                <Link
                                    to="/login"
                                    onClick={onClose}
                                    className="w-full text-center py-2.5 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm transition-colors border border-gray-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={onClose}
                                    className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;