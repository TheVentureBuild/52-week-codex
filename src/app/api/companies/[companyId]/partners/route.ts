import { NextResponse } from "next/server";
import { getRankedPartnerRows } from "@/lib/partners/seed";

export async function GET(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  return NextResponse.json(getRankedPartnerRows(companyId));
}
