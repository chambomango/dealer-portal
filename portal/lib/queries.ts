import { sql } from "@/lib/db";
import type { OverviewData, TrendPoint, Dealer } from "@/types";

export async function getOverview(): Promise<OverviewData> {
  const rows = await sql`
    SELECT
      COALESCE(SUM(transaction_count), 0) AS total_transactions,
      COALESCE(SUM(total_revenue), 0) AS total_revenue,
      COUNT(DISTINCT dealer_id) AS active_dealers,
      COALESCE(SUM(total_revenue)/NULLIF(SUM(transaction_count), 0), 0) AS avg_transaction_value
    FROM fact_dealer_daily
  `;
  const row = rows[0];
  return {
    total_transactions: Number(row.total_transactions),
    total_revenue: Number(row.total_revenue),
    active_dealers: Number(row.active_dealers),
    avg_transaction_value: Math.round(Number(row.avg_transaction_value) * 100) / 100,
  };
}

export async function getTrends(): Promise<TrendPoint[]> {
  const rows = await sql`
    SELECT
      DATE_TRUNC('month', transaction_date) AS sales_month,
      SUM(total_revenue) AS total_revenue,
      SUM(total_revenue)/NULLIF(SUM(transaction_count), 0) AS avg_transaction_value,
      SUM(transaction_count) AS total_transactions,
      COUNT(DISTINCT dealer_id) AS active_dealers
    FROM fact_dealer_daily
    GROUP BY sales_month
    ORDER BY sales_month
  `;
  return rows.map((r) => ({
    sales_month: new Date(r.sales_month).toISOString().slice(0, 10),
    total_revenue: Number(r.total_revenue),
    avg_transaction_value: Math.round(Number(r.avg_transaction_value) * 100) / 100,
    total_transactions: Number(r.total_transactions),
    active_dealers: Number(r.active_dealers),
  }));
}

export async function getDealers(params: {
  month?: string;
  region?: string;
}): Promise<Dealer[]> {
  const month = params.month ?? null;
  const region = params.region ?? null;
  const rows = await sql`
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
    FROM mart_dealer_performance
    WHERE (${month}::text IS NULL OR TO_CHAR(sales_month, 'YYYY-MM') = ${month})
      AND (${region}::text IS NULL OR region_name = ${region})
    ORDER BY overall_rank
  `;
  return rows.map((r) => ({
    sales_month: new Date(r.sales_month).toISOString().slice(0, 10),
    dealer_id: Number(r.dealer_id),
    dealer_name: r.dealer_name,
    region_name: r.region_name,
    total_revenue: Number(r.total_revenue),
    percent_growth: r.percent_growth === null ? null : Number(r.percent_growth),
    overall_rank: Number(r.overall_rank),
    region_rank: Number(r.region_rank),
    performance_flag: r.performance_flag,
  }));
}
