import { useState } from "react";
import "./Question.css";

function Question({ question, onBack }) {
    const [solved, setSolved] = useState(
  localStorage.getItem("twoSumSolved") === "true"
);
  const handleSubmit = () => {
  setSolved(true);
  localStorage.setItem("twoSumSolved", "true");
  alert("Solution submitted successfully! 🎉");
};
  return (
    <div className="question-page">

      <header className="question-header">
        <p className="question-label">DSA • ARRAYS</p>
        <h1>
  {question === "maximumSubarray" ? "Maximum Subarray" : "Two Sum"}
</h1>
        <span className="question-difficulty">Easy</span>
      </header>

      <main className="question-content">

        <section className="problem-section">
          <h2>Problem Statement</h2>

          <p>
  {question === "maximumSubarray"
    ? "Given an integer array, find the contiguous subarray with the largest sum and return its sum."
    : "Given an array of integers and a target value, return the indices of the two numbers such that they add up to the target."}
</p>

          <h3>Example</h3>

          <div className="example-box">
            <p><strong>Input:</strong> nums = [2, 7, 11, 15], target = 9</p>
            <p><strong>Output:</strong> [0, 1]</p>
            <p>
              <strong>Explanation:</strong> nums[0] + nums[1] = 2 + 7 = 9
            </p>
          </div>

          <h3>Constraints</h3>

          <ul>
            <li>2 ≤ nums.length ≤ 10⁴</li>
            <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
            <li>-10⁹ ≤ target ≤ 10⁹</li>
          </ul>
        </section>

        <section className="solution-section">
          <h2>Your Solution</h2>

          <textarea
            placeholder="Write your solution or code here..."
          ></textarea>

          <button onClick={handleSubmit}>Submit Solution</button>
          <button onClick={onBack}>← Back to Arrays</button>
        </section>

      </main>
    </div>
  );
}

export default Question;