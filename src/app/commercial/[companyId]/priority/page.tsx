import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { generateCommercialPlan } from "@/lib/commercial/seed";

const quadrants = [
  { title: "Quick Wins", test: (r: number, d: number) => r >= 60 && d < 55 },
  { title: "Strategic Bets", test: (r: number, d: number) => r >= 60 && d >= 55 },
  { title: "Long-Term", test: (r: number, d: number) => r < 60 && d >= 55 },
  { title: "Low Value", test: (r: number, d: number) => r < 60 && d < 55 }
];

export default async function PriorityMatrixPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const operating = generateCommercialPlan(companyId);
  if (!operating) notFound();
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">Priority Matrix</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Revenue Impact vs Execution Difficulty</h2></div>
      <div className="grid gap-5 md:grid-cols-2">
        {quadrants.map((quadrant) => (
          <Card key={quadrant.title}>
            <h3 className="mb-4 text-lg font-semibold">{quadrant.title}</h3>
            <div className="grid gap-3">
              {operating.activities.filter((a) => quadrant.test(a.revenueImpact, a.executionDifficulty)).map((activity) => (
                <div key={activity.id} className="rounded-md border border-border bg-white p-3 text-sm">
                  <div className="flex justify-between gap-3"><span className="font-medium">{activity.title}</span><Badge>{activity.priority}</Badge></div>
                  <p className="mt-2 text-muted-foreground">Impact {activity.revenueImpact} · Difficulty {activity.executionDifficulty}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
