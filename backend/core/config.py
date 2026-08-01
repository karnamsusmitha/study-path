import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "mock_url")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "mock_key")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
