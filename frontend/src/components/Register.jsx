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

      {/* ================= LEFT BRAND SECTION ================= */}
      <div className="register-left">

        <div className="register-brand">
          <span className="register-logo">P</span>

          <div>
            <span className="brand-name">PrepMate</span>
            <small>Placement Hub</small>
          </div>
        </div>


        <div className="register-intro">

          <span className="register-badge">
            START YOUR JOURNEY
          </span>

          <h1>
            Build your skills.
            <br />
            <span>Crack your placement.</span>
          </h1>

          <p>
            Create your PrepMate account and get everything
            you need for placement preparation in one place.
          </p>

          <div className="register-points">

            <div>
              <span className="point-icon">✓</span>
              Practice DSA & Coding
            </div>

            <div>
              <span className="point-icon">✓</span>
              Improve Aptitude & Technical Skills
            </div>

            <div>
              <span className="point-icon">✓</span>
              Prepare for Company Tests
            </div>

          </div>

        </div>

      </div>


      {/* ================= RIGHT FORM ================= */}
      <div className="register-right">

        <div className="register-card">

          <div className="register-header">

            <span className="register-small-title">
              CREATE YOUR ACCOUNT
            </span>

            <h1>Create Account</h1>

            <p>
              Start your placement preparation with PrepMate.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}
            <div className="input-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

            </div>


            {/* EMAIL */}
            <div className="input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>


            {/* PASSWORD */}
            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>


            {/* CONFIRM PASSWORD */}
            <div className="input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>


            {/* REGISTER BUTTON */}
            <button
              className="register-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <span>→</span>}
            </button>

          </form>


          {/* LOGIN LINK */}
          <div className="login-link">

            <span>Already have an account?</span>

            <button
              type="button"
              onClick={onShowLogin}
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
