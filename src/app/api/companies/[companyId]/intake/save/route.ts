import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  const result = {
    companyId,
    intakeStatus: "draft",
    savedAt: new Date().toISOString(),
    draft: body
  };

  try {
    await persistAction({
      actionKey: `intake.save:${companyId}`,
      entityType: "company",
      entityId: companyId,
      status: "draft_saved",
      payload: body,
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
