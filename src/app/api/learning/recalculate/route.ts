import { NextResponse } from "next/server";
import { learningEvents } from "@/lib/platform/seed";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST() {
  const result = { recalculated: true, events: learningEvents, updatedAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: "learning.recalculate",
      entityType: "learning_engine",
      entityId: "global",
      status: "recalculated",
      payload: {},
      result: result as unknown as Record<string, unknown>
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
