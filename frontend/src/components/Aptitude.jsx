import { useState } from "react";
import "./Aptitude.css";

const categories = [
  {
    id: "quant",
    name: "Quantitative",
    shortName: "QUANT",
  },
  {
    id: "logical",
    name: "Logical Reasoning",
    shortName: "LOGICAL",
  },
  {
    id: "verbal",
    name: "Verbal Ability",
    shortName: "VERBAL",
  },
  {
    id: "di",
    name: "Data Interpretation",
    shortName: "DATA",
  },
];

const aptitudeData = {
  quant: {
    topics: [
      {
        name: "Percentage",
        questions: [
          {
            question: "What is 20% of 250?",
            options: ["40", "50", "60", "70"],
            answer: "50",
          },
          {
            question: "25% of 480 is:",
            options: ["100", "110", "120", "140"],
            answer: "120",
          },
          {
            question: "If a number is increased by 20%, it becomes 360. What was the original number?",
            options: ["280", "300", "320", "340"],
            answer: "300",
          },
          {
            question: "A number is decreased by 10% and becomes 450. What was the original number?",
            options: ["480", "500", "520", "550"],
            answer: "500",
          },
        ],
      },

      {
        name: "Profit & Loss",
        questions: [
          {
            question:
              "If a product costs ₹500 and is sold for ₹600, what is the profit percentage?",
            options: ["10%", "15%", "20%", "25%"],
            answer: "20%",
          },
          {
            question:
              "An article is bought for ₹800 and sold for ₹720. What is the loss percentage?",
            options: ["5%", "10%", "15%", "20%"],
            answer: "10%",
          },
          {
            question:
              "A shopkeeper buys an item for ₹1000 and sells it for ₹1200. What is the profit?",
            options: ["₹100", "₹150", "₹200", "₹250"],
            answer: "₹200",
          },
          {
            question:
              "An article is sold for ₹900 at a loss of 10%. What is its cost price?",
            options: ["₹950", "₹1000", "₹1050", "₹1100"],
            answer: "₹1000",
          },
        ],
      },

      {
        name: "Ratio & Proportion",
        questions: [
          {
            question: "The ratio of 20 to 30 is:",
            options: ["1 : 2", "2 : 3", "3 : 2", "4 : 5"],
            answer: "2 : 3",
          },
          {
            question:
              "If A : B = 3 : 5 and B = 25, what is A?",
            options: ["10", "15", "20", "18"],
            answer: "15",
          },
          {
            question:
              "Divide ₹600 in the ratio 2 : 3. What is the smaller share?",
            options: ["₹200", "₹240", "₹300", "₹360"],
            answer: "₹240",
          },
          {
            question:
              "If 4 : 7 = x : 21, find x.",
            options: ["10", "12", "14", "16"],
            answer: "12",
          },
        ],
      },

      {
        name: "Average",
        questions: [
          {
            question:
              "What is the average of 10, 20 and 30?",
            options: ["15", "20", "25", "30"],
            answer: "20",
          },
          {
            question:
              "The average of 5 numbers is 20. What is their total?",
            options: ["80", "90", "100", "120"],
            answer: "100",
          },
          {
            question:
              "The average of 4 numbers is 25. If one number is 40, what is the average of the remaining three?",
            options: ["15", "20", "25", "30"],
            answer: "20",
          },
          {
            question:
              "The average age of 5 students is 18 years. What is their total age?",
            options: ["80", "85", "90", "95"],
            answer: "90",
          },
        ],
      },

      {
        name: "Simple & Compound Interest",
        questions: [
          {
            question:
              "Find the simple interest on ₹1000 at 10% per annum for 2 years.",
            options: ["₹100", "₹150", "₹200", "₹250"],
            answer: "₹200",
          },
          {
            question:
              "What is the simple interest on ₹5000 at 8% per annum for 1 year?",
            options: ["₹300", "₹400", "₹500", "₹600"],
            answer: "₹400",
          },
          {
            question:
              "What is the amount on ₹1000 at 10% simple interest for 2 years?",
            options: ["₹1100", "₹1150", "₹1200", "₹1250"],
            answer: "₹1200",
          },
          {
            question:
              "What is the compound interest on ₹1000 at 10% per annum for 2 years?",
            options: ["₹200", "₹210", "₹220", "₹240"],
            answer: "₹210",
          },
        ],
      },

      {
        name: "Time & Work",
        questions: [
          {
            question:
              "If 5 workers complete a work in 10 days, how many days will 10 workers take?",
            options: ["2 days", "5 days", "10 days", "20 days"],
            answer: "5 days",
          },
          {
            question:
              "A can complete a work in 10 days. How much work does A complete in one day?",
            options: ["1/5", "1/10", "1/15", "1/20"],
            answer: "1/10",
          },
          {
            question:
              "If 4 workers can complete a work in 12 days, how many worker-days are required?",
            options: ["36", "40", "48", "52"],
            answer: "48",
          },
          {
            question:
              "A can complete a work in 20 days and B in 30 days. Who completes more work in one day?",
            options: ["A", "B", "Both equal", "Cannot determine"],
            answer: "A",
          },
        ],
      },

      {
        name: "Time, Speed & Distance",
        questions: [
          {
            question:
              "A train travels 120 km in 2 hours. What is its average speed?",
            options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
            answer: "60 km/h",
          },
          {
            question:
              "A car travels at 50 km/h for 3 hours. What distance does it cover?",
            options: ["100 km", "120 km", "150 km", "180 km"],
            answer: "150 km",
          },
          {
            question:
              "A person travels 100 km at a speed of 50 km/h. How much time is required?",
            options: ["1 hour", "2 hours", "3 hours", "4 hours"],
            answer: "2 hours",
          },
          {
            question:
              "If a car covers 240 km in 4 hours, its speed is:",
            options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
            answer: "60 km/h",
          },
        ],
      },

      {
        name: "Number System",
        questions: [
          {
            question: "Which of the following is a prime number?",
            options: ["21", "27", "29", "33"],
            answer: "29",
          },
          {
            question: "What is the HCF of 12 and 18?",
            options: ["3", "6", "9", "12"],
            answer: "6",
          },
          {
            question: "What is the LCM of 4 and 6?",
            options: ["8", "10", "12", "24"],
            answer: "12",
          },
          {
            question: "Which number is divisible by 3?",
            options: ["124", "125", "126", "127"],
            answer: "126",
          },
        ],
      },

      {
        name: "Mixture & Alligation",
        questions: [
          {
            question:
              "A mixture contains 2 litres of water and 3 litres of milk. What is the ratio of water to milk?",
            options: ["2 : 3", "3 : 2", "1 : 3", "3 : 1"],
            answer: "2 : 3",
          },
          {
            question:
              "A 10-litre mixture contains 4 litres of water. How much milk does it contain?",
            options: ["4 L", "5 L", "6 L", "7 L"],
            answer: "6 L",
          },
          {
            question:
              "If 2 litres of water are added to 8 litres of milk, what is the ratio of water to milk?",
            options: ["1 : 4", "1 : 3", "2 : 3", "3 : 4"],
            answer: "1 : 4",
          },
          {
            question:
              "A mixture contains 5 litres of A and 5 litres of B. What is the ratio of A to B?",
            options: ["1 : 2", "1 : 1", "2 : 1", "5 : 1"],
            answer: "1 : 1",
          },
        ],
      },

      {
        name: "Data Interpretation",
        questions: [
          {
            question:
              "A company sold 100 units in January and 150 units in February. What was the increase?",
            options: ["25", "40", "50", "75"],
            answer: "50",
          },
          {
            question:
              "If sales increase from 200 to 250 units, what is the percentage increase?",
            options: ["20%", "25%", "30%", "35%"],
            answer: "25%",
          },
          {
            question:
              "A shop earns ₹5000 on Monday and ₹7000 on Tuesday. What is the total earning?",
            options: ["₹10,000", "₹11,000", "₹12,000", "₹13,000"],
            answer: "₹12,000",
          },
          {
            question:
              "A company has 400 employees, of which 25% are managers. How many managers are there?",
            options: ["50", "75", "100", "125"],
            answer: "100",
          },
        ],
      },
    ],
  },

  logical: {
    topics: [
      {
        name: "Coming Soon",
        questions: [],
      },
    ],
  },

  verbal: {
    topics: [
      {
        name: "Coming Soon",
        questions: [],
      },
    ],
  },

  di: {
    topics: [
      {
        name: "Coming Soon",
        questions: [],
      },
    ],
  },
};


function Aptitude({ onBack }) {

  const [selectedCategory, setSelectedCategory] = useState("quant");

  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const [answered, setAnswered] = useState(false);


  const topics =
    aptitudeData[selectedCategory]?.topics || [];

  const currentTopic =
    topics[selectedTopicIndex];

  const topicQuestions =
    currentTopic?.questions || [];

  const question =
    topicQuestions[currentQuestion];


  const handleCategoryChange = (categoryId) => {

    setSelectedCategory(categoryId);

    setSelectedTopicIndex(0);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setFinished(false);

    setAnswered(false);

  };


  const handleTopicChange = (index) => {

    setSelectedTopicIndex(index);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setFinished(false);

    setAnswered(false);

  };


  const handleCheckAnswer = () => {

    if (!selectedAnswer) {

      alert("Please select an answer.");

      return;

    }

    if (answered) {
      return;
    }

    setAnswered(true);

    if (selectedAnswer === question.answer) {

      setScore((prev) => prev + 1);

    }

  };


  const handleContinue = () => {

    if (
      currentQuestion ===
      topicQuestions.length - 1
    ) {

      const finalScore =
        score +
        (selectedAnswer === question.answer
          ? 1
          : 0);

      localStorage.setItem(
        "aptitudeSolved",
        finalScore
      );

      setScore(finalScore);

      setFinished(true);

      return;

    }


    setCurrentQuestion(
      (prev) => prev + 1
    );

    setSelectedAnswer("");

    setAnswered(false);

  };


  const handleRestart = () => {

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setFinished(false);

    setAnswered(false);

  };


  const accuracy =
    topicQuestions.length > 0
      ? Math.round(
          (score / topicQuestions.length) *
            100
        )
      : 0;


  return (

    <div className="aptitude-page">


      {/* BACK */}

      <button
        className="aptitude-back-btn"
        onClick={onBack}
      >
        ← Dashboard
      </button>

      {/* CATEGORIES */}

      <section className="aptitude-categories">

        <div className="category-heading">

          <span>
            TEST CATEGORIES
          </span>

          <small>
            04 AREAS
          </small>

        </div>


        <div className="category-list">

          {categories.map(
            (category, index) => (

              <button
                key={category.id}
                className={
                  selectedCategory ===
                  category.id
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() =>
                  handleCategoryChange(
                    category.id
                  )
                }
              >

                <span className="category-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <span className="category-name">
                  {category.name}
                </span>

                <span className="category-arrow">
                  →
                </span>

              </button>

            )
          )}

        </div>

      </section>


      {/* MAIN */}

      <main className="aptitude-main">


        {/* TOPICS */}

        <aside className="aptitude-topic-sidebar">

          <div className="aptitude-topic-heading">

            <span>
              {categories.find(
                (category) =>
                  category.id ===
                  selectedCategory
              )?.shortName}
            </span>

            <small>
              {topics.length} TOPICS
            </small>

          </div>


          <div className="aptitude-topic-list">

            {topics.map(
              (topic, index) => (

                <button
                  key={topic.name}
                  className={
                    selectedTopicIndex ===
                    index
                      ? "aptitude-topic active"
                      : "aptitude-topic"
                  }
                  onClick={() =>
                    handleTopicChange(index)
                  }
                >

                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {topic.name}
                  </strong>

                  <b>
                    →
                  </b>

                </button>

              )
            )}

          </div>

        </aside>


        {/* TEST AREA */}

        <section className="aptitude-content">


          {topicQuestions.length === 0 ? (

            <div className="aptitude-coming-soon">

              <span>
                COMING SOON
              </span>

              <h2>
                Questions are being prepared.
              </h2>

              <p>
                This section will be available
                soon with placement-focused
                questions.
              </p>

            </div>

          ) : !finished ? (

            <section className="aptitude-test-card">


              {/* TOP */}

              <div className="test-top">

                <div>

                  <span className="test-category">
                    {currentTopic.name}
                  </span>

                  <span className="test-question-count">
                    QUESTION{" "}
                    {currentQuestion + 1}
                    {" / "}
                    {topicQuestions.length}
                  </span>

                </div>


                <span className="test-score">
                  SCORE {score}
                </span>

              </div>


              {/* PROGRESS */}

              <div className="test-progress">

                <div className="test-progress-track">

                  <div
                    className="test-progress-fill"
                    style={{
                      width: `${
                        ((currentQuestion +
                          1) /
                          topicQuestions.length) *
                        100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>


              {/* QUESTION */}

              <div className="question-area">

                <span className="question-label">
                  QUESTION{" "}
                  {String(
                    currentQuestion + 1
                  ).padStart(2, "0")}
                </span>

                <h2>
                  {question.question}
                </h2>

              </div>


              {/* OPTIONS */}

              <div className="options-container">

                {question.options.map(
                  (option, index) => {

                    const isSelected =
                      selectedAnswer ===
                      option;

                    const isCorrect =
                      answered &&
                      option ===
                        question.answer;

                    const isWrong =
                      answered &&
                      isSelected &&
                      option !==
                        question.answer;

                    return (

                      <button
                        key={option}
                        className={`option-btn ${
                          isSelected
                            ? "selected"
                            : ""
                        } ${
                          isCorrect
                            ? "correct"
                            : ""
                        } ${
                          isWrong
                            ? "wrong"
                            : ""
                        }`}
                        onClick={() => {

                          if (!answered) {

                            setSelectedAnswer(
                              option
                            );

                          }

                        }}
                        disabled={answered}
                      >

                        <span className="option-letter">
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        <span className="option-text">
                          {option}
                        </span>

                        {isCorrect && (
                          <span className="option-status">
                            ✓
                          </span>
                        )}

                        {isWrong && (
                          <span className="option-status">
                            ×
                          </span>
                        )}

                      </button>

                    );

                  }
                )}

              </div>


              {/* ACTION */}

              <div className="test-actions">

                <span className="test-hint">

                  {answered
                    ? selectedAnswer ===
                      question.answer
                      ? "Correct answer!"
                      : `Correct answer: ${question.answer}`
                    : "Select one option to continue"}

                </span>


                {!answered ? (

                  <button
                    className="next-question-btn"
                    onClick={
                      handleCheckAnswer
                    }
                  >
                    Check Answer →
                  </button>

                ) : (

                  <button
                    className="next-question-btn"
                    onClick={
                      handleContinue
                    }
                  >

                    {currentQuestion ===
                    topicQuestions.length - 1
                      ? "Submit Test"
                      : "Next Question →"}

                  </button>

                )}

              </div>

            </section>

          ) : (

            /* RESULT */

            <section className="aptitude-result-card">

              <span className="result-label">
                TEST COMPLETED
              </span>

              <h2>
                Great job!
              </h2>

              <p className="result-description">
                You have completed the{" "}
                {currentTopic.name} practice
                test.
              </p>


              <div className="result-score">

                <span>
                  YOUR SCORE
                </span>

                <strong>
                  {score}
                  <small>
                    {" "}
                    / {topicQuestions.length}
                  </small>
                </strong>

              </div>


              <div className="result-stats">

                <div>

                  <span>
                    Correct
                  </span>

                  <strong>
                    {score}
                  </strong>

                </div>


                <div>

                  <span>
                    Wrong
                  </span>

                  <strong>
                    {topicQuestions.length -
                      score}
                  </strong>

                </div>


                <div>

                  <span>
                    Accuracy
                  </span>

                  <strong>
                    {accuracy}%
                  </strong>

                </div>

              </div>


              <div className="result-actions">

                <button
                  className="restart-btn"
                  onClick={
                    handleRestart
                  }
                >
                  Practice Again
                </button>


                <button
                  className="back-dashboard-btn"
                  onClick={onBack}
                >
                  ← Back to Dashboard
                </button>

              </div>

            </section>

          )}

        </section>

      </main>

    </div>

  );

}

export default Aptitude;