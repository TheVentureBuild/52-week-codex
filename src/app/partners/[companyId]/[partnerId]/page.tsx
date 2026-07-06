import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { getPartnerUniverse, getRankedPartnerRows } from "@/lib/partners/seed";
import { formatCurrency } from "@/lib/utils";

export default async function PartnerDetailPage({ params }: { params: Promise<{ companyId: string; partnerId: string }> }) {
  const { companyId, partnerId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) notFound();
  const row = getRankedPartnerRows(companyId).find((item) => item.partner.id === partnerId);
  if (!row) notFound();

  return (
    <AppShell>
      <div className="mb-6">
        <Link href={`/partners/${companyId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Partner universe</Link>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Badge tone="blue">{row.partner.partnerType.replaceAll("_", " ")}</Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">{row.partner.name}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{row.partner.description}</p>
          </div>
          <Button><CheckCircle2 className="mr-2" size={16} />Approve recommendation</Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Partner Overview</h3>
            <div className="grid gap-3 text-sm md:grid-cols-2">
              <p><span className="text-muted-foreground">Website:</span> {row.partner.website}</p>
              <p><span className="text-muted-foreground">Headquarters:</span> {row.partner.headquarters}</p>
              <p><span className="text-muted-foreground">Industries:</span> {row.partner.industries.join(", ")}</p>
              <p><span className="text-muted-foreground">Technologies:</span> {row.partner.technologyFocus.join(", ")}</p>
              <p><span className="text-muted-foreground">Cloud:</span> {row.partner.cloudFocus.join(", ")}</p>
              <p><span className="text-muted-foreground">Services:</span> {row.partner.servicesOffered.join(", ")}</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold">AI Rationale</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.recommendation.rationale}</p>
            <h3 className="mt-5 font-semibold">Why Partner Would Care</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.recommendation.whyPartnerWouldCare}</p>
            <h3 className="mt-5 font-semibold">Win-Win Proposal</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.recommendation.winWinProposal}</p>
            <h3 className="mt-5 font-semibold">Suggested Pitch Angle</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.recommendation.suggestedPitch}</p>
          </Card>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Evidence Trail</h3>
            <div className="grid gap-3">
              {row.recommendation.evidence.map((item) => (
                <div key={`${item.sourceType}-${item.sourceLabel}`} className="rounded-md border border-border bg-white p-3 text-sm">
                  <div className="flex justify-between gap-3"><span className="font-medium">{item.sourceLabel}</span><Badge>{Math.round(item.confidence * 100)}%</Badge></div>
                  <p className="mt-2 text-muted-foreground">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-4 font-semibold">Score Breakdown</h3>
            {[
              ["ICP Fit", row.score.icpFitScore],
              ["Technology Fit", row.score.technologyFitScore],
              ["Industry Fit", row.score.industryFitScore],
              ["Cloud Fit", row.score.cloudFitScore],
              ["Customer Fit", row.score.customerOverlapScore],
              ["Services Opportunity", row.score.servicesOpportunityScore],
              ["Relationship Strength", row.score.relationshipScore],
              ["Speed to Revenue", row.score.speedToRevenueScore],
              ["TVB Revenue Potential", row.score.tvbRevenuePotentialScore]
            ].map(([label, value]) => (
              <div key={label} className="mb-3"><div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}</span></div><Progress value={Number(value)} /></div>
            ))}
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Revenue Model</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <span>Product revenue: {formatCurrency(row.recommendation.estimatedProductRevenue)}</span>
              <span>Services revenue: {formatCurrency(row.recommendation.estimatedServicesRevenue)}</span>
              <span>TVB revenue: {formatCurrency(row.recommendation.estimatedTvbRevenue)}</span>
              <span>Time to revenue: {row.recommendation.estimatedTimeToRevenue}</span>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Assumptions</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{row.recommendation.assumptions.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Risks</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{row.recommendation.risks.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
