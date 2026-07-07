import { NextResponse } from "next/server";
import { knowledgeBases } from "@/lib/knowledge/seed";
import { generateProfileFromIntake } from "@/lib/domain/profile-generator";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request) {
  const body = await request.json();
  const base = knowledgeBases.find((item) => item.intake.company.id === body.companyId) ?? knowledgeBases[0];
  const profile = generateProfileFromIntake(base.intake);
  const result = {
    ...profile,
    summary: `${profile.summary} Knowledge enrichment indicates ${base.health.documentCount} processed documents and ${base.health.extractedEntityCount} extracted entities.`,
    evidence: [...profile.evidence, "Module 2 knowledge repository", "Company knowledge graph"]
  };
  try {
    await persistAction({
      actionKey: `knowledge.profile.regenerate:${body.companyId ?? base.intake.company.id}`,
      entityType: "knowledge_profile",
      entityId: body.companyId ?? base.intake.company.id,
      status: "regenerated",
      payload: body,
      result
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
