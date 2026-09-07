import "./Technical.css";

function Technical() {
  return (
    <div className="technical-page">

      <header className="technical-header">
        <p className="technical-label">PLACEMENT PREPARATION</p>
        <h1>Technical MCQs</h1>
        <p>Practice important technical questions for placements.</p>
      </header>

      <main className="technical-content">

        <section className="technical-stats">
          <div className="technical-stat-card">
            <h3>0</h3>
            <p>Questions Solved</p>
          </div>

          <div className="technical-stat-card">
            <h3>0</h3>
            <p>Questions Attempted</p>
          </div>

          <div className="technical-stat-card">
            <h3>0%</h3>
            <p>Progress</p>
          </div>
        </section>

        <section className="technical-topics">
          <h2>Technical Subjects</h2>
          <p>Choose a subject and start practicing.</p>

          <div className="technical-grid">

            <div className="technical-card">
              <span>☕</span>
              <h3>Java</h3>
              <p>Practice Java concepts and interview questions.</p>
              <button>Start Practice →</button>
            </div>

            <div className="technical-card">
              <span>🗄️</span>
              <h3>DBMS</h3>
              <p>Practice SQL and database management concepts.</p>
              <button>Start Practice →</button>
            </div>

            <div className="technical-card">
              <span>💻</span>
              <h3>Operating System</h3>
              <p>Revise important OS concepts for placements.</p>
              <button>Start Practice →</button>
            </div>

            <div className="technical-card">
              <span>🌐</span>
              <h3>Computer Networks</h3>
              <p>Practice networking concepts and MCQs.</p>
              <button>Start Practice →</button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Technical;