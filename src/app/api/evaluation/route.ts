import { NextResponse } from "next/server";
import { platformAnalytics } from "@/lib/platform/seed";
export async function GET() { return NextResponse.json({ hallucinationRate: platformAnalytics.hallucinationRate, evidenceCoverage: platformAnalytics.evidenceCoverage, latencyMs: platformAnalytics.latencyMs, errorRate: platformAnalytics.errorRate }); }
