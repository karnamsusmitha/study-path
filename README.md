# Study Planner

A personalized, AI-powered learning path and study assistant built with Next.js, TypeScript, Tailwind CSS, and Google Gemini. **Study Planner** helps students and self-learners master any subject by creating customized weekly study roadmaps, generating topic-specific quizzes, and offering a 24/7 AI mentor.

---

## Main Features

- **AI Roadmap Generator (`/generate`, `/roadmap`)**
  - Multi-step preference form capturing student name, target career/goal, current skill level, preferred learning style (Visual, Reading, Project-Based), daily study hours, and timeframe.
  - Automatically generates week-by-week learning paths with daily action items, estimated effort, curated learning resources, mini-projects, practice problems, and spaced repetition schedules.
  - Interactive daily task completion checkboxes with progress visualization per week.

- **Interactive Learning Dashboard (`/dashboard`)**
  - Overview metrics tracking study streak, hours studied, average quiz score, and completed topics.
  - Circular progress ring for current goal tracking.
  - Daily task lists, upcoming module schedule, 2-week learning activity heatmap, and recent AI mentor chats.

- **24/7 AI Mentor Chat (`/chat`)**
  - Context-aware chat assistant powered by Google Gemini (`@google/genai`).
  - Renders markdown formatting for code snippets, bullet points, and step-by-step technical guidance.
  - Built-in dynamic fallback engine if no API key is provided.

- **Dynamic AI Quiz Generator (`/quiz`)**
  - Generates 10-question evaluations on any topic with adaptive difficulty (Easy, Medium, Hard).
  - Supports Multiple Choice (MCQ), Fill in the Blank, Code Output, Debugging, and Coding Challenges.
  - Instant scoring with answer explanations and automated weak-topic analysis.

- **Progress Analytics (`/analytics`)**
  - Visual metrics for total study hours, current streak, completed modules, and earned certificates.
  - Weekly learning activity bar chart with hover tooltips.

- **User Preferences & Profiles (`/profile`, `/onboarding`, `/login`)**
  - Manage daily study targets, preferred learning styles, and career goals.
  - LocalStorage persistence for user roadmaps and completed tasks.

---

## Tech Stack

### Frontend & Core
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **UI & Motion:** [Lucide React](https://lucide.dev/) (Icons), [Framer Motion](https://www.framer.com/motion/)

### AI & API
- **AI SDK:** `@google/genai` (Google Gemini 2.0 Flash / 2.5 Flash)
- **Markdown Processing:** `react-markdown`

### Backend Services (Optional)
- **FastAPI / Python:** Located in `backend/` for additional backend service integrations.
- **Database Schema:** `supabase/schema.sql` for relational persistence setup.

---

## Project Structure

```
study-planner/
├── app/                  # Next.js App Router pages and API endpoints
│   ├── analytics/        # Learning progress analytics page
│   ├── api/              # Route handlers (chat, generate, quiz, roadmap, auth)
│   ├── chat/             # AI Mentor chat interface
│   ├── dashboard/        # Main overview dashboard
│   ├── generate/         # Multi-step roadmap generation form
│   ├── login/ & signup/  # Authentication screens
│   ├── module/           # Learning module detail view
│   ├── onboarding/       # User onboarding flow
│   ├── profile/          # User profile and study settings
│   ├── quiz/             # AI Quiz generator and scoring interface
│   ├── roadmap/          # Interactive study roadmap view
│   ├── globals.css       # Styling & Tailwind configuration
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components (Sidebar, etc.)
├── lib/                  # Helper utilities, API wrapper, AI prompts, & mock data
├── backend/              # Optional FastAPI application (routers, schemas, AI service)
├── supabase/             # Database schema definition (schema.sql)
└── package.json          # Node.js dependencies and run scripts
```

---

## Environment Variables

The project uses an optional environment variable for live Google Gemini AI calls.

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** If `GEMINI_API_KEY` is not provided, the application operates using built-in dynamic fallback responses and mock data so all features can be demonstrated locally without setup.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository and navigate to the project root directory:
   ```bash
   cd study-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Future Enhancements

- **Calendar Integration:** Sync daily study tasks with Google Calendar or iCal.
- **Database Synchronization:** Store user roadmaps, quiz history, and progress in Supabase.
- **Gamification:** Unlock achievements, badges, and study streaks.
- **Social Study Groups:** Share roadmaps and collaborate with peers on learning tracks.
