from fastapi import APIRouter
from services.database import get_pool

router = APIRouter(prefix="/api/metrics", tags=["metrics"])

# Metrics for business as a whole
@router.get("/overview")
async def get_overview():
    pool = get_pool()
    row = await pool.fetchrow("""
        SELECT
            COALESCE(SUM(transaction_count), 0) AS total_transactions,
            COALESCE(SUM(total_revenue), 0) AS total_revenue,
            COUNT(DISTINCT dealer_id) AS active_dealers,
            COALESCE(SUM(total_revenue)/NULLIF(SUM(transaction_count), 0), 0) AS avg_transaction_value
        FROM fact_dealer_daily
    """)
    return {
        "total_transactions": row["total_transactions"],
        "total_revenue": float(row["total_revenue"]), #Convert Postgres NUMERIC to Decimal so JSON can handle
        "active_dealers": row["active_dealers"],
        "avg_transaction_value": round(float(row["avg_transaction_value"]), 2),
    }

# Monthly revenue over time
@router.get("/trends")
async def get_trends():
    pool = get_pool()
    rows = await pool.fetch("""
        SELECT 
            DATE_TRUNC('month', transaction_date) as sales_month,
            SUM(total_revenue) AS total_revenue,
            SUM(total_revenue)/NULLIF(SUM(transaction_count), 0) AS avg_transaction_value,
            SUM(transaction_count) AS total_transactions,
            COUNT(DISTINCT dealer_id) AS active_dealers
        FROM fact_dealer_daily
        GROUP BY sales_month
        ORDER BY sales_month
    """)
    return {
        "trends": [
            {
                "sales_month": str(row["sales_month"].date()),
                "total_revenue": float(row["total_revenue"]),
                "avg_transaction_value": round(float(row["avg_transaction_value"]), 2),
                "total_transactions": row["total_transactions"],
                "active_dealers": row["active_dealers"],
            }
            for row in rows
        ]
    }