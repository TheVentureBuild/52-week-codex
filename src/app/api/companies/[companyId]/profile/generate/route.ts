import { NextResponse } from "next/server";
import { seedIntakes } from "@/lib/data/seed";
import { generateCompanyProfile } from "@/lib/ai/adapters";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  const profile = await generateCompanyProfile(intake);
  try {
    await persistAction({
      actionKey: `profile.generate:${companyId}`,
      entityType: "company_profile",
      entityId: companyId,
      status: "generated",
      payload: { companyId },
      result: profile as unknown as Record<string, unknown>
    });
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
