import { NextResponse } from "next/server";
import { defaultModelRouting, defaultScoringWeights } from "@/lib/config/defaults";

export async function GET() {
  return NextResponse.json({
    modelRouting: defaultModelRouting,
    scoringWeights: defaultScoringWeights,
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
