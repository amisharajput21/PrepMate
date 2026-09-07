import "./Dashboard.css";

function Dashboard({
  user,
  onLogout,
  onOpenDSA,
  onOpenAptitude,
  onOpenTechnical,
  onOpenCompany,
  onOpenProfile
}) {

 const solvedQuestions =
  localStorage.getItem("twoSumSolved") === "true" ? 1 : 0;

const aptitudeSolved =
  Number(localStorage.getItem("aptitudeSolved") || 0);

const technicalSolved =
  Number(localStorage.getItem("technicalSolved") || 0);

const companySolved =
  Number(localStorage.getItem("companySolved") || 0);

const totalQuestions = 40;

const totalSolved =
  solvedQuestions +
  aptitudeSolved +
  technicalSolved +
  companySolved;

const progress = Math.round(
  (totalSolved / totalQuestions) * 100
);

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
          <button className="dashboard-logout" onClick={onLogout}>
  Logout
</button>
<button className="profile-btn" onClick={onOpenProfile}>
  Profile
</button>
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

            <p className="dashboard-subtitle">
  Track your preparation and improve your placement skills.
</p>

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
              <h3>{solvedQuestions}</h3>
<p>DSA Problems</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🧠</span>
            <div>
              <h3>{aptitudeSolved}</h3>
<p>Aptitude Questions</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">📚</span>
            <div>
              <h3>{technicalSolved}</h3>
<p>Technical MCQs</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🏆</span>
            <div>
              <h3>0%</h3>
              <p>Overall Progress</p>
              <div className="progress-bar">
 <div
  className="progress-fill"
  style={{ width: `${progress}%` }}
>
  <span>{progress}%</span>
</div>
</div>
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
              <span className="card-status">Start your coding practice</span>
             <button onClick={onOpenDSA}>Practice DSA →</button>
            </div>

            <div className="practice-card">
              <div className="practice-icon">🧠</div>
              <h3>Aptitude</h3>
              <p>
                Improve quantitative aptitude, reasoning and verbal ability.
              </p>
              <span className="card-status">Build your aptitude skills</span>
              <button onClick={onOpenAptitude}>Start Practice →</button>
            </div>

            <div className="practice-card">
              <div className="practice-icon">📚</div>
              <h3>Technical MCQs</h3>
              <p>
                Prepare for DBMS, OS, OOPS, Computer Networks and more.
              </p>
              <p>Practice important technical questions for placements.</p>

<span className="card-status">Test your technical knowledge</span>

<button onClick={onOpenTechnical}>Start Practice →</button>
             
            </div>

            <div className="practice-card">
              <div className="practice-icon">🏢</div>
              <h3>Company Preparation</h3>
              <p>
                Practice company-specific placement questions.
              </p>
              <span className="card-status">Prepare for company interviews</span>
              <button onClick={onOpenCompany}>Start Preparation →</button>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;