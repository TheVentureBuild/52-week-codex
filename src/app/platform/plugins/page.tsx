import { AppShell } from "@/components/app-shell";
import { Badge, Card, ToggleField } from "@/components/ui";
import { plugins } from "@/lib/platform/seed";

export default function PluginManagerPage() {
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">Plugin Manager</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Interchangeable Platform Plugins</h2></div>
      <div className="grid gap-5 md:grid-cols-3">
        {plugins.map((plugin) => <Card key={plugin.id}><div className="flex justify-between"><h3 className="font-semibold">{plugin.name}</h3><Badge tone={plugin.health === "healthy" ? "green" : "amber"}>{plugin.health}</Badge></div><p className="mt-2 text-sm text-muted-foreground">{plugin.category} · {plugin.version}</p><div className="mt-4"><ToggleField label="Enabled" checked={plugin.enabled} /></div></Card>)}
      </div>
    </AppShell>
  );
}
