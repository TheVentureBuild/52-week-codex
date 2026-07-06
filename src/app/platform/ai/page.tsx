import { AppShell } from "@/components/app-shell";
import { Badge, Card, ToggleField } from "@/components/ui";
import { modelRoutes, prompts } from "@/lib/platform/seed";

export default function AIGovernancePage() {
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">AI Governance</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Providers, Prompts & Model Routing</h2></div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card><h3 className="mb-4 text-lg font-semibold">Model Router</h3><div className="grid gap-3">{modelRoutes.map((route) => <div key={route.useCase} className="rounded-md border border-border bg-white p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{route.useCase}</span><Badge tone={route.health === "healthy" ? "green" : "amber"}>{route.health}</Badge></div><p className="mt-2 text-muted-foreground">{route.provider} · {route.model} · priority {route.priority}</p></div>)}</div></Card>
        <Card><h3 className="mb-4 text-lg font-semibold">Prompt Registry</h3><div className="grid gap-3">{prompts.map((prompt) => <div key={prompt.promptKey} className="rounded-md border border-border bg-white p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{prompt.promptKey}</span><Badge>{prompt.approvalStatus}</Badge></div><p className="mt-2 text-muted-foreground">{prompt.purpose} · v{prompt.version} · {prompt.targetModel}</p></div>)}</div></Card>
        <Card><h3 className="mb-4 text-lg font-semibold">Provider Controls</h3><div className="grid gap-3"><ToggleField label="Mock provider" checked /><ToggleField label="OpenAI provider" /><ToggleField label="Anthropic provider" /><ToggleField label="Azure OpenAI provider" /><ToggleField label="Ollama provider" /></div></Card>
        <Card><h3 className="mb-4 text-lg font-semibold">Evaluation Metrics</h3><div className="grid gap-2 text-sm text-muted-foreground"><span>Hallucination rate: 2.1%</span><span>Evidence coverage: 88%</span><span>Recommendation quality: 82%</span><span>Latency p50: 820ms</span><span>Token cost: $412</span></div></Card>
      </div>
    </AppShell>
  );
}
