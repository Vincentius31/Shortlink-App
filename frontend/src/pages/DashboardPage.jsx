import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSearch, FiFilter, FiLink, FiCalendar, FiBarChart2, FiCopy, FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import http from "../lib/http"; 

const DashboardPage = () => {
  const { user } = useAuth(); 
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const response = await http("/api/links");
      if (response.success && response.results) {
        setLinks(response.results);
      } else {
        console.error("Gagal mengambil data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLinks();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this link?");
    if (!confirmDelete) return;

    try {
      const response = await http(`/api/links/${id}`, { method: "DELETE" });
      if (response.success) {
        setLinks(links.filter((link) => link.id !== id));
      } else {
        alert(response.message || "Gagal menghapus link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert("Link copied to clipboard!");
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans">

      <Navbar isLoggedIn={true} activePage="dashboard" />

      <main className="flex-1 w-full max-w-250 mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header Dashboard */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight">
              My Links
            </h2>
            <p className="text-sm text-gray-500">
              Manage and track your shortened digital assets.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-1">
              Total Active
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">
              {isLoading ? "..." : links.length}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center gap-3 mb-6 shadow-sm">
          <div className="text-gray-400 pl-2">
            <FiSearch size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by name or URL..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
          />
          <button className="p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors border-l border-gray-100 pl-4">
            <FiFilter size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500 text-sm">Memuat data...</div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-100 rounded-xl shadow-sm">
              <p className="text-gray-500 mb-4">You haven't created any links yet.</p>
              <a href="/create-link" className="text-[#1d58d8] font-medium hover:underline">Create your first link</a>
            </div>
          ) : (
            links.map((link) => (
              <div
                key={link.id}
                className="bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >

                {/* Info Kiri */}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 mb-1.5">
                    <FiLink className="text-blue-600 shrink-0" size={16} />
                    <a href={link.short_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-base hover:underline truncate">
                      {link.short_url.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 truncate mb-4">
                    {link.original_url}
                  </p>

                  {/* Meta Data */}
                  <div className="flex items-center gap-6 text-[11px] sm:text-xs font-bold text-gray-400 tracking-widest uppercase">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={14} /> {formatDate(link.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiBarChart2 size={14} /> {link.clicks} CLICKS
                    </span>
                  </div>
                </div>

                {/* Action Buttons Kanan */}
                <div className="flex items-center gap-3 self-end md:self-center mt-2 md:mt-0">
                  <button
                    onClick={() => handleCopy(link.short_url)}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-2.5 rounded-lg transition-colors focus:outline-none"
                    title="Copy Link"
                  >
                    <FiCopy size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-lg transition-colors focus:outline-none"
                    title="Delete Link"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {links.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-10 mb-6 text-sm font-medium text-gray-500">
            <button className="flex items-center gap-1 hover:text-gray-900 transition-colors disabled:opacity-50">
              <FiChevronLeft size={16} /> Prev Page
            </button>
            <div className="flex items-center gap-3">
              <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-md">1</span>
              <span className="text-gray-400">of</span>
              <span className="text-gray-700">1</span>
            </div>
            <button className="flex items-center gap-1 hover:text-gray-900 transition-colors disabled:opacity-50">
              Next <FiChevronRight size={16} />
            </button>
          </div>
        )}

      </main>

      <Footer variant="login" />
    </div>
  );
};

export default DashboardPage;