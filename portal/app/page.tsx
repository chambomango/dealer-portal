import KPICards from "@/components/kpiCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const res = await fetch(`${API_BASE}/api/dealers`, { cache: "no-store" });
  const data = await res.json();
  return data.dealers;
}

export default async function Dashboard() {
  const [overview, trends, dealers] = await Promise.all([
    getOverview(),
    getTrends(),
    getDealers(),
  ]);
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
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Dealer Performance Dashboard</h1>
      <KPICards kpis={kpis} />
    </main>
  );
}
