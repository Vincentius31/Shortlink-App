import React from "react";

const Footer = ({ variant = "login" }) => {
  if (variant === "register") {
    return (
      <footer className="w-full py-6 px-4 sm:py-8 sm:px-8 text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
          <p className="mb-2 md:mb-0">© 2024 ShortLink. The Digital Architect.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">API Documentation</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full py-6 px-4 sm:py-8 sm:px-6 text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider uppercase">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
        <p className="mb-2 md:mb-0">© 2024 ShortLink. The Digital Architect.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          <a href="#" className="hover:text-gray-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-800 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-800 transition-colors">API Documentation</a>
          <a href="#" className="hover:text-gray-800 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;