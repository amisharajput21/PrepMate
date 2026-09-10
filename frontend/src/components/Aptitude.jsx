import { useState } from "react";
import "./Aptitude.css";

const questions = [
  {
    question: "What is 20% of 250?",
    options: ["40", "50", "60", "70"],
    answer: "50",
  },
  {
    question: "If a product costs ₹500 and is sold for ₹600, what is the profit percentage?",
    options: ["10%", "15%", "20%", "25%"],
    answer: "20%",
  },
  {
    question: "A train travels 120 km in 2 hours. What is its average speed?",
    options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    answer: "60 km/h",
  },
  {
    question: "If 5 workers complete a work in 10 days, how many days will 10 workers take?",
    options: ["2 days", "5 days", "10 days", "20 days"],
    answer: "5 days",
  },
];

function Aptitude({ onBack })  {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    if (selectedAnswer === question.answer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
  const finalScore =
    score + (selectedAnswer === question.answer ? 1 : 0);

  localStorage.setItem("aptitudeSolved", finalScore);
  setScore(finalScore);
  setFinished(true);
}else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  return (
    <div className="aptitude-page">

      <header className="aptitude-header">
        <p className="aptitude-label">PLACEMENT PREPARATION</p>
        <h1>Aptitude Practice</h1>
        <p>Practice important aptitude questions for placements.</p>
      </header>

      <main className="aptitude-content">

        {!finished ? (
          <section className="aptitude-question-card">

            <div className="question-top">
              <span>
                Question {currentQuestion + 1} / {questions.length}
              </span>

              <span>
                Score: {score}
              </span>
            </div>

            <h2>{question.question}</h2>

            <div className="options-container">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={
                    selectedAnswer === option
                      ? "option-btn selected"
                      : "option-btn"
                  }
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <button className="next-question-btn" onClick={handleNext}>
              {currentQuestion === questions.length - 1
                ? "Submit Test"
                : "Next Question →"}
            </button>

          </section>
        ) : (
          <section className="aptitude-result-card">

            <div className="result-icon">🎉</div>

            <h2>Test Completed!</h2>

            <p>
              Your Score
            </p>

            <strong>
              {score} / {questions.length}
            </strong>

            <button
              className="restart-btn"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer("");
                setScore(0);
                setFinished(false);
              }}
            >
              Practice Again
            </button>

            <button
  className="back-dashboard-btn"
  onClick={onBack}
>
  ← Back to Dashboard
</button>

          </section>
        )}

      </main>
    </div>
  );
}

export default Aptitude;