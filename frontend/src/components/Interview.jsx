import React, { useState } from "react";
import "./Interview.css";

function Interview({ user, darkMode }) {
  const [role, setRole] = useState("Full Stack Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [interviewType, setInterviewType] = useState("Mixed");
  const [duration, setDuration] = useState("30");

  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [isStarting, setIsStarting] = useState(false);
  const [question, setQuestion] = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [error, setError] = useState("");

  const handleStartInterview = async () => {
    setIsStarting(true);
    setError("");
    setQuestion("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/interview/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role,
            difficulty,
            interviewType,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.question) {
        throw new Error(
          "Interview question nahi mila."
        );
      }

      setQuestion(data.question);
      setInterviewStarted(true);
    } catch (err) {
      console.error(
        "AI Interview start error:",
        err
      );

      setError(
        "AI interview start nahi ho paya. Please check karo ki backend running hai."
      );
    } finally {
      setIsStarting(false);
    }
  };

  const handleScheduleInterview = () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please select date and time.");
      return;
    }

    localStorage.setItem(
      "prepmate_interview_schedule",
      JSON.stringify({
        role,
        difficulty,
        interviewType,
        duration,
        date: scheduleDate,
        time: scheduleTime,
      })
    );

    alert("Interview scheduled successfully!");
  };

  const handleBackToSetup = () => {
    setInterviewStarted(false);
    setQuestion("");
    setError("");
  };

  return (
    <div className={`interview-page ${darkMode ? "dark" : ""}`}>
      <div className="interview-container">

        {/* HERO */}
        <section className="interview-hero">
          <div className="hero-content">
            <span className="hero-badge">AI POWERED</span>

            <h1>
              Your next interview
              <br />
              <span>starts here.</span>
            </h1>

            <p>
              Practice realistic placement interviews with an AI interviewer.
              Choose your preferences and start preparing with confidence.
            </p>

            <div className="hero-status">
              <span className="status-dot"></span>
              AI Interviewer Ready
            </div>
          </div>

          <div className="hero-visual">
            <div className="ai-circle">
              <div className="ai-face">AI</div>
            </div>
          </div>
        </section>

        {/* AI INTERVIEW SCREEN */}
        {interviewStarted ? (
          <section className="ai-interview-screen">

            <div className="ai-interview-header">
              <div>
                <span className="small-label">
                  AI INTERVIEWER
                </span>

                <h2>
                  {role} Interview
                </h2>

                <p>
                  {difficulty} • {interviewType} • {duration} minutes
                </p>
              </div>

              <div className="summary-icon">
                AI
              </div>
            </div>

            <div className="ai-question-card">

              <div className="ai-question-label">
                QUESTION 01
              </div>

              <h3>
                {question}
              </h3>

              <textarea
                className="answer-input"
                placeholder="Type your answer here..."
                rows="7"
              />

              <div className="answer-actions">
                <button
                  className="secondary-interview-button"
                  onClick={handleBackToSetup}
                >
                  ← Back
                </button>

                <button
                  className="submit-answer-button"
                  onClick={() =>
                    alert(
                      "Answer submission next step me connect karenge."
                    )
                  }
                >
                  Submit Answer →
                </button>
              </div>

            </div>

            <div className="ai-interview-tip">
              <span>💡</span>

              <div>
                <strong>Interview Tip</strong>

                <p>
                  Explain your approach clearly and give examples
                  wherever possible.
                </p>
              </div>
            </div>

          </section>
        ) : (
          /* SETUP SCREEN */
          <div className="interview-grid">

            {/* LEFT */}
            <div className="interview-main">

              {/* ROLE */}
              <section className="setup-section role-section">
                <div className="section-heading">
                  <div className="section-number">01</div>

                  <div>
                    <h2>Choose your role</h2>
                    <p>
                      Select the role you are preparing for.
                    </p>
                  </div>
                </div>

                <div className="role-grid">
                  {[
                    "Full Stack Developer",
                    "Frontend Developer",
                    "Backend Developer",
                    "Java Developer",
                  ].map((item) => (
                    <button
                      key={item}
                      className={`role-card ${
                        role === item ? "selected" : ""
                      }`}
                      onClick={() => setRole(item)}
                    >
                      <div className="role-icon">
                        {item === "Full Stack Developer" && "FS"}
                        {item === "Frontend Developer" && "FE"}
                        {item === "Backend Developer" && "BE"}
                        {item === "Java Developer" && "JV"}
                      </div>

                      <div className="role-text">
                        <strong>{item}</strong>
                        <span>Interview practice</span>
                      </div>

                      {role === item && (
                        <div className="selected-check">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* INTERVIEW SETTINGS */}
              <section className="settings-section">
                <div className="settings-title">
                  <div className="section-number">02</div>

                  <div>
                    <h2>Interview settings</h2>
                    <p>
                      Customize your interview before starting.
                    </p>
                  </div>
                </div>

                <div className="settings-row">

                  {/* Difficulty */}
                  <div className="setting-box">
                    <label>Difficulty</label>

                    <div className="setting-options">
                      {["Easy", "Medium", "Hard"].map(
                        (item) => (
                          <button
                            key={item}
                            className={
                              difficulty === item
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              setDifficulty(item)
                            }
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="setting-box">
                    <label>Interview Type</label>

                    <div className="setting-options">
                      {[
                        "Technical",
                        "HR",
                        "Mixed",
                      ].map((item) => (
                        <button
                          key={item}
                          className={
                            interviewType === item
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setInterviewType(item)
                          }
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="setting-box">
                    <label>Duration</label>

                    <div className="setting-options">
                      {["15", "30", "45"].map(
                        (item) => (
                          <button
                            key={item}
                            className={
                              duration === item
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              setDuration(item)
                            }
                          >
                            {item} min
                          </button>
                        )
                      )}
                    </div>
                  </div>

                </div>
              </section>

              {/* ERROR */}
              {error && (
                <div className="interview-error">
                  {error}
                </div>
              )}

              {/* START BUTTON */}
              <button
                className="start-interview-button"
                onClick={handleStartInterview}
                disabled={isStarting}
              >
                <span>
                  {isStarting
                    ? "Starting AI Interview..."
                    : "Start AI Interview"}
                </span>

                <span className="button-arrow">
                  {isStarting ? "..." : "→"}
                </span>
              </button>

              {/* HOW IT WORKS */}
              <div className="side-card process-card how-it-works-bottom">
                <span className="small-label">
                  HOW IT WORKS
                </span>

                <div className="process-step">
                  <div className="process-number">1</div>

                  <div>
                    <strong>Choose your setup</strong>
                    <span>
                      Select role and difficulty.
                    </span>
                  </div>
                </div>

                <div className="process-line"></div>

                <div className="process-step">
                  <div className="process-number">2</div>

                  <div>
                    <strong>Talk to AI</strong>
                    <span>
                      Answer realistic questions.
                    </span>
                  </div>
                </div>

                <div className="process-line"></div>

                <div className="process-step">
                  <div className="process-number">3</div>

                  <div>
                    <strong>Get feedback</strong>
                    <span>
                      Review your performance.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <aside className="interview-side">

              {/* SUMMARY */}
              <div className="side-card summary-card">
                <div className="side-card-header">
                  <div>
                    <span className="small-label">
                      INTERVIEW PLAN
                    </span>

                    <h3>Your Interview</h3>
                  </div>

                  <div className="summary-icon">
                    AI
                  </div>
                </div>

                <div className="summary-list">

                  <div className="summary-item">
                    <span>Role</span>
                    <strong>{role}</strong>
                  </div>

                  <div className="summary-item">
                    <span>Difficulty</span>
                    <strong>{difficulty}</strong>
                  </div>

                  <div className="summary-item">
                    <span>Type</span>
                    <strong>{interviewType}</strong>
                  </div>

                  <div className="summary-item">
                    <span>Duration</span>
                    <strong>
                      {duration} minutes
                    </strong>
                  </div>

                </div>
              </div>

              {/* SCHEDULE */}
              <div className="side-card schedule-card">
                <span className="small-label">
                  SCHEDULE
                </span>

                <h3>Practice later?</h3>

                <p>
                  Schedule an AI interview for a time
                  that works for you.
                </p>

                <div className="input-group">
                  <label>Date</label>

                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) =>
                      setScheduleDate(e.target.value)
                    }
                  />
                </div>

                <div className="input-group">
                  <label>Time</label>

                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) =>
                      setScheduleTime(e.target.value)
                    }
                  />
                </div>

                <button
                  className="schedule-button"
                  onClick={handleScheduleInterview}
                >
                  Schedule Interview
                </button>
              </div>

              {/* QUICK TIP */}
              <div className="tip-card">
                <div className="tip-icon">💡</div>

                <div>
                  <strong>Quick Tip</strong>

                  <p>
                    Speak clearly and explain your thought
                    process during technical questions.
                  </p>
                </div>
              </div>

            </aside>
          </div>
        )}

      </div>
    </div>
  );
}

export default Interview;