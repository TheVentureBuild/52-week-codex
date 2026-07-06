import Link from "next/link";
import { notFound } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { generateProfileFromIntake } from "@/lib/domain/profile-generator";
import { seedIntakes } from "@/lib/data/seed";

export default async function ProfilePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) notFound();
  const profile = generateProfileFromIntake(intake);

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge tone="green">Company Intelligence Profile</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">{intake.company.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Generated with {profile.generatedByModel}. Confidence and evidence placeholders are included for every profile.</p>
        </div>
        <Button><RefreshCw className="mr-2" size={16} />Regenerate</Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <Card>
            <h3 className="text-lg font-semibold">Company Summary</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{profile.summary}</p>
          </Card>
          <div className="grid gap-5 md:grid-cols-2">
            <Card><h3 className="font-semibold">Core Problem</h3><p className="mt-2 text-sm text-muted-foreground">{profile.coreProblem}</p></Card>
            <Card><h3 className="font-semibold">Target ICP</h3><p className="mt-2 text-sm text-muted-foreground">{profile.icpSummary}</p></Card>
            <Card><h3 className="font-semibold">Traction</h3><p className="mt-2 text-sm text-muted-foreground">{profile.tractionSummary}</p></Card>
            <Card><h3 className="font-semibold">Technology Stack</h3><p className="mt-2 text-sm text-muted-foreground">{profile.technologySummary}</p></Card>
            <Card><h3 className="font-semibold">Hyperscaler Alignment</h3><p className="mt-2 text-sm text-muted-foreground">{profile.hyperscalerAlignment}</p></Card>
            <Card><h3 className="font-semibold">SI Partner Potential</h3><p className="mt-2 text-sm text-muted-foreground">{profile.siPartnerPotential}</p></Card>
          </div>
          <Card>
            <h3 className="font-semibold">Revenue Motion Summary</h3>
            <p className="mt-2 text-sm text-muted-foreground">{profile.revenueMotionSummary}</p>
          </Card>
        </div>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-4 font-semibold">Readiness Scores</h3>
            <div className="grid gap-4">
              <div><div className="mb-2 flex justify-between text-sm"><span>GTM readiness</span><span>{profile.gtmReadinessScore}/100</span></div><Progress value={profile.gtmReadinessScore} /></div>
              <div><div className="mb-2 flex justify-between text-sm"><span>Partner readiness</span><span>{profile.partnerReadinessScore}/100</span></div><Progress value={profile.partnerReadinessScore} /></div>
              <div><div className="mb-2 flex justify-between text-sm"><span>Confidence</span><span>{profile.confidenceScore}/100</span></div><Progress value={profile.confidenceScore} /></div>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Missing Information</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{profile.missingInformation.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Recommended Next Data</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{profile.recommendedNextData.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Evidence</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{profile.evidence.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
          <Link href={`/intake/${intake.company.id}`}><Button variant="secondary" className="w-full">Edit intake</Button></Link>
        </div>
      </div>
    </AppShell>
  );
}
