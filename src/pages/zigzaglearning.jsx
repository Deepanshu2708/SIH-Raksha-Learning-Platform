import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

// Import videos
import Video1 from "../assets/vidieo1.mp4";
import Video2 from "../assets/vidieo2.mp4";
import Video3 from "../assets/vidieo3.mp4";

// Levels Array
const levels = Array.from({ length: 20 }, (_, i) => ({ id: 7087 + i }));

const ZigzagLearning = ({ onBack }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Robust back handler
  const handleBack = useCallback((e) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    console.debug("[ZigzagLearning] Back clicked. onBack:", onBack);

    // If parent passed a function, call it:
    if (typeof onBack === "function") {
      try {
        onBack();
        return;
      } catch (err) {
        console.error("[ZigzagLearning] onBack threw:", err);
        // continue to fallback
      }
    }

    // Fallback: browser history
    if (typeof window !== "undefined") {
      if (window.history && window.history.length > 1) {
        window.history.back();
        return;
      }
      // Last-resort fallback: send user to home (replace to avoid extra history)
      window.location.replace("/");
    }
  }, [onBack]);

  const handleLevelClick = useCallback((idx) => {
    const videoMap = { 0: Video1, 1: Video2, 2: Video3 };
    setActiveVideo(videoMap[idx] || null);
  }, []);

  return (
    <div className="relative h-screen overflow-y-scroll bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      {/* Background animated gradient lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-green-500/30 rounded-full blur-3xl animate-pulse top-20 left-10" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-bounce bottom-20 right-20" />
      </div>

      {/* Back Button — now robust */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back"
        className="absolute top-4 left-4 px-5 py-2 bg-gray-800 text-green-400 font-bold rounded-lg shadow-lg hover:bg-gray-700 hover:scale-105 transition-all"
        style={{ zIndex: 9999, pointerEvents: "auto" }}
      >
        ← Back
      </button>

      {/* Path SVG (animated stroke) */}
      <svg viewBox="0 0 400 2000" className="absolute w-full h-[2200px] opacity-40 pointer-events-none">
        <motion.path
          d="M200,0 
             C50,150 350,250 200,400 
             C50,550 350,700 200,850 
             C50,1000 350,1150 200,1300 
             C50,1450 350,1600 200,1750 
             C50,1900 350,2050 200,2200"
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>

      {/* Levels */}
      {levels.map((lvl, idx) => {
        const isUnlocked = idx < 3;
        return (
          <motion.div
            key={lvl.id}
            onClick={() => handleLevelClick(idx)}
            className="absolute flex items-center justify-center w-20 h-20 cursor-pointer group"
            style={{
              top: `${idx * 110 + 120}px`,
              left: idx % 2 === 0 ? "25%" : "65%",
            }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="w-20 h-20 flex items-center justify-center rounded-full font-bold text-lg shadow-lg transition-all duration-300 group-hover:shadow-green-400/50"
              style={{
                background: isUnlocked
                  ? "linear-gradient(145deg, #34d399, #059669)"
                  : "linear-gradient(145deg, #1f2937, #111827)",
                color: isUnlocked ? "#fff" : "#6b7280",
                boxShadow: isUnlocked
                  ? "0 0 25px rgba(16,185,129,0.8)"
                  : "inset 2px 2px 5px rgba(0,0,0,0.8)",
              }}
            >
              {lvl.id}
            </div>

            {isUnlocked && (
              <motion.div
                className="absolute w-28 h-28 rounded-full border-2 border-green-400 opacity-50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Video Popup */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[50%]"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="mb-2 px-4 py-1 bg-red-500 text-white rounded-md float-right hover:bg-red-600"
            >
              ✕ Close
            </button>
            <div className="mt-6">
              <video controls autoPlay className="w-full rounded-lg" src={activeVideo} />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ZigzagLearning;
