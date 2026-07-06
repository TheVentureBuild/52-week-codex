import { NextResponse } from "next/server";
import { seedIntakes } from "@/lib/data/seed";
import { generateCompanyProfile } from "@/lib/ai/adapters";

export async function POST(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  const profile = await generateCompanyProfile(intake);
  return NextResponse.json(profile, { status: 201 });
}
