import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = {
    id: crypto.randomUUID(),
    status: "connected",
    connectedAt: new Date().toISOString(),
    ...body
  };
  try {
    await persistAction({
      actionKey: `knowledge.google-drive.connect:${body.companyId ?? result.id}`,
      entityType: "knowledge_source",
      entityId: body.companyId,
      status: "connected",
      payload: body,
      result
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
