import { useState } from "react";
import "./DSA.css";

function DSA({ onOpenArrays, onOpenStrings }) {

  const topics = [
    { name: "Arrays", level: "Beginner", questions: 3 },
    { name: "Strings", level: "Beginner", questions: 3 },
    { name: "Searching", level: "Beginner", questions: 0 },
    { name: "Sorting", level: "Beginner", questions: 0 },
    { name: "Hashing", level: "Intermediate", questions: 0 },
    { name: "Two Pointers", level: "Intermediate", questions: 0 },
    { name: "Sliding Window", level: "Intermediate", questions: 0 },
    { name: "Linked List", level: "Intermediate", questions: 0 },
    { name: "Stack", level: "Intermediate", questions: 0 },
    { name: "Queue", level: "Intermediate", questions: 0 },
    { name: "Recursion", level: "Intermediate", questions: 0 },
    { name: "Binary Search", level: "Intermediate", questions: 0 },
    { name: "Trees", level: "Advanced", questions: 0 },
    { name: "Heap", level: "Advanced", questions: 0 },
    { name: "Greedy", level: "Advanced", questions: 0 },
    { name: "Graph", level: "Advanced", questions: 0 },
    { name: "Backtracking", level: "Advanced", questions: 0 },
    { name: "Dynamic Programming", level: "Advanced", questions: 0 }
  ];

  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredTopics =
    selectedLevel === "All"
      ? topics
      : topics.filter((topic) => topic.level === selectedLevel);

  return (
    <div className="dsa-page">

      <div className="dsa-header">

        <div>
          <p className="dsa-label">DSA ROADMAP</p>

          <h1>Master Data Structures & Algorithms</h1>

          <p>
            Follow the roadmap step-by-step, practice coding questions,
            and prepare for technical interviews.
          </p>
        </div>

        <div className="dsa-progress">
          <span>Overall Progress</span>
          <strong>6 Questions</strong>
          <small>2 Topics Started</small>
        </div>

      </div>

      <div className="level-filter">

        <button
          className={selectedLevel === "All" ? "active" : ""}
          onClick={() => setSelectedLevel("All")}
        >
          All
        </button>

        <button
          className={selectedLevel === "Beginner" ? "active" : ""}
          onClick={() => setSelectedLevel("Beginner")}
        >
          Beginner
        </button>

        <button
          className={selectedLevel === "Intermediate" ? "active" : ""}
          onClick={() => setSelectedLevel("Intermediate")}
        >
          Intermediate
        </button>

        <button
          className={selectedLevel === "Advanced" ? "active" : ""}
          onClick={() => setSelectedLevel("Advanced")}
        >
          Advanced
        </button>

      </div>

      <div className="roadmap">

        {filteredTopics.map((topic, index) => (

          <div className="roadmap-item" key={topic.name}>

            <div className="roadmap-number">
              {index + 1}
            </div>

            <div className="roadmap-line"></div>

            <div className="topic-card">

              <div className="topic-info">

                <span className="topic-level">
                  {topic.level}
                </span>

                <h2>{topic.name}</h2>

                <p>
                  {topic.questions > 0
                    ? `${topic.questions} practice questions available`
                    : "Questions coming soon"}
                </p>

              </div>

              <div className="topic-action">

              {topic.name === "Arrays" ? (
  <button onClick={onOpenArrays}>
    Start Practice →
  </button>
) : topic.name === "Strings" ? (
  <button onClick={onOpenStrings}>
    Start Practice →
  </button>
) : (
  <button disabled>
    Coming Soon
  </button>
)}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DSA;