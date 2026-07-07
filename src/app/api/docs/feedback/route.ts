import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const result = { id: crypto.randomUUID(), ...body, createdAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: `docs.feedback:${body.slug ?? result.id}`,
      entityType: "documentation_feedback",
      entityId: body.slug,
      status: "saved",
      payload: body,
      result,
      updateState: false
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
