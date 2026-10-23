import { useState } from "react";
import "./Technical.css";

const subjects = [
  {
    id: "oops",
    number: "01",
    shortTitle: "OOPs",
    title: "Object Oriented Programming",
    categories: [
      {
        id: "getting-started",
        title: "Getting Started",
        topics: [
          {
            id: "foundations",
            number: "01",
            title: "Foundations: Why OOP Exists",
            subtitle:
              "Why object-oriented programming exists and what problem it actually solves.",
            content: {
              learn: [
                "Understand why large procedural programs become difficult to maintain.",
                "Understand how objects combine state and behaviour.",
                "Differentiate between a class and an object.",
                "Understand the purpose of the four pillars of OOP.",
              ],
              sections: [
                {
                  title: "1.1 The mess OOP was designed to fix",
                  paragraphs: [
                    "In procedural programming, a program is mainly organized around functions and the data those functions operate on.",
                    "This works very well for small programs. But as the application grows, the same data may be accessed and modified by many different functions.",
                    "For example, imagine a banking application where account details are stored separately and many functions can directly modify the balance. As the number of features increases, it becomes harder to know which part of the program is responsible for changing the data.",
                  ],
                  points: [
                    "Data can be modified from many places.",
                    "Business rules can become duplicated.",
                    "Changing one feature may break another feature.",
                    "Large programs become harder to understand and maintain.",
                  ],
                  code: `class BankAccount {
    String accountNumber;
    double balance;

    void deposit(double amount) {
        balance += amount;
    }

    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        }
    }
}`,
                  callout: {
                    type: "think",
                    title: "Think",
                    text: "If every part of an application can directly modify an account balance, how can we guarantee that invalid changes never happen?",
                  },
                },
                {
                  title: "1.2 Thinking in objects",
                  paragraphs: [
                    "Object-oriented programming solves this problem by grouping related data and behaviour together.",
                    "A bank account has data such as account number and balance. It also has behaviours such as deposit and withdraw.",
                    "Instead of keeping these things separate, OOP models them as one object.",
                  ],
                  points: [
                    "State represents what an object knows.",
                    "Behaviour represents what an object can do.",
                    "Objects communicate with each other to perform work.",
                  ],
                  code: `BankAccount account = new BankAccount();

account.deposit(5000);
account.withdraw(1000);`,
                  callout: {
                    type: "predict",
                    title: "Predict",
                    text: "After depositing 5000 and withdrawing 1000, what should the account balance represent?",
                  },
                },
                {
                  title: "1.3 Class vs Object",
                  paragraphs: [
                    "A class is a blueprint or template that defines what an object will contain and what it can do.",
                    "An object is an actual instance created from that class.",
                  ],
                  comparison: [
                    {
                      concept: "Class",
                      meaning: "Blueprint or template",
                      example: "BankAccount",
                    },
                    {
                      concept: "Object",
                      meaning: "Actual instance of a class",
                      example: "myAccount",
                    },
                  ],
                  code: `class Student {
    String name;
    int age;
}

Student s1 = new Student();
Student s2 = new Student();`,
                },
                {
                  title: "1.4 The four pillars of OOP",
                  paragraphs: [
                    "The four major concepts of object-oriented programming are Encapsulation, Abstraction, Inheritance and Polymorphism.",
                    "Each concept solves a different design problem.",
                  ],
                  pillars: [
                    {
                      title: "Encapsulation",
                      text: "Keeping data and the methods that operate on that data together, while controlling direct access.",
                    },
                    {
                      title: "Abstraction",
                      text: "Showing only the necessary details and hiding unnecessary implementation details.",
                    },
                    {
                      title: "Inheritance",
                      text: "Allowing a new class to reuse and extend the properties and behaviour of an existing class.",
                    },
                    {
                      title: "Polymorphism",
                      text: "Allowing the same interface or method call to behave differently for different objects.",
                    },
                  ],
                },
              ],
              misconceptions: [
                {
                  wrong: "A class and an object are the same thing.",
                  correct: "A class is a blueprint; an object is an instance created from that blueprint.",
                },
                {
                  wrong: "OOP is only about creating classes.",
                  correct:
                    "OOP is about designing software around objects, their responsibilities and their relationships.",
                },
                {
                  wrong: "Inheritance is always the best way to reuse code.",
                  correct:
                    "Inheritance should be used when there is a genuine is-a relationship. Composition is often better for flexibility.",
                },
              ],
              interviewQuestions: [
                {
                  question: "What is OOP?",
                  answer:
                    "OOP is a programming paradigm that organizes software around objects containing data and behaviour.",
                },
                {
                  question: "What is a class?",
                  answer:
                    "A class is a blueprint that defines the properties and behaviours of objects.",
                },
                {
                  question: "What is an object?",
                  answer:
                    "An object is a runtime instance of a class.",
                },
                {
                  question: "Why do we use OOP?",
                  answer:
                    "OOP helps us organize large programs, improve maintainability, control data access and model real-world entities.",
                },
                {
                  question: "What are the four pillars of OOP?",
                  answer:
                    "Encapsulation, Abstraction, Inheritance and Polymorphism.",
                },
              ],
              recap: [
                {
                  concept: "Class",
                  summary: "Blueprint used to create objects.",
                },
                {
                  concept: "Object",
                  summary: "Actual instance of a class.",
                },
                {
                  concept: "Encapsulation",
                  summary: "Protect and control access to data.",
                },
                {
                  concept: "Abstraction",
                  summary: "Hide unnecessary implementation details.",
                },
                {
                  concept: "Inheritance",
                  summary: "Reuse and extend existing class behaviour.",
                },
                {
                  concept: "Polymorphism",
                  summary: "Same interface, different behaviour.",
                },
              ],
              remember: [
                "OOP combines data and behaviour into objects.",
                "A class is a blueprint; an object is its instance.",
                "Encapsulation controls access to data.",
                "Abstraction hides unnecessary implementation details.",
                "The four pillars are Encapsulation, Abstraction, Inheritance and Polymorphism.",
              ],
            },
          },
          {
            id: "classes-objects",
            number: "02",
            title: "Classes & Objects",
            subtitle:
              "Learn how classes define objects and how objects behave at runtime.",
            content: {
              learn: [
                "Understand class structure.",
                "Create objects using new.",
                "Access fields and methods.",
                "Understand object references.",
              ],
              sections: [
                {
                  title: "2.1 Creating a class",
                  paragraphs: [
                    "A class contains fields that represent state and methods that represent behaviour.",
                  ],
                  code: `class Student {
    String name;
    int age;

    void display() {
        System.out.println(name + " " + age);
    }
}`,
                },
                {
                  title: "2.2 Creating an object",
                  paragraphs: [
                    "Objects are created using the new keyword. Each object gets its own instance state.",
                  ],
                  code: `Student s1 = new Student();

s1.name = "Amisha";
s1.age = 21;

s1.display();`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is the difference between class and object?",
                  answer:
                    "A class is a blueprint, while an object is a real instance of that class.",
                },
              ],
              recap: [
                {
                  concept: "Class",
                  summary: "Defines structure and behaviour.",
                },
                {
                  concept: "Object",
                  summary: "Runtime instance of a class.",
                },
              ],
              remember: [
                "Use class to define a blueprint.",
                "Use new to create an object.",
              ],
            },
          },
        ],
      },
      {
        id: "four-pillars",
        title: "The Four Pillars",
        topics: [
          {
            id: "encapsulation-abstraction",
            number: "03",
            title: "Encapsulation & Abstraction",
            subtitle:
              "Understand how OOP protects data and hides unnecessary implementation details.",
            content: {
              learn: [
                "Understand encapsulation.",
                "Understand abstraction.",
                "Differentiate encapsulation and abstraction.",
              ],
              sections: [
                {
                  title: "3.1 Encapsulation",
                  paragraphs: [
                    "Encapsulation means wrapping data and the methods that operate on it inside a class and controlling access to that data.",
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
                {
                  title: "3.2 Abstraction",
                  paragraphs: [
                    "Abstraction means exposing what an object can do while hiding how it internally performs that work.",
                  ],
                  code: `interface Payment {
    void pay(double amount);
}

class UPI implements Payment {
    public void pay(double amount) {
        System.out.println("Payment successful");
    }
}`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "Difference between encapsulation and abstraction?",
                  answer:
                    "Encapsulation focuses on protecting and controlling access to data, while abstraction focuses on hiding implementation complexity.",
                },
              ],
              recap: [
                {
                  concept: "Encapsulation",
                  summary: "Protects and controls access to data.",
                },
                {
                  concept: "Abstraction",
                  summary: "Hides unnecessary implementation details.",
                },
              ],
              remember: [
                "private fields help achieve encapsulation.",
                "Interfaces and abstract classes are commonly used for abstraction.",
              ],
            },
          },
          {
            id: "inheritance",
            number: "04",
            title: "Inheritance",
            subtitle:
              "Learn how classes can reuse and extend behaviour from other classes.",
            content: {
              learn: [
                "Understand parent and child classes.",
                "Use extends in Java.",
                "Understand method overriding.",
              ],
              sections: [
                {
                  title: "4.1 What is inheritance?",
                  paragraphs: [
                    "Inheritance allows one class to acquire properties and methods of another class.",
                  ],
                  code: `class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}

Dog d = new Dog();
d.eat();
d.bark();`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is inheritance?",
                  answer:
                    "Inheritance is a mechanism where a child class acquires properties and behaviours of a parent class.",
                },
              ],
              recap: [
                {
                  concept: "extends",
                  summary: "Used to inherit from a class in Java.",
                },
              ],
              remember: [
                "Inheritance represents an is-a relationship.",
                "Java classes use extends for class inheritance.",
              ],
            },
          },
          {
            id: "polymorphism",
            number: "05",
            title: "Polymorphism",
            subtitle:
              "Understand how the same method call can produce different behaviour.",
            content: {
              learn: [
                "Understand compile-time polymorphism.",
                "Understand runtime polymorphism.",
                "Differentiate overloading and overriding.",
              ],
              sections: [
                {
                  title: "5.1 Method overloading",
                  paragraphs: [
                    "Method overloading means having multiple methods with the same name but different parameter lists.",
                  ],
                  code: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}`,
                },
                {
                  title: "5.2 Method overriding",
                  paragraphs: [
                    "Method overriding occurs when a child class provides its own implementation of a parent class method.",
                  ],
                  code: `class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is polymorphism?",
                  answer:
                    "Polymorphism allows the same method or interface to represent different behaviours.",
                },
              ],
              recap: [
                {
                  concept: "Overloading",
                  summary: "Compile-time polymorphism.",
                },
                {
                  concept: "Overriding",
                  summary: "Runtime polymorphism.",
                },
              ],
              remember: [
                "Overloading changes parameters.",
                "Overriding changes implementation in the child class.",
              ],
            },
          },
        ],
      },
      {
        id: "designing-with-objects",
        title: "Designing With Objects",
        topics: [
          {
            id: "relationships",
            number: "06",
            title: "Relationships: Association, Aggregation & Composition",
            subtitle:
              "Understand how objects communicate and depend on each other.",
            content: {
              learn: [
                "Understand association.",
                "Understand aggregation.",
                "Understand composition.",
              ],
              sections: [
                {
                  title: "6.1 Object relationships",
                  paragraphs: [
                    "Objects rarely work alone. They interact with other objects through different types of relationships.",
                  ],
                  comparison: [
                    {
                      concept: "Association",
                      meaning: "General relationship between two objects.",
                      example: "Teacher teaches Student",
                    },
                    {
                      concept: "Aggregation",
                      meaning: "Weak has-a relationship.",
                      example: "Department has Teachers",
                    },
                    {
                      concept: "Composition",
                      meaning: "Strong has-a relationship.",
                      example: "House has Rooms",
                    },
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is composition?",
                  answer:
                    "Composition is a strong has-a relationship where the contained object's lifecycle is strongly tied to the container.",
                },
              ],
              recap: [
                {
                  concept: "Association",
                  summary: "General object relationship.",
                },
                {
                  concept: "Aggregation",
                  summary: "Weak has-a relationship.",
                },
                {
                  concept: "Composition",
                  summary: "Strong has-a relationship.",
                },
              ],
              remember: [
                "Think of relationships in terms of how strongly objects depend on each other.",
              ],
            },
          },
          {
            id: "solid",
            number: "07",
            title: "SOLID Principles",
            subtitle:
              "Learn the five principles that help create maintainable object-oriented code.",
            content: {
              learn: [
                "Understand all five SOLID principles.",
                "Know why SOLID matters in interviews.",
              ],
              sections: [
                {
                  title: "7.1 The five principles",
                  paragraphs: [
                    "SOLID is a collection of design principles used to make object-oriented software easier to maintain, extend and test.",
                  ],
                  pillars: [
                    {
                      title: "S — Single Responsibility",
                      text: "A class should have one primary responsibility.",
                    },
                    {
                      title: "O — Open/Closed",
                      text: "Software should be open for extension but closed for modification.",
                    },
                    {
                      title: "L — Liskov Substitution",
                      text: "Child objects should be usable wherever the parent is expected.",
                    },
                    {
                      title: "I — Interface Segregation",
                      text: "Prefer small focused interfaces instead of large interfaces.",
                    },
                    {
                      title: "D — Dependency Inversion",
                      text: "Depend on abstractions rather than concrete implementations.",
                    },
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is SOLID?",
                  answer:
                    "SOLID is a set of five object-oriented design principles that improve maintainability and flexibility.",
                },
              ],
              recap: [
                {
                  concept: "S",
                  summary: "Single Responsibility",
                },
                {
                  concept: "O",
                  summary: "Open/Closed",
                },
                {
                  concept: "L",
                  summary: "Liskov Substitution",
                },
                {
                  concept: "I",
                  summary: "Interface Segregation",
                },
                {
                  concept: "D",
                  summary: "Dependency Inversion",
                },
              ],
              remember: [
                "SOLID helps us design code that is easier to change and maintain.",
              ],
            },
          },
          {
            id: "design-patterns",
            number: "08",
            title: "Design Patterns",
            subtitle:
              "Learn common reusable solutions to recurring software design problems.",
            content: {
              learn: [
                "Understand what a design pattern is.",
                "Know common patterns asked in interviews.",
              ],
              sections: [
                {
                  title: "8.1 Common design patterns",
                  paragraphs: [
                    "A design pattern is a reusable design idea for solving a recurring software design problem.",
                  ],
                  pillars: [
                    {
                      title: "Singleton",
                      text: "Restricts a class to a single shared instance.",
                    },
                    {
                      title: "Factory",
                      text: "Moves object creation logic into a dedicated component.",
                    },
                    {
                      title: "Observer",
                      text: "Allows objects to be notified when another object's state changes.",
                    },
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is a design pattern?",
                  answer:
                    "A design pattern is a reusable solution template for a commonly occurring software design problem.",
                },
              ],
              recap: [
                {
                  concept: "Pattern",
                  summary: "Reusable design solution.",
                },
              ],
              remember: [
                "Design patterns are ideas, not ready-made code.",
              ],
            },
          },
        ],
      },
      {
        id: "interview-prep",
        title: "Interview Prep",
        topics: [
          {
            id: "interview-capstone",
            number: "09",
            title: "Interview Capstone",
            subtitle:
              "Revise the most important OOP concepts through interview-focused questions.",
            content: {
              learn: [
                "Revise the four pillars.",
                "Practice common Java OOP questions.",
                "Connect concepts with real-world examples.",
              ],
              sections: [
                {
                  title: "9.1 Most important interview areas",
                  paragraphs: [
                    "For placements, focus on explaining OOP concepts in simple language and support your answers with Java examples.",
                  ],
                  points: [
                    "Class vs Object",
                    "Encapsulation vs Abstraction",
                    "Inheritance",
                    "Overloading vs Overriding",
                    "Runtime polymorphism",
                    "Interface vs Abstract class",
                    "Composition vs Inheritance",
                    "SOLID principles",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "Explain OOP in simple words.",
                  answer:
                    "OOP is a way of designing programs using objects that combine data and behaviour.",
                },
                {
                  question: "What are the four pillars?",
                  answer:
                    "Encapsulation, Abstraction, Inheritance and Polymorphism.",
                },
                {
                  question: "Overloading vs overriding?",
                  answer:
                    "Overloading uses the same method name with different parameters, while overriding provides a new implementation in a child class.",
                },
              ],
              recap: [
                {
                  concept: "OOP",
                  summary: "Organize software around objects.",
                },
                {
                  concept: "Four Pillars",
                  summary:
                    "Encapsulation, Abstraction, Inheritance, Polymorphism.",
                },
              ],
              remember: [
                "Always explain OOP with a simple real-world example.",
                "Know the difference between overloading and overriding.",
                "Be ready with Java examples.",
              ],
            },
          },
        ],
      },
    ],
  },

  {
    id: "dbms",
    number: "02",
    shortTitle: "DBMS",
    title: "Database Management System",
    categories: [
      {
        id: "db-foundations",
        title: "Foundations",
        topics: [
          {
            id: "dbms-basics",
            number: "01",
            title: "DBMS Fundamentals",
            subtitle: "Understand databases, DBMS and relational databases.",
            content: {
              learn: [
                "Understand database and DBMS.",
                "Understand tables, rows and columns.",
              ],
              sections: [
                {
                  title: "1.1 What is DBMS?",
                  paragraphs: [
                    "A DBMS is software used to store, organize, retrieve and manage data efficiently.",
                  ],
                  points: [
                    "Data storage",
                    "Data retrieval",
                    "Security",
                    "Concurrency",
                    "Backup and recovery",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is DBMS?",
                  answer:
                    "DBMS is software that allows users to create, store, manage and retrieve data from databases.",
                },
              ],
              recap: [],
              remember: [],
            },
          },
          {
            id: "keys",
            number: "02",
            title: "Keys & Constraints",
            subtitle: "Learn primary keys, foreign keys and constraints.",
            content: {
              learn: ["Understand different types of keys."],
              sections: [
                {
                  title: "2.1 Database keys",
                  paragraphs: [
                    "Keys help uniquely identify records and establish relationships between tables.",
                  ],
                  points: [
                    "Primary Key",
                    "Foreign Key",
                    "Candidate Key",
                    "Super Key",
                    "Unique Key",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "sql",
        title: "SQL",
        topics: [
          {
            id: "sql-basics",
            number: "03",
            title: "SQL Fundamentals",
            subtitle: "Learn SELECT, INSERT, UPDATE and DELETE.",
            content: {
              learn: ["Write basic SQL queries."],
              sections: [
                {
                  title: "3.1 CRUD operations",
                  paragraphs: [
                    "SQL provides commands to create, read, update and delete database records.",
                  ],
                  code: `SELECT * FROM students;

INSERT INTO students VALUES (1, 'Amisha');

UPDATE students
SET name = 'Amisha'
WHERE id = 1;

DELETE FROM students
WHERE id = 1;`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "db-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "db-interview",
            number: "04",
            title: "DBMS Interview Questions",
            subtitle: "Important DBMS questions for placements.",
            content: {
              learn: ["Revise frequently asked DBMS concepts."],
              sections: [
                {
                  title: "4.1 Important topics",
                  paragraphs: [
                    "Focus on normalization, joins, transactions, ACID properties, indexing and SQL queries.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is normalization?",
                  answer:
                    "Normalization is the process of organizing data to reduce redundancy and improve data integrity.",
                },
              ],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },

  {
    id: "os",
    number: "03",
    shortTitle: "OS",
    title: "Operating Systems",
    categories: [
      {
        id: "os-foundations",
        title: "Foundations",
        topics: [
          {
            id: "os-basics",
            number: "01",
            title: "Operating System Fundamentals",
            subtitle: "Understand what an operating system does.",
            content: {
              learn: [
                "Understand the role of an OS.",
                "Learn about process and memory management.",
              ],
              sections: [
                {
                  title: "1.1 What is an Operating System?",
                  paragraphs: [
                    "An operating system acts as an interface between users, applications and computer hardware.",
                  ],
                  points: [
                    "Process management",
                    "Memory management",
                    "File management",
                    "Device management",
                    "Security",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is an operating system?",
                  answer:
                    "An operating system is system software that manages hardware resources and provides services to applications.",
                },
              ],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "process",
        title: "Processes & Threads",
        topics: [
          {
            id: "process-thread",
            number: "02",
            title: "Process vs Thread",
            subtitle: "Understand processes, threads and multitasking.",
            content: {
              learn: ["Differentiate process and thread."],
              sections: [
                {
                  title: "2.1 Process and Thread",
                  paragraphs: [
                    "A process is an independent program in execution, while a thread is a smaller unit of execution within a process.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "os-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "os-interview",
            number: "03",
            title: "OS Interview Questions",
            subtitle: "Important operating system interview concepts.",
            content: {
              learn: ["Revise important OS concepts."],
              sections: [
                {
                  title: "3.1 Important topics",
                  paragraphs: [
                    "Focus on process scheduling, deadlock, synchronization, paging and virtual memory.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },

  {
    id: "cn",
    number: "04",
    shortTitle: "CN",
    title: "Computer Networks",
    categories: [
      {
        id: "cn-foundations",
        title: "Foundations",
        topics: [
          {
            id: "network-basics",
            number: "01",
            title: "Networking Fundamentals",
            subtitle: "Understand how computers communicate over networks.",
            content: {
              learn: [
                "Understand computer networks.",
                "Learn basic networking components.",
              ],
              sections: [
                {
                  title: "1.1 What is a computer network?",
                  paragraphs: [
                    "A computer network connects devices so they can communicate and share resources.",
                  ],
                  points: [
                    "LAN",
                    "MAN",
                    "WAN",
                    "Internet",
                    "Router",
                    "Switch",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [
                {
                  question: "What is a computer network?",
                  answer:
                    "A computer network is a collection of connected devices that communicate and share resources.",
                },
              ],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "models",
        title: "Models & Protocols",
        topics: [
          {
            id: "osi-model",
            number: "02",
            title: "OSI & TCP/IP Models",
            subtitle: "Understand network layers and protocols.",
            content: {
              learn: ["Understand OSI layers and TCP/IP."],
              sections: [
                {
                  title: "2.1 OSI Model",
                  paragraphs: [
                    "The OSI model divides network communication into seven conceptual layers.",
                  ],
                  points: [
                    "Physical",
                    "Data Link",
                    "Network",
                    "Transport",
                    "Session",
                    "Presentation",
                    "Application",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "cn-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "cn-interview",
            number: "03",
            title: "CN Interview Questions",
            subtitle: "Prepare common networking interview questions.",
            content: {
              learn: ["Revise important CN topics."],
              sections: [
                {
                  title: "3.1 Important topics",
                  paragraphs: [
                    "Focus on TCP vs UDP, HTTP vs HTTPS, DNS, IP addresses and routing.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },

  {
    id: "web",
    number: "05",
    shortTitle: "Web",
    title: "Web Development",
    categories: [
      {
        id: "web-foundations",
        title: "Foundations",
        topics: [
          {
            id: "web-basics",
            number: "01",
            title: "How the Web Works",
            subtitle: "Understand browsers, servers, requests and responses.",
            content: {
              learn: [
                "Understand client-server architecture.",
                "Understand HTTP requests and responses.",
              ],
              sections: [
                {
                  title: "1.1 Client and Server",
                  paragraphs: [
                    "A browser acts as a client that sends requests to a server. The server processes the request and sends a response.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "html-css-js",
        title: "HTML · CSS · JavaScript",
        topics: [
          {
            id: "frontend-basics",
            number: "02",
            title: "Frontend Fundamentals",
            subtitle: "Understand the three core technologies of the web.",
            content: {
              learn: [
                "Understand HTML.",
                "Understand CSS.",
                "Understand JavaScript.",
              ],
              sections: [
                {
                  title: "2.1 Three building blocks",
                  paragraphs: [
                    "HTML provides structure, CSS controls presentation, and JavaScript adds behaviour and interactivity.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "web-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "web-interview",
            number: "03",
            title: "Web Interview Questions",
            subtitle: "Common questions for web development interviews.",
            content: {
              learn: ["Revise important web concepts."],
              sections: [
                {
                  title: "3.1 Important topics",
                  paragraphs: [
                    "Focus on HTTP, REST APIs, browser storage, DOM, JavaScript and React fundamentals.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },

  {
    id: "se",
    number: "06",
    shortTitle: "SE",
    title: "Software Engineering",
    categories: [
      {
        id: "se-foundations",
        title: "Foundations",
        topics: [
          {
            id: "sdlc",
            number: "01",
            title: "SDLC",
            subtitle: "Understand the software development life cycle.",
            content: {
              learn: ["Understand different SDLC phases."],
              sections: [
                {
                  title: "1.1 SDLC phases",
                  paragraphs: [
                    "SDLC provides a structured process for planning, developing, testing and maintaining software.",
                  ],
                  points: [
                    "Requirement Analysis",
                    "Design",
                    "Implementation",
                    "Testing",
                    "Deployment",
                    "Maintenance",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "agile",
        title: "Agile & Testing",
        topics: [
          {
            id: "agile",
            number: "02",
            title: "Agile Methodology",
            subtitle: "Understand Agile, Scrum and iterative development.",
            content: {
              learn: ["Understand Agile principles."],
              sections: [
                {
                  title: "2.1 Agile",
                  paragraphs: [
                    "Agile is an iterative development approach that focuses on delivering software incrementally and responding to change.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "se-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "se-interview",
            number: "03",
            title: "Software Engineering Interview",
            subtitle: "Important software engineering interview topics.",
            content: {
              learn: ["Revise SDLC, Agile and testing concepts."],
              sections: [
                {
                  title: "3.1 Important topics",
                  paragraphs: [
                    "Focus on SDLC models, Agile, Scrum, testing levels and software maintenance.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },

  {
    id: "git",
    number: "07",
    shortTitle: "Git",
    title: "Git & GitHub",
    categories: [
      {
        id: "git-foundations",
        title: "Foundations",
        topics: [
          {
            id: "git-basics",
            number: "01",
            title: "Git Fundamentals",
            subtitle: "Understand version control and basic Git commands.",
            content: {
              learn: [
                "Understand version control.",
                "Learn basic Git commands.",
              ],
              sections: [
                {
                  title: "1.1 Basic commands",
                  paragraphs: [
                    "Git is a distributed version control system used to track changes in source code.",
                  ],
                  code: `git init
git add .
git commit -m "Initial commit"
git status
git log`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "git-branching",
        title: "Branching & Collaboration",
        topics: [
          {
            id: "branching",
            number: "02",
            title: "Branches & Pull Requests",
            subtitle: "Learn how teams collaborate using Git branches.",
            content: {
              learn: ["Understand branches and pull requests."],
              sections: [
                {
                  title: "2.1 Branches",
                  paragraphs: [
                    "Branches allow developers to work independently on features without directly changing the main branch.",
                  ],
                  code: `git branch feature-login
git checkout feature-login
git add .
git commit -m "Add login"
git push origin feature-login`,
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "git-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "git-interview",
            number: "03",
            title: "Git Interview Questions",
            subtitle: "Prepare common Git and GitHub questions.",
            content: {
              learn: ["Revise important Git commands and concepts."],
              sections: [
                {
                  title: "3.1 Important topics",
                  paragraphs: [
                    "Focus on commit, branch, merge, rebase, pull request, fetch and pull.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },

  {
    id: "architecture",
    number: "08",
    shortTitle: "Architecture",
    title: "Computer Architecture",
    categories: [
      {
        id: "architecture-foundations",
        title: "Foundations",
        topics: [
          {
            id: "architecture-basics",
            number: "01",
            title: "Computer Architecture Fundamentals",
            subtitle: "Understand how major computer components work together.",
            content: {
              learn: [
                "Understand CPU, memory and storage.",
                "Understand basic computer organization.",
              ],
              sections: [
                {
                  title: "1.1 Main components",
                  paragraphs: [
                    "A computer system contains components such as CPU, memory, storage and input/output devices that work together to execute programs.",
                  ],
                  points: [
                    "CPU",
                    "Registers",
                    "Cache",
                    "RAM",
                    "Storage",
                    "I/O devices",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "cpu-memory",
        title: "CPU & Memory",
        topics: [
          {
            id: "cpu-memory",
            number: "02",
            title: "CPU, Cache & Memory",
            subtitle: "Understand the relationship between CPU and memory.",
            content: {
              learn: ["Understand cache and memory hierarchy."],
              sections: [
                {
                  title: "2.1 Memory hierarchy",
                  paragraphs: [
                    "Computer memory is organized into levels based on speed, cost and capacity.",
                  ],
                  points: [
                    "Registers",
                    "Cache",
                    "RAM",
                    "Secondary Storage",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
      {
        id: "architecture-interview",
        title: "Interview Prep",
        topics: [
          {
            id: "architecture-interview",
            number: "03",
            title: "Architecture Interview Questions",
            subtitle: "Important computer architecture interview topics.",
            content: {
              learn: ["Revise CPU, memory and storage concepts."],
              sections: [
                {
                  title: "3.1 Important topics",
                  paragraphs: [
                    "Focus on cache memory, registers, CPU components, memory hierarchy and instruction execution.",
                  ],
                },
              ],
              misconceptions: [],
              interviewQuestions: [],
              recap: [],
              remember: [],
            },
          },
        ],
      },
    ],
  },
];

function Technical({ onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const getTopicCount = (subject) => {
    return subject.categories.reduce(
      (total, category) => total + category.topics.length,
      0
    );
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topic, category) => {
    setSelectedTopic({
      ...topic,
      categoryTitle: category.title,
    });
  };

  const handleBack = () => {
    if (selectedTopic) {
      setSelectedTopic(null);
    } else if (selectedSubject) {
      setSelectedSubject(null);
    } else if (onBack) {
      onBack();
    }
  };

  /* =========================
     LEVEL 3 - TOPIC NOTES
  ========================= */

  if (selectedSubject && selectedTopic) {
    const topic = selectedTopic;
    const content = topic.content;

    return (
      <div className="technical-page">
        <button className="technical-back-btn" onClick={handleBack}>
          ← Back to {selectedSubject.shortTitle}
        </button>

        <div className="technical-detail-layout">
          <main className="technical-notes">
            <div className="technical-breadcrumb">
              {selectedSubject.shortTitle} · {topic.categoryTitle}
            </div>

            <h1>{topic.title}</h1>
            <p className="technical-topic-subtitle">{topic.subtitle}</p>

            <div className="technical-topic-badges">
              <span className="topic-badge active">📖 Notes</span>
              <span className="topic-badge">🧩 Practice</span>
              <span className="topic-badge">
                ❓ {content.interviewQuestions.length} Questions
              </span>
              <span className="topic-badge">🚀 Mini Project</span>
            </div>

            <section className="learn-box" id="learn">
              <h2>What you'll learn</h2>

              <ul>
                {content.learn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {content.sections.map((section, index) => (
              <section
                className="technical-note-section"
                id={`section-${index + 1}`}
                key={index}
              >
                <div className="section-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}

                {section.points && (
                  <ul className="technical-points">
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

                {section.code && (
                  <div className="code-wrapper">
                    <div className="code-header">
                      <span>Java</span>
                      <span>Example</span>
                    </div>

                    <pre>
                      <code>{section.code}</code>
                    </pre>
                  </div>
                )}

                {section.comparison && (
                  <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th>Concept</th>
                          <th>Meaning</th>
                          <th>Example</th>
                        </tr>
                      </thead>

                      <tbody>
                        {section.comparison.map((row, i) => (
                          <tr key={i}>
                            <td>{row.concept}</td>
                            <td>{row.meaning}</td>
                            <td>{row.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.pillars && (
                  <div className="pillar-grid">
                    {section.pillars.map((pillar, i) => (
                      <div className="pillar-card" key={i}>
                        <h3>{pillar.title}</h3>
                        <p>{pillar.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.callout && (
                  <div
                    className={`technical-callout ${section.callout.type}`}
                  >
                    <strong>{section.callout.title}</strong>
                    <p>{section.callout.text}</p>
                  </div>
                )}
              </section>
            ))}

            {content.misconceptions.length > 0 && (
              <section className="technical-note-section" id="misconceptions">
                <div className="section-number">MC</div>

                <h2>Common Misconceptions</h2>

                <div className="misconception-list">
                  {content.misconceptions.map((item, index) => (
                    <div className="misconception" key={index}>
                      <div className="wrong">
                        <span>✕</span>
                        <p>{item.wrong}</p>
                      </div>

                      <div className="correct">
                        <span>✓</span>
                        <p>{item.correct}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.interviewQuestions.length > 0 && (
              <section className="technical-note-section" id="interview">
                <div className="section-number">IQ</div>

                <h2>Interview Corner</h2>

                <div className="interview-list">
                  {content.interviewQuestions.map((item, index) => (
                    <div className="interview-card" key={index}>
                      <div className="question-number">
                        Q{index + 1}
                      </div>

                      <div>
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.recap.length > 0 && (
              <section className="technical-note-section" id="recap">
                <div className="section-number">30s</div>

                <h2>30-Second Recap</h2>

                <div className="recap-table">
                  {content.recap.map((item, index) => (
                    <div className="recap-row" key={index}>
                      <strong>{item.concept}</strong>
                      <span>{item.summary}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.remember.length > 0 && (
              <section className="remember-box">
                <h2>If you remember only 5 things</h2>

                <ol>
                  {content.remember.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </section>
            )}

            <div className="topic-navigation">
              <button onClick={handleBack}>← Back to Topics</button>
              <button>Next Topic →</button>
            </div>
          </main>

          {/* RIGHT SIDE OPTIONS */}
          <aside className="technical-right-sidebar">
            <div className="sidebar-sticky">
              <div className="sidebar-title">OPTIONS</div>

              <button className="side-option active">
                <span>📖</span>
                <div>
                  <strong>Notes</strong>
                  <small>Read concept</small>
                </div>
              </button>

              <button className="side-option">
                <span>🧩</span>
                <div>
                  <strong>Practice</strong>
                  <small>Practice questions</small>
                </div>
              </button>

              <button className="side-option">
                <span>❓</span>
                <div>
                  <strong>Questions</strong>
                  <small>{content.interviewQuestions.length} interview questions</small>
                </div>
              </button>

              <button className="side-option">
                <span>🚀</span>
                <div>
                  <strong>Mini Project</strong>
                  <small>Apply the concept</small>
                </div>
              </button>

              <div className="side-divider"></div>

              <div className="sidebar-title">ON THIS PAGE</div>

              <a href="#learn" className="page-link">
                What you'll learn
              </a>

              {content.sections.map((section, index) => (
                <a
                  href={`#section-${index + 1}`}
                  className="page-link"
                  key={index}
                >
                  {section.title}
                </a>
              ))}

              {content.misconceptions.length > 0 && (
                <a href="#misconceptions" className="page-link">
                  Common Misconceptions
                </a>
              )}

              {content.interviewQuestions.length > 0 && (
                <a href="#interview" className="page-link">
                  Interview Corner
                </a>
              )}

              {content.recap.length > 0 && (
                <a href="#recap" className="page-link">
                  30-Second Recap
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  /* =========================
     LEVEL 2 - SUBJECT MODULES
  ========================= */

  if (selectedSubject) {
    return (
      <div className="technical-page">
        <button className="technical-back-btn" onClick={handleBack}>
          ← Back to Core Subjects
        </button>

        <div className="subject-course-header">
          <div>
            <span className="course-label">CORE SUBJECT</span>

            <h1>{selectedSubject.shortTitle}</h1>

            <p>{selectedSubject.title}</p>
          </div>

          <div className="topic-count-box">
            <strong>{getTopicCount(selectedSubject)}</strong>
            <span>Topics</span>
          </div>
        </div>

        <div className="module-list">
          {selectedSubject.categories.map((category) => (
            <section className="technical-module" key={category.id}>
              <div className="module-heading">
                <div>
                  <span className="module-label">MODULE</span>
                  <h2>{category.title}</h2>
                </div>

                <span className="module-count">
                  {String(category.topics.length).padStart(2, "0")}
                </span>
              </div>

              <div className="module-topics">
                {category.topics.map((topic) => (
                  <button
                    className="module-topic"
                    key={topic.id}
                    onClick={() => handleTopicClick(topic, category)}
                  >
                    <div className="module-topic-number">
                      {topic.number}
                    </div>

                    <div className="module-topic-content">
                      <h3>{topic.title}</h3>
                      <p>{topic.subtitle}</p>
                    </div>

                    <span className="module-topic-arrow">→</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
     LEVEL 1 - CORE SUBJECTS
  ========================= */

  return (
    <div className="technical-page">
      <div className="technical-top-heading">
        <span>PLACEMENT PREPARATION</span>

        <h1>Core Subjects</h1>

        <p>
          Prepare the most important Computer Science subjects for your
          technical interviews.
        </p>
      </div>

      <div className="technical-subject-grid">
        {subjects.map((subject) => (
          <button
            className="technical-subject-card"
            key={subject.id}
            onClick={() => handleSubjectClick(subject)}
          >
            <div className="subject-card-top">
              <span>{subject.number}</span>
              <span>→</span>
            </div>

            <div className="subject-icon">
              {subject.shortTitle === "OOPs"
                ? "◈"
                : subject.shortTitle === "DBMS"
                ? "▦"
                : subject.shortTitle === "OS"
                ? "◉"
                : subject.shortTitle === "CN"
                ? "⌁"
                : subject.shortTitle === "Web"
                ? "⌘"
                : subject.shortTitle === "SE"
                ? "⚙"
                : subject.shortTitle === "Git"
                ? "◆"
                : "▣"}
            </div>

            <h2>{subject.shortTitle}</h2>

            <p>{subject.title}</p>

            <div className="subject-card-bottom">
              <span>{getTopicCount(subject)} Topics</span>
              <span>Explore →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Technical;