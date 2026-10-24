import { useEffect, useMemo, useState } from "react";
import "./TopicPractice.css";

function TopicPractice({ topic, onOpenQuestion, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setLoading(true);

    fetch(
      `http://localhost:8080/api/questions/topic/${encodeURIComponent(topic)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setSelectedIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setQuestions([]);
        setLoading(false);
      });
  }, [topic]);

  const selectedQuestion = questions[selectedIndex];

  const modules = useMemo(() => {
    if (!questions.length) {
      return [];
    }

    const firstModule = questions.slice(0, 2);
    const secondModule = questions.slice(2, 5);
    const thirdModule = questions.slice(5);

    return [
      {
        title: "GETTING STARTED",
        questions: firstModule,
      },
      {
        title: "THE FOUR PILLARS",
        questions: secondModule,
      },
      {
        title: "DESIGNING WITH OBJECTS",
        questions: thirdModule,
      },
    ].filter((module) => module.questions.length > 0);
  }, [questions]);

  const pageSections = useMemo(() => {
    if (!selectedQuestion) {
      return [];
    }

    return [
      "What you'll learn",
      selectedQuestion.title,
      "Key idea",
      "Core concept",
      "Interview perspective",
    ];
  }, [selectedQuestion]);

  const handleSelectQuestion = (index) => {
    setSelectedIndex(index);

    setTimeout(() => {
      document
        .getElementById("topic-content")
        ?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    }, 0);
  };

  return (
    <div className="learning-page">
      {/* TOP HEADER */}

      <header className="learning-header">
        <div className="learning-header-left">
          <button className="learning-back-button" onClick={onBack}>
            ← Back to Core Subjects
          </button>

          <div className="learning-topic-name">
            <span>CORE SUBJECT</span>
            <strong>{topic}</strong>
          </div>
        </div>

        <div className="learning-header-actions">
          <div className="learning-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder={`Search ${topic} topics...`}
            />
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}

      <div className="learning-layout">
        {/* LEFT SIDEBAR */}

        <aside className="learning-sidebar">
          <div className="sidebar-topic-card">
            <div className="sidebar-topic-icon">♧</div>

            <div>
              <strong>{topic}</strong>
              <span>{questions.length} topics</span>
            </div>
          </div>

          {loading && (
            <div className="sidebar-loading">
              Loading topics...
            </div>
          )}

          {!loading &&
            modules.map((module, moduleIndex) => (
              <div className="sidebar-module" key={module.title}>
                <div className="sidebar-module-header">
                  <span>{module.title}</span>
                  <small>{module.questions.length}</small>
                </div>

                <div className="sidebar-question-list">
                  {module.questions.map((question) => {
                    const actualIndex = questions.findIndex(
                      (item) => item.id === question.id
                    );

                    const isActive =
                      actualIndex === selectedIndex;

                    return (
                      <button
                        key={question.id}
                        className={
                          isActive
                            ? "sidebar-question active"
                            : "sidebar-question"
                        }
                        onClick={() =>
                          handleSelectQuestion(actualIndex)
                        }
                      >
                        {question.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </aside>

        {/* CENTER CONTENT */}

        <main className="learning-content" id="topic-content">
          {loading && (
            <div className="content-loading">
              Loading {topic}...
            </div>
          )}

          {!loading && !selectedQuestion && (
            <div className="empty-topic">
              <h2>No topics available</h2>
              <p>
                No questions are available for {topic} yet.
              </p>
            </div>
          )}

          {!loading && selectedQuestion && (
            <article className="topic-article">
              <div className="article-eyebrow">
                {topic.toUpperCase()}
              </div>

              <h1>{selectedQuestion.title}</h1>

              <p className="article-intro">
                {selectedQuestion.questionText ||
                  `Learn the fundamentals of ${selectedQuestion.title} and understand how it is used in real-world software development.`}
              </p>

              <div className="article-divider" />

              <section className="article-section">
                <div className="section-number">
                  1.1
                </div>

                <h2>
                  Understanding the concept
                </h2>

                <p>
                  The goal of this topic is to build a strong
                  conceptual understanding before jumping into
                  implementation. Focus on what the concept solves,
                  why it exists, and where it is useful.
                </p>
              </section>

              <div className="idea-box">
                <span className="idea-label">
                  KEY IDEA
                </span>

                <p>
                  <strong>
                    Understand the problem first,
                  </strong>{" "}
                  then understand how the programming concept
                  provides a clean and reusable solution.
                </p>
              </div>

              <section className="article-section">
                <div className="section-number">
                  1.2
                </div>

                <h2>
                  {selectedQuestion.title}
                </h2>

                <p>
                  {selectedQuestion.questionText ||
                    "This section explains the important ideas you should know for interviews and practical development."}
                </p>

                <h3>
                  Why this matters
                </h3>

                <p>
                  Interviewers often test whether you understand
                  the reasoning behind a concept rather than only
                  remembering its definition. Try to explain this
                  topic in your own words and connect it with a
                  practical example.
                </p>
              </section>

              <div className="think-box">
                <span>THINK</span>

                <p>
                  Can you explain this concept to someone who has
                  never used it before?
                </p>
              </div>

              <section className="article-section">
                <div className="section-number">
                  1.3
                </div>

                <h2>
                  Interview perspective
                </h2>

                <p>
                  For placement preparation, remember the
                  definition, purpose, advantages, limitations,
                  and one practical example. These five points
                  make it much easier to answer follow-up questions.
                </p>
              </section>

              {/* QUESTION ACTIONS */}

              <div className="article-actions">
                <button
                  className="primary-action"
                  onClick={() =>
                    onOpenQuestion(selectedQuestion)
                  }
                >
                  Open Question
                </button>

                {selectedQuestion.leetcodeLink && (
                  <a
                    className="secondary-action"
                    href={selectedQuestion.leetcodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LeetCode ↗
                  </a>
                )}

                {selectedQuestion.gfgLink && (
                  <a
                    className="secondary-action"
                    href={selectedQuestion.gfgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GeeksforGeeks ↗
                  </a>
                )}
              </div>
            </article>
          )}
        </main>

        {/* RIGHT ON THIS PAGE */}

        <aside className="on-page-sidebar">
          <div className="on-page-title">
            <span>☷</span>
            ON THIS PAGE
          </div>

          <div className="on-page-list">
            {pageSections.map((section, index) => (
              <button
                key={section}
                className={
                  index === 1
                    ? "on-page-item active"
                    : "on-page-item"
                }
              >
                {section}
              </button>
            ))}
          </div>

          <div className="on-page-progress">
            <span />
          </div>
        </aside>
      </div>

      {/* FLOATING ACTION */}

      <button className="floating-help">
        ⊞
      </button>
    </div>
  );
}

export default TopicPractice;