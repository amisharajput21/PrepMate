import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import DSA from "./components/DSA";
import ArrayPractice from "./components/ArrayPractice";
import TopicPractice from "./components/TopicPractice";
import Question from "./components/Question";
import Aptitude from "./components/Aptitude";
import Technical from "./components/Technical";
import Company from "./components/Company";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Roadmap from "./components/Roadmap";

import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  /* ================= LOGIN ================= */

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  /* ================= NAVIGATION ================= */

  const handleOpenDashboard = () => {
    setPage("dashboard");
  };

  const handleOpenDSA = () => {
    setPage("dsa");
  };

  const handleOpenAptitude = () => {
    setPage("aptitude");
  };

  const handleOpenTechnical = () => {
    setPage("technical");
  };

  const handleOpenCompany = () => {
    setPage("company");
  };

  const handleOpenProfile = () => {
    setPage("profile");
  };

  const handleOpenProgress = () => {
    setPage("progress");
  };

  const handleOpenRoadmap = () => {
    setPage("roadmap");
  };

  const handleOpenArrays = () => {
    setPage("arrays");
  };

  const handleOpenStrings = () => {
    setPage("strings");
  };

  /* ================= QUESTIONS ================= */

  const handleOpenQuestion = (question) => {
    setSelectedQuestion(question);
    setPage("question");
  };

  const handleBackToArrays = () => {
    setPage("arrays");
  };

  return (
    <div className={darkMode ? "app-dark-mode" : "app-light-mode"}>

      {/* ================= LOGIN ================= */}

      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onShowRegister={() => setPage("register")}
        />
      )}

      {/* ================= REGISTER ================= */}

      {page === "register" && (
        <Register
          onRegister={() => setPage("login")}
          onShowLogin={() => setPage("login")}
        />
      )}

      {/* =================================================
          MAIN APPLICATION
      ================================================= */}

      {page !== "login" && page !== "register" && (

        <div className="app-shell">

          {/* ================= GLOBAL SIDEBAR ================= */}

          <Sidebar
            user={user}
            activePage={page}

            onOpenDashboard={handleOpenDashboard}
            onOpenDSA={handleOpenDSA}
            onOpenAptitude={handleOpenAptitude}
            onOpenTechnical={handleOpenTechnical}
            onOpenProfile={handleOpenProfile}
            onOpenRoadmap={handleOpenRoadmap}

            onLogout={handleLogout}
          />

          {/* ================= PAGE CONTENT ================= */}

          <main className="app-page-content">

            {/* ================= DASHBOARD ================= */}

            {page === "dashboard" && (
              <Dashboard
                user={user}
                onLogout={handleLogout}
                onOpenDSA={handleOpenDSA}
                onOpenAptitude={handleOpenAptitude}
                onOpenTechnical={handleOpenTechnical}
                onOpenProfile={handleOpenProfile}
                onOpenRoadmap={handleOpenRoadmap}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
              />
            )}

            {/* ================= ROADMAP ================= */}

            {page === "roadmap" && (
              <Roadmap
                onBack={handleOpenDashboard}
              />
            )}

            {/* ================= DSA ================= */}

            {page === "dsa" && (
              <DSA
                onOpenArrays={handleOpenArrays}
                onOpenStrings={handleOpenStrings}
              />
            )}

            {/* ================= APTITUDE ================= */}

            {page === "aptitude" && (
              <Aptitude
                onBack={handleOpenDashboard}
              />
            )}

            {/* ================= TECHNICAL ================= */}

            {page === "technical" && (
              <Technical
                onBack={handleOpenDashboard}
              />
            )}

            {/* ================= PROFILE ================= */}

            {page === "profile" && (
              <Profile
                user={user}
                onBack={handleOpenDashboard}
              />
            )}

            {/* ================= ARRAYS ================= */}

            {page === "arrays" && (
              <ArrayPractice
                onOpenQuestion={handleOpenQuestion}
              />
            )}

            {/* ================= STRINGS ================= */}

            {page === "strings" && (
              <TopicPractice
                topic="Strings"
                onOpenQuestion={handleOpenQuestion}
                onBack={handleOpenDSA}
              />
            )}

            {/* ================= QUESTION ================= */}

            {page === "question" && (
              <Question
                question={selectedQuestion}
                user={user}
                onBack={handleBackToArrays}
              />
            )}

            {/* ================= COMPANY ================= */}

            {page === "company" && (
              <Company
                onBack={handleOpenDashboard}
              />
            )}

          </main>

        </div>
      )}

    </div>
  );
}

export default App;

