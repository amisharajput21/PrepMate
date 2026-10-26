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
import Interview from "./components/Interview";

import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [activityRefreshKey, setActivityRefreshKey] = useState(0);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;

      localStorage.setItem(
        "theme",
        newMode ? "dark" : "light"
      );

      return newMode;
    });
  };

  // =========================================================
  // LOGIN
  // =========================================================
  const handleLogin = (userData) => {
    setUser(userData);

    if (userData?.id) {
      const today = new Date();

      const loginDate =
        `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(
          today.getDate()
        ).padStart(2, "0")}`;

      const existingLoginDate = localStorage.getItem(
        `prepmate_login_date_${userData.id}`
      );

      if (!existingLoginDate) {
        localStorage.setItem(
          `prepmate_login_date_${userData.id}`,
          loginDate
        );
      }
    }

    setPage("dashboard");
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  // =========================================================
  // ACTIVITY REFRESH
  // =========================================================
  const handleActivityRecorded = () => {
    setActivityRefreshKey(
      (previous) => previous + 1
    );
  };

  // =========================================================
  // NAVIGATION
  // =========================================================
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

  const handleOpenRoadmap = () => {
    setPage("roadmap");
  };

  const handleOpenInterview = () => {
    setPage("interview");
  };

  const handleOpenArrays = () => {
    setPage("arrays");
  };

  const handleOpenStrings = () => {
    setPage("strings");
  };

  const handleOpenQuestion = (question) => {
    setSelectedQuestion(question);
    setPage("question");
  };

  const handleBackToArrays = () => {
    setPage("arrays");
  };

  return (
    <div
      className={
        darkMode
          ? "app-dark-mode"
          : "app-light-mode"
      }
    >
      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onShowRegister={() =>
            setPage("register")
          }
        />
      )}

      {page === "register" && (
        <Register
          onRegister={() =>
            setPage("login")
          }
          onShowLogin={() =>
            setPage("login")
          }
        />
      )}

      {page !== "login" &&
        page !== "register" && (
          <div className="app-shell">
            <Sidebar
              user={user}
              activePage={page}
              onOpenDashboard={handleOpenDashboard}
              onOpenDSA={handleOpenDSA}
              onOpenAptitude={handleOpenAptitude}
              onOpenTechnical={handleOpenTechnical}
              onOpenProfile={handleOpenProfile}
              onOpenRoadmap={handleOpenRoadmap}
              onOpenInterview={handleOpenInterview}
              onLogout={handleLogout}
              darkMode={darkMode}
              toggleTheme={toggleTheme}
            />

            <main className="app-page-content">
              {page === "dashboard" && (
                <Dashboard
                  key={`${user?.id || "guest"}-${activityRefreshKey}`}
                  user={user}
                  onLogout={handleLogout}
                  onOpenDSA={handleOpenDSA}
                  onOpenAptitude={handleOpenAptitude}
                  onOpenTechnical={handleOpenTechnical}
                  onOpenProfile={handleOpenProfile}
                  onOpenRoadmap={handleOpenRoadmap}
                  darkMode={darkMode}
                  activityRefreshKey={activityRefreshKey}
                />
              )}

              {page === "roadmap" && (
                <Roadmap
                  onBack={handleOpenDashboard}
                />
              )}

              {page === "dsa" && (
                <DSA
                  onOpenArrays={handleOpenArrays}
                  onOpenStrings={handleOpenStrings}
                />
              )}

              {page === "aptitude" && (
                <Aptitude
                  user={user}
                  onBack={handleOpenDashboard}
                  onActivityRecorded={
                    handleActivityRecorded
                  }
                />
              )}

              {page === "technical" && (
                <Technical
                  onBack={handleOpenDashboard}
                />
              )}

              {page === "profile" && (
                <Profile user={user} />
              )}

              {page === "arrays" && (
                <ArrayPractice
                  onOpenQuestion={handleOpenQuestion}
                />
              )}

              {page === "strings" && (
                <TopicPractice
                  topic="Strings"
                  onOpenQuestion={handleOpenQuestion}
                  onBack={handleOpenDSA}
                />
              )}

              {page === "question" && (
                <Question
                  question={selectedQuestion}
                  user={user}
                  onBack={handleBackToArrays}
                />
              )}

              {page === "company" && (
                <Company
                  onBack={handleOpenDashboard}
                />
              )}

              {page === "interview" && (
                <Interview
                  user={user}
                  onBack={handleOpenDashboard}
                  darkMode={darkMode}
                />
              )}
            </main>
          </div>
        )}
    </div>
  );
}

export default App;