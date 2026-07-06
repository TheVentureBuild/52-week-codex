import { NextResponse } from "next/server";
import { generateCommercialPlan } from "@/lib/commercial/seed";
export async function POST(request: Request) {
  const body = await request.json();
  const operating = generateCommercialPlan(body.companyId ?? "healthcare-saas");
  return NextResponse.json({ ...operating, replannedAt: new Date().toISOString(), preservesCompletedWork: true }, { status: 201 });
}
