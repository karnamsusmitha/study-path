-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users (Extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Student Profiles
CREATE TABLE public.student_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  current_skill_level TEXT,
  learning_style TEXT,
  weekly_hours_available INT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_student_profiles_user_id ON public.student_profiles(user_id);

-- 3. Learning Goals
CREATE TABLE public.learning_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  target_completion_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_learning_goals_user_id ON public.learning_goals(user_id);

-- 4. Roadmaps
CREATE TABLE public.roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID REFERENCES public.learning_goals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_roadmaps_user_id ON public.roadmaps(user_id);
CREATE INDEX idx_roadmaps_goal_id ON public.roadmaps(goal_id);

-- 5. Daily Tasks (Modules)
CREATE TABLE public.daily_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  estimated_minutes INT,
  order_index INT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_daily_tasks_roadmap_id ON public.daily_tasks(roadmap_id);

-- 6. Resources
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES public.daily_tasks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  resource_type TEXT CHECK (resource_type IN ('video', 'article', 'doc')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_resources_task_id ON public.resources(task_id);

-- 7. Quizzes
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES public.daily_tasks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  questions_payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_quizzes_task_id ON public.quizzes(task_id);

-- 8. Quiz Results
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  score_percentage INT NOT NULL,
  passed BOOLEAN NOT NULL,
  taken_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_quiz_results_quiz_id ON public.quiz_results(quiz_id);
CREATE INDEX idx_quiz_results_user_id ON public.quiz_results(user_id);

-- 9. Progress Analytics
CREATE TABLE public.progress_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_hours_spent FLOAT DEFAULT 0.0,
  current_streak_days INT DEFAULT 0,
  last_activity_date TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_progress_analytics_user_id ON public.progress_analytics(user_id);

-- 10. Chat History
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES public.daily_tasks(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_chat_history_user_id ON public.chat_history(user_id);
CREATE INDEX idx_chat_history_task_id ON public.chat_history(task_id);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Basic Policies: Users can only read and write their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can manage own student profile" ON public.student_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own learning goals" ON public.learning_goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own roadmaps" ON public.roadmaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view daily tasks of own roadmaps" ON public.daily_tasks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.roadmaps WHERE roadmaps.id = daily_tasks.roadmap_id AND roadmaps.user_id = auth.uid())
);
CREATE POLICY "Users can view resources of own tasks" ON public.resources FOR ALL USING (
  EXISTS (SELECT 1 FROM public.daily_tasks JOIN public.roadmaps ON roadmaps.id = daily_tasks.roadmap_id WHERE daily_tasks.id = resources.task_id AND roadmaps.user_id = auth.uid())
);
CREATE POLICY "Users can view quizzes of own tasks" ON public.quizzes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.daily_tasks JOIN public.roadmaps ON roadmaps.id = daily_tasks.roadmap_id WHERE daily_tasks.id = quizzes.task_id AND roadmaps.user_id = auth.uid())
);
CREATE POLICY "Users can manage own quiz results" ON public.quiz_results FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.progress_analytics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own chat history" ON public.chat_history FOR ALL USING (auth.uid() = user_id);
