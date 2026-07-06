import { NextResponse } from "next/server";
import { docArticles } from "@/lib/docs/seed";
export async function GET(){return NextResponse.json(docArticles.find(a=>a.slug==="api-reference"))}
