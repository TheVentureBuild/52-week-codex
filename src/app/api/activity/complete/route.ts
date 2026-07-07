import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";
export async function POST(request: Request) {
  const body = await request.json();
  const result = { ...body, status: "completed", completedAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: `activity.complete:${body.activityId ?? crypto.randomUUID()}`,
      entityType: "commercial_activity",
      entityId: body.activityId,
      status: "completed",
      payload: body,
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
