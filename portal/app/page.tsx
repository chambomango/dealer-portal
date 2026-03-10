import KPICards from "@/components/kpiCards";
import { RevenueChart } from "@/components/revenueChart";
import { TransactionVolumeChart } from "@/components/transactionVolumeChart";
import { AvgTransactionValueChart } from "@/components/avgTransactionValueChart";
import { OverviewData, TrendPoint } from "@/types";

const API_BASE = process.env.DEALER_PORTAL_API_BASE;

async function getOverview(): Promise<OverviewData> {
  const res = await fetch(`${API_BASE}/api/metrics/overview`, {
    cache: "no-store",
  });
  return res.json();
}

async function getTrends(): Promise<TrendPoint[]> {
  const res = await fetch(`${API_BASE}/api/metrics/trends`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.trends;
}

export default async function Dashboard() {
  const [overview, trends] = await Promise.all([getOverview(), getTrends()]);

  const kpis = [
    {
      label: "Lifetime Revenue",
      value: `$${overview.total_revenue.toLocaleString()}`,
    },
    {
      label: "Lifetime Transactions",
      value: overview.total_transactions,
    },
    {
      label: "Average Transaction Price",
      value: `$${overview.avg_transaction_value.toLocaleString()}`,
    },
    { label: "Active Dealers", value: overview.active_dealers },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <h1 className="text-3xl font-bold">Performance Summary</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Key Metrics
        </h2>
        <h3>All-time cumulative figures</h3>
        <KPICards kpis={kpis} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-muted-foreground">Trends</h2>
        <RevenueChart data={trends} />
        <div className="grid grid-cols-2 gap-4">
          <TransactionVolumeChart data={trends} />
          <AvgTransactionValueChart data={trends} />
        </div>
      </section>
    </div>
  );
}
