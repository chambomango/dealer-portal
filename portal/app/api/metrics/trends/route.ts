import { NextResponse } from "next/server";
import { getTrends } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const trends = await getTrends();
  return NextResponse.json({ trends });
}
