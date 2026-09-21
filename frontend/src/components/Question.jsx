
import { useState } from "react";
import axios from "axios";
import "./Question.css";

function Question({ question, user, onBack }) {

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {

    if (!user?.id) {
      alert("Please login first.");
      return;
    }

    try {

      setSubmitting(true);

      await axios.post(
        "http://localhost:8080/api/progress",
        null,
        {
          params: {
            userId: user.id,
            questionId: question.id,
            status: "SOLVED"
          }
        }
      );

      alert("Solution submitted successfully! 🎉");

    } catch (error) {

      console.error(error);

      alert("Failed to save progress.");

    } finally {

      setSubmitting(false);

    }
  };

  return (
    <div className="question-page">

      <header className="question-header">

        <p className="question-label">
          DSA • {question?.topic?.toUpperCase()}
        </p>

        <h1>
          {question?.title}
        </h1>

        <span className="question-difficulty">
          {question?.difficulty}
        </span>

      </header>

      <main className="question-content">

        <section className="problem-section">

          <h2>
            Problem Statement
          </h2>

          <p>
            {question?.questionText}
          </p>

          <h3>
            Example
          </h3>

          <div className="example-box">

            {question?.title === "Two Sum" ? (
              <>
                <p>
                  <strong>Input:</strong>{" "}
                  nums = [2, 7, 11, 15], target = 9
                </p>

                <p>
                  <strong>Output:</strong>{" "}
                  [0, 1]
                </p>

                <p>
                  <strong>Explanation:</strong>{" "}
                  nums[0] + nums[1] = 2 + 7 = 9
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Input:</strong>{" "}
                  nums = [-2,1,-3,4,-1,2,1,-5,4]
                </p>

                <p>
                  <strong>Output:</strong>{" "}
                  6
                </p>

                <p>
                  <strong>Explanation:</strong>{" "}
                  The subarray [4,-1,2,1] has the largest sum 6.
                </p>
              </>
            )}

          </div>

          <h3>
            Constraints
          </h3>

          <ul>
            <li>
              2 ≤ nums.length ≤ 10⁴
            </li>

            <li>
              -10⁹ ≤ nums[i] ≤ 10⁹
            </li>

            <li>
              -10⁹ ≤ target ≤ 10⁹
            </li>
          </ul>

        </section>

        <section className="solution-section">

          <h2>
            Your Solution
          </h2>

          <textarea
            placeholder="Write your solution or code here..."
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : "Mark as Solved"}
          </button>

          <button onClick={onBack}>
            ← Back to {question?.topic}
          </button>

        </section>

      </main>

    </div>
  );
}

export default Question;
