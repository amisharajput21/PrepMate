import "./PhasePage.css";

function PhasePage({ phase, onBack }) {

  return (
    <div className="phase-page">

      {/* HEADER */}
      <header className="phase-page-header">

        <div className="phase-header-left">

          <button
            className="phase-back-btn"
            onClick={onBack}
          >
            ← DSA Roadmap
          </button>

          <span className="phase-label">
            {phase.phase}
          </span>

          <h1>{phase.title}</h1>

          <p>{phase.description}</p>

        </div>


        <div className="phase-progress">

          <span>PHASE PROGRESS</span>

          <strong>0%</strong>

          <div className="phase-progress-bar">
            <div style={{ width: "0%" }}></div>
          </div>

          <small>
            0 of {phase.patterns.length} patterns completed
          </small>

        </div>

      </header>


      {/* PRACTICE SHEET */}
      <main className="phase-content">

        <div className="phase-sheet-heading">

          <div>
            <span>PRACTICE SHEET</span>

            <h2>
              {phase.title}
            </h2>
          </div>

        </div>


        {/* TOPICS */}
        <div className="phase-topics">

          {phase.patterns.map((pattern, index) => (

            <section
              className="phase-topic"
              key={pattern.name}
            >

              {/* TOPIC HEADER */}
              <div className="phase-topic-header">

                <div className="phase-topic-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="phase-topic-info">

                  <h3>
                    {pattern.name}
                  </h3>

                  <span>
                    {pattern.description}
                  </span>

                </div>

                <div className="phase-topic-difficulty">
                  {pattern.difficulty}
                </div>

              </div>


              {/* QUESTIONS */}
              <div className="phase-question-list">

                {pattern.questionList?.map(
                  (question, questionIndex) => (

                    <div
                      className="phase-question"
                      key={questionIndex}
                    >

                      <span className="question-number">
                        {String(questionIndex + 1).padStart(2, "0")}
                      </span>

                      <span className="question-text">
                        {question}
                      </span>

                    </div>

                  )
                )}

              </div>

            </section>

          ))}

        </div>

      </main>

    </div>
  );
}

export default PhasePage;