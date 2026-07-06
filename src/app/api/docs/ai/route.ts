import { NextResponse } from "next/server";
import { answerDocsQuestion } from "@/lib/docs/seed";
export async function POST(request:Request){const body=await request.json();return NextResponse.json(answerDocsQuestion(body.question??""))}
