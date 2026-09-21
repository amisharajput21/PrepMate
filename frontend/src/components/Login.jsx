import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        alert("Invalid email or password.");
        return;
      }

      const user = await response.json();

      onLogin({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Unable to connect to server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ================= LEFT SIDE ================= */}
      <div className="login-left">

        <div className="login-brand">
          <span className="login-logo">P</span>

          <div>
            <span className="brand-name">PrepMate</span>
            <small>Placement Hub</small>
          </div>
        </div>


        <div className="login-intro">

          <span className="login-badge">
            PLACEMENT PREPARATION
          </span>

          <h1>
            Prepare smarter.
            <br />
            <span>Crack your placement.</span>
          </h1>

          <p>
            Practice DSA, aptitude, technical subjects and
            company-specific questions — all in one place.
          </p>

          <div className="login-points">

            <div>
              <span className="point-icon">✓</span>
              DSA & Coding Practice
            </div>

            <div>
              <span className="point-icon">✓</span>
              Aptitude & Technical MCQs
            </div>

            <div>
              <span className="point-icon">✓</span>
              Company-wise Preparation
            </div>

          </div>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="login-right">

        <div className="login-card">

          <div className="login-card-header">

            <span className="login-small-title">
              WELCOME BACK
            </span>

            <h2>
              Ready to prepare? 👋
            </h2>

            <p>
              Login to continue your placement journey.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>


            {/* PASSWORD */}
            <div className="input-group">

              <div className="password-label">

                <label>Password</label>

                <button type="button">
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>


            {/* LOGIN BUTTON */}
            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <span>→</span>}
            </button>

          </form>


          {/* DIVIDER */}
          <div className="login-divider">
            <span>OR</span>
          </div>


          {/* REGISTER */}
          <p className="register-text">

            Don't have an account?{" "}

            <button
              type="button"
              onClick={onShowRegister}
            >
              Create account
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
