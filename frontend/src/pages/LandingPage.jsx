import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiLink, FiZap, FiSliders, FiUsers, FiCheck } from "react-icons/fi";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdff] font-sans">
      
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center">
        
        {/* --- HERO SECTION --- */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Shorten URLs. <span className="text-blue-600">Share Easily.</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
            Create short, memorable links for your team communications. Transform long, cumbersome URLs into powerful digital assets that drive engagement.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors">
              Get Started
            </button>
            <button className="bg-white border border-gray-200 text-blue-600 font-medium py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>

          {/* Shortener Input Box */}
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-2 sm:p-3 flex items-center gap-2 relative z-10">
            <div className="pl-3 sm:pl-4 text-gray-400">
              <FiLink size={20} />
            </div>
            <input 
              type="text" 
              placeholder="https://very-long-architectural-url.com/asset-id-99238-x1" 
              className="flex-1 py-2 sm:py-3 px-2 outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 bg-transparent w-full" 
            />
            <button className="bg-[#1d58d8] hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-colors shrink-0">
              Shorten
            </button>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="mb-10">
            <h3 className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-3">
              Architectural Features
            </h3>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Built for Enterprise Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mb-6">
                <FiZap size={20} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Easy Create</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                Instantly generate high-performance short links with a single click or through our surgical API endpoints.
              </p>
              <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg mb-6">
                <FiSliders size={20} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Custom Slugs</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                Maintain brand authority with readable, custom link endings that resonate with your digital audience.
              </p>
              <div className="w-8 h-1 bg-indigo-200 rounded-full"></div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-600 p-3 rounded-lg mb-6">
                <FiUsers size={20} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">Team Ready</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.
              </p>
              <div className="w-8 h-1 bg-orange-200 rounded-full"></div>
            </div>

          </div>
        </section>

        {/* --- INSIGHTS / ANALYTICS SECTION --- */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 mb-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Image Box */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-50 transform translate-x-4 translate-y-4 rounded-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Dashboard Analytics" 
                className="w-full h-auto rounded-3xl shadow-lg object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-3">
                Data Driven Insights
              </h3>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Observe your link architecture in real-time.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                Every click is a data point. Our dashboard provides surgical precision into where your traffic originates, who is engaging, and how your team communications are performing across the globe.
              </p>

              {/* Checklist */}
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full p-1">
                    <FiCheck size={14} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Geographic Distribution Maps</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full p-1">
                    <FiCheck size={14} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Device & Browser Breakdown</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full p-1">
                    <FiCheck size={14} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">UTM Parameter Tracking</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

      </main>

      <Footer variant="login" />
      
    </div>
  );
};

export default LandingPage;