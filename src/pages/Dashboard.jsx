import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { motion } from "framer-motion";

const DisasterPreparednessDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const statsData = {
    daily: { modules: 3, score: "78%", categories: 5, badges: 1, timeSpent: "2h 15m" },
    weekly: { modules: 12, score: "81%", categories: 7, badges: 3, timeSpent: "14h 30m" },
    overall: { modules: 86, score: "79%", categories: 9, badges: 7, timeSpent: "98h 45m" },
  };

  const moduleDistributionData = [
    { name: "Earthquakes", value: 25 },
    { name: "Floods", value: 20 },
    { name: "Wildfires", value: 18 },
    { name: "Hurricanes", value: 15 },
    { name: "First Aid", value: 12 },
    { name: "Emergency Plans", value: 10 },
  ];

  const modulePerformanceData = [
    { name: "Earthquakes", score: 85, time: "3h 20m", progress: 90 },
    { name: "Floods", score: 78, time: "2h 45m", progress: 85 },
    { name: "Wildfires", score: 92, time: "4h 10m", progress: 95 },
    { name: "Hurricanes", score: 65, time: "1h 50m", progress: 70 },
    { name: "First Aid", score: 88, time: "3h 05m", progress: 92 },
    { name: "Emergency Plans", score: 72, time: "2h 15m", progress: 80 },
  ];

  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 95, badges: 12 },
    { rank: 2, name: "Maria Garcia", score: 92, badges: 11 },
    { rank: 3, name: "David Smith", score: 90, badges: 10 },
    { rank: 4, name: "Sarah Williams", score: 88, badges: 9 },
    { rank: 5, name: "James Brown", score: 85, badges: 8 },
    { rank: 6, name: "You", score: 81, badges: 7, isCurrentUser: true },
  ];

  const COLORS = ['#22d3ee', '#34d399', '#f97316', '#ef4444', '#8884d8', '#a855f7'];

  const currentStats = statsData[timeFrame];

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 font-sans p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="h-8 bg-gray-800 rounded-xl w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded-xl w-2/3 mb-8"></div>
            
            {/* Stats cards skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-gray-800 p-5 rounded-xl h-24"></div>
              ))}
            </div>
            
            {/* Main content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800 p-5 rounded-xl h-80"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 p-5 rounded-xl h-32"></div>
                <div className="bg-gray-800 p-5 rounded-xl h-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with timeframe selector */}
        <div className="flex justify-between items-start mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-100">Disaster Preparedness Dashboard</h1>
            <p className="text-gray-400 mt-2 text-lg">
              Track your disaster preparedness progress and identify areas for improvement.
            </p>
          </motion.div>
          
          {/* Timeframe Selector - Moved to top right */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-4 rounded-xl border border-gray-700 w-64"
          >
            <h2 className="text-lg font-semibold text-gray-100 mb-3">Timeframe Selection</h2>
            <div className="flex bg-gray-700 rounded-xl p-1 w-full border border-gray-600">
              {["daily", "weekly", "overall"].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all flex-1 ${
                    timeFrame === item
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                      : "text-gray-400 hover:text-gray-100 hover:bg-gray-600"
                  }`}
                  onClick={() => setTimeFrame(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { title: "Modules Completed", value: currentStats.modules, desc: `This ${timeFrame}`, icon: "📝", color: "bg-cyan-600" },
            { title: "Average Score", value: currentStats.score, desc: "Performance", icon: "📊", color: "bg-emerald-400" },
            { title: "Categories", value: currentStats.categories, desc: "Covered", icon: "📚", color: "bg-cyan-400" },
            { title: "Badges Earned", value: currentStats.badges, desc: "Achievements", icon: "🏆", color: "bg-yellow-500" },
            { title: "Time Spent", value: currentStats.timeSpent, desc: "Learning", icon: "⏱️", color: "bg-red-500" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{card.title}</h3>
                  <p className="text-2xl font-bold mt-1 text-gray-100">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
                </div>
                <span className={`text-2xl p-2 rounded-full ${card.color} bg-opacity-20`}>{card.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Distribution */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Module Distribution</h2>
              <p className="text-sm text-gray-400 mb-4">Focus areas across disaster types</p>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moduleDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {moduleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        borderColor: '#22d3ee',
                        borderRadius: '0.75rem',
                        opacity: 0.9
                      }}
                      itemStyle={{ color: '#f3f4f6' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Module Performance Analytics */}
<motion.div 
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
>
  <h2 className="text-xl font-semibold text-gray-100 mb-4">Module Performance Analytics</h2>
  
  <div className="space-y-4 max-h-80 overflow-y-hidden scroll-auto pr-2">
    {modulePerformanceData.map((module, index) => (
      <div key={index} className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-100">{module.name}</h3>
          <div className="flex items-center space-x-3">
            <span className="text-xs px-2 py-1 bg-cyan-900 text-cyan-200 rounded-full border border-cyan-700">
              Score: {module.score}%
            </span>
            <span className="text-xs px-2 py-1 bg-emerald-900 text-emerald-200 rounded-full border border-emerald-700">
              Progress: {module.progress}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>Time spent: {module.time}</span>
          <span>{module.completed ? "Completed" : "In Progress"}</span>
        </div>
        
        <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-2 rounded-full" 
            style={{width: `${module.progress}%`}}
          ></div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Last activity: 2 days ago</span>
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Continue Learning →
          </button>
        </div>
      </div>
    ))}
  </div>
</motion.div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Community Leaderboard</h2>
              
              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center p-3 rounded-lg ${
                      user.isCurrentUser 
                        ? 'bg-cyan-900 bg-opacity-30 border border-cyan-700' 
                        : 'bg-gray-700 bg-opacity-30 border border-gray-600'
                    }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                      user.rank === 1 ? 'bg-yellow-500' : 
                      user.rank === 2 ? 'bg-gray-400' : 
                      user.rank === 3 ? 'bg-amber-700' : 'bg-gray-800'
                    }`}>
                      <span className="font-bold text-xs">{user.rank}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${user.isCurrentUser ? 'text-cyan-300' : 'text-gray-100'}`}>
                        {user.name}
                      </p>
                      <div className="flex text-xs text-gray-400 mt-1">
                        <span className="mr-3">Score: {user.score}%</span>
                        <span>Badges: {user.badges}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
{/*               
              <button className="w-full mt-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg transition-colors">
                View Full Leaderboard
              </button> */}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterPreparednessDashboard;