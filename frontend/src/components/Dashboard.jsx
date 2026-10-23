import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard({
  user,
  onLogout,
  onOpenDSA,
  onOpenAptitude,
  onOpenTechnical,
  onOpenProfile,
  onOpenRoadmap,
  darkMode,
  toggleTheme,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [selectedSheet, setSelectedSheet] = useState(1);

  return (
    <div className={`dashboard-layout ${darkMode ? "dark-mode" : ""}`}>

      {/* ================= SIDEBAR ================= */}

      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-main">

        <header className="dashboard-topbar">

          <div className="topbar-title">
            <span>
              Good Morning, {user?.name || "Amisha"}! 👋
            </span>
          </div>

          <div className="topbar-actions">

            <div
              className={`theme-toggle ${darkMode ? "dark" : ""}`}
              onClick={toggleTheme}
              title={
                darkMode
                  ? "Switch to Day Mode"
                  : "Switch to Night Mode"
              }
            >
              <span className="theme-icon">
                {darkMode ? "☀️" : "🌙"}
              </span>
            </div>

            <div
              className="topbar-profile"
              onClick={onOpenProfile}
            >
              <div className="topbar-avatar">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "A"}
              </div>

              <div className="topbar-profile-info">
                <strong>
                  {user?.name || "Amisha Rajput"}
                </strong>

                <span>Placement Candidate</span>
              </div>

              <span className="profile-arrow">⌄</span>
            </div>

          </div>

        </header>

        {/* ================= DASHBOARD CONTENT ================= */}

        <div className="dashboard-container">

          {/* ================= WELCOME SECTION ================= */}

          <section className="welcome-section">

            {/* ================= LEFT COLUMN ================= */}

            <div className="dashboard-left-column">

              <div className="dashboard-thought">

                <p className="thought-text">
                  <span>Master</span> patterns,
                  <br />

                  not <span>memory.</span>
                  <br />

                  Real <span>problem-solving</span>
                  <br />

                  starts with <span>understanding</span>
                  <br />

                  core structures.
                </p>

              </div>

              {/* ================= UPCOMING ================= */}

              <div className="upcoming-section">

                <div className="upcoming-header">

                  <div>
                    <span className="upcoming-label">
                      UPCOMING
                    </span>

                    <h2>Placement Events</h2>
                  </div>

                  <span className="upcoming-count">
                    3 Events
                  </span>

                </div>

                <div className="upcoming-list">

                  <div className="upcoming-item">

                    <div className="company-icon">T</div>

                    <div className="upcoming-info">
                      <strong>TCS</strong>
                      <span>Aptitude + Coding</span>
                    </div>

                    <div className="upcoming-date">
                      <strong>24</strong>
                      <span>SEP</span>
                    </div>

                    <span className="upcoming-arrow">→</span>

                  </div>

                  <div className="upcoming-item">

                    <div className="company-icon">I</div>

                    <div className="upcoming-info">
                      <strong>Infosys</strong>
                      <span>Online Assessment</span>
                    </div>

                    <div className="upcoming-date">
                      <strong>28</strong>
                      <span>SEP</span>
                    </div>

                    <span className="upcoming-arrow">→</span>

                  </div>

                  <div className="upcoming-item">

                    <div className="company-icon">C</div>

                    <div className="upcoming-info">
                      <strong>Cognizant</strong>
                      <span>Technical Round</span>
                    </div>

                    <div className="upcoming-date">
                      <strong>02</strong>
                      <span>OCT</span>
                    </div>

                    <span className="upcoming-arrow">→</span>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= RIGHT COLUMN ================= */}

            <div className="calendar-column">

              {/* ================= QUICK CALENDAR ================= */}

              <div className="calendar-card">

                <div className="calendar-header">

                  <div>
                    <span className="calendar-label">
                      TODAY
                    </span>

                    <h3>September 2026</h3>
                  </div>

                  <span className="calendar-icon">
                    📅
                  </span>

                </div>

                <div className="calendar-days">

                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>

                </div>

                <div className="calendar-dates">

                  <span></span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>

                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span>13</span>

                  <span>14</span>
                  <span>15</span>
                  <span>16</span>
                  <span>17</span>

                  <span className="today">
                    18
                  </span>

                  <span>19</span>
                  <span>20</span>

                  <span>21</span>
                  <span>22</span>
                  <span>23</span>
                  <span>24</span>
                  <span>25</span>
                  <span>26</span>
                  <span>27</span>

                  <span>28</span>
                  <span>29</span>
                  <span>30</span>

                </div>

              </div>

              {/* ================= MONTHLY STREAK ================= */}

              <div className="streak-card">

                <div className="streak-header">

                  <div>

                    <span className="streak-label">
                      MONTHLY STREAK
                    </span>

                    <h3>
                      12 Days
                    </h3>

                  </div>

                  <div className="streak-icon">
                    🔥
                  </div>

                </div>

                <p>
                  Keep your learning streak alive!
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;

