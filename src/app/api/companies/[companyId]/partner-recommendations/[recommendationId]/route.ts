import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ companyId: string; recommendationId: string }> }) {
  const { companyId, recommendationId } = await params;
  const body = await request.json();
  return NextResponse.json({ companyId, recommendationId, ...body, updatedAt: new Date().toISOString() });
}
