import React, { useState, useEffect } from "react";
import { 
  User, Award, BookOpen, MapPin, FileText, LogOut, BarChart3, 
  Clock, Calendar, ChevronRight, AlertTriangle, Shield, Heart,
  Play, CheckCircle, XCircle, Zap, Target, TrendingUp, Filter
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("drills");
  const [drillFilter, setDrillFilter] = useState("all");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

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
  };

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
        description: "Simulate response to a 7.0 magnitude earthquake with multiple aftershocks"
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
        description: "Respond to a simulated ransomware attack on critical infrastructure"
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
        description: "Practice evacuation procedures during a flash flood scenario"
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
        score: 92
      },
      { 
        id: 8, 
        name: "Fire Safety", 
        type: "Fire", 
        date: "2023-06-10", 
        result: "failed", 
        time: "—",
        score: 65
      },
      { 
        id: 9, 
        name: "First Aid Training", 
        type: "Medical", 
        date: "2023-06-05", 
        result: "passed", 
        time: "3m 10s",
        score: 88
      },
      { 
        id: 10, 
        name: "Earthquake Response", 
        type: "Earthquake", 
        date: "2023-05-28", 
        result: "passed", 
        time: "2m 45s",
        score: 95
      },
      { 
        id: 11, 
        name: "Power Outage Protocol", 
        type: "Infrastructure", 
        date: "2023-05-20", 
        result: "passed", 
        time: "4m 20s",
        score: 84
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
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "gray";
    }
  };

  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case "earthquake": return "bg-orange-100 text-orange-800";
      case "fire": return "bg-red-100 text-red-800";
      case "flood": return "bg-blue-100 text-blue-800";
      case "medical": return "bg-green-100 text-green-800";
      case "cyber": return "bg-purple-100 text-purple-800";
      case "infrastructure": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 p-6">
      {/* Profile Section - Hacker Style */}
      <section className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={student.photo}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              Lvl {student.level.charAt(0)}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">{student.name}</h2>
            <p className="text-gray-400 text-sm">Clearance: {student.level}</p>
          </div>
        </div>
        
        <div className="flex justify-around items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{student.report.passed}</div>
            <div className="text-xs text-gray-400">PASSED</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{student.report.failed}</div>
            <div className="text-xs text-gray-400">FAILED</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{student.report.avgTime}</div>
            <div className="text-xs text-gray-400">AVG TIME</div>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>SYSTEM READINESS</span>
            <span>{student.progress}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" 
              style={{ width: `${student.progress}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Tab Navigation - Hacker Style */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "overview" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-500"}`}
          onClick={() => setActiveTab("overview")}
        >
          <BarChart3 size={18} />
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "drills" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-500"}`}
          onClick={() => setActiveTab("drills")}
        >
          <Zap size={18} />
          Drills
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "resources" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-500"}`}
          onClick={() => setActiveTab("resources")}
        >
          <MapPin size={18} />
          Resources
        </button>
      </div>

      {/* Drills Section */}
      {activeTab === "drills" && (
        <div className="space-y-8">
          {/* Filter Bar */}
          <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Filter size={16} className="text-cyan-400" />
              <span className="text-gray-400">FILTER:</span>
              {["all", "assigned", "upcoming", "past"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1 rounded-full text-xs ${drillFilter === filter ? "bg-cyan-600 text-white" : "bg-gray-700 text-gray-400"}`}
                  onClick={() => setDrillFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              {drillData.assigned.length} ASSIGNED • {drillData.upcoming.length} UPCOMING • {drillData.past.length} COMPLETED
            </div>
          </div>

          {/* Assigned Drills */}
          {(drillFilter === "all" || drillFilter === "assigned") && (
            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-cyan-300">
                <Target className="w-5 h-5" />
                ASSIGNED DRILLS
                <span className="ml-2 text-xs bg-cyan-900 text-cyan-300 px-2 py-1 rounded-full">
                  {drillData.assigned.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drillData.assigned.map((drill) => (
                  <div key={drill.id} className="bg-gray-700 border border-gray-600 rounded-xl p-4 hover:border-cyan-500 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(drill.type)}`}>
                        {drill.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-${getPriorityColor(drill.priority)}-900 text-${getPriorityColor(drill.priority)}-300`}>
                        {drill.priority.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-100 mb-2">{drill.name}</h4>
                    <p className="text-xs text-gray-400 mb-4">{drill.description}</p>
                    <div className="flex justify-between text-xs text-gray-400 mb-4">
                      <span>EST: {drill.estimatedTime}</span>
                      <span>DUE: {new Date(drill.dueDate).toLocaleDateString()}</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg text-sm transition-colors">
                      <Play size={16} />
                      Start Drill
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Drills */}
          {(drillFilter === "all" || drillFilter === "upcoming") && (
            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-amber-300">
                <Calendar className="w-5 h-5" />
                SCHEDULED DRILLS
                <span className="ml-2 text-xs bg-amber-900 text-amber-300 px-2 py-1 rounded-full">
                  {drillData.upcoming.length}
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3">DRILL</th>
                      <th className="pb-3">TYPE</th>
                      <th className="pb-3">DATE & TIME</th>
                      <th className="pb-3">LOCATION</th>
                      <th className="pb-3">PARTICIPANTS</th>
                      <th className="pb-3">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drillData.upcoming.map((drill) => (
                      <tr key={drill.id} className="border-b border-gray-700 hover:bg-gray-700 last:border-0">
                        <td className="py-3 font-medium">{drill.name}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(drill.type)}`}>
                            {drill.type}
                          </span>
                        </td>
                        <td className="py-3">
                          <div>{new Date(drill.date).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">{drill.time}</div>
                        </td>
                        <td className="py-3 text-sm">{drill.location}</td>
                        <td className="py-3">
                          <div className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full inline-block">
                            {drill.participants} Operators
                          </div>
                        </td>
                        <td className="py-3">
                          <button className="text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 px-3 py-1 rounded transition-colors">
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
            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-green-300">
                <TrendingUp className="w-5 h-5" />
                DRILL HISTORY
                <span className="ml-2 text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">
                  {drillData.past.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drillData.past.map((drill) => (
                  <div key={drill.id} className="bg-gray-700 border border-gray-600 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(drill.type)}`}>
                        {drill.type}
                      </span>
                      <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${drill.result === "passed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                        {drill.result === "passed" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {drill.result.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-100 mb-2">{drill.name}</h4>
                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                      <span>DATE: {new Date(drill.date).toLocaleDateString()}</span>
                      <span>TIME: {drill.time}</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">PERFORMANCE SCORE</span>
                        <span className={`text-sm font-bold ${drill.score >= 80 ? "text-green-400" : drill.score >= 60 ? "text-amber-400" : "text-red-400"}`}>
                          {drill.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${drill.score >= 80 ? "bg-green-500" : drill.score >= 60 ? "bg-amber-500" : "bg-red-500"}`} 
                          style={{ width: `${drill.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="w-full mt-3 text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 py-2 rounded transition-colors">
                      View Detailed Report
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Emergency Alert Button */}
      <div className="fixed bottom-6 right-6">
        <button className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 border border-red-500 animate-pulse">
          <AlertTriangle size={20} />
          <span className="font-medium">EMERGENCY PROTOCOL</span>
        </button>
      </div>
    </div>
  );
}