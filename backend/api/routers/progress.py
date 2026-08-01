from fastapi import APIRouter, Depends
from core.dependencies import get_supabase
from supabase import Client

router = APIRouter()

@router.get("/stats")
def get_progress_stats(db: Client = Depends(get_supabase)):
    return {
        "study_streak": 14,
        "hours_studied": 32.5,
        "avg_quiz_score": 88,
        "completed_topics": 12
    }

@router.put("/update_task/{task_id}")
def update_task_status(task_id: str, status: str, db: Client = Depends(get_supabase)):
    # db.table("daily_tasks").update({"status": status}).eq("id", task_id).execute()
    return {"message": f"Task {task_id} updated to {status}"}
