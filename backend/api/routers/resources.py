from fastapi import APIRouter

router = APIRouter()

@router.get("/{task_id}")
def get_resources(task_id: str):
    return {
        "task_id": task_id,
        "resources": [
            {"title": "React Docs", "url": "https://react.dev", "type": "doc"}
        ]
    }
