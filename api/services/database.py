import os
import asyncpg
from dotenv import load_dotenv

load_dotenv()

pool = None

async def init_db():
    global pool
    pool = await asyncpg.create_pool(
        os.getenv("DATABASE_URL"),
        min_size=1,
        max_size=5
    )

async def close_db():
    global pool
    if pool:
        await pool.close()

def get_pool():
    return pool