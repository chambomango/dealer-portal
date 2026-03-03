from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.database import init_db, close_db
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

app = FastAPI(title="Dealer Portal API", lifespan=lifespan)

# https://fastapi.tiangolo.com/tutorial/cors/
# Allow Next.js (localhost:3000) to call this API (localhost:8000)
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "healthy", "version": "0.1.0"}

# Import routers
from routers import metrics
app.include_router(metrics.router)