import "./DSA.css";

function DSA({ onOpenArrays }){
  return (
    <div className="dsa-page">

      <header className="dsa-header">
        <div>
          <p className="dsa-label">CODING PREPARATION</p>
          <h1>DSA & Coding</h1>
          <p>Practice important DSA topics for your placement preparation.</p>
        </div>
      </header>

      <main className="dsa-content">

        <section className="dsa-stats">
          <div className="dsa-stat-card">
            <h3>0</h3>
            <p>Problems Solved</p>
          </div>

          <div className="dsa-stat-card">
            <h3>0</h3>
            <p>Problems Attempted</p>
          </div>

          <div className="dsa-stat-card">
            <h3>0%</h3>
            <p>Progress</p>
          </div>
        </section>

        <section className="dsa-topics">
          <div className="section-heading">
            <h2>DSA Topics</h2>
            <p>Choose a topic and start practicing.</p>
          </div>

          <div className="topic-grid">

            <div className="topic-card">
              <span>📦</span>
              <h3>Arrays</h3>
              <p>Practice array-based coding problems.</p>
              <button onClick={onOpenArrays}>Start Practice →</button>
            </div>

            <div className="topic-card">
              <span>🔤</span>
              <h3>Strings</h3>
              <p>Improve your string manipulation skills.</p>
              <button>Start Practice →</button>
            </div>

            <div className="topic-card">
              <span>🔗</span>
              <h3>Linked List</h3>
              <p>Practice important linked list problems.</p>
              <button>Start Practice →</button>
            </div>

            <div className="topic-card">
              <span>🌳</span>
              <h3>Trees</h3>
              <p>Learn and practice tree-based problems.</p>
              <button>Start Practice →</button>
            </div>

            <div className="topic-card">
              <span>🔍</span>
              <h3>Searching & Sorting</h3>
              <p>Practice searching and sorting algorithms.</p>
              <button>Start Practice →</button>
            </div>

            <div className="topic-card">
              <span>🧩</span>
              <h3>Dynamic Programming</h3>
              <p>Solve important DP problems for placements.</p>
              <button>Start Practice →</button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default DSA;