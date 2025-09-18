import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

// Ready-to-use Login Page component (Tailwind CSS)
// Save as: src/components/SiHLoginPage.jsx
// Dependencies: react-icons, framer-motion, Tailwind CSS configured in project

export default function Login({ onSignIn }) {
  const [role, setRole] = useState("administrator");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // simple validation (replace with real auth)
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    // pass data to parent or handle auth here
    if (onSignIn) onSignIn({ role, username });
    else alert(`Signed in as ${username} (${role})`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-neutral-900 to-slate-800 p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Hero */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white px-6 py-8 rounded-2xl bg-gradient-to-b from-black/40 via-white/2 to-black/20 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              {/* Logo (replace with your SVG) */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" fill="white" opacity="0.06" />
                <path d="M7 11h10M7 15h6" stroke="#0EA5A4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Suraksha </h1>
              <p className="text-sm text-slate-400">Timetable Scheduler · Intelligent Scheduling for Education</p>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Disaster <span className="text-emerald-400">Preparedness</span>
            <br /> & Response Education Platform
          </h2>

          <p className="text-slate-300 max-w-lg">Streamline your institution's scheduling with AI-powered optimization, real-time updates, and seamless collaboration tools. Clean, dark UI inspired layout ready to integrate.</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/3">
              <div className="text-sm text-slate-300">Real-time Analytics</div>
              <div className="text-xs text-slate-400 mt-1">Live dashboard insights & reports</div>
            </div>
            <div className="p-4 rounded-lg bg-white/3">
              <div className="text-sm text-slate-300">Conflict Resolution</div>
              <div className="text-xs text-slate-400 mt-1">Automatic clash detection</div>
            </div>
          </div>
        </motion.div>

        {/* Right Card / Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 shadow-2xl border border-white/6"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
            <p className="text-sm text-slate-400">Choose your role to continue</p>
          </div>

          {/* Roles */}
          <div className="flex gap-3 mb-6">
            <RoleButton
              label="Administrator"
              active={role === "administrator"}
              onClick={() => setRole("administrator")}
              icon={<MdOutlineAdminPanelSettings className="w-5 h-5" />}
            />
            <RoleButton
              label="Faculty"
              active={role === "faculty"}
              onClick={() => setRole("faculty")}
              icon={<FaUserTie className="w-4 h-4" />}
            />
            <RoleButton
              label="Student"
              active={role === "student"}
              onClick={() => setRole("student")}
              icon={<FaUserGraduate className="w-4 h-4" />}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <div className="text-xs text-slate-400 mb-2">Username</div>
              <div className="flex items-center gap-2 bg-white/3 rounded-md px-3 py-2 border border-transparent focus-within:border-emerald-400">
                <FiUser className="text-slate-300 w-5 h-5" />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full"
                  placeholder="Enter your username"
                />
              </div>
            </label>

            <label className="block">
              <div className="text-xs text-slate-400 mb-2">Password</div>
              <div className="flex items-center gap-2 bg-white/3 rounded-md px-3 py-2 border border-transparent focus-within:border-emerald-400">
                <FiLock className="text-slate-300 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full"
                  placeholder="Enter your password"
                />
              </div>
            </label>

            {error && <div className="text-sm text-rose-400">{error}</div>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 font-semibold text-black shadow-inner mt-2"
            >
              Sign In
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-400" /> Remember me
              </label>
              <button type="button" className="underline">Forgot password?</button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-xs text-slate-500">Don't have an account? <span className="text-emerald-400">Request access</span></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RoleButton({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm font-medium transition-shadow ${
        active ? "bg-gradient-to-r from-emerald-500 to-cyan-400 text-black shadow-md" : "bg-white/4 text-slate-300"
      }`}
    >
      <span className="w-6 h-6 flex items-center justify-center text-white/90">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}