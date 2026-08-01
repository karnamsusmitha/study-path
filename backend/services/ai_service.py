from google import genai
from core.config import settings
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY) if settings.GEMINI_API_KEY else None

def generate_roadmap(student_name: str, career: str, skills: str, hours: int, duration: str, style: str):
    if not client:
        return {"error": "Demo mode: API key missing."}
        
    prompt = f"""
    Create a comprehensive, highly personalized learning roadmap for {student_name}.
    Target Career: {career}
    Current Skills: {skills}
    Time Commitment: {hours} hours per day
    Expected Duration: {duration}
    Preferred Learning Style: {style}
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )
    return json.loads(response.text)

def generate_quiz(topic: str):
    if not client:
        return {"error": "Demo mode"}
    
    prompt = f"Generate a 10-question quiz to test knowledge on: {topic}."
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )
    return json.loads(response.text)

def chat_message(history, new_message):
    if not client:
        return "Demo mode response."
        
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=new_message, # simplified for mock
        config=genai.types.GenerateContentConfig(
            system_instruction="You are a Mentor.",
        ),
    )
    return response.text
