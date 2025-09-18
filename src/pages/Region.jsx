import React, { useState, useEffect } from "react";
import { FiMapPin, FiRefreshCw, FiChevronDown, FiChevronUp, FiPhone, FiHome, FiTruck, FiInfo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// ======== ENRICHED STATIC DATA ========
const DATA = [
  {
    id: "chennai",
    name: "Chennai",
    region: "Tamil Nadu",
    disaster: { 
      type: "Flood", 
      severity: "High",
      description: "Heavy rainfall causing widespread flooding in low-lying areas. Evacuations underway in coastal regions.",
      updateTime: "2 hours ago"
    },
    contacts: [
      { name: "Police", phone: "100", icon: "👮" },
      { name: "Fire Dept", phone: "101", icon: "🚒" },
      { name: "Ambulance", phone: "102", icon: "🚑" },
      { name: "Disaster Management", phone: "1070", icon: "⚠" },
    ],
    shelters: [
      { name: "Anna Nagar Tower Park", type: "Community Hall", capacity: 150, distanceKm: 1.2, occupancy: 120 },
      { name: "St. Mary's School", type: "School", capacity: 200, distanceKm: 2.5, occupancy: 80 },
      { name: "Chennai Trade Center", type: "Exhibition Hall", capacity: 500, distanceKm: 4.3, occupancy: 320 },
    ],
    hospitals: [
      { name: "Apollo Hospital", distanceKm: 2, specializations: ["ER", "Trauma", "ICU"], bedsAvailable: 12, waitTime: "15 mins" },
      { name: "MIOT Hospital", distanceKm: 5, specializations: ["Cardiology", "Orthopedics"], bedsAvailable: 5, waitTime: "45 mins" },
      { name: "Government General Hospital", distanceKm: 3.2, specializations: ["ER", "General Medicine"], bedsAvailable: 8, waitTime: "30 mins" },
    ],
    transport: [
      { type: "Bus Stand", distanceKm: 2, status: "Operational", lastUpdate: "1 hour ago" },
      { type: "Railway Station", distanceKm: 6, status: "Limited Service", lastUpdate: "3 hours ago" },
      { type: "Airport", distanceKm: 12, status: "Closed", lastUpdate: "5 hours ago" },
    ]
  },
  {
    id: "shillong",
    name: "Shillong",
    region: "Meghalaya",
    disaster: { 
      type: "Landslide", 
      severity: "Medium",
      description: "Multiple landslides reported on major highways. Some rural areas cut off from main city.",
      updateTime: "5 hours ago"
    },
    contacts: [
      { name: "Police", phone: "100", icon: "👮" },
      { name: "Fire Dept", phone: "101", icon: "🚒" },
      { name: "Ambulance", phone: "102", icon: "🚑" },
      { name: "Disaster Management", phone: "1070", icon: "⚠" },
    ],
    shelters: [
      { name: "Pinewood Hotel", type: "Hotel", capacity: 80, distanceKm: 0.8, occupancy: 45 },
      { name: "Meghalaya State Museum", type: "Public Building", capacity: 120, distanceKm: 1.5, occupancy: 60 },
      { name: "North Eastern Hill University", type: "University Campus", capacity: 300, distanceKm: 4.2, occupancy: 110 },
    ],
    hospitals: [
      { name: "Civil Hospital", distanceKm: 1, specializations: ["ER", "General"], bedsAvailable: 6, waitTime: "20 mins" },
      { name: "NEIGRIHMS", distanceKm: 3, specializations: ["Specialized Care", "Surgery"], bedsAvailable: 3, waitTime: "1 hour" },
      { name: "Woodland Hospital", distanceKm: 2.5, specializations: ["General Medicine"], bedsAvailable: 4, waitTime: "40 mins" },
    ],
    transport: [
      { type: "Bus Stand", distanceKm: 1, status: "Limited Service", lastUpdate: "2 hours ago" },
      { type: "Airport", distanceKm: 8, status: "Operational", lastUpdate: "1 hour ago" },
    ]
  },
  {
    id: "lucknow",
    name: "Lucknow",
    region: "Uttar Pradesh",
    disaster: { 
      type: "Heatwave", 
      severity: "Low",
      description: "Temperatures reaching 45°C. Heatwave alert issued for next 3 days. Elderly and children at risk.",
      updateTime: "6 hours ago"
    },
    contacts: [
      { name: "Police", phone: "100", icon: "👮" },
      { name: "Fire Dept", phone: "101", icon: "🚒" },
      { name: "Ambulance", phone: "102", icon: "🚑" },
      { name: "Disaster Management", phone: "1070", icon: "⚠" },
    ],
    shelters: [
      { name: "Community Center Hazratganj", type: "Community Hall", capacity: 100, distanceKm: 2, occupancy: 20 },
      { name: "Lucknow University Campus", type: "University", capacity: 250, distanceKm: 3.5, occupancy: 30 },
    ],
    hospitals: [
      { name: "King George Hospital", distanceKm: 2, specializations: ["ER", "Heatstroke"], bedsAvailable: 15, waitTime: "10 mins" },
      { name: "Balrampur Hospital", distanceKm: 4, specializations: ["General Medicine"], bedsAvailable: 8, waitTime: "25 mins" },
      { name: "Civil Hospital", distanceKm: 3.2, specializations: ["Emergency"], bedsAvailable: 12, waitTime: "15 mins" },
    ],
    transport: [
      { type: "Bus Stand", distanceKm: 2, status: "Operational", lastUpdate: "30 mins ago" },
      { type: "Railway Station", distanceKm: 5, status: "Operational", lastUpdate: "1 hour ago" },
      { type: "Airport", distanceKm: 12, status: "Operational", lastUpdate: "1 hour ago" },
    ]
  },
  {
    id: "bhopal",
    name: "Bhopal",
    region: "Madhya Pradesh",
    disaster: { 
      type: "Earthquake", 
      severity: "Medium",
      description: "Earthquake measuring 5.8 on Richter scale. Aftershocks possible. Structural damage reported in old city areas.",
      updateTime: "3 hours ago"
    },
    contacts: [
      { name: "Police", phone: "100", icon: "👮" },
      { name: "Fire Dept", phone: "101", icon: "🚒" },
      { name: "Ambulance", phone: "102", icon: "🚑" },
      { name: "Disaster Management", phone: "1070", icon: "⚠" },
      { name: "Earthquake Helpline", phone: "1092", icon: "🌋" },
    ],
    shelters: [
      { name: "Bharat Bhavan", type: "Cultural Center", capacity: 200, distanceKm: 1.8, occupancy: 90 },
      { name: "Sultania Hospital Ground", type: "Open Ground", capacity: 500, distanceKm: 2.5, occupancy: 200 },
      { name: "MP Nagar Community Hall", type: "Community Hall", capacity: 120, distanceKm: 3.2, occupancy: 60 },
    ],
    hospitals: [
      { name: "Hamidia Hospital", distanceKm: 2.2, specializations: ["ER", "Trauma", "Orthopedics"], bedsAvailable: 18, waitTime: "20 mins" },
      { name: "Bhopal Memorial Hospital", distanceKm: 4.5, specializations: ["General Surgery", "ICU"], bedsAvailable: 7, waitTime: "45 mins" },
      { name: "Chirayu Hospital", distanceKm: 3.8, specializations: ["Emergency Care"], bedsAvailable: 10, waitTime: "30 mins" },
    ],
    transport: [
      { type: "Bus Stand", distanceKm: 2.5, status: "Limited Service", lastUpdate: "2 hours ago" },
      { type: "Railway Station", distanceKm: 4, status: "Operational", lastUpdate: "1 hour ago" },
      { type: "Airport", distanceKm: 10, status: "Operational", lastUpdate: "1 hour ago" },
    ]
  }
];

// ======== REUSABLE COMPONENTS ========
const PanelCard = ({ title, children, className = "", refreshable, onRefresh, isExpanded, onToggle, icon: Icon }) => {  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4 space-y-3 ${className || ""}`}
    >
      <div className="font-semibold text-cyan-300 flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <span className="flex items-center gap-2">
          {Icon && <Icon className="text-cyan-400" />}
          {title}
        </span>
        <span className="flex items-center gap-2">
          {refreshable && (
            <button 
              onClick={(e) => { e.stopPropagation(); onRefresh(); }}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              title="Refresh data"
            >
              <FiRefreshCw size={16} />
            </button>
          )}
          {onToggle && (
            <span className="text-gray-400">
              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          )}
        </span>
      </div>
      <AnimatePresence>
        {(!onToggle || isExpanded) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ListItem = ({ children, onClick, className = "" }) => (
  <motion.li
    whileHover={{ scale: 1.01 }}
    className={`border border-gray-700 rounded-lg p-3 transition-all bg-gray-900 bg-opacity-50 ${
      onClick ? "cursor-pointer hover:bg-gray-800" : ""
    } ${className || ""}`}
    onClick={onClick}
  >
    {children}
  </motion.li>
);

const StatusPill = ({ status, text }) => (
  <span className={`text-xs px-2 py-1 rounded-full ${
    status === "Operational" ? "bg-green-900 text-green-300" :
    status === "Limited Service" ? "bg-yellow-900 text-yellow-300" :
    "bg-red-900 text-red-300"
  }`}>
    {text || status}
  </span>
);

// ======== MAIN APP ========
export default function Region() {
  const [cityId, setCityId] = useState("chennai");
  const [location, setLocation] = useState(null);
  const [connectivity, setConnectivity] = useState(navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    contacts: true,
    shelters: true,
    hospitals: true,
    transport: true
  });

  const city = DATA.find((c) => c.id === cityId);

  // Handle connectivity status
  useEffect(() => {
    const handleOnline = () => setConnectivity(true);
    const handleOffline = () => setConnectivity(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Location Request
  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ 
          lat: pos.coords.latitude, 
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy 
        });
      },
      (error) => {
        let errorMsg = "Location permission denied";
        if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information unavailable";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Location request timed out";
        }
        alert(errorMsg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Refresh data
  const refreshData = () => {
    setLastUpdated(new Date());
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 landscape:overflow-x-hidden">
      {/* HEADER */}
      <header className="bg-gray-800 border-b border-gray-700 p-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="text-xl font-bold flex items-center gap-2 text-cyan-400">
            <span className="hidden sm:inline">EMERGENCY</span><span className="text-emerald-400">COORDINATION</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full border border-gray-600">
              <span className="text-sm">CITY:</span>
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                className="px-2 py-1 rounded text-white bg-gray-800 border border-gray-600 text-sm"
              >
                {DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={refreshData}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors"
              title="Refresh data"
            >
              <FiRefreshCw className="text-cyan-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Disaster Alert Banner */}
      <div className={`p-3 text-center font-medium ${
        city.disaster.severity === "High" ? "bg-red-800 text-red-100" :
        city.disaster.severity === "Medium" ? "bg-yellow-800 text-yellow-100" :
        "bg-orange-800 text-orange-100"
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2">
          <span className="font-bold">{city.name.toUpperCase()} ALERT: </span>
          <span className="text-sm">{city.disaster.type} - {city.disaster.description}</span>
        </div>
      </div>

      {/* MAIN CONTENT - 2-COLUMN LANDSCAPE LAYOUT */}
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN - STATUS, CONTACTS & TRANSPORT */}
        <div className="space-y-4">
          {/* Combined Status and Disaster Info */}
          <PanelCard 
            title="Your Status & Situation" 
            isExpanded={expandedSections.status}
            onToggle={() => toggleSection('status')}
          >
            <div className="grid grid-cols-1 gap-2 mt-3">
              <button
                className="px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-blue-600 text-sm"
                onClick={requestLocation}
              >
                <FiMapPin /> {location ? "Update" : "Share"} Location
              </button>
            </div>

            {location && (
              <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-900 rounded border border-gray-700">
                <div>Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</div>
                <div className="mt-1">Accuracy: ±{Math.round(location.accuracy)} meters</div>
                <div className="mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
              </div>
            )}
            
            {/* Disaster Information */}
            <div className="mt-4 pt-3 border-t border-gray-700 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Disaster Type:</span>
                <span className="text-cyan-300">{city.disaster.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Severity:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  city.disaster.severity === "High" ? "bg-red-900 text-red-300" :
                  city.disaster.severity === "Medium" ? "bg-yellow-900 text-yellow-300" :
                  "bg-green-900 text-green-300"
                }`}>
                  {city.disaster.severity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Last Update:</span>
                <span className="text-gray-400">{city.disaster.updateTime}</span>
              </div>
              <div className="mt-2 p-2 bg-gray-900 rounded border border-gray-700 text-gray-300 text-xs">
                {city.disaster.description}
              </div>
            </div>
          </PanelCard>

          {/* Emergency Contacts */}
          <PanelCard 
            title="Emergency Contacts"
            isExpanded={expandedSections.contacts}
            onToggle={() => toggleSection('contacts')}
            icon={FiPhone}
          >
            <ul className="grid grid-cols-2 gap-2">
              {city.contacts.map((c, i) => (
                <ListItem key={i} className="col-span-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.icon}</span>
                      <div className="text-sm">{c.name}</div>
                    </div>
                    <a 
                      href={`tel:${c.phone}`} 
                      className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      {c.phone}
                    </a>
                  </div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>

          {/* Transport Status */}
          <PanelCard 
            title="Transport Status"
            isExpanded={expandedSections.transport}
            onToggle={() => toggleSection('transport')}
            icon={FiTruck}
          >
            <ul className="space-y-2">
              {city.transport.map((t, i) => (
                <ListItem key={i}>
                  <div className="font-medium text-cyan-300 text-sm">{t.type}</div>
                  <div className="text-xs text-gray-400 flex justify-between mt-1">
                    <span>{t.distanceKm} km away</span>
                    <StatusPill status={t.status} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Updated: {t.lastUpdate}</div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>
        </div>

        {/* RIGHT COLUMN - SHELTERS, HOSPITALS */}
        <div className="space-y-4">
          <PanelCard 
            title=" Temporary Relief Shelters" 
            refreshable={true}
            onRefresh={refreshData}
            isExpanded={expandedSections.shelters}
            onToggle={() => toggleSection('shelters')}
            icon={FiHome}
          >
            <ul className="space-y-2">
              {city.shelters.map((s, i) => (
                <ListItem key={i}>
                  <div className="font-medium text-cyan-300 text-sm">{s.name}</div>
                  <div className="text-xs text-gray-400 flex justify-between mt-1">
                    <span>{s.type} • {s.distanceKm} km</span>
                    <StatusPill 
                      status={s.occupancy < s.capacity * 0.8 ? "Available" : "Nearly Full"} 
                      text={`${s.capacity - s.occupancy} spots`}
                    />
                  </div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>

          <PanelCard 
            title="Hospitals" 
            isExpanded={expandedSections.hospitals}
            onToggle={() => toggleSection('hospitals')}
          >
            <ul className="space-y-2">
              {city.hospitals.map((h, i) => (
                <ListItem key={i}>
                  <div className="font-medium text-cyan-300 text-sm">{h.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>{h.distanceKm} km • {h.specializations?.join(", ")}</div>
                    <div className="flex justify-between mt-1">
                      <span>Beds: {h.bedsAvailable}</span>
                      <span>Wait: {h.waitTime}</span>
                    </div>
                  </div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>
        </div>
      </main>

      <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-800 mt-6">
        <div className="max-w-7xl mx-auto">
          EMERGENCY COORDINATION PLATFORM • PROTOTYPE V1.2 • TAILWIND + REACT
        </div>
      </footer>
    </div>
  );
}