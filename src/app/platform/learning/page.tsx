import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/ui";
import { learningEvents } from "@/lib/platform/seed";

export default function LearningPage() {
  return <AppShell><div className="mb-6 flex justify-between"><div><Badge tone="blue">Continuous Learning</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Learning Engine</h2></div><Button>Recalculate learning</Button></div><div className="grid gap-5">{learningEvents.map((event) => <Card key={event.id}><div className="flex justify-between"><h3 className="font-semibold">{event.signal}</h3><Badge>{event.confidence}%</Badge></div><p className="mt-2 text-sm text-muted-foreground">Source: {event.source} · Outcome: {event.outcome}</p><p className="mt-3 text-sm">{event.recommendation}</p></Card>)}</div></AppShell>;
}
