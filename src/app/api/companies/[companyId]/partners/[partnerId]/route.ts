import { NextResponse } from "next/server";
import { getRankedPartnerRows } from "@/lib/partners/seed";

export async function GET(_: Request, { params }: { params: Promise<{ companyId: string; partnerId: string }> }) {
  const { companyId, partnerId } = await params;
  const row = getRankedPartnerRows(companyId).find((item) => item.partner.id === partnerId);
  if (!row) return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  return NextResponse.json(row);
}
