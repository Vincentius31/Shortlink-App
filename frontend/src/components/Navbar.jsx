import React, { useState, useEffect } from "react";
import { FiMenu, FiPlus } from "react-icons/fi";
import Sidebar from "./Sidebar";

const Navbar = ({ isLoggedIn = false, activePage = "" }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isSidebarOpen]);

    // Helper function untuk styling link aktif
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
                        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                            ShortLink
                        </h1>

                        <nav className="hidden md:flex gap-6 lg:gap-8">
                            <a href="#" className={getLinkClass("dashboard")}>Dashboard</a>
                            <a href="#" className={getLinkClass("analytics")}>Analytics</a>
                            <a href="#" className={getLinkClass("links")}>Links</a>
                        </nav>
                    </div>

                    {/* Bagian Kanan Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        {isLoggedIn ? (
                            <>
                                <button className="bg-[#1d58d8] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                                    <FiPlus size={18} /> Create New Link
                                </button>
                                <div className="w-px h-6 bg-gray-200"></div> {/* Divider */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent"
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full bg-blue-50 border border-gray-200"
                                    />
                                    <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                        Logout
                                    </a>
                                </div>
                            </>
                        ) : (
                            <>
                                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                    Login
                                </a>
                                <button className="bg-[#1d58d8] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden text-gray-600 hover:text-gray-900 p-1 focus:outline-none"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <FiMenu size={24} />
                    </button>
                </div>
            </header>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isLoggedIn={isLoggedIn}
            />
        </>
    );
};

export default Navbar;