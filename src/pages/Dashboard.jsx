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
import { 
  Shield, Zap, CheckCircle, XCircle, Award, TrendingUp, 
  Clock, BookOpen, Target, Trophy, Crown, Medal, Star
} from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="h-8 bg-slate-800 rounded-xl w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-800 rounded-xl w-2/3 mb-8"></div>
            
            {/* Stats cards skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-slate-800 p-5 rounded-xl h-24"></div>
              ))}
            </div>
            
            {/* Main content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800 p-5 rounded-xl h-80"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-800 p-5 rounded-xl h-32"></div>
                <div className="bg-slate-800 p-5 rounded-xl h-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with timeframe selector */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                DisasterWatch Analytics
              </h1>
              <p className="text-slate-400 mt-2">
                Track your disaster preparedness progress and identify areas for improvement.
              </p>
            </div>
          </motion.div>
          
          {/* Timeframe Selector */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 w-full md:w-64"
          >
            <h2 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Timeframe
            </h2>
            <div className="flex bg-slate-700 rounded-xl p-1 w-full border border-slate-600">
              {["daily", "weekly", "overall"].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all flex-1 ${
                    timeFrame === item
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-600"
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
            { title: "Modules Completed", value: currentStats.modules, desc: `This ${timeFrame}`, icon: <BookOpen className="w-5 h-5 text-blue-400" />, color: "bg-blue-500/20" },
            { title: "Average Score", value: currentStats.score, desc: "Performance", icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, color: "bg-emerald-500/20" },
            { title: "Categories", value: currentStats.categories, desc: "Covered", icon: <Target className="w-5 h-5 text-cyan-400" />, color: "bg-cyan-500/20" },
            { title: "Badges Earned", value: currentStats.badges, desc: "Achievements", icon: <Award className="w-5 h-5 text-yellow-400" />, color: "bg-yellow-500/20" },
            { title: "Time Spent", value: currentStats.timeSpent, desc: "Learning", icon: <Clock className="w-5 h-5 text-red-400" />, color: "bg-red-500/20" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{card.title}</h3>
                  <p className="text-2xl font-bold mt-1 text-gray-100">{card.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
                </div>
                <div className={`p-2 rounded-full ${card.color}`}>
                  {card.icon}
                </div>
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
              className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Module Distribution
              </h2>
              <p className="text-sm text-slate-400 mb-4">Focus areas across disaster types</p>
              
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
                        backgroundColor: '#1e293b', 
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
              className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Module Performance Analytics
              </h2>
              
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {modulePerformanceData.map((module, index) => (
                  <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-100">{module.name}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-200 rounded-full border border-blue-700/50">
                          Score: {module.score}%
                        </span>
                        <span className="text-xs px-2 py-1 bg-emerald-900/30 text-emerald-200 rounded-full border border-emerald-700/50">
                          Progress: {module.progress}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                      <span>Time spent: {module.time}</span>
                      <span>{module.progress === 100 ? "Completed" : "In Progress"}</span>
                    </div>
                    
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                        style={{width: `${module.progress}%`}}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Last activity: 2 days ago</span>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
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
              className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Community Leaderboard
              </h2>
              
              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center p-3 rounded-lg ${
                      user.isCurrentUser 
                        ? 'bg-blue-900/30 border border-blue-700/50' 
                        : 'bg-slate-700/30 border border-slate-600'
                    }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                      user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                      user.rank === 2 ? 'bg-slate-600/50 text-slate-300 border border-slate-500/50' : 
                      user.rank === 3 ? 'bg-amber-700/20 text-amber-400 border border-amber-700/30' : 
                      'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                    }`}>
                      {user.rank <= 3 ? (
                        user.rank === 1 ? <Crown className="w-4 h-4" /> :
                        user.rank === 2 ? <Medal className="w-4 h-4" /> :
                        <Star className="w-4 h-4" />
                      ) : (
                        <span className="font-bold text-xs">{user.rank}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${user.isCurrentUser ? 'text-blue-300' : 'text-gray-100'}`}>
                        {user.name}
                      </p>
                      <div className="flex text-xs text-slate-400 mt-1">
                        <span className="mr-3">Score: {user.score}%</span>
                        <span>Badges: {user.badges}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 p-3 rounded-lg border border-blue-500/30 transition-all flex flex-col items-center justify-center">
                  <BookOpen className="w-6 h-6 mb-2" />
                  <span className="text-sm">New Drill</span>
                </button>
                
                <button className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 p-3 rounded-lg border border-emerald-500/30 transition-all flex flex-col items-center justify-center">
                  <Award className="w-6 h-6 mb-2" />
                  <span className="text-sm">Achievements</span>
                </button>
                
                <button className="bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 p-3 rounded-lg border border-amber-500/30 transition-all flex flex-col items-center justify-center">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span className="text-sm">Progress</span>
                </button>
                
                <button className="bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 p-3 rounded-lg border border-purple-500/30 transition-all flex flex-col items-center justify-center">
                  <Shield className="w-6 h-6 mb-2" />
                  <span className="text-sm">Resources</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterPreparednessDashboard;