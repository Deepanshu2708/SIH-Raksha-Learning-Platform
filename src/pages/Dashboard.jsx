import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { motion } from "framer-motion";

const PathshaalaDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [compareWith, setCompareWith] = useState("Deepanshu");

  // Data for different timeframes
  const performanceData = {
    daily: [
      { day: "Mon", you: 65, topper: 92 },
      { day: "Tue", you: 72, topper: 95 },
      { day: "Wed", you: 68, topper: 96 },
      { day: "Thu", you: 78, topper: 97 },
      { day: "Fri", you: 82, topper: 98 },
      { day: "Sat", you: 85, topper: 99 },
      { day: "Sun", you: 88, topper: 100 },
    ],
    weekly: [
      { week: "W1", you: 72, topper: 95 },
      { week: "W2", you: 78, topper: 96 },
      { week: "W3", you: 85, topper: 98 },
      { week: "W4", you: 88, topper: 99 },
    ],
    overall: [
      { month: "Jan", you: 65, topper: 90 },
      { month: "Feb", you: 70, topper: 92 },
      { month: "Mar", you: 72, topper: 94 },
      { month: "Apr", you: 75, topper: 95 },
      { month: "May", you: 78, topper: 96 },
      { month: "Jun", you: 82, topper: 97 },
      { month: "Jul", you: 85, topper: 98 },
      { month: "Aug", you: 88, topper: 99 },
    ],
  };

  const rankData = {
    daily: [
      { day: "Mon", rank: 8 },
      { day: "Tue", rank: 7 },
      { day: "Wed", rank: 7 },
      { day: "Thu", rank: 6 },
      { day: "Fri", rank: 6 },
      { day: "Sat", rank: 5 },
      { day: "Sun", rank: 5 },
    ],
    weekly: [
      { week: "W1", rank: 10 },
      { week: "W2", rank: 8 },
      { week: "W3", rank: 7 },
      { week: "W4", rank: 6 },
    ],
    overall: [
      { month: "Jan", rank: 15 },
      { month: "Feb", rank: 12 },
      { month: "Mar", rank: 10 },
      { month: "Apr", rank: 9 },
      { month: "May", rank: 8 },
      { month: "Jun", rank: 7 },
      { month: "Jul", rank: 6 },
      { month: "Aug", rank: 6 },
    ],
  };

  const leaderboardData = [
    { rank: 1, name: "TopperX", score: 1000 },
    { rank: 2, name: "Aisha", score: 995 },
    { rank: 3, name: "Rohit", score: 985 },
    { rank: 4, name: "Meera", score: 972 },
    { rank: 5, name: "Sahil", score: 960 },
    { rank: 6, name: "Deepanshu", score: 880 },
  ];

  const detailedScoresData = [
    { module: "W1", you: "72%", topper: "95%", delta: "23%" },
    { module: "W2", you: "78%", topper: "96%", delta: "18%" },
    { module: "W3", you: "85%", topper: "98%", delta: "13%" },
    { module: "W4", you: "88%", topper: "99%", delta: "11%" },
  ];

  const statsData = {
    daily: { quizzes: 3, score: "78%", subjects: 5, badges: 1 },
    weekly: { quizzes: 12, score: "81%", subjects: 7, badges: 3 },
    overall: { quizzes: 86, score: "79%", subjects: 9, badges: 7 },
  };

  const currentStats = statsData[timeFrame];

  return (
    <div className="min-h-screen bg-[#0e1016] text-[#cbd5e1] font-sans p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Pathshaala • Activity & Rankings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#94a3b8] mt-2"
          >
            Compare your performance with the topper. Toggle timeframe to inspect daily, weekly or overall trends.
          </motion.p>
        </div>

        {/* Timeframe Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex mb-6 bg-[#1a1d25] rounded-lg p-1 w-fit"
        >
          {["daily", "weekly", "overall"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                timeFrame === item
                  ? "bg-[#2563eb] text-white"
                  : "text-[#94a3b8] hover:text-white"
              }`}
              onClick={() => setTimeFrame(item)}
            >
              {item}
            </button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Quizzes Attended", value: currentStats.quizzes, desc: `This ${timeFrame}` },
            { title: "Average Score", value: currentStats.score, desc: "Compared to topper" },
            { title: "Active Subjects", value: currentStats.subjects, desc: "Ongoing" },
            { title: "Badges", value: currentStats.badges, desc: "Earned" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-[#1a1d25] p-5 rounded-xl shadow-lg border border-[#2d3748] hover:border-[#3b82f6] transition-colors"
            >
              <h3 className="text-sm text-[#94a3b8]">{card.title}</h3>
              <p className="text-2xl font-bold mt-1 text-white">{card.value}</p>
              <p className="text-xs text-[#64748b] mt-1">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Student vs Topper Chart */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1d25] p-5 rounded-xl shadow-lg border border-[#2d3748]"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Student vs Topper — {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}</h2>
              <p className="text-sm text-[#94a3b8] mb-4">Compare your score trend with the topper.</p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData[timeFrame]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis 
                      dataKey={timeFrame === "daily" ? "day" : timeFrame === "weekly" ? "week" : "month"} 
                      stroke="#94a3b8" 
                    />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1d25', 
                        border: '1px solid #2d3748',
                        borderRadius: '6px',
                        color: '#cbd5e1'
                      }} 
                    />
                    <Legend />
                    <Area type="monotone" dataKey="you" stroke="#2563eb" fill="#2563eb40" name="You" />
                    <Area type="monotone" dataKey="topper" stroke="#f59e0b" fill="#f59e0b40" name="Topper" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Rank Progression */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1a1d25] p-5 rounded-xl shadow-lg border border-[#2d3748]"
            >
              <h2 className="text-lg font-semibold text-white mb-2">Rank Progression</h2>
              <p className="text-sm text-[#94a3b8] mb-4">How your rank moved recently</p>
              
              <div className="bg-[#1e3a8a] p-4 rounded-lg mb-4">
                <p className="text-sm text-[#93c5fd]">
                  You can do better than 44% of students — push for the top!
                </p>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankData[timeFrame]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis 
                      dataKey={timeFrame === "daily" ? "day" : timeFrame === "weekly" ? "week" : "month"} 
                      stroke="#94a3b8" 
                    />
                    <YAxis reversed={true} domain={[1, 15]} stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1d25', 
                        border: '1px solid #2d3748',
                        borderRadius: '6px',
                        color: '#cbd5e1'
                      }} 
                    />
                    <Bar dataKey="rank" fill="#2563eb" name="Your Rank" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between mt-4 text-sm text-[#94a3b8]">
                {timeFrame === "weekly" ? (
                  <>
                    <span>W2</span>
                    <span>W3</span>
                    <span>W4</span>
                  </>
                ) : timeFrame === "daily" ? (
                  <>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </>
                ) : (
                  <>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                  </>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-[#1e293b] rounded-lg">
                <p className="text-sm font-medium text-white">Current Rank: #6</p>
                <p className="text-xs text-[#94a3b8]">44% Better</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1d25] p-5 rounded-xl shadow-lg border border-[#2d3748]"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Leaderboard</h2>
              <p className="text-sm text-[#94a3b8] mb-4">Top performers • 10 students</p>
              
              <div className="space-y-3">
                {leaderboardData.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-[#1e293b] rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        index === 0 ? "bg-yellow-900 text-yellow-200" : 
                        index === 1 ? "bg-gray-800 text-gray-200" : 
                        index === 2 ? "bg-amber-900 text-amber-200" : "bg-[#1e293b] text-[#94a3b8]"
                      }`}>
                        {index < 3 ? ["A", "B", "C"][index] : student.rank}
                      </div>
                      <span className="ml-3 font-medium text-white">{student.name}</span>
                    </div>
                    <span className="text-[#94a3b8]">Score: {student.score}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Detailed Scores */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1a1d25] p-5 rounded-xl shadow-lg border border-[#2d3748]"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Detailed Scores</h2>
              <p className="text-sm text-[#94a3b8] mb-4">Recent quiz breakdown</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[#94a3b8]">
                      <th className="pb-2 font-medium">Module</th>
                      <th className="pb-2 font-medium">You</th>
                      <th className="pb-2 font-medium">Topper</th>
                      <th className="pb-2 font-medium">Delta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedScoresData.map((row, index) => (
                      <tr key={index} className="border-t border-[#2d3748]">
                        <td className="py-3 text-white">{row.module}</td>
                        <td className="py-3 font-medium text-white">{row.you}</td>
                        <td className="py-3 text-white">{row.topper}</td>
                        <td className="py-3 text-red-400">{row.delta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-[#1e293b] p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Want to climb leaderboard?</p>
                <p className="text-xs text-[#94a3b8]">
                  Focus on weak modules and try quizzes daily.
                </p>
              </div>
            </motion.div>

            {/* Compare With Topper */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#1a1d25] p-5 rounded-xl shadow-lg border border-[#2d3748]"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Compare With Topper</h2>
              
              <div className="mb-4">
                <select 
                  className="w-full p-2 bg-[#1e293b] border border-[#2d3748] rounded-md text-sm text-white"
                  value={compareWith}
                  onChange={(e) => setCompareWith(e.target.value)}
                >
                  {leaderboardData.map(student => (
                    <option key={student.rank} value={student.name}>{student.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-[#1e293b] p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white">{compareWith}</p>
                <p className="text-xs text-[#94a3b8]">
                  Rank #{leaderboardData.find(s => s.name === compareWith)?.rank}
                </p>
              </div>
              
              <div className="bg-[#1e293b] p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Your percentile</p>
                <p className="text-xs text-[#94a3b8]">44% students below you</p>
                <p className="text-xs text-blue-400 mt-1">
                  You can do better than 44% of students — push for the top!
                </p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button className="bg-[#2563eb] text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-[#1d4ed8] transition">
                  Take Practice Quiz
                </button>
                <button className="bg-[#1e293b] border border-[#2d3748] py-2 px-3 rounded-md text-sm font-medium text-white hover:bg-[#2d3748] transition">
                  See Improvement Plan
                </button>
                <button className="bg-[#1e293b] border border-[#2d3748] py-2 px-3 rounded-md text-sm font-medium text-white hover:bg-[#2d3748] transition">
                  Compare with Topper
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathshaalaDashboard;
