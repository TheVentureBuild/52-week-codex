import { NextResponse } from "next/server";
import { searchDocs } from "@/lib/docs/seed";
export async function POST(request:Request){const body=await request.json();return NextResponse.json(searchDocs(body.query??""))}
