import { NextRequest, NextResponse } from "next/server";
import { getDealers } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const dealers = await getDealers({
    month: searchParams.get("month") ?? undefined,
    region: searchParams.get("region") ?? undefined,
  });
  return NextResponse.json({ dealers });
}
