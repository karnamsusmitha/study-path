from fastapi import APIRouter, Depends, HTTPException
from models.schemas import UserSignup, UserLogin
from core.dependencies import get_supabase
from supabase import Client

router = APIRouter()

@router.post("/signup")
def signup(user: UserSignup, db: Client = Depends(get_supabase)):
    try:
        # Note: In a real app, you'd use db.auth.sign_up
        # For hackathon mock, we return success
        return {"message": "User created successfully", "user": {"email": user.email}}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login(user: UserLogin, db: Client = Depends(get_supabase)):
    try:
        return {"token": "mock-jwt-token", "user": {"email": user.email}}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")
