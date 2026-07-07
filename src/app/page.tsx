import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { seedIntakes } from "@/lib/data/seed";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Module 01</p>
          <h2 className="text-3xl font-semibold tracking-normal">Founder Intake & Company Intelligence</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Onboard founders, capture normalized company intelligence, and generate the first TVB profile.</p>
        </div>
        <Button href="/intake/healthcare-saas">Create company</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {seedIntakes.map((intake) => (
          <Card key={intake.company.id} className="grid gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{intake.company.name}</h3>
                <p className="text-sm text-muted-foreground">{intake.company.primaryIndustry}</p>
              </div>
              <Badge tone={intake.company.intakeStatus === "submitted" ? "green" : "amber"}>{intake.company.intakeStatus.replace("_", " ")}</Badge>
            </div>
            <p className="min-h-12 text-sm text-muted-foreground">{intake.company.description}</p>
            <div className="grid gap-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Completion</span>
                <span>{intake.company.completion}%</span>
              </div>
              <Progress value={intake.company.completion} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button href={`/intake/${intake.company.id}`} variant="secondary" className="w-full">Continue</Button>
              <Button href={`/profile/${intake.company.id}`} className="w-full">View profile</Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
