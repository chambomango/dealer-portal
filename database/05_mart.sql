CREATE VIEW mart_dealer_performance AS

    WITH dealer_monthly AS (
        SELECT 
            DATE_TRUNC('month', transaction_date) AS sales_month,
            dealer_id,
            region_id,
            SUM(transaction_count) AS transaction_count,
            SUM(total_units) AS total_units,
            SUM(total_revenue) AS total_revenue,
            SUM(total_revenue) / NULLIF(SUM(transaction_count), 0) AS avg_transaction_value
        FROM fact_dealer_daily
            GROUP BY 
                sales_month,
                dealer_id,
                region_id
    ),
    dealer_monthly_ranked AS (
        SELECT 
            *,
            LAG(total_revenue) OVER (
                PARTITION BY dealer_id 
                ORDER BY sales_month
            ) AS prev_total_revenue,
            RANK() OVER (PARTITION BY sales_month ORDER BY total_revenue DESC) as overall_rank,
            RANK() OVER (PARTITION BY sales_month, region_id ORDER BY total_revenue DESC) as region_rank
        FROM dealer_monthly
    ),
    dealer_monthly_analytics AS (
        SELECT 
            *, 
            Round((total_revenue - prev_total_revenue) / NULLIF(prev_total_revenue, 0) * 100, 2) as percent_growth
        FROM dealer_monthly_ranked
    )
    SELECT
        ma.sales_month,
        ma.dealer_id,
        dd.dealer_name,
        ma.region_id,
        dr.region_name,
        ma.transaction_count,
        ma.total_units,
        ma.total_revenue,
        ma.avg_transaction_value,
        ma.prev_total_revenue,
        ma.percent_growth,
        ma.region_rank,
        ma.overall_rank,
        COALESCE(ma.percent_growth < -20, FALSE) AS performance_flag
    FROM
        dealer_monthly_analytics ma
    JOIN dim_dealers dd
        ON dd.dealer_id = ma.dealer_id
    JOIN dim_regions dr
        ON dr.region_id = ma.region_id
;