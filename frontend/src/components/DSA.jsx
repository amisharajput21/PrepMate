import { useState } from "react";
import "./DSA.css";
import PhasePage from "./PhasePage";

function DSA({ onOpenArrays, onOpenStrings }) {

  const phases = [
    {
      phase: "PHASE 0",
      title: "DSA Fundamentals",
      description:
        "Start with the basic problem-solving patterns needed before interview-level DSA.",
      level: "Beginner",
      patterns: [
  {
    name: "Array Traversal",
    description: "Basic array traversal and element-based problems",
    questions: 5,
    difficulty: "Easy",
    available: false,
    questionList: [
      "Find the largest element in an array",
      "Find the smallest element in an array",
      "Calculate the sum of all array elements",
      "Count even and odd elements in an array",
      "Reverse an array"
    ]
  },

  {
    name: "Searching",
    description: "Basic searching and element-finding problems",
    questions: 5,
    difficulty: "Easy",
    available: false,
    questionList: [
      "Search an element using Linear Search",
      "Find the first occurrence of an element",
      "Find the last occurrence of an element",
      "Count occurrences of an element",
      "Check whether an element exists in an array"
    ]
  },

  {
    name: "Sorting",
    description: "Basic sorting problems using common sorting techniques",
    questions: 5,
    difficulty: "Easy",
    available: false,
    questionList: [
      "Sort an array using Bubble Sort",
      "Sort an array using Selection Sort",
      "Sort an array using Insertion Sort",
      "Sort an array in ascending order",
      "Check whether an array is sorted"
    ]
  }
]
    },

    {
      phase: "PHASE 1",
      title: "Arrays & Strings",
      description:
        "Practice the most important patterns used in array and string interview problems.",
      level: "Beginner",
      patterns: [
        {
          name: "Basic Array Problems",
          description: "Traversal, maximum, minimum and simple array operations",
          questions: 5,
          difficulty: "Easy",
          available: true,
          action: "arrays"
        },
        {
          name: "Frequency Counting",
          description: "Frequency maps and counting-based problems",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Hashing",
          description: "HashMap and HashSet based problem solving",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Two Pointers",
          description: "Problems using two moving pointers",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Sliding Window",
          description: "Fixed and variable size window problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Prefix Sum",
          description: "Cumulative sum and range-based problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Two Dimensional Arrays",
          description: "Matrix traversal and two-dimensional array problems",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "String Manipulation",
          description: "Common string-based interview problems",
          questions: 5,
          difficulty: "Easy–Medium",
          available: true,
          action: "strings"
        }
      ]
    },

    {
      phase: "PHASE 2",
      title: "Linked List, Stack & Queue",
      description:
        "Build strong fundamentals with commonly asked linear data structures.",
      level: "Intermediate",
      patterns: [
        {
          name: "Linked List Basics",
          description: "Basic linked list traversal and operations",
          questions: 5,
          difficulty: "Easy",
          available: false
        },
        {
          name: "Fast & Slow Pointer",
          description: "Use two pointers moving at different speeds",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Linked List Reversal",
          description: "Reverse and modify linked lists",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Doubly Linked List",
          description: "Problems using previous and next pointers",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Stack",
          description: "LIFO-based problem solving",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Monotonic Stack",
          description: "Next greater, next smaller and range problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Queue",
          description: "FIFO-based problem solving",
          questions: 5,
          difficulty: "Easy",
          available: false
        },
        {
          name: "Deque",
          description: "Double-ended queue problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        }
      ]
    },

    {
      phase: "PHASE 3",
      title: "Searching, Sorting & Heap",
      description:
        "Move to efficient searching, sorting and priority-based problem solving.",
      level: "Intermediate",
      patterns: [
        {
          name: "Binary Search",
          description: "Search efficiently in sorted data",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Binary Search Variations",
          description: "First, last, rotated and boundary-based searches",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Binary Search on Answer",
          description: "Search for the optimal answer using binary search",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Merge Sort",
          description: "Divide and conquer sorting problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Quick Sort",
          description: "Partition-based sorting problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Heap",
          description: "Heap-based ordering and selection problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Top K Elements",
          description: "Find top or bottom K elements efficiently",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Priority Queue",
          description: "Priority-based problem solving",
          questions: 5,
          difficulty: "Medium",
          available: false
        }
      ]
    },

    {
      phase: "PHASE 4",
      title: "Trees",
      description:
        "Practice tree traversal, recursion and binary search tree patterns.",
      level: "Advanced",
      patterns: [
        {
          name: "Binary Tree Basics",
          description: "Basic binary tree problems",
          questions: 5,
          difficulty: "Easy",
          available: false
        },
        {
          name: "Tree Traversal",
          description: "Preorder, inorder and postorder patterns",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Breadth First Search",
          description: "Level-order traversal using BFS",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Depth First Search",
          description: "DFS and recursive tree problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Binary Search Tree",
          description: "BST search, insertion and deletion problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Tree Height & Depth",
          description: "Height, depth and balanced tree problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Lowest Common Ancestor",
          description: "Find common ancestors in trees",
          questions: 5,
          difficulty: "Medium",
          available: false
        }
      ]
    },

    {
      phase: "PHASE 5",
      title: "Graphs",
      description:
        "Learn the major graph patterns used in technical interviews.",
      level: "Advanced",
      patterns: [
        {
          name: "Graph Basics",
          description: "Vertices, edges and graph traversal setup",
          questions: 5,
          difficulty: "Easy",
          available: false
        },
        {
          name: "Graph Representation",
          description: "Adjacency matrix and adjacency list problems",
          questions: 5,
          difficulty: "Easy–Medium",
          available: false
        },
        {
          name: "Breadth First Search (BFS)",
          description: "Graph traversal using BFS",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Depth First Search (DFS)",
          description: "Graph traversal using DFS",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Cycle Detection",
          description: "Detect cycles in directed and undirected graphs",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Connected Components",
          description: "Find connected regions in a graph",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Shortest Path",
          description: "Find minimum distance between vertices",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Dijkstra's Algorithm",
          description: "Shortest path with non-negative weights",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Topological Sort",
          description: "Ordering vertices in directed acyclic graphs",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Union Find / DSU",
          description: "Connectivity and component merging problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        }
      ]
    },

    {
      phase: "PHASE 6",
      title: "Advanced Problem Solving",
      description:
        "Practice advanced patterns commonly used in difficult interview problems.",
      level: "Advanced",
      patterns: [
        {
          name: "Greedy Algorithms",
          description: "Make locally optimal choices to solve problems",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "Backtracking",
          description: "Explore possible solutions using recursion",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Dynamic Programming Basics",
          description: "Solve overlapping subproblems efficiently",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "1D Dynamic Programming",
          description: "One-dimensional DP problem patterns",
          questions: 5,
          difficulty: "Medium",
          available: false
        },
        {
          name: "2D Dynamic Programming",
          description: "Two-dimensional DP problem patterns",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Knapsack Pattern",
          description: "Selection and optimization problems",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Subsequence Pattern",
          description: "Subsequence and sequence optimization problems",
          questions: 5,
          difficulty: "Medium–Hard",
          available: false
        },
        {
          name: "Bit Manipulation",
          description: "Solve problems using bitwise operations",
          questions: 5,
          difficulty: "Medium",
          available: false
        }
      ]
    }
  ];


  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState(null);


  if (selectedPhase) {
    return (
      <PhasePage
        phase={selectedPhase}
        onBack={() => setSelectedPhase(null)}
        onOpenPattern={(pattern) => {

          if (pattern.action === "arrays") {
            onOpenArrays();
          }

          if (pattern.action === "strings") {
            onOpenStrings();
          }

        }}
      />
    );
  }


  const visiblePhases = phases.filter((phase) => {

    if (selectedLevel === "All") {
      return true;
    }

    return phase.level === selectedLevel;

  });


  return (
    <div className="dsa-page">

      <header className="dsa-header">

        <div className="dsa-header-left">

          <button
            className="dsa-back-btn"
            onClick={() => window.history.back()}
          >
            ← Dashboard
          </button>

          <span className="dsa-label">
            PLACEMENT PREPARATION
          </span>

          <h1>
            Master DSA,<br />
            <span>one pattern at a time.</span>
          </h1>

          <p>
            Follow the roadmap in sequence and practice
            interview-focused DSA patterns step-by-step.
          </p>

        </div>


        <div className="dsa-progress-card">

          <div className="dsa-progress-top">

            <span>
              YOUR PROGRESS
            </span>

            <div className="dsa-progress-icon">
              🎯
            </div>

          </div>

          <strong>
            0%
          </strong>

          <p>
            Roadmap completed
          </p>

          <div className="dsa-mini-bar">
            <div style={{ width: "0%" }}></div>
          </div>

          <small>
            0 of 7 phases completed
          </small>

        </div>

      </header>


      <div className="dsa-toolbar">

        <div className="dsa-toolbar-title">

          <span>
            PRACTICE ROADMAP
          </span>

          <h2>
            DSA Roadmap
          </h2>

        </div>


        <div className="level-filter">

          {["All", "Beginner", "Intermediate", "Advanced"].map(
            (level) => (

              <button
                key={level}
                className={
                  selectedLevel === level
                    ? "active"
                    : ""
                }
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>

            )
          )}

        </div>

      </div>


      <div className="dsa-roadmap">

        {visiblePhases.map((phase, index) => (

          <section
            className="dsa-phase"
            key={phase.phase}
          >

            <div
              className="dsa-phase-header"
              onClick={() => setSelectedPhase(phase)}
              style={{ cursor: "pointer" }}
            >

              <div className="phase-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="dsa-phase-info">

  <span>
    {phase.phase}
  </span>

  <h2>
    {phase.title}
  </h2>

  <p>
    {phase.description}
  </p>

</div>

              <div
  className="dsa-phase-open"
  onClick={() => setSelectedPhase(phase)}
>
  View Practice Sheet →
</div>

            </div>

          </section>

        ))}

      </div>


      <div className="dsa-tip">

        <span>💡</span>

        <div>

          <strong>
            Practice in sequence
          </strong>

          <p>
            Complete patterns step-by-step instead of jumping
            randomly between topics.
          </p>

        </div>

      </div>

    </div>
  );
}

export default DSA;