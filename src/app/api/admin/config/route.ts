import { NextResponse } from "next/server";
import { defaultCommercialActivityCategories, defaultCommercialTemplates, defaultKnowledgeSettings, defaultModelRouting, defaultPartnerScoringWeights, defaultPartnerTypes, defaultScoringWeights, moduleFourPromptRegistry, moduleThreePromptRegistry, moduleTwoPromptRegistry } from "@/lib/config/defaults";

export async function GET() {
  return NextResponse.json({
    modelRouting: defaultModelRouting,
    scoringWeights: defaultScoringWeights,
    partnerScoringWeights: defaultPartnerScoringWeights,
    partnerTypes: defaultPartnerTypes,
    commercialActivityCategories: defaultCommercialActivityCategories,
    commercialTemplates: defaultCommercialTemplates,
    knowledgeSettings: defaultKnowledgeSettings,
    moduleTwoPromptRegistry,
    moduleThreePromptRegistry,
    moduleFourPromptRegistry,
    featureFlags: {
      founderIntakeWizard: true,
      mockAiProfileGeneration: true,
      documentUploadMetadata: true,
      externalResearchEnrichment: false
    }
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({ ...body, updatedAt: new Date().toISOString() });
}
