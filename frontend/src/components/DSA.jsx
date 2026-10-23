import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./DSA.css";

import {
  SiLeetcode,
  SiGeeksforgeeks,
  SiYoutube,
} from "react-icons/si";

const API = "http://localhost:8080/api";

/* =========================================================
   COMPANY ICON
========================================================= */

const getCompanyIcon = (company) => {
  return (
    <span className="company-letter">
      {company.charAt(0).toUpperCase()}
    </span>
  );
};

/* =========================================================
   DSA SECTIONS
========================================================= */

const SECTIONS = [
  {
    id: "foundation",
    title: "Foundation",
    patterns: [
      {
        id: "basic-problem-solving",
        title: "Basic Problem Solving",
        topic: "Basic Problem Solving",
      },
      {
        id: "arrays-basics",
        title: "Arrays Basics",
        topic: "Arrays",
      },
    ],
  },

  {
    id: "array-patterns",
    title: "Array Patterns",
    patterns: [
      {
        id: "array-traversal",
        title: "Traversal & Simulation",
        topic: "Array Traversal",
      },
      {
        id: "hashing",
        title: "Hashing",
        topic: "Hashing",
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        topic: "Two Pointer",
      },
      {
        id: "sliding-window",
        title: "Sliding Window",
        topic: "Sliding Window",
      },
      {
        id: "prefix-sum",
        title: "Prefix Sum",
        topic: "Prefix Sum",
      },
    ],
  },

  {
    id: "searching-sorting",
    title: "Searching & Sorting",
    patterns: [
      {
        id: "binary-search",
        title: "Binary Search",
        topic: "Binary Search",
      },
      {
        id: "sorting",
        title: "Sorting",
        topic: "Sorting",
      },
      {
        id: "merge-quick-sort",
        title: "Merge Sort / Quick Sort",
        topic: "Merge Sort",
      },
    ],
  },

  {
    id: "linear-data-structures",
    title: "Linear Data Structures",
    patterns: [
      {
        id: "linked-list",
        title: "Linked List",
        topic: "Linked List",
      },
      {
        id: "stack",
        title: "Stack",
        topic: "Stack",
      },
      {
        id: "queue",
        title: "Queue",
        topic: "Queue",
      },
      {
        id: "monotonic-stack",
        title: "Monotonic Stack",
        topic: "Monotonic Stack",
      },
    ],
  },

  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    patterns: [
      {
        id: "recursion",
        title: "Recursion",
        topic: "Recursion",
      },
      {
        id: "backtracking",
        title: "Backtracking",
        topic: "Backtracking",
      },
    ],
  },

  {
    id: "trees",
    title: "Trees",
    patterns: [
      {
        id: "binary-tree",
        title: "Binary Tree",
        topic: "Binary Tree",
      },
      {
        id: "binary-search-tree",
        title: "Binary Search Tree",
        topic: "Binary Search Tree",
      },
      {
        id: "heap",
        title: "Heap",
        topic: "Heap",
      },
    ],
  },

  {
    id: "graphs",
    title: "Graphs",
    patterns: [
      {
        id: "graph-basics",
        title: "Graph Basics",
        topic: "Graph Basics",
      },
      {
        id: "graph-traversal",
        title: "Graph Traversal",
        topic: "Graph",
      },
    ],
  },

  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    patterns: [
      {
        id: "dp-basics",
        title: "DP Basics",
        topic: "DP Basics",
      },
      {
        id: "classic-dp",
        title: "Classic DP Problems",
        topic: "Dynamic Programming",
      },
    ],
  },
];

const DIFFICULTIES = ["ALL", "EASY", "MEDIUM", "HARD"];

/* =========================================================
   NORMALIZE QUESTION
========================================================= */

function normalizeQuestion(q) {
  return {
    ...q,

    id: q.id,

    title: q.title || "Untitled Question",

    topic: q.topic || "",

    difficulty: q.difficulty || "Easy",

    questionText: q.questionText || "",

    companies: q.companies
      ? Array.isArray(q.companies)
        ? q.companies
        : q.companies
            .split(",")
            .map((company) => company.trim())
            .filter(Boolean)
      : [],

    leetcodeUrl:
      q.leetcodeUrl || q.leetcodeLink || "",

    gfgUrl:
      q.gfgUrl || q.gfgLink || "",

    videoUrl:
      q.videoUrl || q.videoLink || "",
  };
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function DSA({
  user,
  onOpenQuestion,
}) {
  /* =======================================================
     STATE
  ======================================================= */

  const [questions, setQuestions] = useState({});

  const [solvedIds, setSolvedIds] = useState(
    new Set()
  );

  const [progressLoaded, setProgressLoaded] =
    useState(false);

  const [platformProgress, setPlatformProgress] =
    useState({});

  const [bookmarkedIds, setBookmarkedIds] =
    useState(new Set());

  const [loading, setLoading] =
    useState(true);

  const [activeDifficulty, setActiveDifficulty] =
    useState("ALL");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [openSections, setOpenSections] =
    useState(new Set());

  const [openPatterns, setOpenPatterns] =
    useState(new Set());

  /*
   * Keeps track of whether user has opened
   * LeetCode and we should verify after returning.
   */
  const [leetcodeVerificationPending, setLeetcodeVerificationPending] =
    useState(false);

  /*
   * Prevents multiple sync requests at the same time.
   */
  const [isSyncingLeetCode, setIsSyncingLeetCode] =
    useState(false);

  /* =======================================================
     USER ID
  ======================================================= */

  const userId = user?.id ?? user?.userId ?? 1;

  /* =======================================================
     LOAD QUESTIONS
  ======================================================= */

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const groupedQuestions = {};

      /*
       * Create empty array for every pattern
       */
      SECTIONS.forEach((section) => {
        section.patterns.forEach((pattern) => {
          groupedQuestions[pattern.id] = [];
        });
      });

      /*
       * Load every difficulty for every topic
       */
      for (const section of SECTIONS) {
        for (const pattern of section.patterns) {
          const difficulties = [
            "Easy",
            "Medium",
            "Hard",
          ];

          for (const difficulty of difficulties) {
            try {
              const response = await axios.get(
                `${API}/questions/filter`,
                {
                  params: {
                    topic: pattern.topic,
                    difficulty: difficulty,
                  },
                }
              );

              if (Array.isArray(response.data)) {
                response.data.forEach((question) => {
                  const normalized =
                    normalizeQuestion(question);

                  const alreadyExists =
                    groupedQuestions[
                      pattern.id
                    ].some(
                      (existingQuestion) =>
                        String(
                          existingQuestion.id
                        ) ===
                        String(normalized.id)
                    );

                  if (!alreadyExists) {
                    groupedQuestions[
                      pattern.id
                    ].push({
                      ...normalized,

                      pattern: pattern.title,

                      section: section.title,
                    });
                  }
                });
              }
            } catch (error) {
              console.log(
                `No ${difficulty} questions for ${pattern.topic}`
              );
            }
          }
        }
      }

      /*
       * IMPORTANT
       *
       * Sort by ID so sequential unlocking remains
       * deterministic.
       */
      Object.keys(groupedQuestions).forEach(
        (patternId) => {
          groupedQuestions[patternId].sort(
            (a, b) =>
              Number(a.id) - Number(b.id)
          );
        }
      );

      console.log(
        "GROUPED QUESTIONS:",
        groupedQuestions
      );

      setQuestions(groupedQuestions);
    } catch (error) {
      console.error(
        "Question loading error:",
        error
      );

      setQuestions({});
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadQuestions();
  }, []);

  /* =======================================================
     LOAD SAVED PROGRESS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadProgress = async () => {
      try {
        const response = await axios.get(
          `${API}/progress/${userId}`
        );

        if (
          cancelled ||
          !Array.isArray(response.data)
        ) {
          return;
        }

        const savedSolved = new Set();
        const savedPlatforms = {};

        response.data.forEach((item) => {
          const questionId = String(
            item.questionId
          );

          /*
           * Backend is the source of truth.
           *
           * We do NOT manually mark anything here.
           */
          if (
            item.status === "SOLVED" ||
            item.solved === true
          ) {
            savedSolved.add(questionId);
          }

          savedPlatforms[questionId] = {
            leetcodeSolved:
              item.leetcodeSolved === true,

            gfgSolved:
              item.gfgSolved === true,
          };
        });

        setSolvedIds(savedSolved);
        setPlatformProgress(savedPlatforms);
      } catch (error) {
        console.error(
          "Progress loading error:",
          error
        );
      } finally {
        if (!cancelled) {
          setProgressLoaded(true);
        }
      }
    };

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  /* =======================================================
     REFRESH PROGRESS FROM BACKEND
  ======================================================= */

  const refreshProgress = async () => {
    try {
      const response = await axios.get(
        `${API}/progress/${userId}`
      );

      if (!Array.isArray(response.data)) {
        return;
      }

      const savedSolved = new Set();
      const savedPlatforms = {};

      response.data.forEach((item) => {
        const questionId = String(
          item.questionId
        );

        if (
          item.status === "SOLVED" ||
          item.solved === true
        ) {
          savedSolved.add(questionId);
        }

        savedPlatforms[questionId] = {
          leetcodeSolved:
            item.leetcodeSolved === true,

          gfgSolved:
            item.gfgSolved === true,
        };
      });

      setSolvedIds(savedSolved);
      setPlatformProgress(savedPlatforms);
    } catch (error) {
      console.error(
        "Refreshing progress failed:",
        error
      );
    }
  };

  /* =======================================================
     LEETCODE USERNAME
  ======================================================= */

  const getLeetCodeUsername = () => {
    return (
      user?.leetcodeUsername ||
      user?.leetcodeUserName ||
      user?.leetcode ||
      user?.leetcodeUsername?.username ||
      ""
    );
  };

  /* =======================================================
     VERIFY LEETCODE
     
     IMPORTANT:
     This DOES NOT mark a question solved manually.
     
     Backend checks actual LeetCode Accepted submissions.
  ======================================================= */

  const verifyLeetCode = async ({
    silent = false,
  } = {}) => {
    const username =
      getLeetCodeUsername();

    if (!username) {
      if (!silent) {
        alert(
          "Pehle apna LeetCode username profile/settings me add karo."
        );
      }

      return false;
    }

    if (isSyncingLeetCode) {
      return false;
    }

    try {
      setIsSyncingLeetCode(true);

      const response = await axios.post(
        `${API}/progress/${userId}/leetcode/sync`,
        null,
        {
          params: {
            username: username.trim(),
          },
        }
      );

      /*
       * Backend has now verified actual submissions.
       */
      await refreshProgress();

      const solvedCount = Number(
        response.data?.solved || 0
      );

      if (!silent && solvedCount > 0) {
        alert(
          `${solvedCount} LeetCode question verified ✓`
        );
      }

      return solvedCount > 0;
    } catch (error) {
      console.error(
        "LeetCode verification failed:",
        error
      );

      /*
       * Do not show an alert during automatic
       * focus/poll verification.
       */
      if (!silent) {
        alert(
          "LeetCode verification failed. Username aur backend sync check karo."
        );
      }

      return false;
    } finally {
      setIsSyncingLeetCode(false);
    }
  };

  /* =======================================================
     VERIFY WHEN USER RETURNS FROM LEETCODE
     
     User flow:
     
     1. Click LeetCode
     2. Solve question there
     3. Come back to PrepMate
     4. Backend verifies Accepted
     5. Checkbox automatically becomes checked
  ======================================================= */

  useEffect(() => {
    if (!leetcodeVerificationPending) {
      return;
    }

    let intervalId = null;
    let cancelled = false;

    const verifyAfterReturn = async () => {
      if (cancelled) return;

      const solved = await verifyLeetCode({
        silent: true,
      });

      if (solved && !cancelled) {
        setLeetcodeVerificationPending(false);
      }
    };

    /*
     * Verify once immediately after returning.
     */
    verifyAfterReturn();

    /*
     * Then periodically check while this page
     * remains open.
     */
    intervalId = setInterval(() => {
      verifyAfterReturn();
    }, 15000);

    /*
     * Browser/tab focus verification.
     */
    const handleFocus = () => {
      verifyAfterReturn();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      cancelled = true;

      if (intervalId) {
        clearInterval(intervalId);
      }

      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [
    leetcodeVerificationPending,
    userId,
  ]);

  /* =======================================================
     ALL QUESTIONS
  ======================================================= */

  const allQuestions = useMemo(() => {
    return Object.values(questions).flat();
  }, [questions]);

  /* =======================================================
     SEARCH + DIFFICULTY FILTER
  ======================================================= */

  const filteredQuestions = (patternId) => {
    const list = questions[patternId] || [];

    const query = searchQuery
      .trim()
      .toLowerCase();

    return list.filter((question) => {
      /*
       * Difficulty filter
       */
      const matchesDifficulty =
        activeDifficulty === "ALL" ||
        String(question.difficulty).toUpperCase() ===
          activeDifficulty;

      /*
       * Search filter
       *
       * Searches:
       * - Question title
       * - Topic
       * - Pattern
       * - Section
       */
      const matchesSearch =
        !query ||
        String(question.title || "")
          .toLowerCase()
          .includes(query) ||
        String(question.topic || "")
          .toLowerCase()
          .includes(query) ||
        String(question.pattern || "")
          .toLowerCase()
          .includes(query) ||
        String(question.section || "")
          .toLowerCase()
          .includes(query);

      return (
        matchesDifficulty &&
        matchesSearch
      );
    });
  };

  /* =======================================================
     SEARCH ACTIVE
  ======================================================= */

  const hasSearch =
    searchQuery.trim().length > 0;

  /* =======================================================
     TOGGLE SECTION
  ======================================================= */

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => {
      const next = new Set(prev);

      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }

      return next;
    });

    /*
     * When section is closed,
     * close all topics inside it.
     */
    const section = SECTIONS.find(
      (item) => item.id === sectionId
    );

    if (section) {
      setOpenPatterns((prev) => {
        const next = new Set(prev);

        section.patterns.forEach((pattern) => {
          next.delete(pattern.id);
        });

        return next;
      });
    }
  };

  /* =======================================================
     TOGGLE TOPIC
  ======================================================= */

  const togglePattern = (patternId) => {
    setOpenPatterns((prev) => {
      const next = new Set(prev);

      if (next.has(patternId)) {
        next.delete(patternId);
      } else {
        next.add(patternId);
      }

      return next;
    });
  };

  /* =======================================================
     QUESTION LOCKING — HAR TOPIC KE ANDAR
  ======================================================= */

  const isQuestionLocked = (
    patternId,
    questionId
  ) => {
    const topicQuestions =
      questions[patternId] || [];

    const currentIndex =
      topicQuestions.findIndex(
        (question) =>
          String(question.id) ===
          String(questionId)
      );

    /*
     * Question list mein nahi mila
     */
    if (currentIndex === -1) {
      return true;
    }

    /*
     * Har topic ka pehla question unlocked
     */
    if (currentIndex === 0) {
      return false;
    }

    /*
     * Current question se just pehle wala question
     */
    const previousQuestion =
      topicQuestions[currentIndex - 1];

    /*
     * Previous question backend-verified solved
     * hona zaroori hai.
     */
    return !solvedIds.has(
      String(previousQuestion.id)
    );
  };

  /* =======================================================
     HANDLE LEETCODE CLICK
     
     We do NOT mark solved here.
     We only tell the component that after returning
     from LeetCode it should verify the username.
  ======================================================= */

  const handleLeetCodeClick = (
    event,
    patternId,
    questionId
  ) => {
    event.stopPropagation();

    if (
      isQuestionLocked(
        patternId,
        questionId
      )
    ) {
      event.preventDefault();
      return;
    }

    const username =
      getLeetCodeUsername();

    /*
     * No username = cannot verify later.
     */
    if (!username) {
      event.preventDefault();

      alert(
        "Pehle apna LeetCode username profile/settings me add karo."
      );

      return;
    }

    /*
     * Existing solved question:
     * let user open it normally, but no need to
     * start verification.
     */
    if (
      platformProgress[
        String(questionId)
      ]?.leetcodeSolved
    ) {
      return;
    }

    /*
     * User is going to LeetCode.
     * When they return, verification starts.
     */
    setLeetcodeVerificationPending(true);
  };

  /* =======================================================
     GFG CLICK
     
     NOTE:
     Frontend cannot independently know that a GFG
     problem was solved. Backend verification endpoint
     must be implemented for GFG if you want automatic
     GFG checking.
  ======================================================= */

  const handleGfgClick = (
    event,
    patternId,
    questionId
  ) => {
    event.stopPropagation();

    if (
      isQuestionLocked(
        patternId,
        questionId
      )
    ) {
      event.preventDefault();
    }
  };

  /* =======================================================
     BOOKMARK
  ======================================================= */

  const toggleBookmark = (questionId) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);

      const id = String(questionId);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  /* =======================================================
     OVERALL PROGRESS
  ======================================================= */

  const totalQuestions =
    allQuestions.length;

  const solvedQuestions =
    allQuestions.filter((question) =>
      solvedIds.has(
        String(question.id)
      )
    ).length;

  const progress =
    totalQuestions > 0
      ? Math.round(
          (solvedQuestions /
            totalQuestions) *
            100
        )
      : 0;

  /* =======================================================
     DIFFICULTY PROGRESS
  ======================================================= */

  const difficultyProgress = [
    "Easy",
    "Medium",
    "Hard",
  ].map((difficulty) => {
    const total =
      allQuestions.filter(
        (question) =>
          String(
            question.difficulty
          ).toLowerCase() ===
          difficulty.toLowerCase()
      ).length;

    const solved =
      allQuestions.filter(
        (question) =>
          String(
            question.difficulty
          ).toLowerCase() ===
            difficulty.toLowerCase() &&
          solvedIds.has(
            String(question.id)
          )
      ).length;

    return {
      name: difficulty,
      solved,
      total,
    };
  });

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="dsa-page">
        <div className="dsa-loading">
          <div className="dsa-loader"></div>

          <h3>
            Loading DSA Sheet...
          </h3>

          <p>
            Preparing questions for your practice.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="dsa-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dsa-hero">

        <div className="dsa-hero-content">

          <div
            className="dsa-hero-icon"
            aria-hidden="true"
          >
            &lt;/&gt;
          </div>

          <div className="dsa-hero-copy">

            <span className="dsa-eyebrow">
              PREPMATE · DSA SHEET
            </span>

            <h1>
              Data Structures and Algorithm
            </h1>

            <p>
              Master DSA patterns step-by-step
              and prepare for coding interviews.
            </p>

          </div>

        </div>

        {/* =============================================
            PROGRESS
        ============================================= */}

        <div className="dsa-hero-progress">

          <div
            className="dsa-progress-circle"
            style={{
              "--progress": `${progress * 3.6}deg`,
            }}
            aria-label={`${solvedQuestions} of ${totalQuestions} questions completed`}
          >

            <div className="dsa-progress-circle-inner">

              <strong>
                {solvedQuestions}/
                {totalQuestions}
              </strong>

              <span>
                Completed
              </span>

            </div>

          </div>

          {/* ===========================================
              DIFFICULTY COUNTS
          =========================================== */}

          <div className="dsa-difficulty-progress">

            {difficultyProgress.map(
              (item) => (
                <span
                  key={item.name}
                >
                  <b>
                    {item.name}
                  </b>{" "}
                  {item.solved}/
                  {item.total}
                </span>
              )
            )}

          </div>

        </div>

      </div>

      {/* =================================================
          SEARCH + DIFFICULTY
      ================================================= */}

      <div className="dsa-filter-bar">

        {/* SEARCH */}

        <div className="dsa-search-wrap">

          <span
            className="dsa-search-icon"
            aria-hidden="true"
          >
            ⌕
          </span>

          <input
            type="text"
            className="dsa-search-input"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
          />

          {/* CLEAR SEARCH */}

          {searchQuery && (
            <button
              type="button"
              className="dsa-search-clear"
              onClick={() =>
                setSearchQuery("")
              }
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

        {/* DIFFICULTY */}

        <div className="dsa-filter-right">

          <select
            className="dsa-difficulty-select"
            value={activeDifficulty}
            onChange={(event) =>
              setActiveDifficulty(
                event.target.value
              )
            }
            aria-label="Filter by difficulty"
          >

            <option value="ALL">
              All Difficulties
            </option>

            <option value="EASY">
              Easy
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HARD">
              Hard
            </option>

          </select>

        </div>

      </div>

      {/* =================================================
          DSA SECTIONS
      ================================================= */}

      <div className="dsa-sections">

        {SECTIONS.map(
          (section, sectionIndex) => {

            /*
             * All questions belonging to section
             */
            const sectionQuestions =
              section.patterns.flatMap(
                (pattern) =>
                  questions[
                    pattern.id
                  ] || []
              );

            /*
             * When searching, only show section
             * if it contains a matching question.
             */
            const visiblePatterns =
              section.patterns.filter(
                (pattern) => {
                  if (!hasSearch) {
                    return true;
                  }

                  return (
                    filteredQuestions(
                      pattern.id
                    ).length > 0
                  );
                }
              );

            /*
             * Hide section completely if
             * search has no matching question.
             */
            if (
              hasSearch &&
              visiblePatterns.length === 0
            ) {
              return null;
            }

            /*
             * Normal open/close behaviour.
             *
             * During search:
             * automatically open section.
             */
            const isSectionOpen =
              hasSearch ||
              openSections.has(
                section.id
              );

            return (
              <div
                className="dsa-section"
                key={section.id}
              >

                {/* ======================================
                    SECTION HEADER
                ====================================== */}

                <div
                  className="dsa-section-header"
                  onClick={() =>
                    toggleSection(
                      section.id
                    )
                  }
                >

                  <div className="dsa-section-left">

                    <div className="dsa-section-number">
                      {String(
                        sectionIndex + 1
                      ).padStart(2, "0")}
                    </div>

                    <div>

                      <h2>
                        {section.title}
                      </h2>

                      <p>
                        {section.patterns.length}{" "}
                        Topics •{" "}
                        {sectionQuestions.length}{" "}
                        Questions
                      </p>

                    </div>

                  </div>

                  <div className="dsa-section-arrow">
                    {isSectionOpen
                      ? "⌃"
                      : "⌄"}
                  </div>

                </div>

                {/* ======================================
                    TOPICS
                ====================================== */}

                {isSectionOpen && (

                  <div className="dsa-patterns">

                    {visiblePatterns.map(
                      (pattern) => {

                        const allPatternQuestions =
                          questions[
                            pattern.id
                          ] || [];

                        /*
                         * Apply both:
                         * - difficulty
                         * - search
                         */
                        const patternQuestions =
                          filteredQuestions(
                            pattern.id
                          );

                        /*
                         * During search automatically
                         * open matching topic.
                         */
                        const isPatternOpen =
                          hasSearch ||
                          openPatterns.has(
                            pattern.id
                          );

                        return (
                          <div
                            className="dsa-pattern"
                            key={pattern.id}
                          >

                            {/* =========================
                                TOPIC HEADER
                            ========================= */}

                            <div
                              className="dsa-pattern-header"
                              onClick={() =>
                                togglePattern(
                                  pattern.id
                                )
                              }
                            >

                              <div className="dsa-pattern-info">

                                <div className="dsa-pattern-icon">
                                  {isPatternOpen
                                    ? "−"
                                    : "+"}
                                </div>

                                <div>

                                  <h3>
                                    {
                                      pattern.title
                                    }
                                  </h3>

                                  <p>
                                    {
                                      allPatternQuestions.length
                                    }{" "}
                                    Questions
                                  </p>

                                </div>

                              </div>

                              <div className="dsa-pattern-arrow">
                                {isPatternOpen
                                  ? "⌃"
                                  : "⌄"}
                              </div>

                            </div>

                            {/* =========================
                                QUESTIONS
                            ========================= */}

                            {isPatternOpen && (

                              <div className="dsa-question-list">

                                {patternQuestions.length ===
                                0 ? (

                                  <div className="dsa-empty-state">
                                    No questions
                                    available for
                                    this filter.
                                  </div>

                                ) : (

                                  patternQuestions.map(
                                    (
                                      question,
                                      index
                                    ) => {

                                      const questionId =
                                        String(
                                          question.id
                                        );

                                      const questionSolved =
                                        solvedIds.has(
                                          questionId
                                        );

                                      const questionLocked =
                                        isQuestionLocked(
                                          pattern.id,
                                          question.id
                                        );

                                      const leetcodeSolved =
                                        platformProgress[
                                          questionId
                                        ]?.leetcodeSolved ===
                                        true;

                                      const gfgSolved =
                                        platformProgress[
                                          questionId
                                        ]?.gfgSolved ===
                                        true;

                                      return (

                                        <div
                                          className="dsa-question-row"
                                          key={
                                            question.id
                                          }
                                        >

                                          {/* =================
                                              STATUS
                                          ================= */}

                                          <div className="dsa-status">

                                            <input
                                              type="checkbox"
                                              checked={
                                                questionSolved
                                              }
                                              readOnly
                                              disabled={
                                                questionLocked &&
                                                !questionSolved
                                              }
                                              onClick={(e) => {
                                                /*
                                                 * VERY IMPORTANT:
                                                 *
                                                 * User cannot manually
                                                 * mark solved.
                                                 */
                                                e.preventDefault();
                                                e.stopPropagation();
                                              }}
                                              title={
                                                questionSolved
                                                  ? "Verified solved ✓"
                                                  : questionLocked
                                                  ? "Pehle previous question solve karo"
                                                  : "LeetCode/GFG par solve karke verification complete karo"
                                              }
                                            />

                                          </div>

                                          {/* =================
                                              QUESTION
                                          ================= */}

                                          <div className="dsa-question-info">

                                            <span className="dsa-question-number">
                                              {index + 1}
                                            </span>

                                            <button
                                              type="button"
                                              className={`dsa-question-title ${
                                                questionLocked
                                                  ? "question-locked"
                                                  : ""
                                              }`}
                                              disabled={
                                                questionLocked
                                              }
                                              onClick={() => {
                                                if (
                                                  questionLocked
                                                ) {
                                                  return;
                                                }

                                                onOpenQuestion?.(
                                                  question.id
                                                );
                                              }}
                                              title={
                                                questionLocked
                                                  ? "Pehle previous question solve karo"
                                                  : question.title
                                              }
                                            >

                                              {questionLocked &&
                                                "🔒 "}

                                              {question.title}

                                            </button>

                                          </div>

                                          {/* =================
                                              COMPANIES
                                          ================= */}

                                          <div className="dsa-companies">

                                            {question.companies?.map(
                                              (company) => (

                                                <span
                                                  key={
                                                    company
                                                  }
                                                  className="company-icon"
                                                  title={
                                                    company
                                                  }
                                                >

                                                  {getCompanyIcon(
                                                    company
                                                  )}

                                                </span>

                                              )
                                            )}

                                          </div>

                                          {/* =================
                                              PLATFORM LINKS
                                          ================= */}

                                          <div className="dsa-platforms">

                                            {/* =================
                                                LEETCODE
                                            ================= */}

                                            {question.leetcodeUrl && (

                                              <a
                                                href={
                                                  questionLocked
                                                    ? undefined
                                                    : question.leetcodeUrl
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`platform-btn leetcode-btn ${
                                                  leetcodeSolved
                                                    ? "platform-solved"
                                                    : ""
                                                } ${
                                                  questionLocked
                                                    ? "platform-locked"
                                                    : ""
                                                }`}
                                                onClick={(e) =>
                                                  handleLeetCodeClick(
                                                    e,
                                                    pattern.id,
                                                    question.id
                                                  )
                                                }
                                                title={
                                                  questionLocked
                                                    ? "Pehle previous question solve karo"
                                                    : leetcodeSolved
                                                    ? "LeetCode Accepted ✓"
                                                    : "LeetCode par solve karo — wapas aane par automatically verify hoga"
                                                }
                                              >

                                                <SiLeetcode />

                                              </a>

                                            )}

                                            {/* =================
                                                GFG
                                            ================= */}

                                            {question.gfgUrl && (

                                              <a
                                                href={
                                                  questionLocked
                                                    ? undefined
                                                    : question.gfgUrl
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`platform-btn gfg-btn ${
                                                  gfgSolved
                                                    ? "platform-solved"
                                                    : ""
                                                } ${
                                                  questionLocked
                                                    ? "platform-locked"
                                                    : ""
                                                }`}
                                                onClick={(e) =>
                                                  handleGfgClick(
                                                    e,
                                                    pattern.id,
                                                    question.id
                                                  )
                                                }
                                                title={
                                                  questionLocked
                                                    ? "Pehle previous question solve karo"
                                                    : gfgSolved
                                                    ? "GeeksforGeeks solved ✓"
                                                    : "GeeksforGeeks"
                                                }
                                              >

                                                <SiGeeksforgeeks />

                                              </a>

                                            )}

                                            {/* =================
                                                VIDEO
                                            ================= */}

                                            {question.videoUrl && (

                                              <a
                                                href={
                                                  question.videoUrl
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="platform-btn video-btn"
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                                title="Video Solution"
                                              >

                                                <SiYoutube />

                                              </a>

                                            )}

                                          </div>

                                          {/* =================
                                              DIFFICULTY
                                          ================= */}

                                          <div
                                            className={`difficulty-badge ${String(
                                              question.difficulty
                                            ).toLowerCase()}`}
                                          >

                                            <span className="difficulty-dot"></span>

                                            <span>
                                              {
                                                question.difficulty
                                              }
                                            </span>

                                          </div>

                                          {/* =================
                                              BOOKMARK
                                          ================= */}

                                          <button
                                            type="button"
                                            className={`bookmark-btn ${
                                              bookmarkedIds.has(
                                                questionId
                                              )
                                                ? "bookmarked"
                                                : ""
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();

                                              toggleBookmark(
                                                questionId
                                              );
                                            }}
                                            aria-label={
                                              bookmarkedIds.has(
                                                questionId
                                              )
                                                ? "Remove bookmark"
                                                : "Bookmark question"
                                            }
                                          >

                                            {bookmarkedIds.has(
                                              questionId
                                            )
                                              ? "★"
                                              : "☆"}

                                          </button>

                                        </div>

                                      );
                                    }
                                  )

                                )}

                              </div>

                            )}

                          </div>
                        );
                      }
                    )}

                  </div>

                )}

              </div>
            );
          }
        )}

      </div>

      {/* =================================================
          NO SEARCH RESULTS
      ================================================= */}

      {hasSearch &&
        SECTIONS.every(
          (section) =>
            section.patterns.every(
              (pattern) =>
                filteredQuestions(
                  pattern.id
                ).length === 0
            )
        ) && (

          <div className="dsa-no-results">

            <div className="dsa-no-results-icon">
              🔍
            </div>

            <h3>
              No questions found
            </h3>

            <p>
              No question matches "
              <strong>
                {searchQuery}
              </strong>
              ".
            </p>

            <button
              type="button"
              onClick={() =>
                setSearchQuery("")
              }
            >
              Clear Search
            </button>

          </div>

        )}

    </div>
  );
}