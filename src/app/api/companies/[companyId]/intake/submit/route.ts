import { NextResponse } from "next/server";
import { submissionSchema } from "@/lib/validation/intake";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Submission is incomplete", issues: parsed.error.flatten() }, { status: 400 });
  }

  const result = {
    companyId,
    intakeStatus: "submitted",
    submittedAt: new Date().toISOString()
  };

  try {
    await persistAction({
      actionKey: `intake.submit:${companyId}`,
      entityType: "company",
      entityId: companyId,
      status: "submitted",
      payload: parsed.data,
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
