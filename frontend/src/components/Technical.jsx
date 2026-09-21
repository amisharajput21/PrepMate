import { useState } from "react";
import "./Technical.css";

const subjects = [
  {
    id: "oops",
    number: "01",
    shortTitle: "OOPs",
    title: "Object Oriented Programming",
    topics: [
      {
        number: "01",
        title: "Classes & Objects",
        content: {
          definition:
            "A class is a blueprint that defines properties and behaviors, while an object is an instance of that class.",
          points: [
            "Class defines fields and methods.",
            "Object represents a real instance of a class.",
            "Objects are created using the new keyword.",
          ],
          example: `class Student {
    String name;

    void display() {
        System.out.println(name);
    }
}

Student s = new Student();
s.name = "Amisha";
s.display();`,
          questions: [
            "What is a class?",
            "What is an object?",
            "What is the difference between class and object?",
          ],
        },
      },
      {
        number: "02",
        title: "Constructors",
        content: {
          definition:
            "A constructor is a special method used to initialize an object. It has the same name as the class and has no return type.",
          points: [
            "Constructor name must be the same as class name.",
            "Constructor does not have a return type.",
            "It is automatically called when an object is created.",
            "Java supports constructor overloading.",
          ],
          example: `class Student {
    String name;

    Student(String name) {
        this.name = name;
    }
}

Student s = new Student("Amisha");`,
          questions: [
            "What is a constructor?",
            "Can a constructor be overloaded?",
            "What is the difference between constructor and method?",
          ],
        },
      },
      {
        number: "03",
        title: "Encapsulation",
        content: {
          definition:
            "Encapsulation means wrapping data and methods together in a class and restricting direct access to the data.",
          points: [
            "Data is usually kept private.",
            "Getters and setters provide controlled access.",
            "It improves data security and maintainability.",
          ],
          example: `class Student {
    private int age;

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}`,
          questions: [
            "What is encapsulation?",
            "Why are variables made private?",
            "How is encapsulation achieved in Java?",
          ],
        },
      },
      {
        number: "04",
        title: "Inheritance",
        content: {
          definition:
            "Inheritance allows one class to acquire the properties and methods of another class.",
          points: [
            "It promotes code reusability.",
            "The existing class is called the parent or superclass.",
            "The new class is called the child or subclass.",
            "Java supports inheritance using the extends keyword.",
          ],
          example: `class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}`,
          questions: [
            "What is inheritance?",
            "What are the types of inheritance?",
            "Why does Java not support multiple inheritance using classes?",
          ],
        },
      },
      {
        number: "05",
        title: "Polymorphism",
        content: {
          definition:
            "Polymorphism means one interface or method name can have different forms of behavior.",
          points: [
            "Compile-time polymorphism is achieved through method overloading.",
            "Runtime polymorphism is achieved through method overriding.",
            "It improves flexibility and reusability.",
          ],
          example: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}`,
          questions: [
            "What is polymorphism?",
            "What is compile-time polymorphism?",
            "What is runtime polymorphism?",
          ],
        },
      },
      {
        number: "06",
        title: "Abstraction",
        content: {
          definition:
            "Abstraction means hiding implementation details and showing only the essential functionality.",
          points: [
            "Abstract classes and interfaces are used to achieve abstraction.",
            "It reduces unnecessary implementation details.",
            "It focuses on what an object does rather than how it does it.",
          ],
          example: `abstract class Vehicle {
    abstract void start();

    void stop() {
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    void start() {
        System.out.println("Car started");
    }
}`,
          questions: [
            "What is abstraction?",
            "How can abstraction be achieved in Java?",
            "What is an abstract class?",
          ],
        },
      },
      {
        number: "07",
        title: "Interfaces",
        content: {
          definition:
            "An interface defines a contract that implementing classes must follow.",
          points: [
            "A class uses implements to implement an interface.",
            "A class can implement multiple interfaces.",
            "Interfaces are commonly used to achieve abstraction.",
          ],
          example: `interface Vehicle {
    void start();
}

class Car implements Vehicle {
    public void start() {
        System.out.println("Car started");
    }
}`,
          questions: [
            "What is an interface?",
            "Why are interfaces used?",
            "Can a class implement multiple interfaces?",
          ],
        },
      },
      {
        number: "08",
        title: "Overloading & Overriding",
        content: {
          definition:
            "Overloading means using the same method name with different parameters, while overriding means redefining a parent class method in a child class.",
          points: [
            "Overloading is compile-time polymorphism.",
            "Overriding is runtime polymorphism.",
            "Overloading requires different parameter lists.",
            "Overriding requires inheritance.",
          ],
          example: `// Overloading
void display(int x) { }
void display(String x) { }

// Overriding
class Parent {
    void show() { }
}

class Child extends Parent {
    @Override
    void show() { }
}`,
          questions: [
            "Difference between overloading and overriding?",
            "Can we overload a method by changing only return type?",
            "What is the @Override annotation?",
          ],
        },
      },
      {
        number: "09",
        title: "Access Modifiers",
        content: {
          definition:
            "Access modifiers control the visibility and accessibility of classes, methods and variables.",
          points: [
            "private — accessible only inside the same class.",
            "default — accessible within the same package.",
            "protected — accessible within package and subclasses.",
            "public — accessible from anywhere.",
          ],
          example: `class Student {
    private int age;
    public String name;
    protected int marks;
}`,
          questions: [
            "What are access modifiers?",
            "Which is the most restrictive access modifier?",
            "Difference between private and protected?",
          ],
        },
      },
      {
        number: "10",
        title: "Exception Handling",
        content: {
          definition:
            "Exception handling is used to handle runtime errors so that the normal flow of the program can continue.",
          points: [
            "try contains code that may cause an exception.",
            "catch handles the exception.",
            "finally generally executes whether an exception occurs or not.",
            "throw is used to explicitly throw an exception.",
            "throws declares exceptions that a method may throw.",
          ],
          example: `try {
    int result = 10 / 0;
}
catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}
finally {
    System.out.println("Done");
}`,
          questions: [
            "What is an exception?",
            "Difference between throw and throws?",
            "What is the purpose of finally?",
          ],
        },
      },
    ],
  },

  {
    id: "dbms",
    number: "02",
    shortTitle: "DBMS",
    title: "DBMS & SQL",
    topics: [
      "DBMS Fundamentals",
      "Keys & Constraints",
      "ER Model",
      "Normalization",
      "SQL Fundamentals",
      "Joins",
      "Subqueries",
      "Transactions",
      "Indexing",
      "Concurrency Control",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is an important DBMS concept commonly asked in technical interviews.`,
        points: [
          "Understand the basic definition and purpose.",
          "Learn the important rules and concepts.",
          "Practice common interview-based questions.",
        ],
        example: "Detailed examples and SQL practice will be added here.",
        questions: [
          `What is ${title}?`,
          `Why is ${title} important?`,
          `Explain ${title} with an example.`,
        ],
      },
    })),
  },

  {
    id: "os",
    number: "03",
    shortTitle: "OS",
    title: "Operating System",
    topics: [
      "OS Fundamentals",
      "Processes",
      "Threads",
      "CPU Scheduling",
      "Synchronization",
      "Deadlocks",
      "Memory Management",
      "File Systems",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is a core Operating System concept important for placement interviews.`,
        points: [
          "Understand the basic concept.",
          "Learn important terminology.",
          "Practice common technical interview questions.",
        ],
        example: "Example and detailed explanation will be provided in this section.",
        questions: [
          `What is ${title}?`,
          `Explain ${title}.`,
          `What are the important points related to ${title}?`,
        ],
      },
    })),
  },

  {
    id: "cn",
    number: "04",
    shortTitle: "Networks",
    title: "Computer Networks",
    topics: [
      "Network Fundamentals",
      "OSI Model",
      "TCP/IP Model",
      "TCP & UDP",
      "IP Addressing",
      "HTTP & HTTPS",
      "DNS",
      "Network Devices",
      "Network Security Basics",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is a fundamental Computer Networks concept used in technical interviews.`,
        points: [
          "Understand the concept and its purpose.",
          "Learn important protocols and terminology.",
          "Practice interview-oriented questions.",
        ],
        example: "Example and practical explanation will be added here.",
        questions: [
          `What is ${title}?`,
          `How does ${title} work?`,
          `Why is ${title} important?`,
        ],
      },
    })),
  },

  {
    id: "web",
    number: "05",
    shortTitle: "Web",
    title: "Web Development",
    topics: [
      "HTML Fundamentals",
      "CSS Fundamentals",
      "JavaScript Basics",
      "DOM & Events",
      "HTTP & HTTPS",
      "REST APIs",
      "Cookies & Sessions",
      "Authentication",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is an important Web Development concept for placement preparation.`,
        points: [
          "Understand the basic concept.",
          "Learn how it works in real applications.",
          "Prepare common interview questions.",
        ],
        example: "Example and practical implementation will be added here.",
        questions: [
          `What is ${title}?`,
          `Why is ${title} used?`,
          `Explain ${title} with an example.`,
        ],
      },
    })),
  },

  {
    id: "se",
    number: "06",
    shortTitle: "SE",
    title: "Software Engineering",
    topics: [
      "Software Engineering Basics",
      "SDLC",
      "Waterfall Model",
      "Agile Methodology",
      "Requirements Engineering",
      "Software Testing",
      "Maintenance",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is a Software Engineering concept frequently discussed in placement interviews.`,
        points: [
          "Understand its purpose.",
          "Know its important characteristics.",
          "Prepare interview-oriented questions.",
        ],
        example: "Example will be added in the detailed preparation content.",
        questions: [
          `What is ${title}?`,
          `Explain ${title}.`,
          `What are its important points?`,
        ],
      },
    })),
  },

  {
    id: "git",
    number: "07",
    shortTitle: "Git",
    title: "Git & GitHub",
    topics: [
      "Git Fundamentals",
      "Basic Git Commands",
      "Branches",
      "Merge & Rebase",
      "GitHub",
      "Pull Requests",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is an important Git/GitHub concept for software development and interviews.`,
        points: [
          "Understand the purpose of the concept.",
          "Learn the commonly used commands or workflow.",
          "Practice real development scenarios.",
        ],
        example: "Practical Git example will be added here.",
        questions: [
          `What is ${title}?`,
          `Why is ${title} used?`,
          `Explain ${title} with an example.`,
        ],
      },
    })),
  },

  {
    id: "ca",
    number: "08",
    shortTitle: "Architecture",
    title: "Computer Architecture",
    topics: [
      "Computer Fundamentals",
      "CPU",
      "Registers",
      "Memory Hierarchy",
      "Cache Memory",
      "I/O Organization",
      "Instruction Cycle",
    ].map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title,
      content: {
        definition: `${title} is a core Computer Architecture concept.`,
        points: [
          "Understand the basic working.",
          "Learn important components and terminology.",
          "Prepare common interview questions.",
        ],
        example: "Detailed example will be added here.",
        questions: [
          `What is ${title}?`,
          `Explain ${title}.`,
          `Why is ${title} important?`,
        ],
      },
    })),
  },
];

function Technical({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedTopic, setSelectedTopic] = useState(subjects[0].topics[0]);

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(subject.topics[0]);
  };

  return (
    <div className="technical-page">

      <button
        className="technical-back-btn"
        onClick={onBack}
      >
        ← Dashboard
      </button>

      <main className="technical-main">

  {/* SUBJECTS TOP BAR */}

  <section className="technical-subjects">

    <div className="technical-sidebar-title">
      <span>SUBJECTS</span>
      <small>08 TOTAL</small>
    </div>

    <div className="technical-subject-list">

      {subjects.map((subject) => (
        <button
          key={subject.id}
          className={
            selectedSubject.id === subject.id
              ? "technical-subject active"
              : "technical-subject"
          }
          onClick={() => handleSubjectChange(subject)}
        >

          <span className="technical-subject-number">
            {subject.number}
          </span>

          <span className="technical-subject-name">
            {subject.shortTitle}
          </span>

        </button>
      ))}

    </div>

  </section>


  {/* TOPICS + CONTENT */}

  <section className="technical-study-area">

    {/* TOPICS */}

    <aside className="technical-topic-sidebar">

      <div className="technical-topic-heading">
        <span>{selectedSubject.shortTitle}</span>
        <small>{selectedSubject.topics.length} TOPICS</small>
      </div>

      <div className="technical-topic-list">

        {selectedSubject.topics.map((topic) => (
          <button
            key={topic.number}
            className={
              selectedTopic.number === topic.number
                ? "technical-topic active"
                : "technical-topic"
            }
            onClick={() => setSelectedTopic(topic)}
          >

            <span>{topic.number}</span>

            <strong>{topic.title}</strong>

            <b>→</b>

          </button>
        ))}

      </div>

    </aside>


    {/* CONTENT */}

    <section className="technical-content">

      <div className="technical-content-top">

        <span>
          {selectedSubject.number} · {selectedSubject.shortTitle}
        </span>

        <small>
          TOPIC {selectedTopic.number}
        </small>

      </div>

      <h1>
        {selectedTopic.title}
      </h1>

      <div className="technical-content-section">

        <h2>Concept</h2>

        <p>
          {selectedTopic.content.definition}
        </p>

      </div>

      <div className="technical-content-section">

        <h2>Important Points</h2>

        <ul>
          {selectedTopic.content.points.map((point, index) => (
            <li key={index}>
              {point}
            </li>
          ))}
        </ul>

      </div>

      <div className="technical-content-section">

        <h2>Example</h2>

        <pre>
          <code>
            {selectedTopic.content.example}
          </code>
        </pre>

      </div>

      <div className="technical-content-section interview-section">

        <h2>Interview Questions</h2>

        {selectedTopic.content.questions.map((question, index) => (
          <div
            className="interview-question"
            key={index}
          >
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <p>{question}</p>
          </div>
        ))}

      </div>

    </section>

  </section>

</main>
    </div>
  );
}

export default Technical;