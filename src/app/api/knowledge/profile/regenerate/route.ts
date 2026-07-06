import { NextResponse } from "next/server";
import { knowledgeBases } from "@/lib/knowledge/seed";
import { generateProfileFromIntake } from "@/lib/domain/profile-generator";

export async function POST(request: Request) {
  const body = await request.json();
  const base = knowledgeBases.find((item) => item.intake.company.id === body.companyId) ?? knowledgeBases[0];
  const profile = generateProfileFromIntake(base.intake);
  return NextResponse.json({
    ...profile,
    summary: `${profile.summary} Knowledge enrichment indicates ${base.health.documentCount} processed documents and ${base.health.extractedEntityCount} extracted entities.`,
    evidence: [...profile.evidence, "Module 2 knowledge repository", "Company knowledge graph"]
  });
}
