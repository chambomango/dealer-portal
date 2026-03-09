"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  total_revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export interface TrendPoint {
  sales_month: string;
  total_revenue: number;
}

export function RevenueChart({ data }: { data: TrendPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="sales_month"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 7)}
                label={{ value: "Month", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[(dataMin: number) => dataMin * 0.95, "auto"]}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                label={{ value: "Revenue", angle: -90, position: "insideLeft" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="total_revenue"
                stroke="var(--color-total_revenue)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
