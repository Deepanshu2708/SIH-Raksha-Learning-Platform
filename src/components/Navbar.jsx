
import React, { useState } from "react";
import { Bell, Globe } from "lucide-react";

const Navbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <nav className="w-full bg-[#1E1E1E] px-4 py-3 flex items-center justify-between shadow-md relative">
      {/* Left Section - Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span className="cursor-pointer hover:text-white">Admin</span>
        <span className="text-gray-600">/</span>
        <span className="text-teal-400 font-medium cursor-pointer">
          Dashboard
        </span>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex-1 px-8">
        <input
          type="text"
          placeholder="Search schedules, faculty, rooms..."
          className="w-full max-w-lg bg-[#2A2A2A] text-sm text-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Right Section - Icons and Language */}
      <div className="flex items-center space-x-6 relative">
        {/* SOS Button */}
        <button className="px-3 py-2 bg-red-600 text-white rounded-md font-semibold animate-pulse hover:scale-105 transition-transform">
          🚨 SOS
        </button>

        {/* Language Icon + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 bg-[#2A2A2A] rounded-full hover:bg-[#3a3a3a] transition"
          >
            <Globe className="w-5 h-5 text-gray-300" />
          </button>

          {/* Dropdown */}
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#2A2A2A] rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-fadeIn">
              {["English", "हिन्दी", "मराठी", "தமிழ்"].map((lang) => (
                <button
                  key={lang}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setIsLangOpen(false);
                    alert(`Language changed to ${lang}`);
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bell Icon */}
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-300 hover:text-teal-400" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white rounded-full px-1">
            2
          </span>
        </button>

        {/* Profile Icon */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer">
          A
        </div>
      </div>
    </nav>
  );
};

export default Navbar;