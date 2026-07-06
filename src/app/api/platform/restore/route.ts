import { NextResponse } from "next/server";
export async function POST(request: Request) { return NextResponse.json({ ...(await request.json()), status: "queued", createdAt: new Date().toISOString() }, { status: 202 }); }
