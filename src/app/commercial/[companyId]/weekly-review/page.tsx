import { notFound } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/ui";
import { generateCommercialPlan } from "@/lib/commercial/seed";

export default async function WeeklyReviewPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const operating = generateCommercialPlan(companyId);
  if (!operating) notFound();
  const review = operating.weeklyReviews[0];
  return (
    <AppShell>
      <div className="mb-6 flex justify-between gap-4"><div><Badge tone="blue">Weekly Review</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Week {review.weekNumber} Execution Review</h2></div><Button action={{ url: "/api/weekly-review", payload: { companyId }, successMessage: "Review regenerated", refresh: true }}><RefreshCw className="mr-2" size={16} />Regenerate Plan</Button></div>
      <div className="grid gap-5 md:grid-cols-5">
        {(["completed", "inProgress", "delayed", "blocked", "recommendations"] as const).map((key) => (
          <Card key={key}>
            <h3 className="mb-3 font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">{review[key].length ? review[key].map((item) => <span key={item}>{item}</span>) : <span>None</span>}</div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
