'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { Sparkles, CheckCircle2, XCircle, AlertCircle, Code, ArrowRight, RefreshCcw } from 'lucide-react';

export default function QuizPage() {
  const [topic, setTopic] = useState('React Fundamentals');
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  
  // State for taking the quiz
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const generateQuiz = async () => {
    setLoading(true);
    setQuizData(null);
    setAnswers({});
    setSubmitted(false);
    
    try {
      const result = await apiClient('/quiz/generate', {
        method: 'POST',
        body: JSON.stringify({ topic })
      });
      setQuizData(result.data || result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qId: number, answer: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  // Evaluation logic
  const evaluate = () => {
    if (!quizData) return { score: 0, weakTopics: [] };
    let score = 0;
    const weakTopicsMap: Record<string, number> = {};
    
    quizData.questions.forEach((q: any) => {
      const userAnswer = (answers[q.id] || "").trim().toLowerCase();
      const correctAnswer = (q.correct_answer || "").trim().toLowerCase();
      
      // For coding challenges/debugging, a simple string match is naive but works for the MVP.
      if (userAnswer === correctAnswer || (q.type === 'mcq' && userAnswer === correctAnswer)) {
        score++;
      } else {
        if (!weakTopicsMap[q.related_topic]) weakTopicsMap[q.related_topic] = 0;
        weakTopicsMap[q.related_topic]++;
      }
    });

    const weakTopics = Object.entries(weakTopicsMap)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    return { score, weakTopics };
  };

  if (!quizData && !loading) {
    return (
      <div className="max-w-2xl mx-auto w-full pt-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mb-6">
          <Sparkles className="text-blue-500 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">AI Quiz Generator</h1>
        <p className="text-slate-400 mb-8 max-w-md">Finished a topic? Let the AI generate a personalized 10-question evaluation to test your knowledge.</p>
        
        <div className="w-full flex gap-4">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-5 py-4 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. React Fundamentals"
          />
          <button onClick={generateQuiz} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
            Generate Quiz
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold">Crafting your evaluation...</h2>
        <p className="text-slate-400 text-sm mt-2">Generating 5 Easy, 3 Medium, and 2 Hard questions.</p>
      </div>
    );
  }

  const { score, weakTopics } = submitted ? evaluate() : { score: 0, weakTopics: [] };

  return (
    <div className="max-w-4xl mx-auto w-full pt-10 pb-20">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{quizData.quiz_title}</h1>
          <p className="text-slate-400">10 Questions • Adaptive Difficulty</p>
        </div>
        {submitted && (
          <div className="text-right">
            <div className="text-4xl font-black text-blue-400">{score} / {quizData.questions.length}</div>
            <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">Final Score</p>
          </div>
        )}
      </header>

      {/* Results Banner */}
      {submitted && (
        <div className="mb-10 p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="text-blue-400" /> Topic Analysis
          </h2>
          {weakTopics.length > 0 ? (
            <div>
              <p className="text-slate-300 mb-3 text-sm">Based on your incorrect answers, we recommend reviewing these specific topics:</p>
              <div className="flex flex-wrap gap-2">
                {weakTopics.map(wt => (
                  <span key={wt} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-sm font-medium">
                    {wt}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-green-400 font-medium">Perfect score! You have mastered this topic.</p>
          )}
          
          <button onClick={() => setQuizData(null)} className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg font-medium transition-colors flex items-center gap-2">
            <RefreshCcw size={14} /> Take Another Quiz
          </button>
        </div>
      )}

      <div className="space-y-12">
        {quizData.questions.map((q: any, i: number) => {
          const userAnswer = answers[q.id] || "";
          const isCorrect = userAnswer.trim().toLowerCase() === q.correct_answer.toLowerCase();
          
          let difficultyColor = "text-green-400 bg-green-400/10 border-green-400/20";
          if (q.difficulty === 'Medium') difficultyColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
          if (q.difficulty === 'Hard') difficultyColor = "text-red-400 bg-red-400/10 border-red-400/20";

          return (
            <div key={q.id} className="card p-0 overflow-hidden relative">
              
              {/* Question Header */}
              <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                      {q.type.replace('_', ' ')}
                    </span>
                    <h3 className="text-xl font-medium text-white">{q.question_text}</h3>
                  </div>
                </div>
                <div className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border ${difficultyColor}`}>
                  {q.difficulty}
                </div>
              </div>

              {/* Code Snippet if present */}
              {q.code_snippet && (
                <div className="px-6 py-4 bg-black/40 border-b border-white/5 font-mono text-sm text-blue-300 whitespace-pre-wrap">
                  {q.code_snippet}
                </div>
              )}

              {/* Input Area */}
              <div className="p-6">
                {q.type === 'mcq' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt: string) => (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => handleAnswer(q.id, opt)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          userAnswer === opt 
                            ? 'bg-blue-500/20 border-blue-500 text-blue-100' 
                            : 'bg-black/20 border-white/10 hover:bg-white/5 text-slate-300'
                        } ${submitted ? 'opacity-80 cursor-default' : ''}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {['fill_blank', 'code_output'].includes(q.type) && (
                  <input 
                    type="text"
                    disabled={submitted}
                    value={userAnswer}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl text-white font-mono focus:border-blue-500 outline-none"
                  />
                )}

                {['debugging', 'coding_challenge'].includes(q.type) && (
                  <textarea 
                    disabled={submitted}
                    value={userAnswer}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    placeholder="Write your code here..."
                    rows={4}
                    className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl text-white font-mono text-sm focus:border-blue-500 outline-none resize-y"
                  />
                )}
              </div>

              {/* Post-Submit Evaluation Box */}
              {submitted && (
                <div className={`p-6 border-t ${isCorrect ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" /> : <XCircle className="text-red-500 flex-shrink-0 mt-1" />}
                    <div>
                      <h4 className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </h4>
                      {!isCorrect && (
                        <div className="mt-2 text-sm text-slate-300">
                          <span className="font-semibold text-white">Correct Answer:</span> 
                          <span className="font-mono bg-black/30 px-2 py-1 rounded ml-2">{q.correct_answer}</span>
                        </div>
                      )}
                      <p className="text-sm text-slate-400 mt-2">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setSubmitted(true)}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors text-lg shadow-lg shadow-blue-500/25"
          >
            Submit Quiz for Evaluation
          </button>
        </div>
      )}
    </div>
  );
}
