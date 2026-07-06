import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { organizations, platformAnalytics, platformMetrics } from "@/lib/platform/seed";

export default function PlatformDashboardPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><Badge tone="blue">Module 05</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Platform Intelligence</h2><p className="mt-2 text-sm text-muted-foreground">Governance, observability, configuration, analytics, and continuous learning across the TVB Intelligence Engine.</p></div>
        <div className="flex gap-2"><Link href="/platform/config"><Button variant="secondary">Configuration</Button></Link><Link href="/platform/analytics"><Button>Analytics</Button></Link></div>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {platformMetrics.map((metric) => <Card key={metric.label}><p className="text-sm text-muted-foreground">{metric.label}</p><p className="mt-2 text-2xl font-semibold">{metric.value}</p><p className="mt-1 text-xs text-muted-foreground">{metric.trend}</p></Card>)}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Organizations</h3>
          <div className="grid gap-3">{organizations.map((org) => <div key={org.id} className="rounded-md border border-border bg-white p-3 text-sm"><div className="flex justify-between"><span className="font-medium">{org.name}</span><Badge>{org.healthScore}</Badge></div><p className="mt-2 text-muted-foreground">{org.workspaces} workspaces · {org.companies} companies · {org.users} users</p><Progress value={org.healthScore} /></div>)}</div>
        </Card>
        <div className="grid h-fit gap-5">
          <Card><h3 className="mb-3 font-semibold">Portfolio Health</h3><Progress value={platformAnalytics.commercialHealth} /><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><span>Revenue forecast: ${platformAnalytics.revenueForecast.toLocaleString()}</span><span>Recommendation acceptance: {platformAnalytics.recommendationAcceptance}%</span><span>Evidence coverage: {platformAnalytics.evidenceCoverage}%</span></div></Card>
          <Card><h3 className="mb-3 font-semibold">AI Operations</h3><div className="grid gap-2 text-sm text-muted-foreground"><span>Latency: {platformAnalytics.latencyMs}ms</span><span>Error rate: {platformAnalytics.errorRate}%</span><span>Hallucination rate: {platformAnalytics.hallucinationRate}%</span></div></Card>
        </div>
      </div>
    </AppShell>
  );
}
