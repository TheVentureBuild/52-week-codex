import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    id: crypto.randomUUID(),
    status: "connected",
    connectedAt: new Date().toISOString(),
    ...body
  }, { status: 201 });
}
