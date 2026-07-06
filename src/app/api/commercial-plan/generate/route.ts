import { NextResponse } from "next/server";
import { generateCommercialPlan } from "@/lib/commercial/seed";

export async function POST(request: Request) {
  const body = await request.json();
  const operating = generateCommercialPlan(body.companyId ?? "healthcare-saas");
  if (!operating) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  return NextResponse.json(operating, { status: 201 });
}
