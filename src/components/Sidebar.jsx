import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiActivity,
  FiMapPin,
  FiGrid,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiLogOut,
  FiBell,
  FiHelpCircle,
  FiShield,
  FiMessageSquare
} from "react-icons/fi";

const menuItems = [
  { name: "Home", path: "/", icon: <FiHome /> },
  { name: "Learning", path: "/learning", icon: <FiBook /> },
  { name: "Drills", path: "/drills", icon: <FiActivity /> },
    { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
  { name: "Region", path: "/region", icon: <FiMapPin /> },
  // { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user] = useState({
    name: "Arshad Pandey",
    role: "Emergency Responder",
    notifications: 3
  });

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col relative`}
    >
      {/* Header / Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FiShield className="text-white" />
            </div>
            <h1 className="text-lg font-bold">DisasterWatch</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 flex flex-col mt-4 p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-all group ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <span className="text-xl transition-transform group-hover:scale-110">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Additional Options */}
      <div className="p-2 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors mb-1">
          <FiHelpCircle className="text-xl" />
          {!isCollapsed && <span className="text-sm font-medium">Help & Support</span>}
        </button>
        
        {/* <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors mb-1">
          <div className="relative">
            <FiBell className="text-xl" />
            {user.notifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {user.notifications}
              </span>
            )}
          </div>
          {!isCollapsed && <span className="text-sm font-medium">Notifications</span>}
        </button> */}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
          <FiLogOut className="text-xl" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
        
        {!isCollapsed && (
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>DisasterWatch v1.2.0</p>
            <p className="mt-1">© 2023 All rights reserved</p>
          </div>
        )}
      </div>

      {/* Collapsed indicator */}
      {isCollapsed && (
        <div className="absolute top-1/2 -right-2 bg-blue-600 text-white p-1 rounded-full">
          <FiChevronRight size={14} />
        </div>
      )}
    </div>
  );
}