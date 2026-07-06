import { NextResponse } from "next/server";
import { defaultCommercialActivityCategories, defaultCommercialTemplates, defaultKnowledgeSettings, defaultPartnerScoringWeights, defaultPartnerTypes } from "@/lib/config/defaults";
export async function GET() { return NextResponse.json({ defaultPartnerScoringWeights, defaultKnowledgeSettings, defaultPartnerTypes, defaultCommercialActivityCategories, defaultCommercialTemplates }); }
export async function PATCH(request: Request) { return NextResponse.json({ ...(await request.json()), updatedAt: new Date().toISOString() }); }
