import { NextResponse } from "next/server";
import { getPartnerUniverse } from "@/lib/partners/seed";

export async function GET(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  return NextResponse.json(universe.recommendations);
}
