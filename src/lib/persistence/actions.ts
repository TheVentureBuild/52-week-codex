import { createAdminClient } from "@/lib/supabase/admin";

type PersistActionInput = {
  actionKey: string;
  entityType?: string;
  entityId?: string;
  status?: string;
  payload?: Record<string, unknown>;
  result?: Record<string, unknown>;
  updateState?: boolean;
};

export async function persistAction(input: PersistActionInput) {
  const supabase = createAdminClient();
  const event = {
    action_key: input.actionKey,
    entity_type: input.entityType ?? null,
    entity_id: input.entityId ?? null,
    status: input.status ?? "completed",
    payload: input.payload ?? {},
    result: input.result ?? {}
  };

  const { data, error } = await supabase.from("ui_action_events").insert(event).select().single();
  if (error) throw new Error(error.message);

  if (input.updateState ?? true) {
    const { error: stateError } = await supabase.from("ui_action_state").upsert({
      action_key: input.actionKey,
      entity_type: input.entityType ?? null,
      entity_id: input.entityId ?? null,
      status: input.status ?? "saved",
      payload: input.payload ?? {},
      result: input.result ?? {},
      updated_at: new Date().toISOString()
    });
    if (stateError) throw new Error(stateError.message);
  }

  return data;
}

export function persistenceError(error: unknown) {
  return {
    error: error instanceof Error ? error.message : "Persistence failed"
  };
}
