import { NextResponse } from "next/server";
import { generateCommercialPlan } from "@/lib/commercial/seed";
export async function GET(request: Request) {
  const companyId = new URL(request.url).searchParams.get("companyId") ?? "healthcare-saas";
  return NextResponse.json(generateCommercialPlan(companyId)?.relationshipPaths ?? []);
}
