import { NextResponse } from "next/server";

export async function POST(_: Request, { params }: { params: Promise<{ companyId: string; recommendationId: string }> }) {
  const { companyId, recommendationId } = await params;
  return NextResponse.json({ companyId, recommendationId, status: "rejected", updatedAt: new Date().toISOString() });
}
