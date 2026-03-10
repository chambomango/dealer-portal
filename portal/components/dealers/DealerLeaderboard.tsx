"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatMonth } from "@/lib/formatters";
import { Dealer } from "@/types";
import DealerTable from "@/components/dealers/DealerTable";

interface DealerLeaderboardProps {
  dealers: Dealer[];
}

export function DealerLeaderboard({ dealers }: DealerLeaderboardProps) {
  const months = useMemo(() => {
    const unique = Array.from(
      new Set(dealers.map((d) => d.sales_month.slice(0, 7))),
    );
    return unique.sort();
  }, [dealers]);

  const regions = useMemo(() => {
    const unique = Array.from(new Set(dealers.map((d) => d.region_name)));
    return unique.sort();
  }, [dealers]);

  const [selectedMonth, setSelectedMonth] = useState<string>(
    months[months.length - 1] ?? "",
  );
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const currentIndex = months.indexOf(selectedMonth);

  const filteredDealers = useMemo(
    () =>
      dealers
        .filter((d) => d.sales_month.startsWith(selectedMonth))
        .filter(
          (d) => selectedRegion === "all" || d.region_name === selectedRegion,
        )
        .sort((a, b) => a.overall_rank - b.overall_rank),
    [dealers, selectedMonth, selectedRegion],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="px-4 mb-2">Leaderboard</CardTitle>
        <div className="flex justify-between gap-8 items-center px-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 select-none">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedMonth(months[currentIndex - 1])}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-36 text-center">
              {selectedMonth ? formatMonth(selectedMonth) : ""}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSelectedMonth(months[currentIndex + 1])}
              disabled={currentIndex >= months.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="px-4">
          <DealerTable dealers={filteredDealers} />
        </div>
      </CardContent>
    </Card>
  );
}
