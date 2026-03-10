import { DealerLeaderboard } from "@/components/dealers/DealerLeaderboard";
import { Dealer } from "@/types";

const API_BASE = process.env.DEALER_PORTAL_API_BASE;

async function getDealers(): Promise<Dealer[]> {
  const res = await fetch(`${API_BASE}/api/dealers`, { cache: "no-store" });
  const data = await res.json();
  return data.dealers;
}

export default async function DealersPage() {
  const dealers = await getDealers();
  return (
    <div className="space-y-6 mt-4 ml-10 mr-20">
      <h1 className="text-3xl font-bold">Dealer Leaderboard</h1>
      <section className="space-y-4">
        <DealerLeaderboard dealers={dealers} />
      </section>
    </div>
  );
}
