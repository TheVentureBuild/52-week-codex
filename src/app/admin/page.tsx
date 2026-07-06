import { AppShell } from "@/components/app-shell";
import { Badge, Card, Field, ToggleField } from "@/components/ui";
import { defaultCommercialActivityCategories, defaultCommercialTemplates, defaultKnowledgeSettings, defaultModelRouting, defaultPartnerScoringWeights, defaultPartnerTypes, defaultScoringWeights, moduleFourPromptRegistry, moduleThreePromptRegistry, moduleTwoPromptRegistry } from "@/lib/config/defaults";

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
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Knowledge Settings</h3>
          <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{JSON.stringify(defaultKnowledgeSettings, null, 2)}</pre>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Module 2 Prompt Registry</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            {moduleTwoPromptRegistry.map((prompt) => <span key={prompt}>{prompt}</span>)}
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Partner Score Weights</h3>
          <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{JSON.stringify(defaultPartnerScoringWeights, null, 2)}</pre>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Partner Types</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            {defaultPartnerTypes.map((type) => <span key={type}>{type}</span>)}
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Module 3 Prompt Registry</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            {moduleThreePromptRegistry.map((prompt) => <span key={prompt}>{prompt}</span>)}
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Commercial Activity Categories</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">{defaultCommercialActivityCategories.map((item) => <span key={item}>{item}</span>)}</div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Commercial Templates</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">{defaultCommercialTemplates.map((item) => <span key={item}>{item}</span>)}</div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Module 4 Prompt Registry</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">{moduleFourPromptRegistry.map((prompt) => <span key={prompt}>{prompt}</span>)}</div>
        </Card>
      </div>
    </AppShell>
  );
}
