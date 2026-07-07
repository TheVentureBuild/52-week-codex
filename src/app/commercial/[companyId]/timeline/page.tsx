import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { generateCommercialPlan } from "@/lib/commercial/seed";

export default async function CommercialTimelinePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const operating = generateCommercialPlan(companyId);
  if (!operating) notFound();
  const weeks = Array.from({ length: 52 }, (_, index) => index + 1);

  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">Commercial Timeline</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">52-Week Roadmap View</h2>
        <p className="mt-2 text-sm text-muted-foreground">Timeline is a visualization. Activities remain the source of truth.</p>
      </div>
      <Card>
        <div className="grid gap-3">
          {weeks.slice(0, 26).map((week) => {
            const weekActivities = operating.activities.filter((activity) => {
              const due = new Date(activity.dueDate).getTime();
              const deltaWeeks = Math.ceil((due - Date.now()) / 604800000);
              return deltaWeeks === week;
            });
            return (
              <div key={week} className="grid gap-3 rounded-md border border-border bg-white p-3 md:grid-cols-[90px_1fr]">
                <div className="text-sm font-semibold">Week {week}</div>
                <div className="grid gap-2">
                  {weekActivities.length ? weekActivities.map((activity) => (
                    <div key={activity.id} className="rounded-md bg-muted p-3 text-sm">
                      <div className="flex flex-wrap justify-between gap-2"><span className="font-medium">{activity.title}</span><Badge>{activity.status}</Badge></div>
                      <div className="mt-2"><Progress value={activity.probability} /></div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button variant="secondary" action={{ url: "/api/activity/complete", payload: { companyId, activityId: activity.id }, successMessage: "Completed", refresh: true }}>Complete</Button>
                        <Button variant="secondary" action={{ url: "/api/activity", method: "PATCH", payload: { companyId, activityId: activity.id, status: "delayed" }, successMessage: "Delayed", refresh: true }}>Delay</Button>
                        <Button variant="secondary" action={{ url: "/api/activity/approve", payload: { companyId, activityId: activity.id }, successMessage: "Approved", refresh: true }}>Approve</Button>
                      </div>
                    </div>
                  )) : <span className="text-sm text-muted-foreground">No activity scheduled.</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}
