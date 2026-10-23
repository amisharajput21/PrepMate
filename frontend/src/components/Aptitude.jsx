
import { useState } from "react";
import "./Aptitude.css";

const categories = [
  { id: "quant", name: "Quantitative", shortName: "QUANT" },
  { id: "logical", name: "Logical Reasoning", shortName: "LOGICAL" },
  { id: "verbal", name: "Verbal Ability", shortName: "VERBAL" },
  { id: "di", name: "Data Interpretation", shortName: "DATA" },
];

const q = (question, options, correct, explanation) => ({
  question,
  options,
  answer: options[correct],
  explanation,
});

const aptitudeData = {
  quant: {
    topics: [
      {
        name: "Percentage",
        questions: [
          q("What is 20% of 250?", ["40", "50", "60", "70"], 1, "20% of 250 = (20/100) × 250 = 50."),
          q("25% of 480 is:", ["100", "110", "120", "140"], 2, "25% is one-fourth. Therefore, 480 ÷ 4 = 120."),
          q("A number becomes 360 after a 20% increase. Find the original number.", ["280", "300", "320", "340"], 1, "Original × 1.20 = 360. Original = 360 ÷ 1.20 = 300."),
          q("A number becomes 450 after a 10% decrease. Find the original number.", ["480", "500", "520", "550"], 1, "90% of the original number is 450. Original = 450 ÷ 0.90 = 500."),
        ],
      },
      {
        name: "Profit & Loss",
        questions: [
          q("An item costs ₹500 and sells for ₹600. Find the profit percentage.", ["10%", "15%", "20%", "25%"], 2, "Profit = 600 − 500 = ₹100. Profit percentage = 100/500 × 100 = 20%."),
          q("An article bought for ₹800 is sold for ₹720. Find the loss percentage.", ["5%", "10%", "15%", "20%"], 1, "Loss = 800 − 720 = ₹80. Loss percentage = 80/800 × 100 = 10%."),
          q("An item costs ₹1,000 and sells for ₹1,200. What is the profit?", ["₹100", "₹150", "₹200", "₹250"], 2, "Profit = Selling Price − Cost Price = 1200 − 1000 = ₹200."),
          q("An article sells for ₹900 at a loss of 10%. Find its cost price.", ["₹950", "₹1,000", "₹1,050", "₹1,100"], 1, "Selling price is 90% of cost price. CP = 900 × 100/90 = ₹1,000."),
        ],
      },
      {
        name: "Ratio & Proportion",
        questions: [
          q("Simplify the ratio 20 : 30.", ["1 : 2", "2 : 3", "3 : 2", "4 : 5"], 1, "Divide both terms by their HCF, 10. The simplified ratio is 2 : 3."),
          q("If A : B = 3 : 5 and B = 25, find A.", ["10", "15", "20", "18"], 1, "Five ratio parts equal 25, so one part is 5. A = 3 × 5 = 15."),
          q("Divide ₹600 in the ratio 2 : 3. Find the smaller share.", ["₹200", "₹240", "₹300", "₹360"], 1, "Total parts = 5. One part = 600/5 = 120. Smaller share = 2 × 120 = ₹240."),
          q("If 4 : 7 = x : 21, find x.", ["10", "12", "14", "16"], 1, "4/7 = x/21, so x = 4 × 21/7 = 12."),
        ],
      },
      {
        name: "Average",
        questions: [
          q("Find the average of 10, 20 and 30.", ["15", "20", "25", "30"], 1, "Average = (10 + 20 + 30)/3 = 60/3 = 20."),
          q("The average of 5 numbers is 20. Find their sum.", ["80", "90", "100", "120"], 2, "Sum = Average × Number of values = 20 × 5 = 100."),
          q("Four numbers have an average of 25. One number is 40. Find the average of the other three.", ["15", "20", "25", "30"], 1, "Total = 4 × 25 = 100. Remaining sum = 100 − 40 = 60. Average = 60/3 = 20."),
          q("The average age of 5 students is 18 years. Find their total age.", ["80", "85", "90", "95"], 2, "Total age = Average × Number of students = 18 × 5 = 90 years."),
        ],
      },
      {
        name: "Simple & Compound Interest",
        questions: [
          q("Find simple interest on ₹1,000 at 10% per annum for 2 years.", ["₹100", "₹150", "₹200", "₹250"], 2, "SI = (P × R × T)/100 = (1000 × 10 × 2)/100 = ₹200."),
          q("Find simple interest on ₹5,000 at 8% per annum for 1 year.", ["₹300", "₹400", "₹500", "₹600"], 1, "SI = (5000 × 8 × 1)/100 = ₹400."),
          q("Find the amount on ₹1,000 at 10% simple interest for 2 years.", ["₹1,100", "₹1,150", "₹1,200", "₹1,250"], 2, "SI = ₹200. Amount = Principal + SI = 1000 + 200 = ₹1,200."),
          q("Find compound interest on ₹1,000 at 10% annually for 2 years.", ["₹200", "₹210", "₹220", "₹240"], 1, "Amount = 1000 × (1.1)² = ₹1,210. CI = 1210 − 1000 = ₹210."),
        ],
      },
      {
        name: "Time & Work",
        questions: [
          q("Five workers finish a job in 10 days. How long will 10 equally efficient workers take?", ["2 days", "5 days", "10 days", "20 days"], 1, "Total work = 5 × 10 = 50 worker-days. Time for 10 workers = 50/10 = 5 days."),
          q("A completes a job in 10 days. What fraction of the job does A complete in one day?", ["1/5", "1/10", "1/15", "1/20"], 1, "One day's work = 1 / total days = 1/10."),
          q("Four workers finish a job in 12 days. How many worker-days are required?", ["36", "40", "48", "52"], 2, "Worker-days = Number of workers × Days = 4 × 12 = 48."),
          q("A finishes a job in 20 days and B in 30 days. Who completes more work per day?", ["A", "B", "Both equally", "Cannot determine"], 0, "A's daily work is 1/20; B's is 1/30. Since 1/20 > 1/30, A does more work per day."),
        ],
      },
      {
        name: "Time, Speed & Distance",
        questions: [
          q("A train travels 120 km in 2 hours. Find its average speed.", ["40 km/h", "50 km/h", "60 km/h", "80 km/h"], 2, "Speed = Distance/Time = 120/2 = 60 km/h."),
          q("A car travels at 50 km/h for 3 hours. Find the distance.", ["100 km", "120 km", "150 km", "180 km"], 2, "Distance = Speed × Time = 50 × 3 = 150 km."),
          q("How long does it take to travel 100 km at 50 km/h?", ["1 hour", "2 hours", "3 hours", "4 hours"], 1, "Time = Distance/Speed = 100/50 = 2 hours."),
          q("A car covers 240 km in 4 hours. Find its speed.", ["40 km/h", "50 km/h", "60 km/h", "80 km/h"], 2, "Speed = 240/4 = 60 km/h."),
        ],
      },
      {
        name: "Number System",
        questions: [
          q("Which of the following is a prime number?", ["21", "27", "29", "33"], 2, "29 has only two positive factors: 1 and 29. The other numbers are composite."),
          q("Find the HCF of 12 and 18.", ["3", "6", "9", "12"], 1, "The common factors are 1, 2, 3 and 6. The highest is 6."),
          q("Find the LCM of 4 and 6.", ["8", "10", "12", "24"], 2, "Multiples of 4 include 4, 8, 12; multiples of 6 include 6, 12. The least common multiple is 12."),
          q("Which number is divisible by 3?", ["124", "125", "126", "127"], 2, "A number is divisible by 3 if its digit sum is divisible by 3. For 126, 1 + 2 + 6 = 9."),
        ],
      },
    ],
  },

  logical: {
    topics: [
      {
        name: "Number Series",
        questions: [
          q("Find the next number: 2, 4, 8, 16, ?", ["20", "24", "32", "36"], 2, "Each term is multiplied by 2. The next term is 16 × 2 = 32."),
          q("Find the next number: 3, 6, 11, 18, 27, ?", ["36", "38", "40", "42"], 1, "The differences are 3, 5, 7, 9. The next difference is 11, so 27 + 11 = 38."),
          q("Find the missing number: 5, 10, 20, 40, ?", ["60", "70", "80", "100"], 2, "Every term doubles. Therefore, 40 × 2 = 80."),
          q("Find the next number: 1, 4, 9, 16, ?", ["20", "24", "25", "36"], 2, "These are consecutive squares: 1², 2², 3², 4². The next is 5² = 25."),
        ],
      },
      {
        name: "Coding-Decoding",
        questions: [
          q("If CAT is coded as DBU (each letter moves one step forward), how is DOG coded?", ["EPH", "EOG", "FPH", "DPI"], 0, "D→E, O→P and G→H. Therefore, DOG becomes EPH."),
          q("If BOOK is coded as CPPL, how is PEN coded using the same rule?", ["QFO", "ODM", "RFO", "QEN"], 0, "Each letter moves one step forward: P→Q, E→F, N→O."),
          q("If A = 1, B = 2, ..., Z = 26, what is the value of BAD?", ["6", "7", "8", "9"], 1, "B = 2, A = 1 and D = 4. Their sum is 2 + 1 + 4 = 7."),
          q("If SOUTH is written as HTUOS, what is the coding rule?", ["Alphabet shift", "Reverse the word", "Sort alphabetically", "Replace vowels"], 1, "HTUOS is SOUTH written in reverse order."),
        ],
      },
      {
        name: "Direction Sense",
        questions: [
          q("A person walks 5 km north and then 3 km south. Where are they relative to the start?", ["3 km north", "2 km north", "2 km south", "8 km north"], 1, "The net displacement is 5 − 3 = 2 km north."),
          q("You face east and turn left. Which direction are you facing?", ["North", "South", "West", "East"], 0, "A left turn from east points north."),
          q("A person walks 4 km east and 3 km north. What is the straight-line distance from the start?", ["5 km", "6 km", "7 km", "12 km"], 0, "Using Pythagoras: distance = √(4² + 3²) = √25 = 5 km."),
          q("You face south and turn right. Which direction are you facing?", ["East", "West", "North", "South"], 1, "A right turn from south points west."),
        ],
      },
      {
        name: "Blood Relations",
        questions: [
          q("A is the brother of B. B is the sister of C. How is A related to C?", ["Brother", "Sister", "Father", "Cannot be determined"], 0, "A and C are siblings, and A is male, so A is C's brother."),
          q("Your mother's mother is your:", ["Paternal grandmother", "Maternal grandmother", "Aunt", "Sister"], 1, "Your mother's mother is your maternal grandmother."),
          q("A is the father of B. B is the father of C. How is A related to C?", ["Uncle", "Brother", "Grandfather", "Father"], 2, "A is B's father and B is C's father, so A is C's grandfather."),
          q("A woman says, 'He is the son of my mother's only daughter.' Who is he to the woman?", ["Brother", "Son", "Nephew", "Father"], 1, "The mother's only daughter is the woman herself. Her son is therefore her son."),
        ],
      },
    ],
  },

  verbal: {
    topics: [
      {
        name: "Synonyms",
        questions: [
          q("Choose the synonym of 'Abundant'.", ["Scarce", "Plentiful", "Tiny", "Empty"], 1, "Abundant means available in large quantities; plentiful has the same meaning."),
          q("Choose the synonym of 'Rapid'.", ["Slow", "Quick", "Weak", "Late"], 1, "Rapid means happening or moving quickly."),
          q("Choose the synonym of 'Diligent'.", ["Lazy", "Careless", "Hardworking", "Rude"], 2, "Diligent describes someone who works carefully and consistently."),
          q("Choose the synonym of 'Candid'.", ["Honest", "Secretive", "Angry", "Confused"], 0, "Candid means truthful, direct and honest."),
        ],
      },
      {
        name: "Antonyms",
        questions: [
          q("Choose the antonym of 'Expand'.", ["Increase", "Extend", "Contract", "Enlarge"], 2, "Contract means to become smaller, the opposite of expand."),
          q("Choose the antonym of 'Ancient'.", ["Old", "Historic", "Modern", "Traditional"], 2, "Modern refers to the present or recent times, unlike ancient."),
          q("Choose the antonym of 'Generous'.", ["Kind", "Selfish", "Helpful", "Giving"], 1, "Selfish describes someone unwilling to share, contrasting with generous."),
          q("Choose the antonym of 'Transparent'.", ["Clear", "Visible", "Opaque", "Bright"], 2, "Opaque means not allowing light to pass through; it is the opposite of transparent."),
        ],
      },
      {
        name: "Grammar",
        questions: [
          q("Choose the grammatically correct sentence.", ["She go to college.", "She goes to college.", "She going to college.", "She gone to college."], 1, "With the third-person singular subject 'she', the simple present verb takes -s: goes."),
          q("Fill in the blank: They _____ playing cricket.", ["is", "am", "are", "was"], 2, "'They' is plural, so the correct helping verb is 'are'."),
          q("Choose the correct article: He is _____ honest man.", ["a", "an", "the", "no article"], 1, "'Honest' begins with a vowel sound because the h is silent, so 'an' is correct."),
          q("Choose the correct sentence.", ["I have seen him yesterday.", "I saw him yesterday.", "I sees him yesterday.", "I seeing him yesterday."], 1, "'Yesterday' indicates a completed past action, so simple past 'saw' is appropriate."),
        ],
      },
      {
        name: "Sentence Completion",
        questions: [
          q("Despite the heavy rain, the match _____ on schedule.", ["continued", "prevented", "refused", "avoided"], 0, "'Continued' correctly means the match carried on despite the rain."),
          q("She studied hard _____ she could pass the examination.", ["although", "so that", "unless", "whereas"], 1, "'So that' introduces the purpose of studying hard."),
          q("Neither Ravi nor his friends _____ present.", ["was", "is", "were", "has"], 2, "With 'neither...nor', the verb agrees with the nearer subject. 'Friends' is plural, so use 'were'."),
          q("The instructions were so _____ that everyone understood them.", ["ambiguous", "clear", "confusing", "vague"], 1, "If everyone understood the instructions, 'clear' is the appropriate word."),
        ],
      },
    ],
  },

  di: {
    topics: [
      {
        name: "Sales Analysis",
        description: "Use the sales data given in each question.",
        questions: [
          q("A store sold 100 units in January and 150 in February. What was the increase in units?", ["25", "40", "50", "75"], 2, "Increase = 150 − 100 = 50 units."),
          q("Sales increased from 200 to 250 units. What was the percentage increase?", ["20%", "25%", "30%", "35%"], 1, "Increase = 50. Percentage increase = 50/200 × 100 = 25%."),
          q("A shop earned ₹5,000 on Monday and ₹7,000 on Tuesday. Find the total.", ["₹10,000", "₹11,000", "₹12,000", "₹13,000"], 2, "Total earnings = 5000 + 7000 = ₹12,000."),
          q("Sales for three months were 120, 150 and 180 units. Find the average monthly sales.", ["140", "150", "160", "180"], 1, "Average = (120 + 150 + 180)/3 = 450/3 = 150 units."),
        ],
      },
      {
        name: "Percentage Distribution",
        questions: [
          q("A company has 400 employees; 25% are managers. How many managers are there?", ["50", "75", "100", "125"], 2, "Managers = 25/100 × 400 = 100."),
          q("A class has 60 students, and 40% are girls. How many girls are there?", ["20", "24", "30", "36"], 1, "Girls = 40/100 × 60 = 24."),
          q("A budget of ₹20,000 allocates 30% to rent. What is the rent allocation?", ["₹4,000", "₹5,000", "₹6,000", "₹8,000"], 2, "Rent = 30/100 × 20,000 = ₹6,000."),
          q("A product's price rises from ₹800 to ₹1,000. What is the percentage increase?", ["20%", "25%", "30%", "40%"], 1, "Increase = ₹200. Percentage increase = 200/800 × 100 = 25%."),
        ],
      },
      {
        name: "Tables & Averages",
        questions: [
          q("Production over four days is 20, 25, 30 and 25 units. Find the total.", ["90", "95", "100", "110"], 2, "Total production = 20 + 25 + 30 + 25 = 100 units."),
          q("Five branches report sales of 10, 20, 30, 40 and 50 units. Find the average.", ["25", "30", "35", "40"], 1, "Average = (10 + 20 + 30 + 40 + 50)/5 = 150/5 = 30."),
          q("A company sold 80 laptops in Q1 and 120 in Q2. What is the ratio Q1 : Q2 in simplest form?", ["2 : 3", "3 : 2", "4 : 5", "1 : 3"], 0, "The ratio 80 : 120 simplifies by dividing both terms by 40, giving 2 : 3."),
          q("A factory produced 500 units, of which 20% were defective. How many were defective?", ["50", "80", "100", "120"], 2, "Defective units = 20/100 × 500 = 100."),
        ],
      },
    ],
  },
};

function readHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem("aptitudeHistory") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Aptitude({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState("quant");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [responses, setResponses] = useState({});
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(readHistory);
const [showHistory, setShowHistory] = useState(false);

  const topics = aptitudeData[selectedCategory].topics;
  const currentTopic = topics[selectedTopicIndex];
  const topicQuestions = currentTopic.questions;
  const question = topicQuestions[currentQuestion];

  const categoryName =
    categories.find((category) => category.id === selectedCategory)?.name || "";

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setResponses({});
    setAnswered(false);
    setFinished(false);
    setResult(null);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedTopicIndex(0);
    resetQuiz();
  };

  const handleTopicChange = (index) => {
    setSelectedTopicIndex(index);
    resetQuiz();
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      window.alert("Please select an answer first.");
      return;
    }

    if (answered) return;

    setResponses((previous) => ({
      ...previous,
      [currentQuestion]: selectedAnswer,
    }));
    setAnswered(true);
  };

  const handleContinue = () => {
    if (currentQuestion < topicQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer("");
      setAnswered(false);
      return;
    }

    const finalResponses = {
      ...responses,
      [currentQuestion]: selectedAnswer,
    };

    const correct = topicQuestions.reduce(
      (total, item, index) =>
        total + (finalResponses[index] === item.answer ? 1 : 0),
      0
    );

    const attempted = Object.values(finalResponses).filter(Boolean).length;
    const wrong = attempted - correct;
    const unanswered = topicQuestions.length - attempted;
    const accuracy = topicQuestions.length
      ? Math.round((correct / topicQuestions.length) * 100)
      : 0;

    const completedResult = {
      categoryId: selectedCategory,
      categoryName,
      topicName: currentTopic.name,
      score: correct,
      total: topicQuestions.length,
      correct,
      wrong,
      unanswered,
      accuracy,
      responses: finalResponses,
      completedAt: new Date().toISOString(),
    };

    setResponses(finalResponses);
    setResult(completedResult);
    setFinished(true);

    try {
      const history = readHistory();
      const updatedHistory = [completedResult, ...history].slice(0, 100);
      localStorage.setItem("aptitudeHistory", JSON.stringify(updatedHistory));

      setHistory(updatedHistory);

      const totalCorrect = updatedHistory.reduce(
        (sum, item) => sum + (Number(item.correct) || 0),
        0
      );
      localStorage.setItem("aptitudeSolved", String(totalCorrect));
    } catch (error) {
      console.error("Could not save aptitude history:", error);
    }
  };

  const handleRestart = () => resetQuiz();

  const progress = topicQuestions.length
    ? ((currentQuestion + 1) / topicQuestions.length) * 100
    : 0;

  return (
    <div className="aptitude-page">
      <button className="aptitude-back-btn" onClick={onBack}>
        ← Dashboard
      </button>

      <section className="aptitude-categories">
        <div className="category-heading">
          <span>TEST CATEGORIES</span>
          <small>04 AREAS</small>
        </div>

        <div className="category-list">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="category-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="category-name">{category.name}</span>
              <span className="category-arrow">→</span>
            </button>
          ))}
        </div>

        
<button
  type="button"
  onClick={() => setShowHistory((previous) => !previous)}
  style={{
    width: "100%",
    marginTop: "12px",
    padding: "12px 14px",
    border: "1px solid #dfe1d9",
    borderRadius: "10px",
    background: "#eeefe9",
    color: "#30332d",
    cursor: "pointer",
    fontWeight: 700,
    textAlign: "left",
  }}
>
  {showHistory ? "← Back to Practice" : `View Test History (${history.length})`}
</button>


      </section>

      <main className="aptitude-main">
        <aside className="aptitude-topic-sidebar">
          <div className="aptitude-topic-heading">
            <span>{categories.find((item) => item.id === selectedCategory)?.shortName}</span>
            <small>{topics.length} TOPICS</small>
          </div>

          <div className="aptitude-topic-list">
            {topics.map((topic, index) => (
              <button
                key={topic.name}
                className={`aptitude-topic ${
                  selectedTopicIndex === index ? "active" : ""
                }`}
                onClick={() => handleTopicChange(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{topic.name}</strong>
                <b>→</b>
              </button>
            ))}
          </div>
        </aside>

        <section className="aptitude-content">
          {showHistory ? (
  <section className="aptitude-result-card">
    <h2>Your Test History</h2>

    {history.length === 0 ? (
      <p>Abhi koi completed test nahi hai.</p>
    ) : (
      history.map((item, index) => (
        <article
          className="review-item"
          key={`${item.completedAt}-${index}`}
        >
          <div className="review-item-top">
            <strong>{item.topicName}</strong>
            <span className="review-correct">
              {item.accuracy}%
            </span>
          </div>

          <p>
            <b>Category:</b> {item.categoryName}
          </p>

          <p>
            <b>Score:</b> {item.score}/{item.total}
          </p>

          <p>
            <b>Correct:</b> {item.correct} ·{" "}
            <b>Incorrect:</b> {item.wrong}
          </p>

          <p>
            <b>Completed:</b>{" "}
            {new Date(item.completedAt).toLocaleString()}
          </p>
        </article>
      ))
    )}

    <button
      className="restart-btn"
      onClick={() => setShowHistory(false)}
    >
      ← Back to Practice
    </button>
  </section>
) : !finished ? (
            <section className="aptitude-test-card">
              <div className="test-top">
                <div>
                  <span className="test-category">{currentTopic.name}</span>
                  <span className="test-question-count">
                    QUESTION {currentQuestion + 1} / {topicQuestions.length}
                  </span>
                </div>
                <span className="test-score">
                  ANSWERED {Object.keys(responses).length}
                </span>
              </div>

              <div className="test-progress">
                <div className="test-progress-track">
                  <div
                    className="test-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="question-area">
                <span className="question-label">
                  QUESTION {String(currentQuestion + 1).padStart(2, "0")}
                </span>
                <h2>{question.question}</h2>
              </div>

              <div className="options-container">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = answered && option === question.answer;
                  const isWrong = answered && isSelected && option !== question.answer;

                  return (
                    <button
                      key={option}
                      className={`option-btn ${isSelected ? "selected" : ""} ${
                        isCorrect ? "correct" : ""
                      } ${isWrong ? "wrong" : ""}`}
                      onClick={() => {
                        if (!answered) setSelectedAnswer(option);
                      }}
                      disabled={answered}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="option-text">{option}</span>
                      {isCorrect && <span className="option-status">✓</span>}
                      {isWrong && <span className="option-status">×</span>}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="aptitude-explanation">
                  <strong>
                    {selectedAnswer === question.answer
                      ? "Correct answer!"
                      : `Correct answer: ${question.answer}`}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              )}

              <div className="test-actions">
                <span className="test-hint">
                  {answered
                    ? "Review the explanation, then continue."
                    : "Select one option to check your answer."}
                </span>

                {!answered ? (
                  <button className="next-question-btn" onClick={handleCheckAnswer}>
                    Check Answer →
                  </button>
                ) : (
                  <button className="next-question-btn" onClick={handleContinue}>
                    {currentQuestion === topicQuestions.length - 1
                      ? "Submit Test"
                      : "Next Question →"}
                  </button>
                )}
              </div>
            </section>
          ) : (
            <section className="aptitude-result-card">
              <span className="result-label">TEST COMPLETED</span>
              <h2>{result.accuracy >= 80 ? "Excellent work!" : "Keep practicing!"}</h2>
              <p className="result-description">
                You completed {result.topicName} in {result.categoryName}.
                Your result has been saved in this browser.
              </p>

              <div className="result-score">
                <span>YOUR SCORE</span>
                <strong>
                  {result.score}
                  <small> / {result.total}</small>
                </strong>
              </div>

              <div className="result-stats">
                <div>
                  <span>Correct</span>
                  <strong>{result.correct}</strong>
                </div>
                <div>
                  <span>Incorrect</span>
                  <strong>{result.wrong}</strong>
                </div>
                <div>
                  <span>Unanswered</span>
                  <strong>{result.unanswered}</strong>
                </div>
                <div>
                  <span>Accuracy</span>
                  <strong>{result.accuracy}%</strong>
                </div>
              </div>

              <div className="result-actions">
                <button className="restart-btn" onClick={handleRestart}>
                  Practice Again
                </button>
                <button
                  className="back-dashboard-btn"
                  onClick={() => {
                    setSelectedCategory("quant");
                    setSelectedTopicIndex(0);
                    resetQuiz();
                    onBack?.();
                  }}
                >
                  ← Back to Dashboard
                </button>
              </div>

              <section className="aptitude-review">
                <h3>Answer Review</h3>
                <p className="review-intro">
                  Correct answers and explanations for every question.
                </p>

                {topicQuestions.map((item, index) => {
                  const userAnswer = result.responses[index];
                  const isCorrect = userAnswer === item.answer;

                  return (
                    <article className="review-item" key={`${index}-${item.question}`}>
                      <div className="review-item-top">
                        <strong>
                          {String(index + 1).padStart(2, "0")}. {item.question}
                        </strong>
                        <span className={isCorrect ? "review-correct" : "review-wrong"}>
                          {isCorrect ? "Correct" : userAnswer ? "Incorrect" : "Unanswered"}
                        </span>
                      </div>
                      <p>
                        <b>Your answer:</b> {userAnswer || "Not answered"}
                      </p>
                      <p>
                        <b>Correct answer:</b> {item.answer}
                      </p>
                      <p className="review-explanation">{item.explanation}</p>
                    </article>
                  );
                })}
              </section>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default Aptitude;
