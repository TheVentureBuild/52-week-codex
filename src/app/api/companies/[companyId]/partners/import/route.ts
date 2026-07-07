import { NextResponse } from "next/server";
import { persistAction, persistenceError } from "@/lib/persistence/actions";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const body = await request.json();
  const rows = body.rows ?? [];
  const result = {
    id: crypto.randomUUID(),
    companyId,
    sourceType: body.sourceType ?? "manual",
    status: "completed",
    importedCount: Array.isArray(rows) ? rows.length : 1,
    failedCount: 0,
    errors: [],
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  };
  try {
    await persistAction({
      actionKey: `partners.import:${companyId}:${result.id}`,
      entityType: "partner_import_job",
      entityId: result.id,
      status: "completed",
      payload: body,
      result,
      updateState: false
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(persistenceError(error), { status: 500 });
  }
}
