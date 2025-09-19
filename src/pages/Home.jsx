import React, { useState } from 'react';
import { FiPlayCircle, FiMapPin, FiBarChart2, FiUsers, FiBookOpen, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import vidieostory from '../assets/vidieostory.mp4';

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.08, y: -6 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    onClick={onClick}
    className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-3xl p-6 text-center shadow-xl hover:shadow-blue-500/40 transition-all duration-300 border border-transparent hover:border-blue-500/30 cursor-pointer"
  >
    <motion.div whileHover={{ rotate: 10 }} className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
      <Icon className="text-3xl" />
    </motion.div>
    <h3 className="text-xl font-bold mb-2 text-white tracking-wide">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

function Home() {
  const [showGuideline, setShowGuideline] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const disasterCategories = [
    { name: "Earthquake", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Flood", video: "https://www.w3schools.com/html/movie.mp4" },
    { name: "Fire", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Cyclone", video: "https://www.w3schools.com/html/movie.mp4" },
    { name: "Tsunami", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Drought", video: "https://www.w3schools.com/html/movie.mp4" },
    { name: "Volcano", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Landslide", video: "https://www.w3schools.com/html/movie.mp4" },
  ];

  const features = [
    { icon: FiMapPin, title: 'NDMA Guideline', description: 'Get instant hyper-local alerts to prepare and act quickly.', onClick: () => setShowGuideline(true) },
    { icon: FiBookOpen, title: 'AI Safety Guides', description: 'Adaptive, step-by-step guides tailored to your situation.' },
    { icon: FiUsers, title: 'Community Help', description: 'Find volunteers, shelters, and emergency services nearby.' },
    { icon: FiBarChart2, title: 'Analytics & Trends', description: 'Visualize risk patterns and stay ahead of disaster events.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      <main className="container mx-auto px-4 lg:px-8 py-10">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-gradient-to-r from-blue-800/70 to-indigo-800/70 rounded-3xl p-10 text-center shadow-2xl mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Real-Time Disaster Management
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Live alerts, awareness videos, and AI-powered safety guides — all in one place.
          </p>
        </motion.section>

        {/* Disaster Story Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Disaster Story</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex overflow-x-auto space-x-6 p-2 scrollbar-hide justify-center"
          >
            {disasterCategories.map((category, i) => (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                key={i}
                className="flex-none text-center transition-transform duration-300"
                onClick={() => {
                  setActiveCategory(category);
                  setShowVideo(true);
                }}
              >
                <div className="w-20 h-20 rounded-full border border-blue-400 flex items-center justify-center bg-[#1E293B] hover:bg-[#334155] shadow-md hover:shadow-blue-500/50 transition-all">
                  <span className="text-2xl">🎥</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">{category.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Live Alerts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center bg-gradient-to-r from-red-600 to-pink-600 rounded-full p-3 pr-6 shadow-2xl"
          >
            <span className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm mr-4 animate-pulse">LIVE</span>
            <marquee className="flex-grow text-white text-sm tracking-wide">
              Flash Flood Warning | Cyclone Alert | Forest Fire | Heatwave | Landslide Updates...
            </marquee>
            <motion.select
              whileHover={{ scale: 1.05 }}
              className="ml-4 bg-[#206a9c] text-white text-sm rounded-md px-3 py-1 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option>All Regions</option>
              <option>Maharashtra</option>
              <option>Chennai</option>
            </motion.select>
          </motion.div>
        </motion.section>

        {/* Key Features */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0F172A] rounded-2xl p-8 shadow-2xl text-center max-w-4xl mx-auto mb-16 border border-gray-800 hover:border-blue-500/40 transition-all"
        >
          <h2 className="text-3xl font-bold mb-4">About the Project</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Bridging the gap in emergency response with a unified real-time disaster platform. 
            Our solution provides accurate alerts, education, and community connection — empowering people to act faster and smarter.
          </p>
        </motion.section>
      </main>

      {/* ===== Disaster Video Modal ===== */}
      <AnimatePresence>
        {showVideo && activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-black rounded-2xl shadow-2xl max-w-3xl w-[90%] p-4 relative"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-all"
              >
                <X className="w-7 h-7" />
              </button>
              <video controls autoPlay className="w-full rounded-xl">
                <source src={activeCategory.video} type="video/mp4" />
              </video>
              <p className="text-center text-white mt-3 text-lg font-semibold">
                {activeCategory.name} Safety Video
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NDMA Guideline Modal ===== */}
      <AnimatePresence>
        {showGuideline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-[90%] h-[70vh] p-6 relative overflow-hidden flex flex-col"
            >
              <button
                onClick={() => setShowGuideline(false)}
                className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
                📖 NDMA Guidelines
              </h2>
              <div className="overflow-y-auto pr-2 text-left space-y-4 text-gray-700 leading-relaxed font-serif text-justify">
                <p>NDMA (National Disaster Management Authority) ka main goal hai disaster preparedness ko improve karna aur response process ko fast aur efficient banana.</p>
                <p>🌟 Executive Summary: National Disaster Management Information and Communication System (NDMICS)
This document presents the guidelines for establishing the 

National Disaster Management Information and Communication System (NDMICS), a comprehensive framework designed to shift India’s disaster management approach from reactive to proactive and holistic. Developed by the National Disaster Management Authority (NDMA) in February 2012, these guidelines outline a system that leverages technology to build a disaster-resilient society.



The NDMICS is built on two core components:


The National Disaster Management Information System (NDMIS): A GIS-based platform that provides crucial knowledge and decision-support tools.


The National Disaster Communication Network (NDCN): A reliable, multi-layered communication backbone for disseminating information to all stakeholders.

This system is designed to provide assured multi-services, including audio, video, and data, as well as valuable information for effective disaster management across all phases.

Key Highlights of the NDMICS
A Paradigm Shift in Disaster Management
The guidelines recognize that while natural disasters cannot be prevented, their impact can be minimized through proactive planning and the use of technology. The approach emphasizes assigning priority to 

prevention, mitigation, and preparedness activities, while also strengthening efforts for faster response and more effective recovery. This is in line with global initiatives such as the Tampere Convention, which India signed in 1999, highlighting the importance of telecommunication resources in saving lives and mitigating disasters.


The NDMICS addresses the specific ICT needs for each phase of the disaster continuum:


Mitigation & Recovery: These phases are less time-critical and require the transfer of large volumes of data for analysis, reconstruction, and documenting lessons learned. The Internet is well-suited for these activities.




Preparedness & Response: These are time-critical phases that demand rapid, reliable, and easily configurable communication for disseminating warnings and coordinating response teams.


National Disaster Management Information System (NDMIS)
The NDMIS is the intellectual core of the NDMICS, established on a 

GIS platform to provide knowledge-based information for decision-making. It integrates data from diverse sources, such as geographic, demographic, and hazard profiles, to create sophisticated tools:


Vulnerability Analysis and Risk Assessment (VA&RA): A tool for the pre-disaster phase used to predict the impact of a disaster, prioritize mitigation projects, and enforce building codes.


Decision Support System (DSS): An empowering tool for the during- and post-disaster phases that provides dynamic, real-time maps to guide rescue and relief operations, damage assessment, and recovery planning.



To ensure uninterrupted service, the NDMIS includes a 

Disaster Recovery (DR) site at the National Remote Sensing Center (NRSC), Hyderabad, which is geographically distant from the main National EOC (NEOC) in Delhi.

National Disaster Communication Network (NDCN)
The NDCN is envisioned as a "network of networks" that integrates existing telecommunication infrastructure like 

NICNET, SWANS, POLNET, and DMNET (ISRO). This network uses a terrestrial backbone (optical fiber/microwave) with a dedicated satellite-based backup to ensure fail-safe communication during disasters, which often disrupt terrestrial links.




A key focus of the NDCN is last-mile connectivity to the affected community and first responders, which is achieved in a graded manner:


Phase I: District authorities use a portable Mini Mobile Communication Pack (MMCP), consisting of satellite phones and VHF radios, to establish a basic communication link within 15 minutes of reaching a disaster site.



Phase II: NDRF battalions deploy a vehicle-based Mobile Emergency Operations Center (MEOC) with VSAT terminals, satellite phones, and VHF systems to provide enhanced voice, video, and data communication within three hours.



Phase III: Full communication is restored within two to seven days with the assistance of telecom service providers.

Implementation and Challenges
The successful implementation of NDMICS requires a planned, phased, and centrally managed approach. It is recommended as a turnkey project overseen by a qualified implementing agency for a period of five years to ensure quality and maintenance. The project will be centrally funded, with states responsible for civil and electrical infrastructure at their respective EOCs.




Key challenges identified in the document include:


Integration and Interoperability: Integrating disparate, standalone networks and ensuring seamless communication is a significant technical challenge.


Last-Mile Logistics: Ensuring the availability of power, fuel, and equipment, especially at disaster sites, is critical for network operation and maintenance.




Human Resource Development: Adequate training for operational, administrative, and technical staff is essential for the effective use of the system.


Language Barrier: The system must overcome linguistic barriers by providing multi-lingual call centers and websites for effective communication with a diverse population.</p>
 </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm space-y-4 md:space-y-0">
          <motion.div whileHover={{ x: 2 }} className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} DisasterWatch. All rights reserved.</p>
            <p className="text-gray-500 text-xs">Designed for SIH Hackathon.</p>
          </motion.div>
          <div className="flex space-x-6 text-xl">
            {[FaWhatsapp, FaInstagram, FaFacebook, FaXTwitter].map((Icon, i) => (
              <motion.a key={i} whileHover={{ scale: 1.3, rotate: 8 }} whileTap={{ scale: 0.9 }} href="#" className="transition-colors">
                <Icon />
              </motion.a>
            ))}
          </div>
          <div className="flex space-x-6 text-center md:text-right">
            <a href="#" className="hover:text-white">About Us</a>
            <a href="#" className="hover:text-white">FAQ</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;