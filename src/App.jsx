import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SiHLoginPage from "./components/Login.jsx";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home.jsx";
import LearningModule from "./pages/Learning.jsx";
import Drills from "./pages/Drills";
import Region from "./pages/Region";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/settings.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = ({ role, username }) => {
    console.log("Logged in:", role, username);
    setIsLoggedIn(true); // ✅ user login ho gya
  };

  if (!isLoggedIn) {
    // ✅ Jab tak login nahi hua tab tak login page hi dikhega
    return <SiHLoginPage onSignIn={handleSignIn} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className=" overflow-y-auto flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learning" element={<LearningModule />} />
              <Route path="/drills" element={<Drills />} />
              <Route path="/region" element={<Region />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              {/* Agar user galat route pe gaya to default HomePage dikhe */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;