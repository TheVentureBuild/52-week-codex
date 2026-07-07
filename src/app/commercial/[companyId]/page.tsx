import { notFound } from "next/navigation";
import { CalendarDays, CheckCircle2, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { generateCommercialPlan } from "@/lib/commercial/seed";
import { formatCurrency } from "@/lib/utils";

export default async function CommercialRoadmapPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const operating = generateCommercialPlan(companyId);
  if (!operating) notFound();
  const motions = [...new Set(operating.activities.map((activity) => activity.commercialMotion))];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge tone="blue">Module 04</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">Commercial Execution Engine</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Activities are the operating model. The 52-week roadmap is one visualization of the shortest path to revenue.</p>
        </div>
        <div className="flex gap-2">
          <Button href={`/commercial/${companyId}/timeline`} variant="secondary"><CalendarDays className="mr-2" size={16} />Timeline</Button>
          <Button
            action={{
              url: "/api/commercial-plan/generate",
              payload: { companyId },
              successMessage: "Plan regenerated",
              refresh: true
            }}
          >
            <RefreshCw className="mr-2" size={16} />Regenerate plan
          </Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-6">
        <Card><p className="text-sm text-muted-foreground">Health</p><p className="mt-2 text-3xl font-semibold">{operating.plan.commercialHealthScore}</p><Progress value={operating.plan.commercialHealthScore} /></Card>
        <Card><p className="text-sm text-muted-foreground">Week</p><p className="mt-2 text-3xl font-semibold">{operating.plan.currentWeek}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Pipeline</p><p className="mt-2 text-xl font-semibold">{formatCurrency(operating.plan.expectedPipeline)}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Forecast</p><p className="mt-2 text-xl font-semibold">{formatCurrency(operating.plan.revenueForecast)}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Completed</p><p className="mt-2 text-3xl font-semibold">{operating.plan.completedActivities}</p></Card>
        <Card><p className="text-sm text-muted-foreground">At Risk</p><p className="mt-2 text-3xl font-semibold">{operating.plan.atRiskActivities}</p></Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Roadmap by Commercial Motion</h3>
          <div className="grid gap-5">
            {motions.map((motion) => (
              <div key={motion}>
                <div className="mb-2 flex items-center justify-between"><h4 className="font-semibold capitalize">{motion}</h4><Badge>{operating.activities.filter((activity) => activity.commercialMotion === motion).length} activities</Badge></div>
                <div className="grid gap-2">
                  {operating.activities.filter((activity) => activity.commercialMotion === motion).slice(0, 4).map((activity) => (
                    <a key={activity.id} href={`/commercial/${companyId}/activity/${activity.id}`} className="rounded-md border border-border bg-white p-3 text-sm hover:border-primary">
                      <div className="flex flex-wrap justify-between gap-2"><span className="font-medium">{activity.title}</span><span>{activity.dueDate}</span></div>
                      <p className="mt-1 text-muted-foreground">{activity.whyNow}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-3 font-semibold">KPIs</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <span>Introductions: {operating.relationshipPaths.length}</span>
              <span>Meetings: {operating.activities.filter((a) => a.kpis.includes("Meeting booked")).length}</span>
              <span>Pipeline: {formatCurrency(operating.forecast.pipelineCreated)}</span>
              <span>TVB revenue: {formatCurrency(operating.forecast.tvbRevenue)}</span>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Templates</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">{operating.templates.map((template) => <span key={template.id}>{template.name}</span>)}</div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">This Week</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">{operating.weeklyReviews[0].recommendations.map((item) => <span key={item}><CheckCircle2 className="mr-2 inline" size={15} />{item}</span>)}</div>
          </Card>
          <Button href={`/commercial/${companyId}/warm-introductions`} className="w-full">Warm introductions</Button>
        </div>
      </div>
    </AppShell>
  );
}
