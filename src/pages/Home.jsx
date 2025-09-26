import React, { useState, useRef, useEffect } from 'react';
import { FiAlertTriangle, FiMap, FiBarChart2, FiUsers, FiBookOpen, FiMessageSquare, FiClock, FiNavigation, FiBell, FiPlay, FiX } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter, FaRegCompass, FaTemperatureHigh, FaWater, FaWind, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertCircle, MapPin, Download, Compass, ZoomIn, ZoomOut } from 'lucide-react';

const Home = () => {
  const [showGuideline, setShowGuideline] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeAlert, setActiveAlert] = useState(0);
  const [mapZoom, setMapZoom] = useState(10);
  const [currentStory, setCurrentStory] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);
  const videoRef = useRef(null);
  const storiesRef = useRef(null);

  const disasterCategories = [
    { name: "Earthquake", video: "https://www.w3schools.com/html/mov_bbb.mp4", color: "bg-red-500", image: "https://images.unsplash.com/photo-1618477388957-7a6d8f83ec0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Flood", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-blue-500", image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Fire", video: "https://www.w3schools.com/html/mov_bbb.mp4", color: "bg-orange-500", image: "https://images.unsplash.com/photo-1581059786071-91ea1d190c1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Cyclone", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-green-500", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Tsunami", video: "https://www.w3schools.com/html/mov_bbb.mp4", color: "bg-purple-500", image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Drought", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-yellow-500", image: "https://images.unsplash.com/photo-1467803738580-9c67f3db8fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Cyclone", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-green-500", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
   { name: "Cyclone", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-green-500", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
   { name: "Cyclone", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-green-500", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
   { name: "Cyclone", video: "https://www.w3schools.com/html/movie.mp4", color: "bg-green-500", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
   
  ];

  const alerts = [
    { type: "High", message: "Heavy rainfall expected in coastal areas", time: "10 mins ago" },
    { type: "Medium", message: "Heatwave alert for central regions", time: "45 mins ago" },
    { type: "Low", message: "Minor earthquake detected in northern areas", time: "2 hours ago" },
  ];

  const features = [
    { 
      icon: FiMap, 
      title: 'Real-time Alerts', 
      description: 'Get instant hyper-local alerts to prepare and act quickly.', 
      color: "text-blue-400",
      guidelines: {
        title: "Real-time Alert System Guidelines",
        steps: [
          "Enable location services for precise, hyper-local alerts",
          "Customize notification preferences for different disaster types",
          "Set up multiple location monitoring for loved ones",
          "Understand alert levels: Info (Blue), Watch (Yellow), Warning (Orange), Emergency (Red)",
          "Share important alerts with your community network",
          "Regularly check alert history for pattern recognition"
        ],
        tips: [
          "Keep volume up during high-risk periods",
          "Verify information through multiple sources when possible",
          "Create an alert response plan with household members"
        ]
      }
    },
    { 
      icon: FiBookOpen, 
      title: 'AI Safety Guides', 
      description: 'Adaptive, step-by-step guides tailored to your situation.', 
      color: "text-purple-400",
      guidelines: {
        title: "AI-Powered Safety Guidance",
        steps: [
          "Complete your personal risk profile for customized recommendations",
          "Select your current situation (home, work, traveling, etc.)",
          "Follow the step-by-step instructions based on disaster type",
          "Use the interactive checklist to track preparedness actions",
          "Save customized guides for offline access",
          "Update your guide as conditions change"
        ],
        tips: [
          "Review guides periodically even without active disasters",
          "Practice recommended safety procedures with family",
          "Provide feedback to improve AI recommendations"
        ]
      }
    },
    { 
      icon: FiUsers, 
      title: 'Community Help', 
      description: 'Find volunteers, shelters, and emergency services nearby.', 
      color: "text-green-400",
      guidelines: {
        title: "Community Coordination System",
        steps: [
          "Register as either seeking help or offering assistance",
          "Verify your profile to build trust within the community",
          "Use the interactive map to locate resources and people in need",
          "Coordinate through secure messaging for efficient aid distribution",
          "Share verified resource availability (food, water, shelter, medical)",
          "Join or create neighborhood preparedness groups"
        ],
        tips: [
          "Establish communication protocols before disasters strike",
          "Identify community members with special needs for priority assistance",
          "Participate in local disaster preparedness drills"
        ]
      }
    },
    { 
      icon: FiBarChart2, 
      title: 'Risk Analytics', 
      description: 'Visualize risk patterns and stay ahead of disaster events.', 
      color: "text-orange-400",
      guidelines: {
        title: "Risk Analytics Dashboard",
        steps: [
          "Understand the risk scoring system (1-10 scale based on multiple factors)",
          "Monitor historical patterns for your region across different disaster types",
          "Set up automated reports for changing risk conditions",
          "Compare your preparedness level against regional averages",
          "Use predictive modeling to anticipate resource needs",
          "Export data for community planning purposes"
        ],
        tips: [
          "Check analytics weekly during stable periods, daily during elevated risk",
          "Correlate risk data with seasonal patterns in your area",
          "Use the information to prioritize preparedness investments"
        ]
      }
    },
  ];

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideo(false);
  };

  const handleCloseGuideline = () => {
    setShowGuideline(false);
    setActiveFeature(null);
  };

  const handleOpenGuideline = (feature) => {
    setActiveFeature(feature);
    setShowGuideline(true);
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 1));
  };

  // Rotate through alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % disasterCategories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (storiesRef.current) {
      storiesRef.current.scrollTo({
        left: currentStory * 100,
        behavior: 'smooth'
      });
    }
  }, [currentStory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      <main className="mx-auto px-4 lg:px-8 py-8 w-full max-w-7xl">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden mb-10 w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center"></div>
          
          <div className="relative z-20 p-8 md:p-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="text-blue-400 h-10 w-10 mr-3" />
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Disaster<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Watch</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              Real-time alerts, predictive analytics, and community coordination for effective disaster response
            </p>
            <div className="flex flex-wrap justify-center gap-3">
            </div>
          </div>
        </motion.section>

        {/* Alert Bar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 w-full"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-3 md:p-4 shadow-lg border border-red-400/50">
            <div className="flex items-center">
              <div className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-xs md:text-sm mr-3 animate-pulse flex items-center">
                <FiAlertTriangle className="mr-1 md:mr-2" /> LIVE ALERT
              </div>
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAlert}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                  >
                    <span className="font-semibold mr-2 text-xs md:text-sm">{alerts[activeAlert].type} Risk:</span>
                    <span className="text-xs md:text-sm">{alerts[activeAlert].message}</span>
                    <span className="ml-2 md:ml-4 text-xs opacity-80 flex items-center"><FiClock className="mr-1" /> {alerts[activeAlert].time}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs md:text-sm transition-colors whitespace-nowrap">
                View Details
              </button>
            </div>
          </div>
        </motion.section>

        {/* Disaster Stories */}
        <section className="mb-10 w-full">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Disaster Preparedness</h2>
          
          <div className="relative">
            <div 
              ref={storiesRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {disasterCategories.map((category, i) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={i}
                  className="flex-none flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    setActiveCategory(category);
                    setShowVideo(true);
                  }}
                >
                  <div className="relative">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 ${category.color} bg-cover bg-center `} 
                         style={{ backgroundImage: `url(${category.image})` }}>
                      <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                        <FiPlay className="text-white text-xl" />
                      </div>
                    </div>
                    {i === currentStory && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs md:text-sm font-medium text-center">{category.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Map Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 md:p-6 mb-10 border border-gray-700 w-full"
        >
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold flex items-center">
              <FiMap className="mr-2 text-blue-400" /> Live Disaster Map
            </h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleZoomOut}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm bg-gray-700 px-2 py-1 rounded-md">Zoom: {mapZoom}x</span>
              <button 
                onClick={handleZoomIn}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center ml-2 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-lg transition-colors">
                Full Screen <FiNavigation className="ml-1" />
              </button>
            </div>
          </div>
          
          <div className="h-80 bg-gray-700/50 rounded-xl overflow-hidden border border-gray-600 relative">
            {/* Map placeholder with interactive elements */}
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: "url('https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7dcrz27k0fb38dsuon5a.png')",
                transform: `scale(${1 + (mapZoom - 10) * 0.05})`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="absolute inset-0 bg-blue-900/20"></div>
              
              {/* Map markers */}
              <div className="absolute top-1/4 left-1/3">
                <motion.div 
                  className="text-red-500 flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaMapMarkerAlt className="text-2xl md:text-3xl drop-shadow-lg" />
                  <span className="text-xs bg-red-500 px-2 py-1 rounded-md mt-1 font-semibold">Flood</span>
                </motion.div>
              </div>
              
              <div className="absolute top-1/2 left-1/2">
                <motion.div 
                  className="text-orange-500 flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <FaMapMarkerAlt className="text-2xl md:text-3xl drop-shadow-lg" />
                  <span className="text-xs bg-orange-500 px-2 py-1 rounded-md mt-1 font-semibold">Heatwave</span>
                </motion.div>
              </div>
              
              <div className="absolute top-2/3 left-2/5">
                <motion.div 
                  className="text-yellow-500 flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <FaMapMarkerAlt className="text-2xl md:text-3xl drop-shadow-lg" />
                  <span className="text-xs bg-yellow-500 px-2 py-1 rounded-md mt-1 font-semibold text-gray-900">Drought</span>
                </motion.div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600">
              <h3 className="font-semibold text-sm mb-2 flex items-center">
                <Compass className="w-4 h-4 mr-2 text-blue-400" /> Map Legend
              </h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>High Risk Area</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span>Medium Risk Area</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Low Risk Area</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Key Features */}
        <section className="mb-10 w-full">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, i) => (
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                key={i}
                onClick={() => handleOpenGuideline(feature)}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 md:p-6 cursor-pointer border border-gray-700 hover:border-blue-500/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3 ${feature.color} group-hover:scale-110 transition-transform `}>
                  <feature.icon className="text-xl md:text-2xl" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{feature.description}</p>
                <div className="mt-3 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  Click to view guidelines <FiNavigation className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-10 w-full">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Emergency Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-4 md:p-6 border border-blue-700/30">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-400" /> Emergency Contacts
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span>National Emergency</span>
                  <span className="font-mono">112</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Disaster Management</span>
                  <span className="font-mono">108</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Fire Department</span>
                  <span className="font-mono">101</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Medical Emergency</span>
                  <span className="font-mono">102</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-4 md:p-6 border border-purple-700/30">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <FiBookOpen className="w-5 h-5 mr-2 text-purple-400" /> Safety Checklists
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  <span>Emergency Kit Guide</span>
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  <span>Evacuation Plan</span>
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  <span>Family Communication Plan</span>
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  <span>First Aid Instructions</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-4 md:p-6 border border-green-700/30">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <FiUsers className="w-5 h-5 mr-2 text-green-400" /> Nearby Shelters
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between text-sm">
                  <span>Central Emergency Shelter</span>
                  <span className="text-green-400">2.3 km</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Community Center</span>
                  <span className="text-green-400">3.1 km</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>City Hospital</span>
                  <span className="text-green-400">4.7 km</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>Red Cross Facility</span>
                  <span className="text-green-400">5.2 km</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="font-bold text-lg">{activeCategory.name} Safety Guide</h3>
                <button
                  onClick={handleCloseVideo}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="relative">
                <video 
                  ref={videoRef}
                  controls 
                  autoPlay 
                  className="w-full h-auto max-h-[70vh]"
                >
                  <source src={activeCategory.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Watch this video to learn essential safety procedures for {activeCategory.name} emergencies.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guidelines Modal */}
      <AnimatePresence>
        {showGuideline && activeFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={handleCloseGuideline}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800">
                <h3 className="font-bold text-2xl flex items-center">
                  <div className={`w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mr-3 ${activeFeature.color}`}>
                    <activeFeature.icon className="text-xl" />
                  </div>
                  {activeFeature.guidelines.title}
                </h3>
                <button
                  onClick={handleCloseGuideline}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-blue-300 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                      <span>1</span>
                    </div>
                    Key Steps
                  </h4>
                  <ul className="space-y-3">
                    {activeFeature.guidelines.steps.map((step, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-3 bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-green-300 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                      <span>★</span>
                    </div>
                    Pro Tips
                  </h4>
                  <ul className="space-y-3">
                    {activeFeature.guidelines.tips.map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-start p-3 bg-green-900/20 rounded-lg border border-green-800/30"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs">!</span>
                        </div>
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-700 bg-gray-800/50 sticky bottom-0">
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    Use these guidelines to maximize your safety and preparedness.
                  </p>
                  <button 
                    onClick={handleCloseGuideline}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 md:py-10 mt-10 w-full">
        <div className="mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="text-blue-400 h-8 w-8" />
                <h2 className="text-xl font-bold">DisasterWatch</h2>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Advanced disaster management and emergency response platform for communities.
              </p>
              <div className="flex space-x-4 text-xl">
                {[FaWhatsapp, FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                  <motion.a key={i} whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Live Alerts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Emergency Map</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shelter Locations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preparation Checklists</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Emergency Contacts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Evacuation Routes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Recovery Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4 text-sm">Get important alerts and updates directly.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-r-lg font-medium transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} DisasterWatch. All rights reserved.</p>
            <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-xs md:text-sm transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;