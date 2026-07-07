import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(_: Request, { params }: { params: Promise<{ companyId: string; recommendationId: string }> }) {
  const { companyId, recommendationId } = await params;
  const result = { companyId, recommendationId, status: "approved", updatedAt: new Date().toISOString() };
  try {
    await persistAction({
      actionKey: `partner-recommendation.approve:${recommendationId}`,
      entityType: "partner_recommendation",
      entityId: recommendationId,
      status: "approved",
      payload: { companyId, recommendationId },
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
