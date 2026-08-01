from fastapi import APIRouter, Depends
from models.schemas import GenerateQuizRequest, QuizSubmitRequest
from services import ai_service
from core.dependencies import get_supabase
from supabase import Client

router = APIRouter()

@router.post("/generate")
def generate_quiz(req: GenerateQuizRequest, db: Client = Depends(get_supabase)):
    quiz_data = ai_service.generate_quiz(req.topic)
    return {"message": "Quiz generated", "data": quiz_data}

@router.post("/submit")
def submit_quiz(req: QuizSubmitRequest, db: Client = Depends(get_supabase)):
    # Evaluate answers, calculate score
    return {"score": 8, "weak_topics": ["React Hooks"]}
