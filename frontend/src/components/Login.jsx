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
      <div className="login-left">
        <div className="login-brand">
          <span className="login-logo">P</span>
          <span>PrepMate</span>
        </div>

        <div className="login-intro">
          <span className="login-badge">PLACEMENT PREPARATION</span>

          <h1>
            Prepare smarter.
            <br />
            <span>Crack your placement.</span>
          </h1>

          <p>
            Practice DSA, aptitude, technical subjects and company-specific
            questions — all in one place.
          </p>

          <div className="login-points">
            <div>✓ DSA & Coding Practice</div>
            <div>✓ Aptitude & Technical MCQs</div>
            <div>✓ Company-wise Preparation</div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome back 👋</h2>
            <p>Login to continue your preparation</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <div className="password-label">
                <label>Password</label>

                <button type="button">Forgot password?</button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <p className="register-text">
            Don't have an account?{" "}
            <button type="button" onClick={onShowRegister}>
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;