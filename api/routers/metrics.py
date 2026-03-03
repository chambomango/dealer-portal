from fastapi import APIRouter
from services.database import get_pool

router = APIRouter(prefix="/api/metrics", tags=["metrics"])

@router.get("/overview")
async def get_overview():
    pool = get_pool()
    row = await pool.fetchrow("""
        SELECT
            COUNT(*) AS total_transactions,
            COALESCE(SUM(total_amount), 0) AS total_revenue,
            COUNT(DISTINCT dealer_code) AS active_dealers,
            COALESCE(AVG(total_amount), 0) AS avg_transaction_value
        FROM raw_transactions
        WHERE total_amount > 0
    """)
    return {
        "total_transactions": row["total_transactions"],
        "total_revenue": float(row["total_revenue"]), #Convert Postgres NUMERIC to Decimal so JSON can handle
        "active_dealers": row["active_dealers"],
        "avg_transaction_value": round(float(row["avg_transaction_value"]), 2),
    }