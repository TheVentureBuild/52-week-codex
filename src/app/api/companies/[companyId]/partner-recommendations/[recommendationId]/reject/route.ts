import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(_: Request, { params }: { params: Promise<{ companyId: string; recommendationId: string }> }) {
  const { companyId, recommendationId } = await params;
  const result = { companyId, recommendationId, status: "rejected", updatedAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: `partner-recommendation.reject:${recommendationId}`,
      entityType: "partner_recommendation",
      entityId: recommendationId,
      status: "rejected",
      payload: { companyId, recommendationId },
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
