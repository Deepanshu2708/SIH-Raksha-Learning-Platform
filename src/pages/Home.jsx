import React from 'react';
import { FiPlayCircle, FiMapPin, FiBarChart2, FiUsers, FiBookOpen } from 'react-icons/fi';

// Reusable Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color, hoverColor }) => (
  <div className="bg-gray-800/90 border border-cyan-600/40 rounded-xl p-6 text-center shadow-lg hover:shadow-cyan-400/40 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 group">
    <div className={`w-16 h-16 bg-gray-700/50 text-${color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${hoverColor} group-hover:text-white transition-all duration-300`}>
      <Icon className="text-3xl" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

// Reusable Video Card Component
const VideoCard = ({ title, description, imgSrc }) => (
  <div className="bg-gray-800/80 border border-emerald-500/30 rounded-xl shadow-lg overflow-hidden group hover:border-emerald-400/60 hover:shadow-emerald-400/40 transition-all duration-300">
    <div className="relative h-48 bg-gray-700 flex items-center justify-center overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <FiPlayCircle className="absolute text-5xl text-cyan-400 opacity-80 group-hover:opacity-100 transform scale-100 group-hover:scale-110 transition-all duration-300 cursor-pointer" />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

function Home() {
  const disasterCategories = ['Earthquake', 'Flood', 'Fire', 'Cyclone', 'Tsunami', 'Drought', 'Volcano', 'Landslide'];
  const features = [
    { icon: FiMapPin, title: 'Live Location Alerts', description: 'Receive immediate, localised threat notifications.', color: 'cyan-400', hoverColor: 'cyan-600' },
    { icon: FiBookOpen, title: 'AI-Powered Guides', description: 'Smart safety protocols & emergency plans.', color: 'emerald-400', hoverColor: 'emerald-600' },
    { icon: FiUsers, title: 'Community Help Center', description: 'Connect with volunteers & resources.', color: 'cyan-400', hoverColor: 'cyan-600' },
    { icon: FiBarChart2, title: 'Data & Analytics Dashboard', description: 'Visualize disaster trends & insights.', color: 'emerald-400', hoverColor: 'emerald-600' },
  ];
  const videos = [
    { title: 'Flood Safety', description: 'Essential survival tips during floods.', imgSrc: 'https://via.placeholder.com/400x250/22D3EE/FFFFFF?text=Flood+Safety' },
    { title: 'Earthquake Preparedness', description: 'What to do before, during, and after an earthquake.', imgSrc: 'https://via.placeholder.com/400x250/34D399/FFFFFF?text=Earthquake+Prep' },
    { title: 'Fire Safety Basics', description: 'Essential tips to prevent and act during a fire.', imgSrc: 'https://via.placeholder.com/400x250/0891B2/FFFFFF?text=Fire+Safety' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-4 lg:py-8">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-cyan-900/40 to-emerald-900/40 border border-cyan-600/40 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="w-40 h-40 bg-cyan-500 rounded-full mix-blend-lighten filter blur-3xl absolute top-1/4 left-1/4 animate-pulse"></div>
            <div className="w-56 h-56 bg-emerald-500 rounded-full mix-blend-lighten filter blur-3xl absolute bottom-1/3 right-1/3 animate-pulse delay-1000"></div>
            <div className="w-32 h-32 bg-cyan-400 rounded-full mix-blend-lighten filter blur-3xl absolute top-1/2 right-1/4 animate-pulse delay-500"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-100 drop-shadow-lg">
              Real-Time Disaster Management Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Live alerts, awareness videos, and safety guides — all in one place.
            </p>
           
          </div>
        </section>

        {/* Disaster Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-100">Disaster Categories</h2>
          <div className="relative flex items-center">
            <button className="absolute left-0 z-10 bg-gray-800 p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity">&lt;</button>
            <div className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide">
              {disasterCategories.map((category, i) => (
                <div key={i} className="flex-none text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-cyan-400 flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer shadow-md mb-2">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <p className="text-sm text-gray-300">{category}</p>
                </div>
              ))}
            </div>
            <button className="absolute right-0 z-10 bg-gray-800 p-2 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity">&gt;</button>
          </div>
        </section>

        {/* Live Alerts */}
        <section className="mb-16">
          <div className="flex items-center bg-gray-800/80 border border-red-500/40 rounded-full p-2 pr-6 shadow-xl overflow-hidden">
            <div className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold text-sm flex-none shadow-md">LIVE ALERTS</div>
            <div className="flex-grow flex items-center overflow-hidden">
              <marquee className="text-gray-300 text-sm whitespace-nowrap px-4 py-2">
                Flash Flood Warning in Mumbai | Cyclone approaching Chennai | Forest fire in California | Heatwave alert for Delhi | Landslide reported in Uttarakhand...
              </marquee>
            </div>
            <div className="flex-none ml-4">
              <select className="bg-gray-700 text-gray-100 text-sm rounded-md py-1 px-3 border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                <option>Filter by: All Regions</option>
                <option>State: Maharashtra</option>
                <option>City: Mumbai</option>
              </select>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-100">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => <FeatureCard key={i} {...feature} />)}
          </div>
        </section>

        {/* Learning & Awareness */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-100">Learning & Awareness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, i) => <VideoCard key={i} {...video} />)}
          </div>
        </section>

        {/* About Project */}
        <section className="bg-gray-900/90 border border-emerald-500/30 rounded-xl p-8 shadow-xl mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">About the Project</h2>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-4xl">
            Bridging the gap in emergency response, our platform provides unified,
            real-time disaster intelligence. We aim to empower communities with
            timely information, robust learning resources, and a collaborative
            network to minimize the impact of natural and man-made disasters.
          </p>
          <div className="text-gray-400 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-100">Team Members:</p>
              <p>Rajat Sharma, Priya Singh, Aman Patel, Sneha Reddy</p>
            </div>
            <div>
              <p className="font-semibold text-gray-100">Mentor:</p>
              <p>Prof. R.K. Gupta</p>
            </div>
            <div className="col-span-full">
              <p className="font-semibold text-gray-100">Developed During:</p>
              <p>SIH Hackathon 2024</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-cyan-600/40 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} DisasterWatch. All rights reserved.</p>
            <p>Designed for SIH Hackathon.</p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">About Us</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">FAQ</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
          </div>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
