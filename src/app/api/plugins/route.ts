import { NextResponse } from "next/server";
import { plugins } from "@/lib/platform/seed";
export async function GET() { return NextResponse.json(plugins); }
export async function PATCH(request: Request) { return NextResponse.json({ ...(await request.json()), updatedAt: new Date().toISOString() }); }
