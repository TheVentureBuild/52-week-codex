import { NextResponse } from "next/server";
import { learningEvents } from "@/lib/platform/seed";
export async function POST() { return NextResponse.json({ recalculated: true, events: learningEvents, updatedAt: new Date().toISOString() }, { status: 201 }); }
