export const mockRoadmapData = {
  student_name: "Alex",
  target_career: "Full Stack Developer",
  overview: "You're already on your way! With your basic HTML/CSS knowledge, we'll quickly move you into modern JavaScript and React to get you building dynamic apps in no time.",
  weekly_roadmap: [
    {
      week_number: 1,
      theme: "JavaScript Foundations",
      focus: "Mastering ES6+ syntax and DOM manipulation",
      daily_tasks: [
        { day: 1, task_title: "Variables, Types, and Functions", estimated_hours: 2, description: "Deep dive into let, const, arrow functions, and scoping." },
        { day: 2, task_title: "Arrays and Objects", estimated_hours: 2, description: "Mastering array methods like map, filter, reduce." },
        { day: 3, task_title: "Asynchronous JS", estimated_hours: 3, description: "Understanding Promises and async/await." }
      ],
      resources: [
        { title: "JavaScript ES6 Tutorial", url: "https://www.youtube.com/results?search_query=javascript+es6+crash+course", type: "video" },
        { title: "MDN Web Docs: Promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise", type: "article" }
      ],
      practice_problems: [
        "Rewrite a callback-based function using async/await",
        "Create a script that fetches user data from an API and filters it"
      ],
      mini_project: {
        title: "Weather App Fetcher",
        description: "Build a simple console or DOM script that fetches weather data from a public API."
      }
    },
    {
      week_number: 2,
      theme: "React Core Concepts",
      focus: "Components, Props, and State",
      daily_tasks: [
        { day: 1, task_title: "Thinking in React", estimated_hours: 2, description: "Component architecture and JSX." },
        { day: 2, task_title: "useState and Props", estimated_hours: 3, description: "Passing data and managing local state." },
        { day: 3, task_title: "useEffect", estimated_hours: 3, description: "Handling side effects and component lifecycles." }
      ],
      resources: [
        { title: "React Official Docs", url: "https://react.dev/learn", type: "doc" }
      ],
      practice_problems: [
        "Build a counter component",
        "Create a to-do list that persists to localStorage"
      ],
      mini_project: {
        title: "Interactive Task Tracker",
        description: "A React application to add, toggle, and delete tasks."
      }
    }
  ],
  revision_schedule: [
    { milestone: "End of Week 2", revision_tasks: ["Review Array Methods", "Re-build the counter from memory"] }
  ]
};

export const mockQuizData = {
  quiz_title: "React Core Concepts Quiz",
  questions: [
    {
      id: 1, difficulty: "Easy", type: "mcq",
      question_text: "What hook is used to manage local state in a functional component?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correct_answer: "useState", explanation: "useState is the primary hook for managing state in functional components.", related_topic: "State Management"
    },
    {
      id: 2, difficulty: "Easy", type: "mcq",
      question_text: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON X", "JavaScript X-DOM"],
      correct_answer: "JavaScript XML", explanation: "JSX stands for JavaScript XML, which allows writing HTML inside JavaScript.", related_topic: "JSX"
    },
    {
      id: 3, difficulty: "Easy", type: "mcq",
      question_text: "Which method is used to render a React element to the DOM in React 18?",
      options: ["ReactDOM.render()", "createRoot()", "React.mount()", "renderDOM()"],
      correct_answer: "createRoot()", explanation: "React 18 introduced createRoot() to replace ReactDOM.render() for concurrent features.", related_topic: "Rendering"
    },
    {
      id: 4, difficulty: "Easy", type: "fill_blank",
      question_text: "To pass data from a parent component to a child component, you use _______.",
      options: [], correct_answer: "props", explanation: "Props (properties) are used to pass data down the component tree.", related_topic: "Props"
    },
    {
      id: 5, difficulty: "Easy", type: "fill_blank",
      question_text: "The hook used to perform side effects in functional components is _______.",
      options: [], correct_answer: "useEffect", explanation: "useEffect is used for fetching data, subscriptions, or manually changing the DOM.", related_topic: "Side Effects"
    },
    {
      id: 6, difficulty: "Medium", type: "code_output",
      question_text: "What is the output of the following code on the first render?",
      code_snippet: "const [count, setCount] = useState(0);\\nsetCount(count + 1);\\nconsole.log(count);",
      options: [], correct_answer: "0", explanation: "State updates are asynchronous. The console.log runs before the state actually updates.", related_topic: "State Asynchrony"
    },
    {
      id: 7, difficulty: "Medium", type: "mcq",
      question_text: "Which of the following is true about the dependency array in useEffect?",
      options: ["If omitted, it runs only once.", "If empty [], it runs after every render.", "If empty [], it runs only on the initial render.", "It must always contain all state variables."],
      correct_answer: "If empty [], it runs only on the initial render.", explanation: "An empty dependency array tells React that the effect doesn't depend on any values from props or state, so it never needs to re-run.", related_topic: "useEffect Dependencies"
    },
    {
      id: 8, difficulty: "Medium", type: "debugging",
      question_text: "Identify the bug in this code. Provide the exact corrected line.",
      code_snippet: "const items = ['a', 'b'];\\nreturn items.map(item => <div>{item}</div>);",
      options: [], correct_answer: "<div key={item}>{item}</div>", explanation: "Elements generated by mapping an array need a unique 'key' prop.", related_topic: "Lists and Keys"
    },
    {
      id: 9, difficulty: "Hard", type: "coding_challenge",
      question_text: "Write a custom hook called `useToggle` that returns a boolean state and a function to toggle it. Return exactly the JavaScript code (no markdown).",
      options: [], correct_answer: "function useToggle(initialValue = false) { const [value, setValue] = useState(initialValue); const toggle = () => setValue(!value); return [value, toggle]; }", explanation: "A custom hook is just a JS function that uses other hooks.", related_topic: "Custom Hooks"
    },
    {
      id: 10, difficulty: "Hard", type: "mcq",
      question_text: "When dealing with complex state logic that involves multiple sub-values, which hook is generally preferred over useState?",
      options: ["useMemo", "useCallback", "useReducer", "useContext"],
      correct_answer: "useReducer", explanation: "useReducer is preferred when state logic is complex, involves multiple sub-values, or when the next state depends on the previous one.", related_topic: "Advanced State Management"
    }
  ]
};
