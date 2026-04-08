import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiPlus } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { useAuth } from "../hooks/useAuth";
import { BASE_URL } from "../lib/http";
import Modal from "./Modal"; 

const Navbar = ({ activePage = "" }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const avatarUrl = user?.profile_picture
        ? `${BASE_URL}/${user.profile_picture}`
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Vincent'}`;

    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    }, [isSidebarOpen]);

    const confirmLogout = () => {
        logout();
        setIsLogoutModalOpen(false);
        navigate("/login");
    };

    const getLinkClass = (pageName) => {
        const baseClass = "text-sm font-medium transition-colors ";
        if (activePage === pageName) {
            return baseClass + "text-gray-900 relative after:content-[''] after:absolute after:-bottom-6 after:left-0 after:w-full after:h-[2px] after:bg-blue-600";
        }
        return baseClass + "text-gray-500 hover:text-gray-900";
    };

    return (
        <>
            <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-5 flex justify-between items-center">
                    <div className="flex items-center gap-8 lg:gap-12">
                        <Link to="/" className="text-xl font-extrabold text-gray-900 tracking-tight hover:text-blue-600 transition-colors">ShortLink</Link>
                        <nav className="hidden md:flex gap-6 lg:gap-8">
                            <Link to="/dashboard" className={getLinkClass("dashboard")}>Dashboard</Link>
                            <Link to="/dashboard" className={getLinkClass("analytics")}>Analytics</Link>
                            <Link to="/dashboard" className={getLinkClass("links")}>Links</Link>
                        </nav>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to="/create-link" className="bg-[#1d58d8] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                                    <FiPlus size={18} /> Create New Link
                                </Link>
                                <div className="w-px h-6 bg-gray-200"></div>
                                <div className="flex items-center gap-4">
                                    <Link to="/profile" className="hover:opacity-80 transition-opacity flex items-center gap-2">
                                        <img
                                            src={avatarUrl}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full bg-blue-50 border border-gray-200 object-cover"
                                        />
                                        <span className="text-xs font-semibold text-gray-700 hidden lg:block">
                                            {user?.full_name || 'Account'}
                                        </span>
                                    </Link>
                                    <button 
                                        onClick={() => setIsLogoutModalOpen(true)} 
                                        className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
                                <Link to="/register" className="bg-[#1d58d8] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">Register</Link>
                            </>
                        )}
                    </div>

                    <button className="md:hidden text-gray-600 hover:text-gray-900 p-1 focus:outline-none" onClick={() => setIsSidebarOpen(true)}>
                        <FiMenu size={24} />
                    </button>
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <Modal 
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Confirm Logout"
                message="Are you sure you want to sign out? You will need to login again to access your dashboard."
                type="warning"
                onConfirm={confirmLogout}
            />
        </>
    );
};

export default Navbar;