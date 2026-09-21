import { useEffect, useState } from "react";
import "./ArrayPractice.css";

function ArrayPractice({ onOpenQuestion }) {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/questions/topic/Arrays")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="array-page">

      {/* Header */}

      <header className="array-header">

        <div className="array-header-left">

          <button
            className="array-back-btn"
            onClick={() => window.history.back()}
          >
            ← DSA Roadmap
          </button>

          <span className="array-label">
            DSA • ARRAYS
          </span>

          <h1>
            Arrays,<br />
            <span>build your foundation.</span>
          </h1>

          <p>
            Practice array problems step-by-step and strengthen
            the problem-solving skills needed for coding interviews.
          </p>

        </div>

        <div className="array-summary">

          <span className="summary-label">
            PRACTICE SET
          </span>

          <strong>
            {questions.length}
          </strong>

          <p>
            Questions available
          </p>

          <div className="summary-line"></div>

          <small>
            Beginner Level
          </small>

        </div>

      </header>


      {/* Questions Heading */}

      <div className="array-section-header">

        <div>
          <span>
            PRACTICE
          </span>

          <h2>
            Array Questions
          </h2>
        </div>

        <p>
          Solve each problem and mark your progress.
        </p>

      </div>


      {/* Loading */}

      {loading && (
        <div className="array-loading">
          <div className="loading-dot"></div>
          Loading questions...
        </div>
      )}


      {/* Empty */}

      {!loading && questions.length === 0 && (
        <div className="array-empty">
          <div>📚</div>
          <h3>No questions available</h3>
          <p>
            Array questions will appear here once they are added.
          </p>
        </div>
      )}


      {/* Question List */}

      {!loading && questions.length > 0 && (

        <div className="array-question-list">

          {questions.map((question, index) => (

            <article
              className="array-question-card"
              key={question.id}
            >

              <div className="array-question-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="array-question-main">

                <div className="array-question-top">

                  <span className="array-difficulty">
                    {question.difficulty}
                  </span>

                  <span className="array-topic">
                    {question.topic}
                  </span>

                </div>

                <h3>
                  {question.title}
                </h3>

                <div className="array-question-footer">

                  <div className="array-links">

                    {question.leetcodeLink && (
                      <a
                        href={question.leetcodeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LeetCode ↗
                      </a>
                    )}

                    {question.gfgLink && (
                      <a
                        href={question.gfgLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GFG ↗
                      </a>
                    )}

                  </div>

                  <button
                    className="practice-btn"
                    onClick={() => onOpenQuestion(question)}
                  >
                    Practice
                    <span>→</span>
                  </button>

                </div>

                <div className="array-companies">

                  <span>Asked by</span>

                  <strong>
                    {question.companies || "Various Companies"}
                  </strong>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

    </div>
  );
}

export default ArrayPractice;