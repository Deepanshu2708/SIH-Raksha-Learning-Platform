import React, { useState } from "react";
import { Bell, Globe, User, X, Shield, Search, Phone, MessageSquare } from "lucide-react";

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
    <nav className="w-full bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3 flex items-center justify-between shadow-lg border-b border-gray-700">
      {/* Left Section - Logo + App Name */}
      <div className="flex items-center space-x-3">
    
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          👨‍🎓 Student
        </span>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex-1 px-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search alerts, resources, emergency contacts..."
            className="w-full bg-gray-800 text-sm text-gray-300 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 border border-gray-700 transition-all"
          />
        </div>
      </div>

      {/* Right Section - Icons and Controls */}
      <div className="flex items-center space-x-4 relative">
        {/* SOS Button */}
        <button
          onClick={() => setShowSOS(true)}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold flex items-center gap-2 hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/20"
        >
          <span className="text-lg">🚨</span>
          SOS Emergency
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">EN</span>
          </button>

          {/* Language Dropdown */}
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-fadeIn z-10">
              {["English", "हिन्दी", "मराठी", "தமிழ்", "ગુજરાતી", "ਪੰਜਾਬੀ"].map((lang) => (
                <button
                  key={lang}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  onClick={() => {
                    setIsLangOpen(false);
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
          <Bell className="w-5 h-5 text-gray-300 hover:text-white" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold cursor-pointer shadow-md">
            A
          </div>
          <div className="text-sm">
            <div className="font-medium text-white">Arshad</div>
            <div className="text-xs text-gray-400">Responder</div>
          </div>
        </div>
      </div>

      {/* ===== SOS POPUP MODAL ===== */}
      {showSOS && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-300 rounded-xl shadow-2xl w-full max-w-md p-6 relative border border-gray-700">
            {/* Close Button */}
            <button
              onClick={() => setShowSOS(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                <span className="text-2xl">🚨</span>
              </div>
              <h2 className="text-xl font-bold text-white">Emergency Alert</h2>
              <p className="text-sm text-gray-400 mt-1">
                The following contacts will be notified immediately
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="font-medium">{contact.name}</span>
                  </div>
                  <span className="text-blue-400 font-mono">{contact.number}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSOS(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Emergency alert sent to all contacts!");
                  setShowSOS(false);
                }}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Send Alert
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your location will be shared with emergency contacts
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;