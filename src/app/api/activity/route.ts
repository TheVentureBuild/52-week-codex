import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function PATCH(request: Request) {
  const body = await request.json();
  const result = { ...body, updatedAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: `activity.update:${body.activityId ?? crypto.randomUUID()}`,
      entityType: "commercial_activity",
      entityId: body.activityId,
      status: body.status ?? "updated",
      payload: body,
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
