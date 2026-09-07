import { useState } from "react";
import "./ArrayPractice.css";

function ArrayPractice({ onOpenQuestion }) {
    const [solved, setSolved] = useState(
  localStorage.getItem("twoSumSolved") === "true"
);
  return (
    <div className="array-page">

      <header className="array-header">
        <p className="array-label">DSA PRACTICE</p>
        <h1>Arrays</h1>
        <p>Practice important array problems for placements.</p>
      </header>

      <main className="array-content">

        <div className="array-progress">
          <div>
           <h3>{solved ? "1 / 10" : "0 / 10"}</h3>
            <p>Problems Solved</p>
          </div>

          <div>
            <h3>{solved ? "10%" : "0%"}</h3>
            <p>Progress</p>
          </div>
        </div>

        <section className="questions-section">
          <h2>Array Problems</h2>
          <p>Start with these placement-focused questions.</p>

          <div className="question-card">
            <span className="question-number">1</span>

            <div>
              <h3>Two Sum</h3>
              <p>Find two numbers in an array that add up to a target.</p>
              <span className="difficulty easy">Easy</span>
            </div>

            <button onClick={onOpenQuestion}>Solve →</button>
          </div>

          <div className="question-card">
            <span className="question-number">2</span>

            <div>
              <h3>Maximum Subarray</h3>
              <p>Find the contiguous subarray with the largest sum.</p>
              <span className="difficulty medium">Medium</span>
            </div>

            <button onClick={() => onOpenQuestion("maximumSubarray")}>
  Solve →
</button>
          </div>

          <div className="question-card">
            <span className="question-number">3</span>

            <div>
              <h3>Best Time to Buy and Sell Stock</h3>
              <p>Find the maximum profit from buying and selling a stock.</p>
              <span className="difficulty easy">Easy</span>
            </div>

            <button>Solve →</button>
          </div>

        </section>

      </main>
    </div>
  );
}

export default ArrayPractice;