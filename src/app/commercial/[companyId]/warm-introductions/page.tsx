import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card, Progress } from "@/components/ui";
import { generateCommercialPlan } from "@/lib/commercial/seed";

export default async function WarmIntroductionsPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const operating = generateCommercialPlan(companyId);
  if (!operating) notFound();
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">Warm Introduction Dashboard</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">TVB Relationship Paths</h2><p className="mt-2 text-sm text-muted-foreground">Who should introduce whom, why, and expected commercial outcome.</p></div>
      <Card className="p-0">
        <div className="overflow-hidden rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground"><tr>{["Target Partner", "Recommended Introduction", "Strength", "TVB Owner", "Path", "Expected Outcome", "Confidence"].map((h) => <th key={h} className="p-4">{h}</th>)}</tr></thead>
            <tbody>
              {operating.relationshipPaths.map((path) => (
                <tr key={path.id} className="border-t border-border">
                  <td className="p-4 font-medium">{path.targetPartnerId}</td>
                  <td className="p-4">{path.recommendedIntroduction}</td>
                  <td className="p-4"><div className="w-28"><Progress value={path.relationshipStrength} /></div></td>
                  <td className="p-4">{path.tvbOwner}</td>
                  <td className="p-4">{path.suggestedIntroductionPath}</td>
                  <td className="p-4">{path.expectedOutcome}</td>
                  <td className="p-4">{path.confidenceScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
