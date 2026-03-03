interface OverviewData {
  total_transactions: number;
  total_revenue: number;
  active_dealers: number;
  avg_transaction_value: number;
}

async function getOverview(): Promise<OverviewData> {
  const res = await fetch("http://localhost:8000/api/metrics/overview", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Dashboard() {
  const data = await getOverview();

  const kpis = [
    {
      label: "Total Revenue",
      value: `$${data.total_revenue.toLocaleString()}`,
    },
    { label: "Active Dealers", value: data.active_dealers },
    { label: "Transactions", value: data.total_transactions },
    {
      label: "Avg Transaction",
      value: `$${data.avg_transaction_value.toLocaleString()}`,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Dealer Performance Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
