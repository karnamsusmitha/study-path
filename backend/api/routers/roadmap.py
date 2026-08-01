from fastapi import APIRouter, Depends
from models.schemas import GenerateRoadmapRequest
from services import ai_service
from core.dependencies import get_supabase
from supabase import Client

router = APIRouter()

@router.post("/generate")
def generate_roadmap(req: GenerateRoadmapRequest, db: Client = Depends(get_supabase)):
    # 1. Call Gemini to generate the JSON roadmap
    roadmap_data = ai_service.generate_roadmap(
        req.studentName, req.targetCareer, req.currentSkills, req.hoursPerDay, req.duration, req.learningStyle
    )
    # 2. In a real app, save to Supabase here
    # db.table("roadmaps").insert({...}).execute()
    
    return {"message": "Roadmap generated", "data": roadmap_data}

@router.get("/{roadmap_id}")
def get_roadmap(roadmap_id: str, db: Client = Depends(get_supabase)):
    # db.table("roadmaps").select("*").eq("id", roadmap_id).execute()
    return {"id": roadmap_id, "data": "Mock fetched roadmap"}
