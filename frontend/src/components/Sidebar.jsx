import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({
  user,
  activePage,
  onOpenDashboard,
  onOpenDSA,
  onOpenAptitude,
  onOpenTechnical,
  onOpenProfile,
  onLogout,
  onOpenRoadmap,
  onOpenInterview,
  darkMode,
  toggleTheme
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`global-sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="global-sidebar-brand">
        <div className="global-sidebar-logo">
          P
        </div>

        {!collapsed && (
          <div className="global-brand-text">
            <h2>PrepMate</h2>
            <span>Placement Hub</span>
          </div>
        )}

        <button
          className="sidebar-toggle-btn"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          title={
            collapsed
              ? "Expand Sidebar"
              : "Collapse Sidebar"
          }
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <div className="global-sidebar-menu">
        {/* Dashboard */}
        <button
          className={`global-sidebar-item ${
            activePage === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenDashboard();
          }}
        >
          <span className="sidebar-icon">
            ⚡
          </span>

          <span className="sidebar-label">
            Dashboard
          </span>
        </button>

        {/* DSA */}
        <button
          className={`global-sidebar-item ${
            activePage === "dsa" ||
            activePage === "arrays" ||
            activePage === "strings" ||
            activePage === "question"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenDSA();
          }}
        >
          <span className="sidebar-icon">
            💻
          </span>

          <span className="sidebar-label">
            DSA Sheets
          </span>
        </button>

        {/* AI Interview */}
        <button
          type="button"
          className={`global-sidebar-item ${
            activePage === "interview"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenInterview();
          }}
        >
          <span className="sidebar-icon">
            AI
          </span>

          <span className="sidebar-label">
            AI Interview
          </span>
        </button>

        {/* Roadmap */}
        <button
          className={`global-sidebar-item ${
            activePage === "roadmap"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenRoadmap();
          }}
        >
          <span className="sidebar-icon">
            🗺️
          </span>

          <span className="sidebar-label">
            Roadmap
          </span>
        </button>

        {/* Aptitude */}
        <button
          className={`global-sidebar-item ${
            activePage === "aptitude"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenAptitude();
          }}
        >
          <span className="sidebar-icon">
            🧠
          </span>

          <span className="sidebar-label">
            Aptitude
          </span>
        </button>

        {/* Technical */}
        <button
          className={`global-sidebar-item ${
            activePage === "technical"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenTechnical();
          }}
        >
          <span className="sidebar-icon">
            📚
          </span>

          <span className="sidebar-label">
            Core Subjects
          </span>
        </button>
      </div>

      <div className="global-sidebar-bottom">
        {/* Profile */}
        <button
          className={`global-sidebar-profile ${
            activePage === "profile"
              ? "active"
              : ""
          }`}
          onClick={() => {
            setCollapsed(true);
            onOpenProfile();
          }}
        >
          <div className="global-sidebar-avatar">
            {user?.name
              ? user.name
                  .charAt(0)
                  .toUpperCase()
              : "A"}
          </div>

          <div className="global-sidebar-user-info">
            <strong>
              {user?.name || "Amisha Rajput"}
            </strong>

            <span>
              Placement Candidate
            </span>
          </div>
        </button>

        {/* Theme */}
        <button
          type="button"
          className="sidebar-theme-btn"
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
        >
          <span className="sidebar-theme-icon">
            {darkMode ? "☀️" : "◐"}
          </span>

          {!collapsed && (
            <span>
              {darkMode
                ? "Light Mode"
                : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          className="global-sidebar-logout"
          onClick={onLogout}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;