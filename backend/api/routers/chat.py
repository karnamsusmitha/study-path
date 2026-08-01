from fastapi import APIRouter, Depends
from models.schemas import ChatMessageRequest
from services import ai_service

router = APIRouter()

@router.post("/message")
def send_message(req: ChatMessageRequest):
    response_text = ai_service.chat_message(req.history, req.message)
    return {"text": response_text}
