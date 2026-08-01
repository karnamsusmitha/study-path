from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import auth, roadmap, quiz, chat, progress, resources

app = FastAPI(title="AI Learning Platform Backend", version="1.0.0")

# CORS setup for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(roadmap.router, prefix="/api/roadmap", tags=["Roadmaps"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["Quizzes"])
app.include_router(chat.router, prefix="/api/chat", tags=["AI Mentor Chat"])
app.include_router(progress.router, prefix="/api/progress", tags=["Progress"])
app.include_router(resources.router, prefix="/api/resources", tags=["Resources"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Learning Platform API"}
