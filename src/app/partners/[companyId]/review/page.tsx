import { notFound } from "next/navigation";
import { CheckCircle2, Send, XCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Field } from "@/components/ui";
import { getPartnerUniverse, getRankedPartnerRows } from "@/lib/partners/seed";
import { formatCurrency } from "@/lib/utils";

export default async function PartnerReviewPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) notFound();
  const rows = getRankedPartnerRows(companyId);

  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">Recommendation Review</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Partner Recommendations</h2>
        <p className="mt-2 text-sm text-muted-foreground">Approve, reject, edit rationale, change priority, assign owner, and send recommendations to Module 4 planning.</p>
      </div>
      <div className="grid gap-5">
        {rows.map((row) => (
          <Card key={row.recommendation.id}>
            <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{row.partner.name}</h3>
                  <Badge tone={row.recommendation.priority === "high" ? "green" : "amber"}>{row.recommendation.priority}</Badge>
                  <Badge>{row.recommendation.status}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{row.recommendation.rationale}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{row.recommendation.winWinProposal}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <Field label="Priority" value={row.recommendation.priority} />
                  <Field label="Owner" value={row.recommendation.owner || row.companyPartner.relationshipOwner} />
                  <Field label="Notes" value={row.recommendation.notes} />
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="rounded-md bg-muted p-3"><span className="text-muted-foreground">Product</span><p className="font-semibold">{formatCurrency(row.recommendation.estimatedProductRevenue)}</p></div>
                <div className="rounded-md bg-muted p-3"><span className="text-muted-foreground">Services</span><p className="font-semibold">{formatCurrency(row.recommendation.estimatedServicesRevenue)}</p></div>
                <div className="rounded-md bg-muted p-3"><span className="text-muted-foreground">TVB</span><p className="font-semibold">{formatCurrency(row.recommendation.estimatedTvbRevenue)}</p></div>
                <div className="flex flex-wrap gap-2">
                  <Button><CheckCircle2 className="mr-2" size={15} />Approve</Button>
                  <Button variant="secondary"><XCircle className="mr-2" size={15} />Reject</Button>
                  <Button variant="secondary"><Send className="mr-2" size={15} />Send to plan</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
