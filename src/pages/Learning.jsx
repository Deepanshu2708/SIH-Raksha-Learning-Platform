import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Flame,
  Waves,
  ChevronLeft,
  Users,
  Award,
} from "lucide-react"; // icons

import FloodCardWithMap from "./zigzaglearning";

// Fancy disaster cards
const DisasterCard = ({ type, title, description, onClick, learners, progress }) => {
  const iconMap = {
    flood: <Waves className="w-10 h-10 text-cyan-400" />,
    earthquake: <Shield className="w-10 h-10 text-yellow-400" />,
    fire: <Flame className="w-10 h-10 text-red-500" />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-cyan-700/40 flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {iconMap[type]}
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>

      {/* Progress & learners */}
      <div className="mt-6">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full ${
              type === "fire"
                ? "bg-red-500"
                : type === "flood"
                ? "bg-cyan-400"
                : "bg-yellow-400"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{progress}% Complete</span>
          <span className="flex items-center gap-1">
            <Users size={14} /> {learners} learning now
          </span>
        </div>
      </div>

      {/* Start Button */}
      <button className="mt-5 w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-2 rounded-lg hover:opacity-90 transition-all">
        Start Learning →
      </button>
    </motion.div>
  );
};

export default function Learning() {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      title: "Flood Preparedness",
      description: "Learn how to stay safe and protect your property during floods.",
      type: "flood",
      learners: 124,
      progress: 45,
    },
    {
      title: "Earthquake Preparedness",
      description: "Essential earthquake safety tips including emergency kit preparation.",
      type: "earthquake",
      learners: 98,
      progress: 60,
    },
    {
      title: "Fire Safety",
      description: "Prevent fires and learn how to respond safely in emergencies.",
      type: "fire",
      learners: 142,
      progress: 20,
    },
  ];

  if (activeModule === "flood" || activeModule === "earthquake" || activeModule === "fire") {
    return (
      <div className="p-6 min-h-screen bg-slate-950 text-white">
        <button
          onClick={() => setActiveModule(null)}
          className="flex items-center gap-2 text-cyan-400 hover:text-emerald-500 mb-4"
        >
          <ChevronLeft size={18} /> Back to Modules
        </button>
        <FloodCardWithMap />
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        Disaster Preparedness Learning Hub
      </motion.h1>

      {/* Your progress */}
      <div className="flex items-center gap-4 mb-8 bg-slate-800/40 p-4 rounded-xl border border-slate-700">
        <Award className="w-10 h-10 text-yellow-400" />
        <div>
          <p className="text-lg font-semibold">Your Current Badge: Resilience Rookie</p>
          <p className="text-slate-400 text-sm">Complete modules to unlock more badges!</p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <DisasterCard
            key={idx}
            type={mod.type}
            title={mod.title}
            description={mod.description}
            learners={mod.learners}
            progress={mod.progress}
            onClick={() => setActiveModule(mod.type)}
          />
        ))}
      </div>

      {/* Recommended Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 bg-slate-800/30 border border-slate-700 rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
        <p className="text-slate-400 text-sm mb-4">
          Based on your activity, we suggest you to try <span className="text-cyan-400">Fire Safety</span> next.  
          You’re just 2 modules away from unlocking the <span className="font-semibold text-yellow-400">“Disaster Hero”</span> badge!
        </p>
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 px-6 rounded-lg hover:scale-105 transition-transform">
          Start Now
        </button>
      </motion.div>
    </div>
  );
}
