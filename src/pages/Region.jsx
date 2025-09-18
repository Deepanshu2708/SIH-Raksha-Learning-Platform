
import React, { useState, useEffect } from "react";
import { FiMapPin, FiAlertCircle, FiHeart, FiWifiOff, FiWifi, FiRefreshCw, FiShare2, FiChevronDown, FiChevronUp } from "react-icons/fi";
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
      { name: "Women Helpline", phone: "1091", icon: "👩" },
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
    ],
    tips: [
      "Avoid traveling through waterlogged areas",
      "Boil drinking water to prevent diseases",
      "Keep emergency kit and documents ready"
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
    ],
    tips: [
      "Avoid hilly areas and unstable slopes",
      "Listen for landslide warnings on local radio",
      "Have an evacuation plan ready"
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
    ],
    tips: [
      "Stay hydrated and avoid going out during peak hours",
      "Use ORS to maintain electrolyte balance",
      "Check on elderly neighbors regularly"
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
    ],
    tips: [
      "Avoid damaged buildings and structures",
      "If indoors, take cover under sturdy furniture",
      "Be prepared for aftershocks"
    ]
  }
];

// ======== REUSABLE COMPONENTS ========
const PanelCard = ({ title, children, severity, className = "", refreshable, onRefresh, isExpanded, onToggle }) => {
  const severityColors = { 
    High: "bg-red-900 bg-opacity-20 border-red-700", 
    Medium: "bg-yellow-900 bg-opacity-20 border-yellow-700", 
    Low: "bg-green-900 bg-opacity-20 border-green-700" 
  };
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4 space-y-3 ${
        severity ? severityColors[severity] : ""
      } ${className || ""}`}
    >
      <div className="font-semibold text-cyan-300 flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <span className="flex items-center gap-2">
          {title}
          {severity && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              severity === "High" ? "bg-red-900 text-red-300" :
              severity === "Medium" ? "bg-yellow-900 text-yellow-300" :
              "bg-green-900 text-green-300"
            }`}>
              {severity} Risk
            </span>
          )}
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
  const [status, setStatus] = useState("safe");
  const [location, setLocation] = useState(null);
  const [connectivity, setConnectivity] = useState(navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    contacts: true,
    disaster: true,
    shelters: true,
    hospitals: true,
    transport: true,
    tips: true
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

  // SOS Trigger
  const sendSOS = () => {
    const msg = `🚨 SOS ALERT: User needs immediate assistance at ${
      location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "unknown location"
    } - Status: ${status.toUpperCase()}`;
    
    // Simulate sending to emergency contacts
    alert("SOS sent to emergency services! Your location has been shared.");
  };

  // Refresh data
  const refreshData = () => {
    setLastUpdated(new Date());
  };

  // Share status
  const shareStatus = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Emergency Status',
        text: `I'm currently marked as ${status.toUpperCase()} in ${city.name}. My location: ${location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Not shared'}`,
        url: window.location.href
      })
      .catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100">
      {/* Connectivity Status */}
      <div className={`p-2 text-center text-xs font-medium ${connectivity ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
        {connectivity ? (
          <span className="flex items-center justify-center gap-1"><FiWifi /> Online - Live Data</span>
        ) : (
          <span className="flex items-center justify-center gap-1"><FiWifiOff /> Offline - Showing cached data</span>
        )}
      </div>

      {/* HEADER */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="text-xl font-bold flex items-center gap-2 text-cyan-400">
            <FiHeart className="text-red-400" />
            EMERGENCY<span className="text-emerald-400">COORDINATION PLATFORM</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full border border-gray-600">
              <span className="text-sm">CITY:</span>
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                className="px-2 py-1 rounded text-white bg-gray-800 border border-gray-600"
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
          <span>{city.disaster.type} - {city.disaster.description}</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT PANEL */}
        <div className="space-y-4">
          <PanelCard 
            title="Your Status" 
            isExpanded={expandedSections.status}
            onToggle={() => toggleSection('status')}
          >
            <div className="flex gap-2">
              <button
                className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  status === "safe" 
                    ? "bg-green-700 text-white shadow-md border border-green-500" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                }`}
                onClick={() => setStatus("safe")}
              >
                <div className="w-3 h-3 rounded-full bg-white"></div>
                Safe
              </button>
              <button
                className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  status === "help" 
                    ? "bg-red-700 text-white shadow-md border border-red-500" 
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                }`}
                onClick={() => setStatus("help")}
              >
                <div className="w-3 h-3 rounded-full bg-white"></div>
                Needs Help
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 px-3 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-blue-600"
                onClick={requestLocation}
              >
                <FiMapPin /> {location ? "Update" : "Share"} Location
              </button>
              <button
                className="px-3 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-600"
                onClick={sendSOS}
              >
                <FiAlertCircle /> SOS
              </button>
              <button
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-600"
                onClick={shareStatus}
              >
                <FiShare2 />
              </button>
            </div>

            {location && (
              <div className="text-sm text-gray-400 mt-2 p-2 bg-gray-900 rounded border border-gray-700">
                <div>Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</div>
                <div className="text-xs mt-1">Accuracy: ±{Math.round(location.accuracy)} meters</div>
                <div className="text-xs mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
              </div>
            )}
          </PanelCard>

          <PanelCard 
            title="Emergency Contacts"
            isExpanded={expandedSections.contacts}
            onToggle={() => toggleSection('contacts')}
          >
            <ul className="space-y-2">
              {city.contacts.map((c, i) => (
                <ListItem key={i}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.icon}</span>
                      <div>{c.name}</div>
                    </div>
                    <a 
                      href={`tel:${c.phone}`} 
                      className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      {c.phone}
                    </a>
                  </div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>

          <PanelCard 
            title="Safety Protocols"
            isExpanded={expandedSections.tips}
            onToggle={() => toggleSection('tips')}
          >
            <ul className="space-y-2">
              {city.tips.map((tip, i) => (
                <li key={i} className="text-sm p-2 bg-yellow-900 bg-opacity-20 rounded-lg border border-yellow-700">
                  {tip}
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>

        {/* MIDDLE PANEL */}
        <div className="space-y-4">
          <PanelCard 
            title="Disaster Information" 
            severity={city.disaster.severity}
            isExpanded={expandedSections.disaster}
            onToggle={() => toggleSection('disaster')}
          >
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Type:</span>
                <span className="text-cyan-300">{city.disaster.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Severity:</span>
                <StatusPill status={city.disaster.severity} />
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Last Update:</span>
                <span className="text-gray-400">{city.disaster.updateTime}</span>
              </div>
              <div className="mt-2 p-2 bg-gray-900 rounded border border-gray-700 text-gray-300">
                {city.disaster.description}
              </div>
            </div>
          </PanelCard>

          <PanelCard 
            title="Shelters" 
            severity={city.disaster.severity}
            refreshable={true}
            onRefresh={refreshData}
            isExpanded={expandedSections.shelters}
            onToggle={() => toggleSection('shelters')}
          >
            <ul className="space-y-2">
              {city.shelters.map((s, i) => (
                <ListItem key={i}>
                  <div className="font-medium text-cyan-300">{s.name}</div>
                  <div className="text-sm text-gray-400 flex justify-between mt-1">
                    <span>{s.type} • {s.distanceKm} km away</span>
                    <StatusPill 
                      status={s.occupancy < s.capacity * 0.8 ? "Available" : "Nearly Full"} 
                      text={`${s.capacity - s.occupancy} spots left`}
                    />
                  </div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>

          <PanelCard 
            title="Hospitals" 
            severity={city.disaster.severity}
            isExpanded={expandedSections.hospitals}
            onToggle={() => toggleSection('hospitals')}
          >
            <ul className="space-y-2">
              {city.hospitals.map((h, i) => (
                <ListItem key={i}>
                  <div className="font-medium text-cyan-300">{h.name}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    <div>{h.distanceKm} km away • {h.specializations?.join(", ")}</div>
                    <div className="flex justify-between mt-1">
                      <span>Beds: {h.bedsAvailable} available</span>
                      <span>Wait: {h.waitTime}</span>
                    </div>
                  </div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-4">
          <PanelCard 
            title="Transport Status"
            isExpanded={expandedSections.transport}
            onToggle={() => toggleSection('transport')}
          >
            <ul className="space-y-2">
              {city.transport.map((t, i) => (
                <ListItem key={i}>
                  <div className="font-medium text-cyan-300">{t.type}</div>
                  <div className="text-sm text-gray-400 flex justify-between mt-1">
                    <span>{t.distanceKm} km away</span>
                    <StatusPill status={t.status} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Updated: {t.lastUpdate}</div>
                </ListItem>
              ))}
            </ul>
          </PanelCard>

          <PanelCard title="System Status">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Last Data Refresh:</span>
                <span className="text-cyan-300">{lastUpdated.toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Connection:</span>
                <StatusPill status={connectivity ? "Operational" : "Offline"} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">User Status:</span>
                <StatusPill status={status === "safe" ? "Safe" : "Needs Help"} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Location Services:</span>
                <StatusPill status={location ? "Active" : "Inactive"} />
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 bg-blue-700 hover:bg-blue-600 text-white rounded border border-blue-600 transition-colors text-sm">
                Evacuation Routes
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded border border-gray-600 transition-colors text-sm">
                Emergency Kit
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded border border-gray-600 transition-colors text-sm">
                First Aid Guide
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded border border-gray-600 transition-colors text-sm">
                Weather Alert
              </button>
            </div>
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