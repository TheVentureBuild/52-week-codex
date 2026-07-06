import { NextResponse } from "next/server";
export async function POST(request:Request){return NextResponse.json({id:crypto.randomUUID(),...(await request.json()),createdAt:new Date().toISOString()},{status:201})}
