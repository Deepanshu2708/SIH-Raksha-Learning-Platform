import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "framer-motion";

const DisasterPreparednessDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [compareWith, setCompareWith] = useState("Regional Average");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Data for different timeframes
  const preparednessData = {
    daily: [
      { day: "Mon", you: 65, average: 72 },
      { day: "Tue", you: 72, average: 75 },
      { day: "Wed", you: 68, average: 74 },
      { day: "Thu", you: 78, average: 76 },
      { day: "Fri", you: 82, average: 78 },
      { day: "Sat", you: 85, average: 80 },
      { day: "Sun", you: 88, average: 82 },
    ],
    weekly: [
      { week: "W1", you: 72, average: 75 },
      { week: "W2", you: 78, average: 76 },
      { week: "W3", you: 85, average: 78 },
      { week: "W4", you: 88, average: 80 },
    ],
    overall: [
      { month: "Jan", you: 65, average: 70 },
      { month: "Feb", you: 70, average: 72 },
      { month: "Mar", you: 72, average: 74 },
      { month: "Apr", you: 75, average: 75 },
      { month: "May", you: 78, average: 76 },
      { month: "Jun", you: 82, average: 77 },
      { month: "Jul", you: 85, average: 78 },
      { month: "Aug", you: 88, average: 80 },
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

  const communityData = [
    { rank: 1, name: "Preparedness Pro", score: 1000, progress: 100 },
    { rank: 2, name: "Safety First", score: 995, progress: 99.5 },
    { rank: 3, name: "Emergency Expert", score: 985, progress: 98.5 },
    { rank: 4, name: "Disaster Defender", score: 972, progress: 97.2 },
    { rank: 5, name: "Readiness Ranger", score: 960, progress: 96.0 },
    { rank: 6, name: "Regional Average", score: 820, progress: 82.0 },
  ];

  const moduleScoresData = [
    { module: "Earthquakes", you: "72%", average: "75%", delta: "3%" },
    { module: "Floods", you: "78%", average: "76%", delta: "-2%" },
    { module: "Wildfires", you: "85%", average: "78%", delta: "-7%" },
    { module: "Hurricanes", you: "88%", average: "80%", delta: "-8%" },
    { module: "First Aid", you: "92%", average: "85%", delta: "-7%" },
  ];

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

  const COLORS = ['#22d3ee', '#34d399', '#f97316', '#ef4444', '#8884d8', '#a855f7'];

  const currentStats = statsData[timeFrame];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 bg-opacity-90 p-3 rounded-xl border border-cyan-400 border-opacity-30 shadow-lg backdrop-blur-sm">
          <p className="text-gray-100 font-medium">{`${timeFrame === "daily" ? "Day" : timeFrame === "weekly" ? "Week" : "Month"}: ${label}`}</p>
          <p className="text-cyan-400">{`You: ${payload[0].value}%`}</p>
          <p className="text-emerald-400">{`Average: ${payload[1].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for rank chart
  const RankTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 bg-opacity-90 p-3 rounded-xl border border-cyan-400 border-opacity-30 shadow-lg backdrop-blur-sm">
          <p className="text-gray-100 font-medium">{`${timeFrame === "daily" ? "Day" : timeFrame === "weekly" ? "Week" : "Month"}: ${label}`}</p>
          <p className="text-cyan-400">{`Preparedness Rank: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 font-sans p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="h-8 bg-gray-800 rounded-xl w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded-xl w-2/3 mb-8"></div>
            
            {/* Timeframe selector skeleton */}
            <div className="flex mb-6 bg-gray-800 rounded-xl p-1 w-fit">
              <div className="px-4 py-2 rounded-lg bg-gray-700 w-20 mr-2"></div>
              <div className="px-4 py-2 rounded-lg bg-gray-700 w-20 mr-2"></div>
              <div className="px-4 py-2 rounded-lg bg-gray-700 w-20"></div>
            </div>
            
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
                <div className="bg-gray-800 p-5 rounded-xl h-80"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 p-5 rounded-xl h-80"></div>
                <div className="bg-gray-800 p-5 rounded-xl h-80"></div>
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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-100">Disaster Preparedness Dashboard</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Track your disaster preparedness progress, compare with community averages, and identify areas for improvement.
          </p>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex mb-6 bg-gray-800 rounded-xl p-1 w-fit border border-gray-700"
        >
          {["daily", "weekly", "overall"].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                timeFrame === item
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                  : "text-gray-400 hover:text-gray-100 hover:bg-gray-700"
              }`}
              onClick={() => setTimeFrame(item)}
            >
              {item}
            </button>
          ))}
        </motion.div>

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
            {/* Your Preparedness vs Average Chart */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-100">Preparedness Comparison</h2>
                  <p className="text-sm text-gray-400">Your progress vs. community average preparedness</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></div>
                    <span className="text-sm text-gray-400">You</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
                    <span className="text-sm text-gray-400">Average</span>
                  </div>
                </div>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={preparednessData[timeFrame]} 
                    margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis 
                      dataKey={timeFrame === "daily" ? "day" : timeFrame === "weekly" ? "week" : "month"} 
                      stroke="#9ca3af" 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="colorYou" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="you" 
                      stroke="#22d3ee" 
                      fill="url(#colorYou)" 
                      name="You" 
                      strokeWidth={2}
                      activeDot={{ r: 6, stroke: '#22d3ee', strokeWidth: 2, fill: '#1f2937' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="average" 
                      stroke="#34d399" 
                      fill="url(#colorAverage)" 
                      name="Average" 
                      strokeWidth={2}
                      activeDot={{ r: 6, stroke: '#34d399', strokeWidth: 2, fill: '#1f2937' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Rank Progression and Module Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rank Progression */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-100 mb-2">Preparedness Ranking</h2>
                    <p className="text-sm text-gray-400">How your preparedness rank moved recently</p>
                  </div>
                  <div className="bg-cyan-900 bg-opacity-50 px-3 py-1 rounded-lg border border-cyan-600 border-opacity-30">
                    <p className="text-xs text-cyan-400">
                      Better than 44% of community
                    </p>
                  </div>
                </div>
                
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rankData[timeFrame]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={true} vertical={false} />
                      <XAxis 
                        dataKey={timeFrame === "daily" ? "day" : timeFrame === "weekly" ? "week" : "month"} 
                        stroke="#9ca3af" 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        reversed={true} 
                        domain={[1, 15]} 
                        stroke="#9ca3af" 
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<RankTooltip />} />
                      <Bar 
                        dataKey="rank" 
                        name="Your Rank" 
                        radius={[4, 4, 0, 0]}
                      >
                        {rankData[timeFrame].map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.rank <= 5 ? "#22d3ee" : "#4b5563"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 p-3 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600">
                  <p className="text-sm font-medium text-gray-100">Current Preparedness Rank: #6</p>
                  <p className="text-xs text-gray-400">44% Better than community average</p>
                </div>
              </motion.div>

              {/* Module Distribution */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
              >
                <h2 className="text-lg font-semibold text-gray-100 mb-2">Module Distribution</h2>
                <p className="text-sm text-gray-400 mb-4">Focus areas across disaster types</p>
                
                <div className="h-48">
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
            </div>

            {/* Module-wise Performance */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Module-wise Performance</h2>
              <p className="text-sm text-gray-400 mb-4">Detailed breakdown by disaster type</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">Disaster Module</th>
                      <th className="pb-3 font-medium">Your Score</th>
                      <th className="pb-3 font-medium">Avg. Score</th>
                      <th className="pb-3 font-medium">Difference</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleScoresData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-700 last:border-0 hover:bg-gray-700 hover:bg-opacity-30">
                        <td className="py-3 text-gray-100 font-medium">{row.module}</td>
                        <td className="py-3 text-gray-100">{row.you}</td>
                        <td className="py-3 text-gray-100">{row.average}</td>
                        <td className={`py-3 ${parseInt(row.delta) > 0 ? 'text-green-400' : 'text-red-400'}`}>{row.delta}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            parseInt(row.delta) > 5 ? "bg-green-900 text-green-200 border border-green-700" : 
                            parseInt(row.delta) > 0 ? "bg-yellow-900 text-yellow-200 border border-yellow-700" : 
                            "bg-red-900 text-red-200 border border-red-700"
                          }`}>
                            {parseInt(row.delta) > 5 ? "Ahead" : 
                             parseInt(row.delta) > 0 ? "On Track" : "Needs Focus"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600">
                <p className="text-sm font-medium text-gray-100 mb-1">Improvement Recommendation</p>
                <p className="text-xs text-gray-400">
                  Focus on Hurricanes and First Aid modules where your performance is below average. Try our specialized preparedness drills.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Community Leaderboard */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-2">Community Leaderboard</h2>
              <p className="text-sm text-gray-400 mb-4">Top performers in your region</p>
              
              <div className="space-y-3">
                {communityData.map((member, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                      member.name === compareWith 
                        ? "bg-cyan-900 bg-opacity-30 border border-cyan-400" 
                        : "hover:bg-gray-700 hover:bg-opacity-30"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        index === 0 ? "bg-yellow-900 text-yellow-200 border border-yellow-600" : 
                        index === 1 ? "bg-gray-700 text-gray-200 border border-gray-600" : 
                        index === 2 ? "bg-amber-900 text-amber-200 border border-amber-600" : "bg-gray-700 text-gray-400 border border-gray-600"
                      }`}>
                        {index < 3 ? ["🥇", "🥈", "🥉"][index] : member.rank}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-100">{member.name}</p>
                        <div className="flex items-center">
                          <div className="w-20 h-1.5 bg-gray-700 rounded-full mt-1 mr-2">
                            <div 
                              className="h-full bg-cyan-400 rounded-full" 
                              style={{ width: `${member.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{member.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-100 font-medium">{member.score}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Compare With Community */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Compare Preparedness</h2>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Select comparison benchmark:</label>
                <select 
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
                  value={compareWith}
                  onChange={(e) => setCompareWith(e.target.value)}
                >
                  {communityData.map(member => (
                    <option key={member.rank} value={member.name}>{member.name} (Rank #{member.rank})</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-100">{compareWith}</p>
                    <p className="text-xs text-gray-400">
                      Rank #{communityData.find(s => s.name === compareWith)?.rank}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-100">
                      {communityData.find(s => s.name === compareWith)?.score} pts
                    </p>
                    <p className="text-xs text-gray-400">
                      {communityData.find(s => s.name === compareWith)?.progress}% preparedness
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600 mb-4">
                <p className="text-sm font-medium text-gray-100 mb-1">Your community percentile</p>
                <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                  <div className="bg-cyan-400 h-2.5 rounded-full" style={{width: '44%'}}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">You're more prepared than 44% of your community</p>
                <p className="text-xs text-cyan-400 mt-1">
                  You need 120 more points to reach the next preparedness level.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <button className="bg-cyan-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-cyan-500 transition shadow-lg shadow-cyan-600/30 flex items-center justify-center">
                  <span>Take Preparedness Quiz</span>
                </button>
                <button className="bg-gray-700 border border-gray-600 py-2.5 px-3 rounded-lg text-sm font-medium text-gray-100 hover:bg-gray-600 transition flex items-center justify-center">
                  <span>Generate Readiness Plan</span>
                </button>
                <button className="bg-gray-700 border border-gray-600 py-2.5 px-3 rounded-lg text-sm font-medium text-gray-100 hover:bg-gray-600 transition flex items-center justify-center">
                  <span>View Detailed Analysis</span>
                </button>
              </div>
            </motion.div>

            {/* Preparedness Goals */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-5 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Your Preparedness Goals</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-100">Daily Learning Streak</span>
                    <span className="text-xs px-2 py-1 bg-cyan-900 text-cyan-200 rounded-full border border-cyan-700">5 days</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-cyan-400 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">2 more days for weekly bonus</p>
                </div>
                
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-100">Weekly Target</span>
                    <span className="text-xs px-2 py-1 bg-emerald-900 text-emerald-200 rounded-full border border-emerald-700">8/10 modules</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Complete 2 more modules this week</p>
                </div>
                
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-100">Preparedness Level</span>
                    <span className="text-xs px-2 py-1 bg-purple-900 text-purple-200 rounded-full border border-purple-700">Level 6 → 7</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">120 points needed to reach next level</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterPreparednessDashboard;