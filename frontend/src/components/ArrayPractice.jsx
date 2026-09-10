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

      <div className="array-header">
        <h1>Arrays</h1>
        <p>
          Master array problems step-by-step and prepare for coding interviews.
        </p>
      </div>

      {loading && (
        <div className="loading">
          Loading questions...
        </div>
      )}

      {!loading && questions.length === 0 && (
        <div className="loading">
          No questions available.
        </div>
      )}

      <div className="question-list">

        {questions.map((question, index) => (

          <div className="question-card" key={question.id}>

            <div className="question-number">
              {index + 1}
            </div>

            <div className="question-content">

              <h2>{question.title}</h2>

              <div className="question-info">

                <span className="difficulty">
                  {question.difficulty}
                </span>

                <span>
                  Topic: {question.topic}
                </span>

              </div>

              <p>
                {question.questionText}
              </p>

              <div className="question-actions">

                <button
                  onClick={() => onOpenQuestion(question)}
                >
                  Practice Question
                </button>

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

              <div className="companies">

                <strong>Asked by:</strong>{" "}
                {question.companies}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ArrayPractice;