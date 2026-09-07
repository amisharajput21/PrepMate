import "./Dashboard.css";

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <header className="dashboard-navbar">
        <div className="dashboard-brand">
          <span className="dashboard-logo">P</span>
          <span>PrepMate</span>
        </div>

        <div className="dashboard-user">
          <span>Hi, {user?.name || "Student"} 👋</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">

        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-small-title">PLACEMENT PREPARATION</p>

            <h1>
              Welcome back, {user?.name || "Student"}!
            </h1>

            <p>
              Keep practicing and get one step closer to your dream placement.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="dashboard-stats">

          <div className="stat-card">
            <span className="stat-icon">💻</span>
            <div>
              <h3>0</h3>
              <p>DSA Problems</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🧠</span>
            <div>
              <h3>0</h3>
              <p>Aptitude Questions</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">📚</span>
            <div>
              <h3>0</h3>
              <p>Technical MCQs</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🏆</span>
            <div>
              <h3>0%</h3>
              <p>Overall Progress</p>
            </div>
          </div>

        </section>

        {/* Practice Section */}
        <section className="practice-section">

          <div className="section-heading">
            <h2>Start Practicing</h2>
            <p>Choose a category and start improving your skills.</p>
          </div>

          <div className="practice-grid">

            <div className="practice-card">
              <div className="practice-icon">💻</div>
              <h3>DSA & Coding</h3>
              <p>
                Practice arrays, strings, linked lists, trees and more.
              </p>
              <button>Practice DSA →</button>
            </div>

            <div className="practice-card">
              <div className="practice-icon">🧠</div>
              <h3>Aptitude</h3>
              <p>
                Improve quantitative aptitude, reasoning and verbal ability.
              </p>
              <button>Start Aptitude →</button>
            </div>

            <div className="practice-card">
              <div className="practice-icon">📚</div>
              <h3>Technical MCQs</h3>
              <p>
                Prepare for DBMS, OS, OOPS, Computer Networks and more.
              </p>
              <button>Practice MCQs →</button>
            </div>

            <div className="practice-card">
              <div className="practice-icon">🏢</div>
              <h3>Company Preparation</h3>
              <p>
                Practice company-specific placement questions.
              </p>
              <button>Explore Companies →</button>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;