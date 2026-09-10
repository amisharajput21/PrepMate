import { useState } from "react";
import "./Technical.css";

const subjects = {
  Java: [
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      answer: "extends",
    },
    {
      question: "Which of these is not a Java feature?",
      options: ["Object-Oriented", "Platform Independent", "Pointer Support", "Robust"],
      answer: "Pointer Support",
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "run()", "main()", "execute()"],
      answer: "main()",
    },
  ],

  DBMS: [
    {
      question: "Which SQL command is used to retrieve data from a database?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which key uniquely identifies each record in a table?",
      options: ["Foreign Key", "Primary Key", "Candidate Key", "Composite Key"],
      answer: "Primary Key",
    },
    {
      question: "What does DBMS stand for?",
      options: [
        "Database Management System",
        "Data Backup Management System",
        "Database Monitoring System",
        "Data Management Software",
      ],
      answer: "Database Management System",
    },
  ],

  "Operating System": [
    {
      question: "Which of the following is an operating system?",
      options: ["MySQL", "Linux", "HTML", "Java"],
      answer: "Linux",
    },
    {
      question: "Which component manages processes in an operating system?",
      options: ["Compiler", "Kernel", "Browser", "Database"],
      answer: "Kernel",
    },
    {
      question: "Which scheduling algorithm gives each process a fixed time slice?",
      options: ["FCFS", "Round Robin", "SJF", "Priority"],
      answer: "Round Robin",
    },
  ],

  "Computer Networks": [
    {
      question: "What does IP stand for?",
      options: [
        "Internet Protocol",
        "Internet Program",
        "Internal Protocol",
        "Information Protocol",
      ],
      answer: "Internet Protocol",
    },
    {
      question: "Which protocol is used to transfer web pages?",
      options: ["FTP", "HTTP", "SMTP", "TCP"],
      answer: "HTTP",
    },
    {
      question: "Which device connects different networks?",
      options: ["Switch", "Router", "Hub", "Repeater"],
      answer: "Router",
    },
  ],
};

function Technical({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = selectedSubject
    ? subjects[selectedSubject]
    : [];

  const question = questions[currentQuestion];

  const startSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    const newScore =
      score + (selectedAnswer === question.answer ? 1 : 0);

    if (currentQuestion === questions.length - 1) {
      setScore(newScore);

      localStorage.setItem(
        "technicalSolved",
        newScore
      );

      setFinished(true);
    } else {
      setScore(newScore);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const backToSubjects = () => {
    setSelectedSubject(null);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="technical-page">

      <header className="technical-header">
        <p className="technical-label">
          PLACEMENT PREPARATION
        </p>

        <h1>Technical MCQs</h1>

        <p>
          Test your technical knowledge for placement interviews.
        </p>
      </header>

      <main className="technical-content">

        {!selectedSubject && (
          <section className="technical-topics">

            <h2>Choose a Subject</h2>

            <p>
              Select a subject and start practicing important MCQs.
            </p>

            <div className="technical-grid">

              {Object.keys(subjects).map((subject) => (
                <div
                  className="technical-card"
                  key={subject}
                >
                  <span className="technical-icon">
                    {subject === "Java" && "☕"}
                    {subject === "DBMS" && "🗄️"}
                    {subject === "Operating System" && "⚙️"}
                    {subject === "Computer Networks" && "🌐"}
                  </span>

                  <h3>{subject}</h3>

                  <p>
                    Practice important {subject} questions
                    asked in placements.
                  </p>

                  <button
                    onClick={() => startSubject(subject)}
                  >
                    Start Practice →
                  </button>
                </div>
              ))}

            </div>

            <button
              className="technical-back-btn"
              onClick={onBack}
            >
              ← Back to Dashboard
            </button>

          </section>
        )}

        {selectedSubject && !finished && (
          <section className="technical-question-card">

            <div className="technical-question-top">
              <span>{selectedSubject}</span>

              <span>
                Question {currentQuestion + 1} / {questions.length}
              </span>

              <span>
                Score: {score}
              </span>
            </div>

            <h2>{question.question}</h2>

            <div className="technical-options">

              {question.options.map((option) => (
                <button
                  key={option}
                  className={
                    selectedAnswer === option
                      ? "technical-option selected"
                      : "technical-option"
                  }
                  onClick={() =>
                    setSelectedAnswer(option)
                  }
                >
                  {option}
                </button>
              ))}

            </div>

            <button
              className="technical-next-btn"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1
                ? "Submit Test"
                : "Next Question →"}
            </button>

            <button
              className="technical-back-btn"
              onClick={backToSubjects}
            >
              ← Change Subject
            </button>

          </section>
        )}

        {finished && (
          <section className="technical-result-card">

            <div className="technical-result-icon">
              🎉
            </div>

            <h2>Test Completed!</h2>

            <p>{selectedSubject}</p>

            <strong>
              {score} / {questions.length}
            </strong>

            <button
              className="technical-restart-btn"
              onClick={() => startSubject(selectedSubject)}
            >
              Practice Again
            </button>

            <button
              className="technical-back-btn"
              onClick={backToSubjects}
            >
              ← Choose Another Subject
            </button>

          </section>
        )}

      </main>
    </div>
  );
}

export default Technical;