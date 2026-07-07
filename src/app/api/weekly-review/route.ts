import { NextResponse } from "next/server";
import { generateCommercialPlan } from "@/lib/commercial/seed";
import { persistAction, persistenceError } from "@/lib/persistence/actions";
export async function POST(request: Request) {
  const body = await request.json();
  const operating = generateCommercialPlan(body.companyId ?? "healthcare-saas");
  const result = operating?.weeklyReviews[0];
  if (!result) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  try {
    await persistAction({
      actionKey: `weekly-review.regenerate:${body.companyId ?? "healthcare-saas"}`,
      entityType: "weekly_review",
      entityId: result.id,
      status: "generated",
      payload: body,
      result: result as unknown as Record<string, unknown>
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
