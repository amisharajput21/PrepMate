import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
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
        />
      )}
    </>
  );
}

export default App;