import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";
import DSA from "./components/DSA";
import TopicPractice from "./components/TopicPractice";
import Question from "./components/Question";
import Aptitude from "./components/Aptitude";
import Technical from "./components/Technical";
import Company from "./components/Company";
import Profile from "./components/Profile";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
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
    <>
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
  onOpenCompany={handleOpenCompany}
  onOpenProfile={handleOpenProfile}
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
  <TopicPractice
    topic="Arrays"
    onOpenQuestion={handleOpenQuestion}
    onBack={() => setPage("dsa")}
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
    onBack={handleBackToArrays}
  />
)}
    </>
  );
}

export default App;