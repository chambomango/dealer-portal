"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendPoint } from "@/types";

const chartConfig = {
  total_transactions: {
    label: "Transactions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TransactionVolumeChart({ data }: { data: TrendPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Monthly Transaction Volume
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="sales_month"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 7)}
                tick={{ fontSize: 11 }}
                height={34}
                label={{
                  value: "Month",
                  position: "insideBottom",
                  offset: -5,
                  style: { fontSize: 12, fill: "var(--muted-foreground)" },
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[
                  (dataMin: number) => dataMin * 0.95,
                  (dataMax: number) => dataMax * 1.05,
                ]}
                tick={{ fontSize: 11 }}
                label={{
                  value: "Transactions",
                  angle: -90,
                  position: "insideLeft",
                  offset: 6,
                  style: { fontSize: 12, fill: "var(--muted-foreground)" },
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="total_transactions"
                fill="var(--color-total_transactions)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
