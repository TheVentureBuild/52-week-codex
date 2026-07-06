import { NextResponse } from "next/server";
import { releaseNotes } from "@/lib/docs/seed";
export async function GET(){return NextResponse.json(releaseNotes)}
