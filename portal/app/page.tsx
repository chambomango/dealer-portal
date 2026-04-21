import KPICards from "@/components/kpiCards";
import { RevenueChart } from "@/components/revenueChart";
import { TransactionVolumeChart } from "@/components/transactionVolumeChart";
import { AvgTransactionValueChart } from "@/components/avgTransactionValueChart";
import { getOverview, getTrends } from "@/lib/queries";

export default async function Dashboard() {
  const [overview, trends] = await Promise.all([getOverview(), getTrends()]);

  const kpis = [
    {
      label: "Total Revenue",
      value: `$${overview.total_revenue.toLocaleString()}`,
    },
    {
      label: "Total Transactions",
      value: overview.total_transactions,
    },
    {
      label: "Average Transaction Price",
      value: `$${overview.avg_transaction_value.toLocaleString()}`,
    },
    { label: "Active Dealers", value: overview.active_dealers },
  ];

  return (
    <div className="space-y-10 mt-4 ml-10 mr-20">
      <h1 className="text-3xl font-bold">Performance Summary</h1>

      <section className="space-y-5">
        <div className="pb-3">
          <h2 className="text-xl font-semibold">Key Metrics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            All-time cumulative figures
          </p>
        </div>
        <KPICards kpis={kpis} />
      </section>

      <section className="space-y-6">
        <div className="pb-3">
          <h2 className="text-xl font-semibold">Monthly Trends</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Revenue, volume, and pricing over time
          </p>
        </div>
        <RevenueChart data={trends} />
        <div className="grid grid-cols-2 gap-8">
          <TransactionVolumeChart data={trends} />
          <AvgTransactionValueChart data={trends} />
        </div>
      </section>
    </div>
  );
}
