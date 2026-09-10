import { useEffect, useState } from "react";
import "./TopicPractice.css";

function TopicPractice({ topic, onOpenQuestion, onBack }) {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:8080/api/questions/topic/${encodeURIComponent(topic)}`
    )
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
  }, [topic]);

  return (
    <div className="topic-practice-page">

      <div className="topic-practice-header">

        <button className="back-button" onClick={onBack}>
          ← Back to Roadmap
        </button>

        <div>
          <p className="topic-label">DSA PRACTICE</p>

          <h1>{topic}</h1>

          <p>
            Practice {topic} questions and prepare step-by-step
            for coding interviews.
          </p>
        </div>

        <div className="question-count">
          <strong>{questions.length}</strong>
          <span>Questions</span>
        </div>

      </div>

      {loading && (
        <div className="topic-message">
          Loading questions...
        </div>
      )}

      {!loading && questions.length === 0 && (
        <div className="topic-message">
          No questions available for this topic yet.
        </div>
      )}

      <div className="topic-question-list">

        {questions.map((question, index) => (

          <div className="topic-question-card" key={question.id}>

            <div className="question-index">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="question-main">

              <div className="question-top">

                <div>
                  <span className="difficulty-badge">
                    {question.difficulty}
                  </span>

                  <h2>{question.title}</h2>
                </div>

              </div>

              <p className="question-description">
                {question.questionText}
              </p>

              <div className="company-tags">

                <span className="company-title">
                  Companies:
                </span>

                {question.companies
                  ?.split(",")
                  .map((company) => (
                    <span
                      className="company-tag"
                      key={company}
                    >
                      {company.trim()}
                    </span>
                  ))}

              </div>

              <div className="question-buttons">

                <button
                  onClick={() => onOpenQuestion(question)}
                >
                  View Question
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
                    GeeksforGeeks ↗
                  </a>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopicPractice;