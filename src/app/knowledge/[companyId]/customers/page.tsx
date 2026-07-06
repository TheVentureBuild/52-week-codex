import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card, Progress } from "@/components/ui";
import { getKnowledgeBase } from "@/lib/knowledge/seed";
import { formatCurrency } from "@/lib/utils";

export default async function CustomerIntelligencePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const knowledge = getKnowledgeBase(companyId);
  if (!knowledge) notFound();
  const pattern = knowledge.customerPattern;

  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">Customer Intelligence</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Customer Patterns</h2>
        <p className="mt-2 text-sm text-muted-foreground">Analyze top customers, buying roles, deployment patterns, pain points, and expansion opportunities.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card><p className="text-sm text-muted-foreground">Common Industry</p><p className="mt-2 text-xl font-semibold">{pattern.commonIndustry}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Typical ACV</p><p className="mt-2 text-xl font-semibold">{formatCurrency(pattern.typicalAcv)}</p></Card>
        <Card><p className="text-sm text-muted-foreground">Implementation Length</p><p className="mt-2 text-xl font-semibold">{pattern.implementationLength}</p></Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-0">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr><th className="p-4">Customer</th><th className="p-4">Industry</th><th className="p-4">Use Case</th><th className="p-4">Deployment</th><th className="p-4">Expansion</th></tr>
              </thead>
              <tbody>
                {knowledge.intake.customers.length ? knowledge.intake.customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-border">
                    <td className="p-4 font-medium">{customer.customerName}</td>
                    <td className="p-4">{customer.industry}</td>
                    <td className="p-4">{customer.useCase}</td>
                    <td className="p-4">{customer.deploymentType}</td>
                    <td className="p-4">{customer.expansionPotential}</td>
                  </tr>
                )) : (
                  <tr><td className="p-4 text-muted-foreground" colSpan={5}>No top customers added yet. Customer pattern confidence is limited.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-3 font-semibold">Buying Committee</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">{pattern.buyingCommittee.map((item) => <span key={item}>{item}</span>)}</div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Technical Decision Makers</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">{pattern.technicalDecisionMakers.map((item) => <span key={item}>{item}</span>)}</div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Common Integrations</h3>
            <div className="grid gap-3">
              {pattern.commonIntegrations.slice(0, 5).map((item) => <div key={item}><div className="mb-1 flex justify-between text-sm"><span>{item}</span><span>Evidence</span></div><Progress value={75} /></div>)}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
