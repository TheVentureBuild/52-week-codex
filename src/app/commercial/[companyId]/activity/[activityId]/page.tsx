import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { generateCommercialPlan } from "@/lib/commercial/seed";
import { formatCurrency } from "@/lib/utils";

export default async function ActivityDetailPage({ params }: { params: Promise<{ companyId: string; activityId: string }> }) {
  const { companyId, activityId } = await params;
  const operating = generateCommercialPlan(companyId);
  if (!operating) notFound();
  const activity = operating.activities.find((item) => item.id === activityId);
  if (!activity) notFound();
  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><Badge tone="blue">{activity.category.replaceAll("_", " ")}</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">{activity.title}</h2><p className="mt-2 text-sm text-muted-foreground">{activity.description}</p></div>
        <div className="flex gap-2"><Button>Approve</Button><Button variant="secondary">Complete</Button><Button variant="secondary">Delay</Button></div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <Card><h3 className="font-semibold">Why</h3><p className="mt-2 text-sm text-muted-foreground">{activity.whyNow}</p><h3 className="mt-5 font-semibold">Sequencing</h3><p className="mt-2 text-sm text-muted-foreground">{activity.sequencingRationale}</p><h3 className="mt-5 font-semibold">Suggested Email</h3><p className="mt-2 text-sm text-muted-foreground">{activity.suggestedEmail}</p></Card>
          <Card><h3 className="mb-3 font-semibold">Meeting Agenda</h3><ul className="grid gap-2 text-sm text-muted-foreground">{activity.suggestedMeetingAgenda.map((item) => <li key={item}>• {item}</li>)}</ul></Card>
          <Card><h3 className="mb-3 font-semibold">Evidence</h3><div className="grid gap-3">{activity.evidence.map((item) => <div key={item.sourceLabel} className="rounded-md border border-border bg-white p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{item.sourceLabel}</span><Badge>{Math.round(item.confidence * 100)}%</Badge></div><p className="mt-2 text-muted-foreground">{item.excerpt}</p></div>)}</div></Card>
        </div>
        <div className="grid h-fit gap-5">
          <Card><h3 className="mb-3 font-semibold">Revenue</h3><p className="text-xl font-semibold">{formatCurrency(activity.expectedRevenue)}</p><div className="mt-3"><div className="mb-1 flex justify-between text-sm"><span>Probability</span><span>{activity.probability}%</span></div><Progress value={activity.probability} /></div></Card>
          <Card><h3 className="mb-3 font-semibold">Execution</h3><div className="grid gap-2 text-sm text-muted-foreground"><span>Owner: {activity.owner}</span><span>Due: {activity.dueDate}</span><span>Status: {activity.status}</span><span>Dependencies: {activity.dependencyIds.length || "None"}</span><span>Relationship: {activity.relationshipNeeded}</span></div></Card>
          <Card><h3 className="mb-3 font-semibold">Success Criteria</h3><ul className="grid gap-2 text-sm text-muted-foreground">{activity.successCriteria.map((item) => <li key={item}>• {item}</li>)}</ul></Card>
          <Card><h3 className="mb-3 font-semibold">KPIs</h3><ul className="grid gap-2 text-sm text-muted-foreground">{activity.kpis.map((item) => <li key={item}>• {item}</li>)}</ul></Card>
        </div>
      </div>
    </AppShell>
  );
}
