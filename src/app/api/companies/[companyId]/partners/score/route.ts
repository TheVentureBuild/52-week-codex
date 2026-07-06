import { NextResponse } from "next/server";
import { getPartnerUniverse } from "@/lib/partners/seed";

export async function POST(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  return NextResponse.json({ scoredCount: universe.scores.length, scores: universe.scores }, { status: 201 });
}
