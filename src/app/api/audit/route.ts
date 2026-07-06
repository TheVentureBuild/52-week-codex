import { NextResponse } from "next/server";
import { auditEvents } from "@/lib/platform/seed";
export async function GET() { return NextResponse.json(auditEvents); }
