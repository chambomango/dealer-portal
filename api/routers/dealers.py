from typing import Annotated
from fastapi import APIRouter, Query
from services.database import get_pool

router = APIRouter(prefix="/api/dealers", tags=["dealers"])

# The dealer leaderboard
@router.get("/")
async def get_dealers(
    month: Annotated[
    str,
    Query(description="Month - YYYY-MM format")
    ] = None,
    region: Annotated[
    str,
    Query(description="Region Name")
    ] = None,
    ):
    pool = get_pool()
    rows = await pool.fetch("""
        SELECT 
            sales_month,
            dealer_id,
            dealer_name,
            region_name,
            total_revenue,
            percent_growth,
            overall_rank,
            region_rank,
            performance_flag
        FROM
            mart_dealer_performance
        WHERE
            ($1::text IS NULL OR TO_CHAR(sales_month, 'YYYY-MM') = $1)
            AND ($2::text IS NULL OR region_name = $2)                    
        ORDER BY
            overall_rank
    """, month, region)
    return {
        "dealers": [
            {
                **dict(r),
                "total_revenue": float(r["total_revenue"]),
                "percent_growth": float(r["percent_growth"]) if r["percent_growth"] is not None else None,
            }
            for r in rows
        ]
    }