"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendPoint } from "@/types";

const chartConfig = {
  avg_transaction_value: {
    label: "Price",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function AvgTransactionValueChart({ data }: { data: TrendPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Avg Transaction Price
        </CardTitle>
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
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                label={{
                  value: "Value ($)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="avg_transaction_value"
                stroke="var(--color-avg_transaction_value)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
