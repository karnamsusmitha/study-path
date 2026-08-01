from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# Auth Schemas
class UserSignup(BaseModel):
    email: str
    password: str
    student_name: str
    current_skill_level: str
    learning_style: str
    weekly_hours_available: int

class UserLogin(BaseModel):
    email: str
    password: str

# Roadmap Schemas
class GenerateRoadmapRequest(BaseModel):
    studentName: str
    targetCareer: str
    currentSkills: str
    hoursPerDay: int
    duration: str
    learningStyle: str

# Quiz Schemas
class GenerateQuizRequest(BaseModel):
    topic: str

class QuizSubmitRequest(BaseModel):
    quiz_id: str
    answers: Dict[str, str] # question_id -> user answer

# Chat Schemas
class ChatHistoryItem(BaseModel):
    role: str
    text: str

class ChatMessageRequest(BaseModel):
    message: str
    history: List[ChatHistoryItem] = []
