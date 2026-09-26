from fastapi import FastAPI

from routers.patients import router as patients_router
from routers.access import router as access_router


app = FastAPI(
    title="EmergencyDPI API",
    description="Backend API for controlled emergency health information sharing",
    version="0.1.0",
)


app.include_router(patients_router)
app.include_router(access_router)


@app.get("/")
def root():
    return {
        "message": "EmergencyDPI backend is running",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }