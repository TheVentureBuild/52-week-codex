import { NextResponse } from "next/server";
import { generateCommercialPlan } from "@/lib/commercial/seed";

export async function GET(request: Request) {
  const companyId = new URL(request.url).searchParams.get("companyId") ?? "healthcare-saas";
  const operating = generateCommercialPlan(companyId);
  if (!operating) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  return NextResponse.json(operating);
}
