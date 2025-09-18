import React, { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "notifications", label: "Notifications" },
    { id: "preferences", label: "Preferences" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <p className="text-gray-600">
              Update your personal information like name, email, and phone.
            </p>
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-600">
              Manage your login details, change password, and account security.
            </p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <p className="text-gray-600">
              Choose how you want to receive updates and alerts.
            </p>
          </div>
        )}

        {activeTab === "preferences" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <p className="text-gray-600">
              Set your theme, language, and accessibility options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
