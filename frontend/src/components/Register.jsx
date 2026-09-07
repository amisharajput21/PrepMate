import { useState } from "react";
import "./Register.css";

function Register({ onRegister, onShowLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("Registration successful! Please login.");
        onRegister();
      } else {
        const message = await response.text();
        alert(message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Backend is not running or connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join us and start managing your finances</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="login-link">
          <span>Already have an account?</span>
          <button type="button" onClick={onShowLogin}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;
