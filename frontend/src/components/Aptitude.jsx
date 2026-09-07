import "./Aptitude.css";

function Aptitude() {
  return (
    <div className="aptitude-page">

      <header className="aptitude-header">
        <p className="aptitude-label">PLACEMENT PREPARATION</p>
        <h1>Aptitude Practice</h1>
        <p>Practice important aptitude questions for placements.</p>
      </header>

      <main className="aptitude-content">

        <section className="aptitude-stats">
          <div className="aptitude-stat-card">
            <h3>0</h3>
            <p>Questions Solved</p>
          </div>

          <div className="aptitude-stat-card">
            <h3>0</h3>
            <p>Questions Attempted</p>
          </div>

          <div className="aptitude-stat-card">
            <h3>0%</h3>
            <p>Progress</p>
          </div>
        </section>

        <section className="aptitude-topics">
          <h2>Aptitude Topics</h2>
          <p>Choose a topic and start practicing.</p>

          <div className="aptitude-grid">

            <div className="aptitude-card">
              <span>🔢</span>
              <h3>Quantitative Aptitude</h3>
              <p>Numbers, percentages, profit & loss and more.</p>
              <button onClick={() => alert("Quantitative Aptitude coming soon!")}>
  Start Practice →
</button>
            </div>

            <div className="aptitude-card">
              <span>🧠</span>
              <h3>Logical Reasoning</h3>
              <p>Improve your logical and analytical thinking.</p>
              <button onClick={() => alert("Logical Reasoning coming soon!")}>
  Start Practice →
</button>
            </div>

            <div className="aptitude-card">
              <span>📊</span>
              <h3>Data Interpretation</h3>
              <p>Practice charts, tables and data-based questions.</p>
             <button onClick={() => alert("Data Interpretation coming soon!")}>
  Start Practice →
</button>
            </div>

            <div className="aptitude-card">
              <span>⏱️</span>
              <h3>Time & Work</h3>
              <p>Practice important time and work problems.</p>
              <button onClick={() => alert("Time & Work coming soon!")}>
  Start Practice →
</button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Aptitude;