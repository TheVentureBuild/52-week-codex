import { NextResponse } from "next/server";
import { platformAnalytics } from "@/lib/platform/seed";
export async function GET() { return NextResponse.json(platformAnalytics); }
