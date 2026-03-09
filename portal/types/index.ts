export interface OverviewData {
  total_transactions: number
  total_revenue: number
  active_dealers: number
  avg_transaction_value: number
}

export interface TrendPoint {
  sales_month: string
  total_revenue: number
  avg_transaction_value: number
  total_transactions: number
  active_dealers: number
}

export interface Dealer {
  dealer_id: number
  dealer_name: string
  region_name: string
  total_revenue: number
  percent_growth: number | null
  overall_rank: number
  region_rank: number
  performance_flag: boolean
  sales_month: string
}
