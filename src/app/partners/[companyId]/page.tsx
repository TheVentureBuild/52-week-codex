import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, DollarSign, Upload, Zap } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { getPartnerUniverse, getRankedPartnerRows } from "@/lib/partners/seed";
import { formatCurrency } from "@/lib/utils";

export default async function PartnerUniversePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) notFound();
  const rows = getRankedPartnerRows(companyId);
  const highPriority = rows.filter((row) => row.recommendation.priority === "high");
  const highestTvb = rows[0]?.recommendation;
  const highestServices = [...rows].sort((a, b) => b.recommendation.estimatedServicesRevenue - a.recommendation.estimatedServicesRevenue)[0];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge tone="blue">Module 03</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">{universe.knowledge.intake.company.name} Partner Universe</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Ranked partner opportunities with commercial rationale, revenue potential, evidence, and review workflow.</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/partners/${companyId}/import`}><Button variant="secondary"><Upload className="mr-2" size={16} />Import</Button></Link>
          <Link href={`/partners/${companyId}/matrix`}><Button><Zap className="mr-2" size={16} />Score partners</Button></Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <Card><p className="text-sm text-muted-foreground">Total Partners</p><p className="mt-2 text-3xl font-semibold">{rows.length}</p></Card>
        <Card><p className="text-sm text-muted-foreground">High Priority</p><p className="mt-2 text-3xl font-semibold">{highPriority.length}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Highest TVB Potential</p><p className="mt-2 text-xl font-semibold">{formatCurrency(highestTvb?.estimatedTvbRevenue)}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Services Opportunity</p><p className="mt-2 text-xl font-semibold">{formatCurrency(highestServices?.recommendation.estimatedServicesRevenue)}</p></Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-0">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr><th className="p-4">Partner</th><th className="p-4">Type</th><th className="p-4">Total</th><th className="p-4">Fastest Path</th><th className="p-4">TVB Potential</th><th className="p-4">Status</th></tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.partner.id} className="border-t border-border">
                    <td className="p-4"><Link href={`/partners/${companyId}/${row.partner.id}`} className="font-medium hover:text-primary">{row.partner.name}</Link><div className="text-muted-foreground">{row.recommendation.recommendedNextAction}</div></td>
                    <td className="p-4">{row.partner.partnerType.replaceAll("_", " ")}</td>
                    <td className="p-4"><div className="w-28"><div className="mb-1 flex justify-between"><span>{row.score.totalScore}</span><span>{row.score.confidenceScore}%</span></div><Progress value={row.score.totalScore} /></div></td>
                    <td className="p-4">{row.recommendation.estimatedTimeToRevenue}</td>
                    <td className="p-4">{formatCurrency(row.recommendation.estimatedTvbRevenue)}</td>
                    <td className="p-4"><Badge tone={row.recommendation.priority === "high" ? "green" : "amber"}>{row.recommendation.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-3 font-semibold">Recommended Next Actions</h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              {rows.slice(0, 4).map((row) => <span key={row.partner.id}>{row.partner.name}: {row.recommendation.recommendedNextAction}</span>)}
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Partner Readiness Gaps</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">
              <li>• Validate co-sell economics with top partners</li>
              <li>• Confirm relationship owners for medium-priority partners</li>
              <li>• Build partner implementation guide before broader outreach</li>
            </ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Planning Queue</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {rows.filter((row) => row.recommendation.markForPlanning).map((row) => <span key={row.partner.id}><CheckCircle2 className="mr-2 inline" size={15} />{row.partner.name}</span>)}
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Revenue Snapshot</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <span><DollarSign className="mr-2 inline" size={15} />Product: {formatCurrency(rows.reduce((sum, row) => sum + row.recommendation.estimatedProductRevenue, 0))}</span>
              <span>Services: {formatCurrency(rows.reduce((sum, row) => sum + row.recommendation.estimatedServicesRevenue, 0))}</span>
              <span>TVB: {formatCurrency(rows.reduce((sum, row) => sum + row.recommendation.estimatedTvbRevenue, 0))}</span>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
