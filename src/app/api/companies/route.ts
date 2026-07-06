import { NextResponse } from "next/server";
import { seedIntakes } from "@/lib/data/seed";

export async function GET() {
  return NextResponse.json(seedIntakes.map((intake) => intake.company));
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    {
      id: crypto.randomUUID(),
      intakeStatus: "draft",
      profileStatus: "not_started",
      ...body
    },
    { status: 201 }
  );
}
