import Link from "next/link";
import { CheckCircle2, MessageSquareWarning, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/ui";
import { seedIntakes } from "@/lib/data/seed";

export default function ReviewPage() {
  const submitted = seedIntakes.filter((item) => item.company.intakeStatus !== "draft");
  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">TVB Operator</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Review Queue</h2>
        <p className="mt-2 text-sm text-muted-foreground">Review submitted founder intakes, add internal notes, request clarification, and trigger profile generation.</p>
      </div>
      <Card className="p-0">
        <div className="overflow-hidden rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr><th className="p-4">Company</th><th className="p-4">Founder</th><th className="p-4">Status</th><th className="p-4">Submitted</th><th className="p-4">Actions</th></tr>
            </thead>
            <tbody>
              {submitted.map((intake) => (
                <tr key={intake.company.id} className="border-t border-border">
                  <td className="p-4"><div className="font-medium">{intake.company.name}</div><div className="text-muted-foreground">{intake.company.primaryIndustry}</div></td>
                  <td className="p-4">{intake.company.founderName}</td>
                  <td className="p-4"><Badge tone={intake.company.reviewStatus === "in_review" ? "amber" : "green"}>{intake.company.reviewStatus.replace("_", " ")}</Badge></td>
                  <td className="p-4">{intake.company.submittedAt ? new Date(intake.company.submittedAt).toLocaleDateString() : "Not submitted"}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/intake/${intake.company.id}`}><Button variant="secondary"><MessageSquareWarning className="mr-2" size={15} />Review</Button></Link>
                      <Link href={`/profile/${intake.company.id}`}><Button variant="secondary"><Sparkles className="mr-2" size={15} />Generate</Button></Link>
                      <Button><CheckCircle2 className="mr-2" size={15} />Approve</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
