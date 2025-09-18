
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
} from "react-icons/fi";

const menuItems = [
  { name: "Home", path: "/", icon: <FiHome /> },
  { name: "Learning", path: "/learning", icon: <FiBook /> },
  { name: "Drills", path: "/drills", icon: <FiActivity /> },
  { name: "Region", path: "/region", icon: <FiMapPin /> },
  { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Header / Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && <h1 className="text-lg font-bold">DisasterEdu</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white"
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors ${
                isActive ? "bg-gray-800 text-emerald-400" : "text-gray-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Collapse Info */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
        {!isCollapsed && "© 2025 DisasterEdu"}
      </div>
    </div>
  );
}