import { NextResponse } from "next/server";
import { generateCommercialPlan } from "@/lib/commercial/seed";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const operating = generateCommercialPlan(body.companyId ?? "healthcare-saas");
  if (!operating) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  try {
    await persistAction({
      actionKey: `commercial-plan.generate:${body.companyId ?? "healthcare-saas"}`,
      entityType: "commercial_plan",
      entityId: body.companyId ?? "healthcare-saas",
      status: "generated",
      payload: body,
      result: operating as unknown as Record<string, unknown>
    });
    return NextResponse.json(operating, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
