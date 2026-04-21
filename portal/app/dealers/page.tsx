import { DealerLeaderboard } from "@/components/dealers/DealerLeaderboard";
import { getDealers } from "@/lib/queries";

export default async function DealersPage() {
  const dealers = await getDealers({});
  return (
    <div className="space-y-6 mt-4 ml-10 mr-20">
      <h1 className="text-3xl font-bold">Dealer Leaderboard</h1>
      <section className="space-y-4">
        <DealerLeaderboard dealers={dealers} />
      </section>
    </div>
  );
}
