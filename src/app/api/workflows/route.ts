import { NextResponse } from "next/server";
import { commercialTemplates } from "@/lib/commercial/seed";
export async function GET() { return NextResponse.json(commercialTemplates); }
export async function PATCH(request: Request) { return NextResponse.json({ ...(await request.json()), newVersion: true, updatedAt: new Date().toISOString() }); }
