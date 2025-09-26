import React, { useState, useEffect } from "react";
import { 
  User, Award, BookOpen, MapPin, FileText, LogOut, BarChart3, 
  Clock, Calendar, ChevronRight, AlertTriangle, Shield, Heart,
  Play, CheckCircle, XCircle, Zap, Target, TrendingUp, Filter,
  Bell, Search, Download, ChevronDown, Settings, HelpCircle, X,
  Crown, Trophy, Star, Medal
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("drills");
  const [drillFilter, setDrillFilter] = useState("all");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showVideo, setShowVideo] = useState(false);
  const [currentDrill, setCurrentDrill] = useState(null);

  // Dummy student data
  const student = {
    name: "Arshad Pandey",
    level: "Intermediate",
    photo: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    badges: ["Fast Evacuator", "Best Decision Maker", "Quick Responder"],
    report: {
      drills: 12,
      passed: 10,
      failed: 2,
      avgTime: "2m 15s",
      rank: "Top 15%",
    },
    progress: 75,
    leaderboardRank: 4,
    leaderboardTotal: 100,
  };

  // Leaderboard data
  const leaderboardData = [
    { id: 1, name: "Rajesh Kumar", score: 98, rank: 1, completed: 15 },
    { id: 2, name: "Priya Sharma", score: 96, rank: 2, completed: 14 },
    { id: 3, name: "Vikram Singh", score: 94, rank: 3, completed: 13 },
    { id: 4, name: "Arshad Pandey", score: 92, rank: 4, completed: 12 },
    { id: 5, name: "Anjali Patel", score: 90, rank: 5, completed: 11 },
  ];

  // Drill data
  const drillData = {
    assigned: [
      { 
        id: 1, 
        name: "Earthquake Response Simulation", 
        type: "Earthquake", 
        difficulty: "Intermediate",
        estimatedTime: "15m", 
        dueDate: "2023-06-28",
        status: "pending",
        priority: "high",
        description: "Simulate response to a 7.0 magnitude earthquake with multiple aftershocks",
        videoUrl: "https://player.vimeo.com/video/370756449?h=da4e3f6e37"
      },
      { 
        id: 2, 
        name: "Cyber Attack Response", 
        type: "Cyber", 
        difficulty: "Advanced",
        estimatedTime: "25m", 
        dueDate: "2023-07-05",
        status: "pending",
        priority: "medium",
        description: "Respond to a simulated ransomware attack on critical infrastructure",
        videoUrl: "https://player.vimeo.com/video/370756449?h=da4e3f6e37"
      },
      { 
        id: 3, 
        name: "Flood Evacuation Procedure", 
        type: "Flood", 
        difficulty: "Beginner",
        estimatedTime: "10m", 
        dueDate: "2023-06-30",
        status: "pending",
        priority: "low",
        description: "Practice evacuation procedures during a flash flood scenario",
        videoUrl: "https://player.vimeo.com/video/370756449?h=da4e3f6e37"
      }
    ],
    upcoming: [
      { 
        id: 4, 
        name: "Fire Safety Training", 
        type: "Fire", 
        date: "2023-07-02", 
        time: "14:00",
        participants: 24,
        location: "Training Center - Sector 7"
      },
      { 
        id: 5, 
        name: "First Aid Certification", 
        type: "Medical", 
        date: "2023-07-10", 
        time: "10:30",
        participants: 16,
        location: "MedCenter - Sector 12"
      },
      { 
        id: 6, 
        name: "Advanced Emergency Response", 
        type: "Multi-Hazard", 
        date: "2023-07-15", 
        time: "09:00",
        participants: 12,
        location: "Command Center - Sector 1"
      }
    ],
    past: [
      { 
        id: 7, 
        name: "Flood Evacuation", 
        type: "Flood", 
        date: "2023-06-15", 
        result: "passed", 
        time: "2m 15s",
        score: 92,
        details: "Executed proper evacuation procedures with 95% accuracy in designated time."
      },
      { 
        id: 8, 
        name: "Fire Safety", 
        type: "Fire", 
        date: "2023-06-10", 
        result: "failed", 
        time: "—",
        score: 65,
        details: "Failed to identify all emergency exits in the simulation. Needs improvement in situational awareness."
      },
      { 
        id: 9, 
        name: "First Aid Training", 
        type: "Medical", 
        date: "2023-06-05", 
        result: "passed", 
        time: "3m 10s",
        score: 88,
        details: "Properly administered CPR and first aid procedures with minor timing issues."
      },
      { 
        id: 10, 
        name: "Earthquake Response", 
        type: "Earthquake", 
        date: "2023-05-28", 
        result: "passed", 
        time: "2m 45s",
        score: 95,
        details: "Excellent response time and execution of duck, cover, and hold procedures."
      },
      { 
        id: 11, 
        name: "Power Outage Protocol", 
        type: "Infrastructure", 
        date: "2023-05-20", 
        result: "passed", 
        time: "4m 20s",
        score: 84,
        details: "Good knowledge of backup systems but needs faster execution of emergency protocols."
      }
    ]
  };

  // Mock function to get location
  const fetchLocation = () => {
    setLoading(true);
    setTimeout(() => {
      setLocation({
        lat: 28.61,
        lng: 77.23,
      });
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "low": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case "earthquake": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "fire": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "flood": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "medical": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "cyber": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "infrastructure": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "multi-hazard": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleStartDrill = (drill) => {
    setCurrentDrill(drill);
    setShowVideo(true);
  };

  const VideoPopup = () => {
    if (!showVideo) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-xl max-w-4xl w-full overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold">{currentDrill?.name}</h3>
            <button 
              onClick={() => setShowVideo(false)}
              className="p-1 rounded-full hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="aspect-video bg-black">
            <iframe 
              src={currentDrill?.videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Disaster Preparedness Training Video"
            ></iframe>
          </div>
          
          <div className="p-4 border-t border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{currentDrill?.estimatedTime}</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-100">
      <VideoPopup />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name.split(' ')[0]}!</h1>
          <p className="text-slate-400">Here's your training overview and upcoming drills</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{student.report.drills}</div>
            <div className="text-sm text-slate-400">Total Drills</div>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{student.report.passed}</div>
            <div className="text-sm text-slate-400">Passed Drills</div>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-red-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{student.report.failed}</div>
            <div className="text-sm text-slate-400">Failed Drills</div>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{student.report.rank}</div>
            <div className="text-sm text-slate-400">Global Rank</div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Training Progress</h2>
            <span className="text-blue-400 font-medium">{student.progress}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${student.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700 mb-8">
          <button
            className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === "overview" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 size={18} />
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === "drills" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
            onClick={() => setActiveTab("drills")}
          >
            <Zap size={18} />
            Drills
          </button>
          <button
            className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === "resources" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
            onClick={() => setActiveTab("resources")}
          >
            <BookOpen size={18} />
            Resources
          </button>
          <button
            className={`px-6 py-3 font-medium flex items-center gap-2 ${activeTab === "analytics" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
            onClick={() => setActiveTab("analytics")}
          >
            <TrendingUp size={18} />
            Analytics
          </button>
        </div>

        {/* Drills Section */}
        {activeTab === "drills" && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  {["all", "assigned", "upcoming", "past"].map((filter) => (
                    <button
                      key={filter}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${drillFilter === filter ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
                      onClick={() => setDrillFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                {drillData.assigned.length} ASSIGNED • {drillData.upcoming.length} UPCOMING • {drillData.past.length} COMPLETED
              </div>
            </div>

            {/* Assigned Drills */}
            {(drillFilter === "all" || drillFilter === "assigned") && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-300">
                    <Target className="w-5 h-5" />
                    ASSIGNED DRILLS
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                      {drillData.assigned.length}
                    </span>
                  </h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drillData.assigned.map((drill) => (
                    <div key={drill.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300 group">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(drill.type)}`}>
                          {drill.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(drill.priority)}`}>
                          {drill.priority.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">{drill.name}</h4>
                      <p className="text-xs text-slate-400 mb-4 line-clamp-2">{drill.description}</p>
                      <div className="flex justify-between text-xs text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {drill.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(drill.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleStartDrill(drill)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                      >
                        <Play size={16} />
                        Start Drill
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Section */}
            {(drillFilter === "all" || drillFilter === "assigned") && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-amber-300">
                    <Trophy className="w-5 h-5" />
                    LEADERBOARD
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                      Top Performers
                    </span>
                  </h3>
                  <div className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                    You are #{student.leaderboardRank} of {student.leaderboardTotal}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center justify-between p-4 rounded-lg ${user.rank === student.leaderboardRank ? "bg-blue-500/20 border border-blue-500/30" : "bg-slate-800/50"} transition-all duration-300 hover:bg-slate-700/50`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {user.rank === 1 && <Crown className="w-6 h-6 text-amber-400 absolute -top-3 -left-3" />}
                          {user.rank === 2 && <Medal className="w-5 h-5 text-slate-400 absolute -top-2 -left-2" />}
                          {user.rank === 3 && <Star className="w-5 h-5 text-amber-600 absolute -top-2 -left-2" />}
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${user.rank <= 3 ? "bg-gradient-to-b from-amber-400 to-amber-600 text-slate-900" : "bg-slate-700 text-slate-300"}`}>
                            {user.rank}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-slate-400">{user.completed} drills completed</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        {user.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Drills */}
            {(drillFilter === "all" || drillFilter === "upcoming") && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-amber-300">
                    <Calendar className="w-5 h-5" />
                    SCHEDULED DRILLS
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                      {drillData.upcoming.length}
                    </span>
                  </h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 border-b border-slate-700">
                        <th className="pb-3 font-medium">DRILL</th>
                        <th className="pb-3 font-medium">TYPE</th>
                        <th className="pb-3 font-medium">DATE & TIME</th>
                        <th className="pb-3 font-medium">LOCATION</th>
                        <th className="pb-3 font-medium">PARTICIPANTS</th>
                        <th className="pb-3 font-medium">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drillData.upcoming.map((drill) => (
                        <tr key={drill.id} className="border-b border-slate-700 hover:bg-slate-800/50 last:border-0 group">
                          <td className="py-4 font-medium">{drill.name}</td>
                          <td className="py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(drill.type)}`}>
                              {drill.type}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="font-medium">{new Date(drill.date).toLocaleDateString()}</div>
                            <div className="text-xs text-slate-400">{drill.time}</div>
                          </td>
                          <td className="py-4 text-sm text-slate-300">{drill.location}</td>
                          <td className="py-4">
                            <div className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full inline-block">
                              {drill.participants} Operators
                            </div>
                          </td>
                          <td className="py-4">
                            <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1 rounded transition-all duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-300">
                              Add to Calendar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Past Drills */}
            {(drillFilter === "all" || drillFilter === "past") && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-emerald-300">
                    <TrendingUp className="w-5 h-5" />
                    DRILL HISTORY
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                      {drillData.past.length}
                    </span>
                  </h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drillData.past.map((drill) => (
                    <div key={drill.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 group hover:border-emerald-500/50 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(drill.type)}`}>
                          {drill.type}
                        </span>
                        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${drill.result === "passed" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}`}>
                          {drill.result === "passed" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {drill.result.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors">{drill.name}</h4>
                      <div className="flex justify-between text-sm text-slate-400 mb-4">
                        <span>DATE: {new Date(drill.date).toLocaleDateString()}</span>
                        <span>TIME: {drill.time}</span>
                      </div>
                      <div className="bg-slate-800 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400">PERFORMANCE SCORE</span>
                          <span className={`text-sm font-bold ${drill.score >= 80 ? "text-emerald-400" : drill.score >= 60 ? "text-amber-400" : "text-red-400"}`}>
                            {drill.score}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${drill.score >= 80 ? "bg-gradient-to-r from-emerald-500 to-green-500" : drill.score >= 60 ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-red-500 to-pink-500"}`} 
                            style={{ width: `${drill.score}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 mb-3 line-clamp-2">
                        {drill.details}
                      </div>
                      <button className="w-full text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
                        View Detailed Report
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}