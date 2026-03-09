import KPICards from "@/components/kpiCards";
import { RevenueChart, TrendPoint } from "@/components/revenueChart";
import { Dealer, TopDealersTable } from "@/components/topDealersTable";

interface OverviewData {
  total_transactions: number;
  total_revenue: number;
  active_dealers: number;
  avg_transaction_value: number;
}

const API_BASE = process.env.DEALER_PORTAL_API_BASE;

async function getOverview(): Promise<OverviewData> {
  const res = await fetch(`${API_BASE}/api/metrics/overview`, {
    cache: "no-store",
  });
  return res.json();
}

async function getTrends() {
  const res = await fetch(`${API_BASE}/api/metrics/trends`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.trends;
}

async function getDealers() {
  const res = await fetch(`${API_BASE}/api/dealers?month=2025-02`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.dealers;
}

export default async function Dashboard() {
  const [overview, trends, dealers] = (await Promise.all([
    getOverview(),
    getTrends(),
    getDealers(),
  ])) as [OverviewData, TrendPoint[], Dealer[]];
  const kpis = [
    {
      label: "Total Revenue",
      value: `$${overview.total_revenue.toLocaleString()}`,
    },
    { label: "Active Dealers", value: overview.active_dealers },
    { label: "Transactions", value: overview.total_transactions },
    {
      label: "Avg Transaction",
      value: `$${overview.avg_transaction_value.toLocaleString()}`,
    },
  ];

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Telecom Company Performance Dashboard
      </h1>
      <section className="mt-20">
        <h2>Key Performance Indicators</h2>
        <KPICards kpis={kpis} />
      </section>
      <section className="mt-20">
        <h2>Current Month Metrics</h2>
        <TopDealersTable dealers={dealers} />
      </section>
      <section className="mt-20">
        <h2>Yearly Metrics</h2>
        <RevenueChart data={trends} />
      </section>
    </main>
  );
}
