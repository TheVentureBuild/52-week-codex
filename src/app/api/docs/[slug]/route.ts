import { NextResponse } from "next/server";
import { docArticles } from "@/lib/docs/seed";
export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){const{slug}=await params;const article=docArticles.find(a=>a.slug===slug);if(!article)return NextResponse.json({error:"Not found"},{status:404});return NextResponse.json(article)}
