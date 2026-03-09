import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface KPI {
  label: string;
  value: string | number;
}

export default function KPICards({ kpis }: { kpis: KPI[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{kpi.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
