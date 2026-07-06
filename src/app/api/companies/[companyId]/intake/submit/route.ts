import { NextResponse } from "next/server";
import { submissionSchema } from "@/lib/validation/intake";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Submission is incomplete", issues: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    companyId,
    intakeStatus: "submitted",
    submittedAt: new Date().toISOString()
  });
}
