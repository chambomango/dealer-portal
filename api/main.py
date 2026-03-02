from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Dealer Portal API")

# https://fastapi.tiangolo.com/tutorial/cors/
# Allow Next.js (localhost:3000) to call this API (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "healthy", "version": "0.1.0"}