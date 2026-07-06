import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { docArticles } from "@/lib/docs/seed";
export default function ApiReferencePage(){const api=docArticles.find(a=>a.slug==="api-reference")!;return <AppShell><div className="mb-6"><Badge tone="blue">API Reference</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Platform APIs</h2></div><Card><pre className="whitespace-pre-wrap text-sm text-muted-foreground">{api.content}</pre></Card></AppShell>}
