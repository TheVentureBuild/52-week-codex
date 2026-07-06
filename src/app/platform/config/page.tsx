import { AppShell } from "@/components/app-shell";
import { Badge, Card, Field, ToggleField } from "@/components/ui";
import { defaultCommercialActivityCategories, defaultCommercialTemplates, defaultKnowledgeSettings, defaultPartnerScoringWeights, defaultPartnerTypes } from "@/lib/config/defaults";

export default function ConfigurationCenterPage() {
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">Configuration Center</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Everything Configurable</h2></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card><h3 className="mb-4 font-semibold">Scoring Configuration</h3><pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{JSON.stringify(defaultPartnerScoringWeights, null, 2)}</pre></Card>
        <Card><h3 className="mb-4 font-semibold">Knowledge Thresholds</h3><pre className="overflow-auto rounded-md bg-muted p-4 text-xs">{JSON.stringify(defaultKnowledgeSettings, null, 2)}</pre></Card>
        <Card><h3 className="mb-4 font-semibold">Partner Types</h3><div className="grid gap-2 text-sm text-muted-foreground">{defaultPartnerTypes.map((x) => <span key={x}>{x}</span>)}</div></Card>
        <Card><h3 className="mb-4 font-semibold">Workflow Templates</h3><div className="grid gap-2 text-sm text-muted-foreground">{defaultCommercialTemplates.map((x) => <span key={x}>{x}</span>)}</div></Card>
        <Card><h3 className="mb-4 font-semibold">Activity Categories</h3><div className="grid gap-2 text-sm text-muted-foreground">{defaultCommercialActivityCategories.map((x) => <span key={x}>{x}</span>)}</div></Card>
        <Card><h3 className="mb-4 font-semibold">Approval Rules</h3><div className="grid gap-3"><Field label="Minimum confidence threshold" value="65" /><ToggleField label="Require human approval for generated plans" checked /><ToggleField label="Auto-create learning event on rejection" checked /></div></Card>
      </div>
    </AppShell>
  );
}
