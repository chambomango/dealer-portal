import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { Dealer } from "@/types";

interface DealerTableProps {
  dealers: Dealer[];
}

export default function DealerTable({ dealers }: DealerTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Rank</TableHead>
          <TableHead>Dealer</TableHead>
          <TableHead>Region</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
          <TableHead className="text-right">Growth</TableHead>
          <TableHead>Health</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dealers.map((dealer) => (
          <TableRow key={dealer.dealer_id}>
            <TableCell className="font-medium">{dealer.overall_rank}</TableCell>
            <TableCell>{dealer.dealer_name}</TableCell>
            <TableCell>{dealer.region_name}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(dealer.total_revenue)}
            </TableCell>
            <TableCell
              className={`text-right ${
                dealer.percent_growth === null
                  ? ""
                  : dealer.percent_growth > 0
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {formatPercent(dealer.percent_growth)}
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
  );
}
