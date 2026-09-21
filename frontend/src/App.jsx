import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";
import DSA from "./components/DSA";
import ArrayPractice from "./components/ArrayPractice";
import TopicPractice from "./components/TopicPractice";
import Question from "./components/Question";
import Aptitude from "./components/Aptitude";
import Technical from "./components/Technical";
import Company from "./components/Company";
import Profile from "./components/Profile";

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


const handleOpenStrings = () => setPage("strings");

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
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

const handleOpenArrays = () => {
  setPage("arrays");
};
const handleOpenQuestion = (question) => {
  setSelectedQuestion(question);
  setPage("question");
};
const handleBackToArrays = () => {
  setPage("arrays");
};

  
return (
  <div className={darkMode ? "app-dark-mode" : "app-light-mode"}>


      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onShowRegister={() => setPage("register")}
        />
      )}

      {page === "register" && (
        <Register
          onRegister={() => setPage("login")}
          onShowLogin={() => setPage("login")}
        />
      )}

      {page === "dashboard" && (
      
<Dashboard 
  user={user} 
  onLogout={handleLogout}
  onOpenDSA={handleOpenDSA}
  onOpenAptitude={handleOpenAptitude}
  onOpenTechnical={handleOpenTechnical}
  onOpenProfile={handleOpenProfile}
  darkMode={darkMode}
  toggleTheme={toggleTheme}
/>


      )}

      {page === "dsa" && (
 <DSA
  onOpenArrays={handleOpenArrays}
  onOpenStrings={handleOpenStrings}
/>
)}

{page === "aptitude" && (
  <Aptitude onBack={() => setPage("dashboard")} />
)}

{page === "technical" && (
  <Technical onBack={() => setPage("dashboard")} />
)}

{page === "company" && (
  <Company />
)}

{page === "profile" && (
  <Profile
    user={user}
    onBack={() => setPage("dashboard")}
  />
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
    onBack={() => setPage("dsa")}
  />
)}


{page === "question" && (
  <Question
    question={selectedQuestion}
    user={user}
    onBack={handleBackToArrays}
  />
)}

    </div>
  );

}

export default App;