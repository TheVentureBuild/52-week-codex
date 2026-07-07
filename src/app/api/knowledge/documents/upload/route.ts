import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = {
    id: crypto.randomUUID(),
    processingStage: "queued",
    sourceType: "upload",
    confidenceScore: 0,
    uploadedAt: new Date().toISOString(),
    ...body
  };
  try {
    await persistAction({
      actionKey: `knowledge.upload:${result.id}`,
      entityType: "knowledge_document",
      entityId: result.id,
      status: "queued",
      payload: body,
      result,
      updateState: false
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
