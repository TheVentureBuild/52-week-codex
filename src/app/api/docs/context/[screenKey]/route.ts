import { NextResponse } from "next/server";
import { getContextHelp } from "@/lib/docs/seed";
export async function GET(_:Request,{params}:{params:Promise<{screenKey:string}>}){const{screenKey}=await params;return NextResponse.json(getContextHelp(screenKey))}
