import { AppShell } from "@/components/app-shell";
import { Badge, Card, Field, ToggleField } from "@/components/ui";
import { defaultModelRouting, defaultScoringWeights } from "@/lib/config/defaults";

export default function AdminPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">Admin configuration</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Configuration Foundation</h2>
        <p className="mt-2 text-sm text-muted-foreground">Seed configuration for providers, model routing, prompt registry, intake field definitions, feature flags, and scoring weights.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">AI Provider Routing</h3>
          <div className="grid gap-4">
            <Field label="Use case" value="company_profile_generation" />
            <Field label="Provider" value={defaultModelRouting.company_profile_generation.provider} />
            <Field label="Model" value={defaultModelRouting.company_profile_generation.model} />
            <Field label="Prompt key" value={defaultModelRouting.company_profile_generation.prompt_key} />
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Feature Flags</h3>
          <div className="grid gap-3">
            <ToggleField label="Founder intake wizard" checked />
            <ToggleField label="Mock AI profile generation" checked />
            <ToggleField label="Document upload metadata" checked />
            <ToggleField label="External research enrichment" />
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">GTM Score Weights</h3>
          <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{JSON.stringify(defaultScoringWeights.gtm, null, 2)}</pre>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Partner Score Weights</h3>
          <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{JSON.stringify(defaultScoringWeights.partner, null, 2)}</pre>
        </Card>
      </div>
    </AppShell>
  );
}
