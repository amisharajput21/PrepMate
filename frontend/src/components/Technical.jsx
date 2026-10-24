import { useMemo, useState } from "react";
import "./Technical.css";

const subjects = [
  {
    id: "oops",
    name: "OOPs",
    shortName: "OOP",
    description: "Object Oriented Programming",
    topics: [
      {
        category: "Getting Started",
        title: "Foundations: Why OOP Exists",
        subtitle:
          "Why object-oriented code exists — and what problem it actually solves.",
        problem:
          "Design the basic structure of a food delivery application. It needs to let a customer browse restaurants, add items to an order, place the order, pay for it, and have a delivery partner deliver it.",
        learn: [
          "Explain why large procedural systems become hard to change.",
          "Break any real-world thing into state and behaviour.",
          "Understand why objects keep related data and behaviour together.",
          "Recognise when object-oriented design is useful.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Design the basic structure of a food delivery application. It needs to let a customer browse restaurants, add items to an order, place the order, pay for it, and have a delivery partner deliver it.",
            ],
          },
          {
            title: "Why procedural code becomes difficult",
            paragraphs: [
              "In a small program, procedural programming can work extremely well. The problem starts when the program keeps growing and more features need to interact with the same data.",
              "When data and the functions that operate on that data are spread across the application, a small change can affect many unrelated parts of the system.",
            ],
          },
          {
            title: "Thinking in objects",
            paragraphs: [
              "Object-oriented programming groups state and behaviour together. Instead of thinking only about a sequence of functions, we model the important things in the system as objects.",
            ],
            points: [
              "Customer — stores customer information and performs customer-related actions.",
              "Restaurant — represents restaurant information and menu behaviour.",
              "Order — owns order state and operations related to an order.",
              "Payment — handles payment-related behaviour.",
              "DeliveryPartner — represents delivery state and delivery behaviour.",
            ],
          },
          {
            title: "The core idea",
            paragraphs: [
              "The goal of OOP is not simply to create classes. The goal is to design software where responsibilities are clear, related behaviour stays together, and changes remain easier to manage.",
            ],
          },
        ],
      },

      {
        category: "Getting Started",
        title: "Classes & Objects",
        subtitle:
          "Learn how classes define objects and how objects behave at runtime.",
        learn: [
          "Understand the difference between a class and an object.",
          "Create objects from a class.",
          "Understand instance state and behaviour.",
          "Understand object references.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Imagine that an application needs to represent hundreds of users. We need a reusable structure that describes what every user contains and what every user can do.",
            ],
          },
          {
            title: "Class vs Object",
            paragraphs: [
              "A class is a blueprint. An object is an actual instance created from that blueprint.",
            ],
            code: `class User {
  String name;

  void login() {
    System.out.println(name + " logged in");
  }
}

User user = new User();
user.name = "Rahul";
user.login();`,
          },
        ],
      },

      {
        category: "The Four Pillars",
        title: "Encapsulation & Abstraction",
        subtitle:
          "Learn how OOP hides implementation details and protects object state.",
        learn: [
          "Understand encapsulation.",
          "Understand abstraction.",
          "Use access modifiers correctly.",
          "Hide implementation details.",
        ],
        sections: [
          {
            title: "Why hide implementation?",
            paragraphs: [
              "A well-designed object should expose what other parts of the application need while keeping internal implementation details protected.",
            ],
          },
          {
            title: "Encapsulation",
            paragraphs: [
              "Encapsulation means keeping data and the operations that control that data together while controlling direct access to the internal state.",
            ],
            code: `class BankAccount {
  private double balance;

  public void deposit(double amount) {
    if (amount > 0) {
      balance += amount;
    }
  }

  public double getBalance() {
    return balance;
  }
}`,
          },
        ],
      },

      {
        category: "The Four Pillars",
        title: "Inheritance",
        subtitle:
          "Learn how classes reuse and extend behaviour from other classes.",
        learn: [
          "Understand parent and child classes.",
          "Reuse common behaviour.",
          "Override inherited methods.",
          "Recognise when inheritance is appropriate.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Multiple classes may share common properties and behaviour. Inheritance can provide a way to represent that relationship.",
            ],
          },
          {
            title: "Inheritance in practice",
            paragraphs: [
              "A Car and Bike may both be Vehicles. Common vehicle behaviour can live in a parent class while specialised behaviour stays in child classes.",
            ],
          },
        ],
      },

      {
        category: "The Four Pillars",
        title: "Polymorphism",
        subtitle:
          "Understand how the same interface can represent different behaviours.",
        learn: [
          "Understand method overriding.",
          "Understand runtime polymorphism.",
          "Use parent references for child objects.",
          "Write flexible code.",
        ],
        sections: [
          {
            title: "One interface, many behaviours",
            paragraphs: [
              "Polymorphism allows code to work with a common type while the actual object decides which implementation should execute.",
            ],
            code: `Animal animal = new Dog();
animal.sound();`,
          },
        ],
      },

      {
        category: "Designing With Objects",
        title: "Relationships: Association, Aggregation & Composition",
        subtitle:
          "Understand how objects relate to each other in real systems.",
        learn: [
          "Understand association.",
          "Understand aggregation.",
          "Understand composition.",
          "Model object relationships correctly.",
        ],
        sections: [
          {
            title: "Object relationships",
            paragraphs: [
              "Real applications contain objects that interact with or own other objects. Understanding these relationships helps create better designs.",
            ],
          },
        ],
      },

      {
        category: "Designing With Objects",
        title: "SOLID Principles",
        subtitle:
          "Learn the principles that help object-oriented code stay maintainable.",
        learn: [
          "Understand all five SOLID principles.",
          "Recognise tightly coupled code.",
          "Improve class responsibilities.",
          "Design extensible systems.",
        ],
        sections: [
          {
            title: "Why SOLID?",
            paragraphs: [
              "SOLID principles provide practical guidelines for designing object-oriented software that is easier to understand, test and change.",
            ],
          },
        ],
      },

      {
        category: "Designing With Objects",
        title: "Design Patterns",
        subtitle:
          "Learn common reusable solutions to recurring design problems.",
        learn: [
          "Understand what a design pattern is.",
          "Learn common patterns.",
          "Identify when patterns are useful.",
          "Avoid unnecessary patterns.",
        ],
        sections: [
          {
            title: "What is a design pattern?",
            paragraphs: [
              "A design pattern is a reusable design idea for a recurring software design problem. It is not a copy-paste code solution.",
            ],
          },
        ],
      },

      {
        category: "Interview Prep",
        title: "Interview Capstone",
        subtitle:
          "Apply OOP concepts together in an interview-style design problem.",
        learn: [
          "Combine OOP concepts.",
          "Explain design decisions.",
          "Identify responsibilities.",
          "Answer common interview questions.",
        ],
        sections: [
          {
            title: "The challenge",
            paragraphs: [
              "Design a small system and explain your classes, relationships, responsibilities and extension points like you would in an interview.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "dbms",
    name: "DBMS",
    shortName: "DB",
    description: "Database Management Systems",
    topics: [
      {
        category: "Getting Started",
        title: "Database Fundamentals",
        subtitle:
          "Understand why databases exist and how applications store data.",
        learn: [
          "Understand databases.",
          "Understand tables and records.",
          "Understand primary keys.",
          "Understand basic SQL.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Applications need reliable ways to store, retrieve and update large amounts of information.",
            ],
          },
        ],
      },
      {
        category: "SQL",
        title: "SQL Basics",
        subtitle:
          "Learn the core queries used to work with relational databases.",
        learn: [
          "SELECT data.",
          "Filter records.",
          "Sort results.",
          "Insert and update data.",
        ],
        sections: [
          {
            title: "Basic query",
            code: `SELECT name, email
FROM users
WHERE active = true
ORDER BY name;`,
          },
        ],
      },
      {
        category: "SQL",
        title: "Joins",
        subtitle:
          "Understand how data from multiple tables is combined.",
        learn: [
          "INNER JOIN",
          "LEFT JOIN",
          "RIGHT JOIN",
          "Join conditions",
        ],
        sections: [
          {
            title: "Why joins?",
            paragraphs: [
              "Relational databases often split data across multiple tables. Joins allow related information to be combined when querying.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "os",
    name: "Operating Systems",
    shortName: "OS",
    description: "Operating System Concepts",
    topics: [
      {
        category: "Getting Started",
        title: "What is an Operating System?",
        subtitle:
          "Understand what an operating system does between applications and hardware.",
        learn: [
          "Understand OS responsibilities.",
          "Understand processes.",
          "Understand memory management.",
          "Understand system calls.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Applications need a controlled way to use CPU, memory, storage and other hardware resources.",
            ],
          },
        ],
      },
      {
        category: "Processes",
        title: "Processes & Threads",
        subtitle:
          "Understand process execution and lightweight threads.",
        learn: [
          "Process vs thread.",
          "Context switching.",
          "Thread lifecycle.",
          "Concurrency basics.",
        ],
        sections: [
          {
            title: "Process vs Thread",
            paragraphs: [
              "A process is an executing program with its own resources. Threads are execution units within a process that can share process resources.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "cn",
    name: "Computer Networks",
    shortName: "CN",
    description: "Networking Fundamentals",
    topics: [
      {
        category: "Getting Started",
        title: "How the Internet Works",
        subtitle:
          "Understand how devices communicate across a network.",
        learn: [
          "Understand clients and servers.",
          "Understand IP addresses.",
          "Understand packets.",
          "Understand basic network layers.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Computers need a common system for communicating reliably even when they are separated by different networks and physical infrastructure.",
            ],
          },
        ],
      },
      {
        category: "Network Layers",
        title: "TCP/IP Model",
        subtitle:
          "Understand the major layers responsible for network communication.",
        learn: [
          "Application layer.",
          "Transport layer.",
          "Internet layer.",
          "Network access layer.",
        ],
        sections: [
          {
            title: "Why layers?",
            paragraphs: [
              "Layering divides a complex communication problem into smaller responsibilities that can evolve independently.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "web",
    name: "Web Development",
    shortName: "WEB",
    description: "Web Development Fundamentals",
    topics: [
      {
        category: "Getting Started",
        title: "How the Web Works",
        subtitle:
          "Understand browsers, servers, HTTP and web applications.",
        learn: [
          "Browser and server.",
          "HTTP requests.",
          "HTTP responses.",
          "Client-server architecture.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "A web application needs a reliable way for browsers and servers to exchange resources and data.",
            ],
          },
        ],
      },
      {
        category: "Frontend",
        title: "HTML, CSS & JavaScript",
        subtitle:
          "Understand the three core technologies behind web interfaces.",
        learn: [
          "HTML structure.",
          "CSS presentation.",
          "JavaScript behaviour.",
          "DOM basics.",
        ],
        sections: [
          {
            title: "The three layers",
            paragraphs: [
              "HTML describes structure, CSS controls presentation, and JavaScript adds behaviour and interaction.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "se",
    name: "Software Engineering",
    shortName: "SE",
    description: "Software Engineering Concepts",
    topics: [
      {
        category: "Getting Started",
        title: "Software Development Lifecycle",
        subtitle:
          "Understand how software moves from idea to production.",
        learn: [
          "Requirements.",
          "Design.",
          "Implementation.",
          "Testing and maintenance.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Building reliable software requires more than writing code. Teams need a process for understanding requirements, designing solutions and validating the result.",
            ],
          },
        ],
      },
      {
        category: "Design",
        title: "Clean Code",
        subtitle:
          "Learn practical principles for writing maintainable software.",
        learn: [
          "Meaningful names.",
          "Small functions.",
          "Low coupling.",
          "High cohesion.",
        ],
        sections: [
          {
            title: "Why clean code matters",
            paragraphs: [
              "Code is read and changed much more often than it is initially written. Clear code reduces the cost of future changes.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "git",
    name: "Git & GitHub",
    shortName: "GIT",
    description: "Version Control",
    topics: [
      {
        category: "Getting Started",
        title: "Why Version Control Exists",
        subtitle:
          "Understand how Git helps developers manage changes safely.",
        learn: [
          "Understand repositories.",
          "Create commits.",
          "Work with branches.",
          "Merge changes.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "Developers need to track changes, experiment safely and collaborate without losing previous versions of their work.",
            ],
          },
        ],
      },
      {
        category: "Core Commands",
        title: "Everyday Git",
        subtitle:
          "Learn the commands used during normal development.",
        learn: [
          "git status",
          "git add",
          "git commit",
          "git pull and push",
        ],
        sections: [
          {
            title: "Typical workflow",
            code: `git status
git add .
git commit -m "Add feature"
git push`,
          },
        ],
      },
    ],
  },

  {
    id: "architecture",
    name: "System Architecture",
    shortName: "ARCH",
    description: "Architecture & System Design",
    topics: [
      {
        category: "Getting Started",
        title: "What is System Architecture?",
        subtitle:
          "Understand how large software systems are structured.",
        learn: [
          "Components.",
          "Services.",
          "Data flow.",
          "Scalability basics.",
        ],
        sections: [
          {
            title: "The problem",
            paragraphs: [
              "As applications grow, a single codebase or server may no longer be enough. Architecture helps define boundaries and responsibilities.",
            ],
          },
        ],
      },
      {
        category: "Scalability",
        title: "Scaling Applications",
        subtitle:
          "Understand the basic ideas behind scalable systems.",
        learn: [
          "Vertical scaling.",
          "Horizontal scaling.",
          "Load balancing.",
          "Caching.",
        ],
        sections: [
          {
            title: "Scaling basics",
            paragraphs: [
              "Scaling means increasing the capacity of a system so it can handle more users, traffic or data.",
            ],
          },
        ],
      },
    ],
  },
];

function Technical({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("mini");

  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  const currentSubject = useMemo(
    () => subjects.find((subject) => subject.id === selectedSubject),
    [selectedSubject]
  );

  const currentTopic = currentSubject?.topics[selectedTopicIndex];

  const practiceQuestions = useMemo(() => {
    if (!currentTopic) return [];

    const title = currentTopic.title;

    return [
      {
        id: 1,
        question: `What is the main purpose of "${title}"?`,
        options: [
          `To solve problems related to ${title}`,
          "To completely remove the need for software design",
          "To make every program use the same architecture",
          "To avoid writing any code",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: `Which statement best describes "${title}"?`,
        options: [
          "It is useful only for very small programs",
          `It is a concept that helps developers design or understand ${title} better`,
          "It is only related to hardware",
          "It is used only for database storage",
        ],
        answer: 1,
      },
      {
        id: 3,
        question: `Where would "${title}" most likely be useful?`,
        options: [
          "Only while installing an operating system",
          "Only while designing a website logo",
          "While designing or building a real software system",
          "Only while formatting a computer",
        ],
        answer: 2,
      },
      {
        id: 4,
        question: `What should you focus on when explaining "${title}" in an interview?`,
        options: [
          "Only memorising its definition",
          "Its purpose, practical use and an appropriate example",
          "Only writing a very long answer",
          "Avoiding real-world examples",
        ],
        answer: 1,
      },
      {
        id: 5,
        question: `What is a good way to learn "${title}"?`,
        options: [
          "Understand the concept and apply it to a practical problem",
          "Memorise the topic name only",
          "Skip examples and implementation",
          "Learn it without understanding why it exists",
        ],
        answer: 0,
      },
    ];
  }, [currentTopic]);

  const handlePracticeAnswer = (questionId, optionIndex) => {
    if (practiceSubmitted) return;

    setPracticeAnswers((previous) => ({
      ...previous,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitPractice = () => {
    if (
      Object.keys(practiceAnswers).length !==
      practiceQuestions.length
    ) {
      return;
    }

    setPracticeSubmitted(true);
  };

  const handleRetakePractice = () => {
    setPracticeAnswers({});
    setPracticeSubmitted(false);
  };

  const practiceScore = practiceQuestions.reduce(
    (score, question) =>
      score +
      (practiceAnswers[question.id] === question.answer ? 1 : 0),
    0
  );

  const practiceCompleted =
    Object.keys(practiceAnswers).length === practiceQuestions.length;

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject.id);
    setSelectedTopicIndex(0);
    setActiveTab("mini");
    setPracticeAnswers({});
    setPracticeSubmitted(false);
  };

  const handleTopicClick = (index) => {
    setSelectedTopicIndex(index);
    setActiveTab("mini");
    setPracticeAnswers({});
    setPracticeSubmitted(false);
  };

  const handleBack = () => {
    setSelectedSubject(null);
    setSelectedTopicIndex(0);
    setActiveTab("mini");
    setPracticeAnswers({});
    setPracticeSubmitted(false);

    if (onBack) {
      onBack();
    }
  };

  const groupedTopics = useMemo(() => {
    if (!currentSubject) return [];

    const groups = [];

    currentSubject.topics.forEach((topic, index) => {
      const existing = groups.find(
        (group) => group.category === topic.category
      );

      if (existing) {
        existing.items.push({ topic, index });
      } else {
        groups.push({
          category: topic.category,
          items: [{ topic, index }],
        });
      }
    });

    return groups;
  }, [currentSubject]);

  if (!currentSubject || !currentTopic) {
    return (
      <div className="technical-page">
        <section className="technical-subjects">
          <div className="technical-subjects-header">
            <div className="technical-eyebrow">
              TECHNICAL PREPARATION
            </div>

            <h1>Core Subjects</h1>

            <p>
              Select a subject to start learning. Every subject opens
              directly into its topic learning workspace.
            </p>
          </div>

          <div className="technical-subject-grid">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                type="button"
                className="technical-subject-card"
                onClick={() => handleSubjectClick(subject)}
              >
                <div className="subject-icon">
                  {subject.shortName === "OOP"
                    ? "◈"
                    : subject.shortName === "DB"
                      ? "▦"
                      : subject.shortName === "OS"
                        ? "▣"
                        : subject.shortName === "CN"
                          ? "⌘"
                          : subject.shortName === "WEB"
                            ? "◎"
                            : subject.shortName === "SE"
                              ? "◇"
                              : subject.shortName === "GIT"
                                ? "⑂"
                                : "◫"}
                </div>

                <h3>{subject.name}</h3>

                <p>{subject.topics.length} topics</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="technical-page">
      <div className="technical-topic-page">
        <aside className="technical-topic-sidebar">
          <div className="technical-course-card">
            <div className="technical-course-icon">
              {currentSubject.shortName.slice(0, 1)}
            </div>

            <div>
              <strong>{currentSubject.name}</strong>
              <span>{currentSubject.topics.length} topics</span>
            </div>
          </div>

          <div className="technical-sidebar-content">
            {groupedTopics.map((group) => (
              <div
                className="technical-sidebar-section"
                key={group.category}
              >
                <div className="technical-sidebar-section-title">
                  <span>{group.category}</span>
                  <small>{group.items.length}</small>
                </div>

                {group.items.map(({ topic, index }) => (
                  <button
                    key={`${currentSubject.id}-${index}`}
                    type="button"
                    className={`technical-sidebar-topic ${
                      selectedTopicIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleTopicClick(index)}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <main className="technical-topic-main">
          <article className="technical-topic-content">
            <div className="topic-breadcrumb">
              {currentSubject.shortName} · {currentTopic.category}
            </div>

            <h1>{currentTopic.title}</h1>

            <p className="topic-subtitle">
              {currentTopic.subtitle}
            </p>

            <p className="topic-attempt-status">
              {practiceSubmitted
                ? `Test completed — Score: ${practiceScore}/${practiceQuestions.length}`
                : "Not attempted yet — answer the practice questions and submit to score."}
            </p>

            <div className="technical-topic-divider" />

            <div className="topic-tabs">
              <button
                type="button"
                className={`topic-tab ${
                  activeTab === "notes" ? "active" : ""
                }`}
                onClick={() => setActiveTab("notes")}
              >
                Notes
              </button>

              <button
                type="button"
                className={`topic-tab ${
                  activeTab === "practice" ? "active" : ""
                }`}
                onClick={() => setActiveTab("practice")}
              >
                Practice
              </button>

              <button
                type="button"
                className={`topic-tab ${
                  activeTab === "mini" ? "active" : ""
                }`}
                onClick={() => setActiveTab("mini")}
              >
                Mini Project
              </button>
            </div>

            {activeTab === "notes" && (
              <section className="topic-section">
                <div className="workspace-section-heading">
                  <span>LEARNING NOTES</span>
                  <h2>What you'll learn</h2>
                </div>

                <div className="learn-grid">
                  {currentTopic.learn.map((item, index) => (
                    <div className="learn-item" key={item}>
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                {currentTopic.sections.map((section) => (
                  <section
                    className="topic-content-section"
                    key={section.title}
                  >
                    <h2>{section.title}</h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.points && (
                      <ul>
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {section.code && (
                      <pre>
                        <code>{section.code}</code>
                      </pre>
                    )}
                  </section>
                ))}
              </section>
            )}

            {activeTab === "practice" && (
              <section className="topic-section practice-test">
                <div className="workspace-section-heading">
                  <span>PRACTICE TEST</span>

                  <h2>
                    {practiceSubmitted
                      ? `Your Score: ${practiceScore}/${practiceQuestions.length}`
                      : "Test your knowledge"}
                  </h2>

                  <p className="practice-test-description">
                    Answer all five questions and submit the test to see
                    your score.
                  </p>
                </div>

                {practiceSubmitted && (
                  <div
                    className={`practice-result ${
                      practiceScore >= 4
                        ? "excellent"
                        : practiceScore >= 3
                          ? "good"
                          : "needs-work"
                    }`}
                  >
                    <div className="practice-result-score">
                      {practiceScore}
                      <span>/{practiceQuestions.length}</span>
                    </div>

                    <div className="practice-result-text">
                      <strong>
                        {practiceScore === 5
                          ? "Excellent!"
                          : practiceScore >= 4
                            ? "Great work!"
                            : practiceScore >= 3
                              ? "Good attempt!"
                              : "Keep practicing!"}
                      </strong>

                      <p>
                        {practiceScore === 5
                          ? "You have a strong understanding of this topic."
                          : "Review the topic notes and try the test again."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="practice-test-list">
                  {practiceQuestions.map(
                    (question, questionIndex) => {
                      const selectedAnswer =
                        practiceAnswers[question.id];

                      const isCorrect =
                        selectedAnswer === question.answer;

                      return (
                        <div
                          className={`practice-question-card ${
                            practiceSubmitted
                              ? isCorrect
                                ? "correct"
                                : "incorrect"
                              : ""
                          }`}
                          key={question.id}
                        >
                          <div className="practice-question-header">
                            <span className="practice-question-number">
                              {String(questionIndex + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span className="practice-question-label">
                              QUESTION {questionIndex + 1} OF{" "}
                              {practiceQuestions.length}
                            </span>
                          </div>

                          <h3>{question.question}</h3>

                          <div className="practice-options">
                            {question.options.map(
                              (option, optionIndex) => {
                                const isSelected =
                                  selectedAnswer === optionIndex;

                                const isCorrectOption =
                                  practiceSubmitted &&
                                  optionIndex === question.answer;

                                const isWrongSelected =
                                  practiceSubmitted &&
                                  isSelected &&
                                  optionIndex !== question.answer;

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    className={`practice-option ${
                                      isSelected
                                        ? "selected"
                                        : ""
                                    } ${
                                      isCorrectOption
                                        ? "correct-option"
                                        : ""
                                    } ${
                                      isWrongSelected
                                        ? "wrong-option"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handlePracticeAnswer(
                                        question.id,
                                        optionIndex
                                      )
                                    }
                                    disabled={practiceSubmitted}
                                  >
                                    <span className="practice-option-letter">
                                      {String.fromCharCode(
                                        65 + optionIndex
                                      )}
                                    </span>

                                    <span className="practice-option-text">
                                      {option}
                                    </span>

                                    {isCorrectOption && (
                                      <span className="practice-option-status">
                                        ✓
                                      </span>
                                    )}

                                    {isWrongSelected && (
                                      <span className="practice-option-status">
                                        ×
                                      </span>
                                    )}
                                  </button>
                                );
                              }
                            )}
                          </div>

                          {practiceSubmitted && (
                            <div
                              className={`practice-answer-message ${
                                isCorrect ? "success" : "error"
                              }`}
                            >
                              {isCorrect
                                ? "Correct answer."
                                : `Correct answer: ${question.options[question.answer]}`}
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                {!practiceSubmitted ? (
                  <div className="practice-submit-area">
                    <p>
                      {practiceCompleted
                        ? "All questions answered. You can submit the test."
                        : `Answer ${
                            practiceQuestions.length -
                            Object.keys(practiceAnswers).length
                          } more question${
                            practiceQuestions.length -
                              Object.keys(practiceAnswers).length ===
                            1
                              ? ""
                              : "s"
                          }.`}
                    </p>

                    <button
                      type="button"
                      className="practice-submit-button"
                      disabled={!practiceCompleted}
                      onClick={handleSubmitPractice}
                    >
                      Submit Test →
                    </button>
                  </div>
                ) : (
                  <div className="practice-submit-area">
                    <button
                      type="button"
                      className="practice-submit-button"
                      onClick={handleRetakePractice}
                    >
                      Retake Test
                    </button>
                  </div>
                )}
              </section>
            )}

            {activeTab === "mini" && (
              <section className="topic-section">
                <div className="workspace-section-heading">
                  <span>MINI PROJECT</span>
                  <h2>The problem</h2>
                </div>

                <p className="problem-text">
                  {currentTopic.problem ||
                    `Build a small system that demonstrates ${currentTopic.title}. The design should be easy to understand, extend and explain during an interview.`}
                </p>

                <div className="topic-project-card">
                  <div className="project-label">
                    MINI PROJECT
                  </div>

                  <h3>{currentTopic.title}</h3>

                  <p>
                    Build a small real-world example using the concept
                    you just learned. Focus on clear responsibilities,
                    readable code and a design that can be extended
                    later.
                  </p>

                  <div className="project-points">
                    <span>01 · Understand</span>
                    <span>02 · Design</span>
                    <span>03 · Implement</span>
                    <span>04 · Explain</span>
                  </div>
                </div>

                {currentTopic.sections.map((section) => (
                  <section
                    className="topic-content-section"
                    key={section.title}
                  >
                    <h2>{section.title}</h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.points && (
                      <ul>
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {section.code && (
                      <pre>
                        <code>{section.code}</code>
                      </pre>
                    )}
                  </section>
                ))}
              </section>
            )}

            <div className="topic-navigation">
              <button
                type="button"
                disabled={selectedTopicIndex === 0}
                onClick={() =>
                  handleTopicClick(
                    Math.max(0, selectedTopicIndex - 1)
                  )
                }
              >
                ← Previous topic
              </button>

              <button
                type="button"
                disabled={
                  selectedTopicIndex ===
                  currentSubject.topics.length - 1
                }
                onClick={() =>
                  handleTopicClick(
                    Math.min(
                      currentSubject.topics.length - 1,
                      selectedTopicIndex + 1
                    )
                  )
                }
              >
                Next topic →
              </button>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}

export default Technical;