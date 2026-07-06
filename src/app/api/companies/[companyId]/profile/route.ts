import { NextResponse } from "next/server";
import { seedIntakes } from "@/lib/data/seed";
import { generateProfileFromIntake } from "@/lib/domain/profile-generator";

export async function GET(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  return NextResponse.json(generateProfileFromIntake(intake));
}
