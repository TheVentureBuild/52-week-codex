import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { getPartnerUniverse, getRankedPartnerRows } from "@/lib/partners/seed";

export default async function PartnerMatrixPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) notFound();
  const rows = getRankedPartnerRows(companyId);

  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">Partner Scoring Matrix</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Closest Path to Revenue</h2>
        <p className="mt-2 text-sm text-muted-foreground">Sortable scoring model foundation across fit, opportunity, relationship strength, revenue potential, and confidence.</p>
      </div>
      <Card className="p-0">
        <div className="overflow-auto rounded-lg">
          <table className="w-full min-w-[1200px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                {["Partner", "Type", "ICP", "Tech", "Industry", "Cloud", "Customer", "Services", "Relationship", "Speed", "TVB", "Total", "Confidence", "Status"].map((header) => <th key={header} className="p-3">{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.partner.id} className="border-t border-border">
                  <td className="p-3 font-medium">{row.partner.name}</td>
                  <td className="p-3">{row.partner.partnerType.replaceAll("_", " ")}</td>
                  <td className="p-3">{row.score.icpFitScore}</td>
                  <td className="p-3">{row.score.technologyFitScore}</td>
                  <td className="p-3">{row.score.industryFitScore}</td>
                  <td className="p-3">{row.score.cloudFitScore}</td>
                  <td className="p-3">{row.score.customerOverlapScore}</td>
                  <td className="p-3">{row.score.servicesOpportunityScore}</td>
                  <td className="p-3">{row.score.relationshipScore}</td>
                  <td className="p-3">{row.score.speedToRevenueScore}</td>
                  <td className="p-3">{row.score.tvbRevenuePotentialScore}</td>
                  <td className="p-3 font-semibold">{row.score.totalScore}</td>
                  <td className="p-3">{row.score.confidenceScore}</td>
                  <td className="p-3"><Badge>{row.recommendation.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
