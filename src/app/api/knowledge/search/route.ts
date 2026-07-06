import { NextResponse } from "next/server";
import { knowledgeBases } from "@/lib/knowledge/seed";
import { searchKnowledge } from "@/lib/knowledge/synthesis";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const companyId = url.searchParams.get("companyId");
  const query = url.searchParams.get("q") ?? "";
  const base = knowledgeBases.find((item) => item.intake.company.id === companyId) ?? knowledgeBases[0];
  return NextResponse.json(searchKnowledge(query, base.documents, base.entities, base.relationships));
}
