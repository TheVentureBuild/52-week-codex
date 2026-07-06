import { NextResponse } from "next/server";
import { knowledgeBases } from "@/lib/knowledge/seed";

export async function GET(request: Request) {
  const companyId = new URL(request.url).searchParams.get("companyId");
  const base = knowledgeBases.find((item) => item.intake.company.id === companyId) ?? knowledgeBases[0];
  return NextResponse.json(base.personas);
}
