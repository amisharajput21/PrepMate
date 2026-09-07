import "./Company.css";

function Company() {
  return (
    <div className="company-page">

      <header className="company-header">
        <p className="company-label">PLACEMENT PREPARATION</p>
        <h1>Company Preparation</h1>
        <p>Prepare for company-specific placement rounds and interviews.</p>
      </header>

      <main className="company-content">

        <section className="company-stats">
          <div className="company-stat-card">
            <h3>0</h3>
            <p>Companies Prepared</p>
          </div>

          <div className="company-stat-card">
            <h3>0</h3>
            <p>Questions Practiced</p>
          </div>

          <div className="company-stat-card">
            <h3>0%</h3>
            <p>Overall Progress</p>
          </div>
        </section>

        <section className="company-section">
          <h2>Popular Companies</h2>
          <p>Choose a company and start your preparation.</p>

          <div className="company-grid">

            <div className="company-card">
              <span>🏢</span>
              <h3>TCS</h3>
              <p>Practice TCS aptitude, technical and interview questions.</p>
              <button>Start Preparation →</button>
            </div>

            <div className="company-card">
              <span>💼</span>
              <h3>Infosys</h3>
              <p>Prepare for Infosys placement rounds and interviews.</p>
              <button>Start Preparation →</button>
            </div>

            <div className="company-card">
              <span>🚀</span>
              <h3>Wipro</h3>
              <p>Practice important Wipro placement questions.</p>
              <button>Start Preparation →</button>
            </div>

            <div className="company-card">
              <span>💻</span>
              <h3>Accenture</h3>
              <p>Prepare for Accenture aptitude and technical rounds.</p>
              <button>Start Preparation →</button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Company;