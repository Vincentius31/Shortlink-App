import React from "react";
import { FiX, FiPlus } from "react-icons/fi";

const Sidebar = ({ isOpen, onClose, isLoggedIn }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden`}
            >
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <span className="font-extrabold text-xl tracking-tight text-gray-900">
                        ShortLink
                    </span>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <nav className="flex flex-col gap-5 text-sm font-medium text-gray-600">
                        <a href="#" className="text-blue-600 font-semibold">Dashboard</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Analytics</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Links</a>
                    </nav>

                    <div className="flex flex-col gap-3 mt-4 border-t border-gray-100 pt-6">
                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-3 mb-2 px-2">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vincent"
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full bg-blue-50 border border-gray-200"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">My Account</span>
                                </div>
                                <button className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                                    <FiPlus size={18} /> Create New Link
                                </button>
                                <button className="w-full text-center py-2.5 text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors mt-2">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="w-full text-center py-2.5 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                                    Login
                                </button>
                                <button className="w-full bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;