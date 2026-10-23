import React, { useState } from "react";
import "./Roadmap.css";

function Roadmap({ onBack }) {
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(() => {
  const savedProgress = localStorage.getItem("prepmate-roadmap-progress");

  return savedProgress ? JSON.parse(savedProgress) : {};
});

  const roadmaps = [
    {
      id: "java",
      icon: "☕",
      title: "Java",
      subtitle: "Java Developer Roadmap",
      description:
        "Master Java from fundamentals to advanced concepts and backend development.",
      stages: [
        {
          title: "Java Fundamentals",
          description: "Learn the core building blocks of Java.",
          topics: [
            "Java Basics",
            "Variables & Data Types",
            "Operators",
            "Loops",
            "Functions",
            "Arrays",
            "Strings",
          ],
        },
        {
          title: "Object Oriented Programming",
          description: "Build a strong understanding of Java OOP.",
          topics: [
            "Classes & Objects",
            "Inheritance",
            "Polymorphism",
            "Abstraction",
            "Encapsulation",
            "Interfaces",
          ],
        },
        {
          title: "Collections & Exception Handling",
          description: "Work with Java collections and handle errors properly.",
          topics: [
            "ArrayList",
            "LinkedList",
            "HashMap",
            "HashSet",
            "Stack & Queue",
            "Exception Handling",
          ],
        },
        {
          title: "Advanced Java",
          description: "Learn modern Java concepts used in development.",
          topics: [
            "Java 8 Features",
            "Lambda Expressions",
            "Streams",
            "Multithreading",
            "File Handling",
            "Generics",
          ],
        },
        {
          title: "DSA with Java",
          description:
            "Use Java to solve coding problems and prepare for interviews.",
          topics: [
            "Arrays",
            "Strings",
            "HashMap",
            "Stack",
            "Queue",
            "Linked List",
            "Trees",
            "Dynamic Programming",
          ],
        },
        {
          title: "Backend Development",
          description:
            "Move from Core Java into Java backend development.",
          topics: [
            "REST APIs",
            "Spring Boot",
            "Spring MVC",
            "Spring Data JPA",
            "MySQL",
            "Authentication",
          ],
        },
        {
          title: "Projects & Interview",
          description:
            "Build projects and prepare for Java developer interviews.",
          topics: [
            "Build Projects",
            "Git & GitHub",
            "Resume",
            "Java Interview Questions",
            "Mock Interviews",
          ],
        },
      ],
    },

    {
      id: "python",
      icon: "🐍",
      title: "Python",
      subtitle: "Python Developer Roadmap",
      description:
        "Learn Python from basics to development, automation and interview preparation.",
      stages: [
        {
          title: "Python Fundamentals",
          description: "Understand the basics of Python programming.",
          topics: [
            "Variables",
            "Data Types",
            "Operators",
            "Conditions",
            "Loops",
            "Functions",
            "Strings",
          ],
        },
        {
          title: "Python Data Structures",
          description: "Work with Python's built-in data structures.",
          topics: [
            "Lists",
            "Tuples",
            "Sets",
            "Dictionaries",
            "List Comprehension",
            "String Handling",
          ],
        },
        {
          title: "Object Oriented Python",
          description: "Learn object-oriented programming using Python.",
          topics: [
            "Classes",
            "Objects",
            "Inheritance",
            "Polymorphism",
            "Encapsulation",
            "Modules",
          ],
        },
        {
          title: "Advanced Python",
          description: "Learn concepts used in real-world Python applications.",
          topics: [
            "Exception Handling",
            "File Handling",
            "Decorators",
            "Generators",
            "Iterators",
            "Virtual Environment",
          ],
        },
        {
          title: "Development",
          description: "Choose a development path and build applications.",
          topics: [
            "Flask",
            "Django",
            "REST APIs",
            "Database",
            "Authentication",
            "Deployment",
          ],
        },
        {
          title: "Projects & Interview",
          description:
            "Build projects and prepare for Python interviews.",
          topics: [
            "Python Projects",
            "Git & GitHub",
            "Resume",
            "Python Interview",
            "Mock Interview",
          ],
        },
      ],
    },

    {
      id: "fullstack",
      icon: "🌐",
      title: "Full Stack",
      subtitle: "Full Stack Developer Roadmap",
      description:
        "Learn frontend, backend, databases and deployment to become a full stack developer.",
      stages: [
        {
          title: "Web Fundamentals",
          description: "Build a strong foundation for web development.",
          topics: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "Git & GitHub",
          ],
        },
        {
          title: "Frontend Development",
          description: "Create modern and interactive user interfaces.",
          topics: [
            "JavaScript ES6",
            "DOM",
            "React.js",
            "Components",
            "Props",
            "State",
            "Hooks",
          ],
        },
        {
          title: "Backend Development",
          description: "Build server-side applications and APIs.",
          topics: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "Authentication",
            "Middleware",
            "API Integration",
          ],
        },
        {
          title: "Database",
          description: "Learn how applications store and manage data.",
          topics: [
            "SQL",
            "MySQL",
            "Database Design",
            "Joins",
            "Indexes",
            "MongoDB",
          ],
        },
        {
          title: "Deployment",
          description: "Learn how to deploy applications to the web.",
          topics: [
            "Environment Variables",
            "Build",
            "Hosting",
            "Deployment",
            "Domain",
            "Basic Cloud",
          ],
        },
        {
          title: "Projects & Interview",
          description:
            "Build full stack projects and prepare for interviews.",
          topics: [
            "Portfolio Project",
            "E-Commerce Project",
            "GitHub",
            "Resume",
            "Interview Questions",
          ],
        },
      ],
    },

    {
      id: "react",
      icon: "⚛️",
      title: "React.js",
      subtitle: "React Developer Roadmap",
      description:
        "Learn React from fundamentals to advanced frontend development.",
      stages: [
        {
          title: "JavaScript Fundamentals",
          description: "Build the JavaScript foundation required for React.",
          topics: [
            "Variables",
            "Functions",
            "Arrays",
            "Objects",
            "ES6",
            "Array Methods",
          ],
        },
        {
          title: "React Fundamentals",
          description: "Understand the core concepts of React.",
          topics: [
            "Components",
            "JSX",
            "Props",
            "State",
            "Events",
            "Conditional Rendering",
          ],
        },
        {
          title: "React Hooks",
          description: "Learn the most important React hooks.",
          topics: [
            "useState",
            "useEffect",
            "useContext",
            "useRef",
            "Custom Hooks",
          ],
        },
        {
          title: "Routing & APIs",
          description: "Connect React applications with real-world APIs.",
          topics: [
            "React Router",
            "Axios",
            "Fetch API",
            "API Integration",
            "Loading States",
            "Error Handling",
          ],
        },
        {
          title: "Advanced React",
          description: "Improve performance and application architecture.",
          topics: [
            "Context API",
            "State Management",
            "Performance",
            "Reusable Components",
            "Form Handling",
          ],
        },
        {
          title: "Projects & Interview",
          description:
            "Build React projects and prepare for frontend interviews.",
          topics: [
            "Build Projects",
            "GitHub",
            "Portfolio",
            "React Interview",
            "Mock Interview",
          ],
        },
      ],
    },

    {
      id: "backend",
      icon: "⚙️",
      title: "Backend Development",
      subtitle: "Backend Developer Roadmap",
      description:
        "Learn server-side development, APIs, databases and backend architecture.",
      stages: [
        {
          title: "Programming Fundamentals",
          description: "Choose a backend language and master its basics.",
          topics: [
            "Java",
            "Python",
            "Variables",
            "Functions",
            "OOP",
            "Exception Handling",
          ],
        },
        {
          title: "Database",
          description: "Learn how backend applications manage data.",
          topics: [
            "SQL",
            "MySQL",
            "PostgreSQL",
            "Joins",
            "Indexes",
            "Database Design",
          ],
        },
        {
          title: "REST API Development",
          description: "Build APIs that communicate with frontend applications.",
          topics: [
            "HTTP",
            "REST",
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "JSON",
          ],
        },
        {
          title: "Framework",
          description: "Use a backend framework to build production applications.",
          topics: [
            "Spring Boot",
            "Spring MVC",
            "JPA",
            "Hibernate",
            "Dependency Injection",
            "Validation",
          ],
        },
        {
          title: "Security & Deployment",
          description:
            "Secure and deploy backend applications.",
          topics: [
            "Authentication",
            "Authorization",
            "JWT",
            "CORS",
            "Environment Variables",
            "Deployment",
          ],
        },
        {
          title: "Projects & Interview",
          description:
            "Build backend projects and prepare for interviews.",
          topics: [
            "REST API Project",
            "Database Project",
            "Git & GitHub",
            "Resume",
            "Backend Interview",
          ],
        },
      ],
    },

    {
      id: "dsa",
      icon: "💻",
      title: "DSA",
      subtitle: "Data Structures & Algorithms Roadmap",
      description:
        "Master problem solving and the most important DSA patterns for coding interviews.",
      stages: [
        {
          title: "Basics",
          description: "Build the foundation for problem solving.",
          topics: [
            "Time Complexity",
            "Space Complexity",
            "Arrays",
            "Strings",
            "Searching",
            "Sorting",
          ],
        },
        {
          title: "Linear Data Structures",
          description: "Master commonly used linear data structures.",
          topics: [
            "Linked List",
            "Stack",
            "Queue",
            "Deque",
            "HashMap",
            "HashSet",
          ],
        },
        {
  title: "Trees & Heaps",
  description: "Learn hierarchical data structures.",
  topics: [
    "Binary Tree",
    "BST",
    "Tree Traversal",
    "Heap",
    "Priority Queue",
  ],
},
        {
          title: "Graphs",
          description: "Understand graph representation and algorithms.",
          topics: [
            "Graph Representation",
            "BFS",
            "DFS",
            "Shortest Path",
            "Topological Sort",
            "Union Find",
          ],
        },
        {
          title: "Dynamic Programming",
          description: "Learn the most important DP problem-solving patterns.",
          topics: [
            "1D DP",
            "2D DP",
            "Knapsack",
            "LCS",
            "LIS",
            "Grid DP",
          ],
        },
        {
          title: "Interview Preparation",
          description:
            "Practice patterns and company-level coding questions.",
          topics: [
            "Two Pointers",
            "Sliding Window",
            "Binary Search",
            "Greedy",
            "Backtracking",
            "Mock Coding Tests",
          ],
        },
      ],
    },

    {
      id: "sql",
      icon: "🗄️",
      title: "SQL & Database",
      subtitle: "SQL & Database Roadmap",
      description:
        "Learn SQL, database concepts and query solving for technical interviews.",
      stages: [
        {
          title: "SQL Basics",
          description: "Learn how to retrieve and manipulate data.",
          topics: [
            "SELECT",
            "WHERE",
            "ORDER BY",
            "GROUP BY",
            "HAVING",
            "LIMIT",
          ],
        },
        {
          title: "SQL Queries",
          description: "Solve real-world SQL problems.",
          topics: [
            "Joins",
            "Subqueries",
            "CTE",
            "CASE",
            "Aggregate Functions",
            "String Functions",
          ],
        },
        {
          title: "Database Concepts",
          description: "Understand how relational databases work.",
          topics: [
            "Tables",
            "Primary Key",
            "Foreign Key",
            "Normalization",
            "Indexes",
            "Constraints",
          ],
        },
        {
          title: "Advanced SQL",
          description: "Learn advanced querying techniques.",
          topics: [
            "Window Functions",
            "Rank",
            "Partition By",
            "Views",
            "Transactions",
            "Stored Procedures",
          ],
        },
        {
          title: "Interview Preparation",
          description:
            "Practice SQL questions commonly asked in interviews.",
          topics: [
            "SQL Practice",
            "DBMS Questions",
            "Query Optimization",
            "Mock Test",
            "Interview Questions",
          ],
        },
      ],
    },
  ];

 const toggleTopic = (roadmapId, topic) => {
  const key = `${roadmapId}-${topic}`;

  setCompletedTopics((prev) => {
    const updatedProgress = {
      ...prev,
      [key]: !prev[key],
    };

    localStorage.setItem(
      "prepmate-roadmap-progress",
      JSON.stringify(updatedProgress)
    );

    return updatedProgress;
  });
};

  const getStageProgress = (roadmapId, stage) => {
  const completed = stage.topics.filter(
    (topic) => completedTopics[`${roadmapId}-${topic}`]
  ).length;

  return Math.round((completed / stage.topics.length) * 100);
};

 const getOverallProgress = (roadmap) => {
  const allTopics = roadmap.stages.flatMap((stage) => stage.topics);

  const completed = allTopics.filter(
    (topic) =>
      completedTopics[`${roadmap.id}-${topic}`]
  ).length;

  return Math.round((completed / allTopics.length) * 100);
};

  /* =========================================
     ROADMAP DETAIL PAGE
  ========================================= */

  if (selectedRoadmap) {
    const roadmap = selectedRoadmap;
    const overallProgress = getOverallProgress(roadmap);

    return (
      <div className="roadmap-page">

        <div className="roadmap-header">
          <div>
            <button
              className="roadmap-back-link"
              onClick={() => setSelectedRoadmap(null)}
            >
              ← All Roadmaps
            </button>

            <span className="roadmap-label">
              {roadmap.title.toUpperCase()}
            </span>

            <h1>{roadmap.title} Roadmap</h1>

            <p>{roadmap.description}</p>
          </div>

          <button
            className="roadmap-back-btn"
            onClick={onBack}
          >
            ← Dashboard
          </button>
        </div>

        {/* Overall Progress */}

        <div className="roadmap-progress">
          <div className="progress-top">
            <div>
              <span>YOUR PROGRESS</span>
              <h2>{roadmap.title}</h2>
            </div>

            <strong>{overallProgress}%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>

          <p>
            {overallProgress === 0
              ? "Start your roadmap and complete topics step by step."
              : `${overallProgress}% of your roadmap is completed.`}
          </p>
        </div>

        {/* Stages */}

        <div className="roadmap-section">
          <div className="roadmap-line"></div>

          {roadmap.stages.map((stage, index) => {
            const stageProgress = getStageProgress(roadmap.id, stage);

            return (
              <div className="roadmap-stage" key={stage.title}>

                <div
                  className={`stage-number ${
                    stageProgress === 100
                      ? "stage-completed"
                      : ""
                  }`}
                >
                  {stageProgress === 100
                    ? "✓"
                    : `0${index + 1}`}
                </div>

                <div className="stage-content">

                  <div className="stage-heading">
  <div>
    <span
      className={`stage-status ${
        stageProgress === 100
          ? "completed-status"
          : ""
      }`}
    >
      {stageProgress === 100
        ? "✓ COMPLETED"
        : `STAGE ${index + 1}`}
    </span>

    <h2>{stage.title}</h2>
  </div>

  <button
    className="stage-notes-btn"
    onClick={() => alert(`Notes: ${stage.title}`)}
    title="View Notes"
  >
    📝
  </button>
</div>

<p>{stage.description}</p>

                  <div className="roadmap-checklist">
                    {stage.topics.map((topic) => (
                    <label
  key={topic}
  className={`roadmap-topic ${
    completedTopics[`${roadmap.id}-${topic}`]
      ? "completed"
      : ""
  }`}
>
  <input
    type="checkbox"
    checked={!!completedTopics[`${roadmap.id}-${topic}`]}
    onChange={() => toggleTopic(roadmap.id, topic)}
  />

  <span>{topic}</span>
</label>
                    ))}
                  </div>

                  <div className="stage-progress">
                    <div className="stage-progress-top">
                      <span>Progress</span>
                      <strong>{stageProgress}%</strong>
                    </div>

                    <div className="stage-progress-bar">
                      <div
                        className="stage-progress-fill"
                        style={{
                          width: `${stageProgress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* =========================================
     ROADMAP CARDS PAGE
  ========================================= */

  return (
    <div className="roadmap-page">

      <div className="roadmap-header">
        <div>
          <span className="roadmap-label">
            PLACEMENT PREPARATION
          </span>

          <h1>Choose Your Roadmap</h1>

          <p>
            Select a technology or career path and start your
            preparation journey.
          </p>
        </div>

        <button
          className="roadmap-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>
      </div>

      <div className="roadmap-card-grid">

        {roadmaps.map((roadmap) => {
          const progress = getOverallProgress(roadmap);

          return (
            <div
              className="roadmap-card"
              key={roadmap.id}
              onClick={() => setSelectedRoadmap(roadmap)}
            >

              <div className="roadmap-card-top">
                <div className="roadmap-card-icon">
                  {roadmap.icon}
                </div>

                <span className="roadmap-card-arrow">
                  →
                </span>
              </div>

              <h2>{roadmap.title}</h2>

              <h4>{roadmap.subtitle}</h4>

              <p>{roadmap.description}</p>

              <div className="roadmap-card-bottom">
                <span>
                  {roadmap.stages.length} Stages
                </span>

                <strong>{progress}%</strong>
              </div>

              <div className="roadmap-card-progress">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Roadmap;