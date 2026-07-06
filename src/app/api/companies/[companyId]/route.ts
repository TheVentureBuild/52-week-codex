import { NextResponse } from "next/server";
import { seedIntakes } from "@/lib/data/seed";

export async function GET(_: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  return NextResponse.json(intake);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  return NextResponse.json({ id: companyId, ...body, updatedAt: new Date().toISOString() });
}
