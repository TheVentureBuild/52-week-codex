import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    id: crypto.randomUUID(),
    processingStage: "queued",
    sourceType: "upload",
    confidenceScore: 0,
    uploadedAt: new Date().toISOString(),
    ...body
  }, { status: 201 });
}
