import { NextResponse } from "next/server";
import { prompts } from "@/lib/platform/seed";
export async function GET() { return NextResponse.json(prompts); }
export async function PATCH(request: Request) { return NextResponse.json({ ...(await request.json()), versionCreated: true, updatedAt: new Date().toISOString() }); }
