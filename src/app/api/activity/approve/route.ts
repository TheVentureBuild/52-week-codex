import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";
export async function POST(request: Request) {
  const body = await request.json();
  const result = { ...body, status: "approved", updatedAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: `activity.approve:${body.activityId ?? crypto.randomUUID()}`,
      entityType: "commercial_activity",
      entityId: body.activityId,
      status: "approved",
      payload: body,
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
