import React, { useState } from "react";
import { Bell, Globe, User, X } from "lucide-react";

const Navbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  // Emergency Contacts Data
  const contacts = [
    { name: "Police", number: "100" },
    { name: "Fire Department", number: "101" },
    { name: "Ambulance", number: "102" },
    { name: "Local Guardian", number: "+91 9876543210" },
  ];

  return (
    <nav className="w-full bg-[#000000] px-4 py-3 flex items-center justify-between shadow-md relative">
      {/* Left Section - Student Icon + Text */}
      <div className="flex items-center space-x-2 text-sm text-gray-300">
        <User className="w-5 h-5 text-teal-400" />
        <span className="font-medium text-teal-400 cursor-pointer">Student</span>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex-1 px-8">
        <input
          type="text"
          placeholder="Search schedules, faculty, rooms..."
          className="w-full max-w-lg bg-[#14253D] text-sm text-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Right Section - Icons and Language */}
      <div className="flex items-center space-x-6 relative">
        {/* SOS Button */}
        <button
          onClick={() => setShowSOS(true)}
          className="px-3 py-2 bg-red-600 text-white rounded-md font-semibold animate-pulse hover:scale-105 transition-transform"
        >
          🚨 SOS
        </button>

        {/* Language Icon + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 bg-[#14253D] rounded-full hover:bg-[#1E3A5F] transition"
          >
            <Globe className="w-5 h-5 text-gray-300" />
          </button>

          {/* Dropdown */}
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#14253D] rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-fadeIn">
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

      {/* ===== SOS POPUP MODAL ===== */}
      {showSOS && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#14253D] text-gray-300 rounded-xl shadow-lg w-80 p-5 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowSOS(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-red-500 text-center mb-3">
              🚨 Emergency Alert
            </h2>
            <p className="text-sm text-center mb-4">
              Calling the following contacts...
            </p>

            <ul className="space-y-2 mb-4">
              {contacts.map((contact, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-[#1E3A5F] px-3 py-2 rounded-md"
                >
                  <span>{contact.name}</span>
                  <span className="text-teal-400">{contact.number}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowSOS(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg"
            >
              ✅ Confirm
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;