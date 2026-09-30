import { NextResponse } from 'next/server';
import { AIPrompts } from '@/lib/ai/prompts';
import { GoogleGenAI } from '@google/genai';

function getFallbackResponse(message: string): string {
  const query = message.toLowerCase();

  if (query.includes('python') && (query.includes('librar') || query.includes('package') || query.includes('module'))) {
    return `Here are **4 essential Python libraries** widely used in software development and data science:

### 1. **Pandas** 🐼
* **Use Case:** Data manipulation and analysis.
* **Why it's essential:** Provides high-performance \`DataFrame\` structures for reading, filtering, and cleaning data from CSVs, Excel, or SQL.
\`\`\`python
import pandas as pd
df = pd.read_csv('data.csv')
print(df.describe())
\`\`\`

### 2. **NumPy** 🔢
* **Use Case:** Numerical computing and array operations.
* **Why it's essential:** Enables fast mathematical calculations on large multi-dimensional matrices.
\`\`\`python
import numpy as np
matrix = np.array([[1, 2], [3, 4]])
print(np.linalg.inv(matrix))
\`\`\`

### 3. **Requests** 🌐
* **Use Case:** HTTP requests & API integration.
* **Why it's essential:** Makes interacting with REST APIs super simple and clean.
\`\`\`python
import requests
response = requests.get('https://api.github.com')
data = response.json()
\`\`\`

### 4. **FastAPI** ⚡
* **Use Case:** Web development & REST APIs.
* **Why it's essential:** High-performance, modern framework with automatic OpenAPI documentation and async support.

---
💡 *Tip:* Install any of these using \`pip install <package-name>\`. Ask me if you'd like code examples for a specific project!`;
  }

  if (query.includes('react') || query.includes('component') || query.includes('hook')) {
    return `Here is a quick overview of key **React concepts**:

### 1. **Functional Components & JSX**
React components are JavaScript functions that return JSX (HTML-like syntax inside JS).

### 2. **useState Hook**
Used to store and update dynamic state within components.
\`\`\`jsx
const [count, setCount] = useState(0);
return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
\`\`\`

### 3. **useEffect Hook**
Handles side effects like data fetching or subscribing to events.

### 4. **Props**
Allows passing data downwards from parent to child components.

---
🚀 *Next Step:* Try building a simple counter or to-do app to practice these concepts!`;
  }

  if (query.includes('roadmap') || query.includes('career') || query.includes('learn')) {
    return `Here is a recommended **3-Step Learning Strategy**:

1. **Master the Fundamentals:** Focus on syntax, core concepts, and hands-on exercises.
2. **Build Mini-Projects:** Apply what you learn by building real apps (e.g. To-Do App, Weather API fetcher, Portfolio).
3. **Practice Problem Solving:** Consistently solve coding challenges to build confidence.

---
💡 *Want a customized roadmap?* Check out our **Study Planner** section to generate a personalized weekly breakdown!`;
  }

  return `### 💡 AI Mentor Advice

Thank you for your question: **"${message}"**!

Here is how you can approach this:
1. **Understand the core principle:** Break down complex topics into smaller, manageable sub-tasks.
2. **Hands-on practice:** Write code or create flashcards to solidify your understanding.
3. **Resource recommendation:** Check out official documentation or video tutorials to see real-world implementations.

---
*(Note: To connect live to Gemini AI for real-time model answers, set your \`GEMINI_API_KEY\` in \`.env.local\`)*`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, message } = body; 

    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is provided, return dynamic intelligent AI response
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Using dynamic fallback response.");
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate typing delay
      return NextResponse.json({
        text: getFallbackResponse(message || '')
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = AIPrompts.getAIMentorSystemInstruction();

    const formattedHistory = [
      ...(history || []),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    return NextResponse.json({ text: response.text });

  } catch (error) {
    console.error("Error generating chat response:", error);
    // Fall back gracefully if live call fails
    return NextResponse.json({ 
      text: getFallbackResponse(req.body ? (await req.clone().json()).message : '') 
    });
  }
}

