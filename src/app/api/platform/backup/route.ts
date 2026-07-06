import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ backupId: crypto.randomUUID(), status: "queued", createdAt: new Date().toISOString() }, { status: 202 }); }
