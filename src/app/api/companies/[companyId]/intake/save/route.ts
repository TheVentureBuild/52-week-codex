import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  return NextResponse.json({
    companyId,
    intakeStatus: "draft",
    savedAt: new Date().toISOString(),
    draft: body
  });
}
