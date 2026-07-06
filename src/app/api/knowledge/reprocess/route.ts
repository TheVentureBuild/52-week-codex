import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    jobId: crypto.randomUUID(),
    processingStage: "queued",
    restartable: true,
    queuedAt: new Date().toISOString(),
    ...body
  }, { status: 202 });
}
