"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface Dealer {
  dealer_id: number;
  dealer_name: string;
  region_name: string;
  total_revenue: number;
  percent_growth: number | null;
  overall_rank: number;
  performance_flag: boolean;
}

export function TopDealersTable({ dealers }: { dealers: Dealer[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Dealers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Dealer</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealers.slice(0, 10).map((dealer) => (
              <TableRow key={dealer.dealer_id}>
                <TableCell>{dealer.overall_rank}</TableCell>
                <TableCell>{dealer.dealer_name}</TableCell>
                <TableCell>{dealer.region_name}</TableCell>
                <TableCell className="text-right">
                  ${dealer.total_revenue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {dealer.percent_growth !== null
                    ? `${dealer.percent_growth}%`
                    : "—"}
                </TableCell>
                <TableCell>
                  {dealer.performance_flag && (
                    <Badge variant="destructive">Flagged</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
