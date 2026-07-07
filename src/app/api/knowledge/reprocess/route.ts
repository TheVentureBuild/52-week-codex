import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = {
    jobId: crypto.randomUUID(),
    processingStage: "queued",
    restartable: true,
    queuedAt: new Date().toISOString(),
    ...body
  };
  try {
    await persistAction({
      actionKey: `knowledge.reprocess:${body.documentId ?? result.jobId}`,
      entityType: "knowledge_processing_job",
      entityId: result.jobId,
      status: "queued",
      payload: body,
      result
    });
    return NextResponse.json(result, { status: 202 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
