import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  const rows = body.rows ?? [];
  return NextResponse.json({
    id: crypto.randomUUID(),
    companyId,
    sourceType: body.sourceType ?? "manual",
    status: "completed",
    importedCount: Array.isArray(rows) ? rows.length : 1,
    failedCount: 0,
    errors: [],
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  }, { status: 201 });
}
