import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card, Progress } from "@/components/ui";
import { getKnowledgeBase } from "@/lib/knowledge/seed";

export default async function ICPIntelligencePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const knowledge = getKnowledgeBase(companyId);
  if (!knowledge) notFound();
  const icp = knowledge.icpAnalysis;

  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">ICP Discovery Engine</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">ICP Intelligence</h2>
        <p className="mt-2 text-sm text-muted-foreground">Synthesize founder ICP, top customers, documents, and knowledge entities into recommended markets and personas.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <Card>
            <h3 className="font-semibold">Current ICP</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{icp.currentIcp}</p>
          </Card>
          <Card>
            <h3 className="font-semibold">AI Suggested ICP</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{icp.suggestedIcp}</p>
            <div className="mt-4"><div className="mb-2 flex justify-between text-sm"><span>Confidence</span><span>{icp.confidenceScore}%</span></div><Progress value={icp.confidenceScore} /></div>
          </Card>
          <div className="grid gap-5 md:grid-cols-2">
            <Card><h3 className="mb-3 font-semibold">Priority Industries</h3><div className="grid gap-2 text-sm text-muted-foreground">{icp.priorityIndustries.map((item) => <span key={item}>{item}</span>)}</div></Card>
            <Card><h3 className="mb-3 font-semibold">Recommended Buyer Titles</h3><div className="grid gap-2 text-sm text-muted-foreground">{icp.recommendedBuyerTitles.map((item) => <span key={item}>{item}</span>)}</div></Card>
            <Card><h3 className="mb-3 font-semibold">Ideal Company Size</h3><p className="text-sm text-muted-foreground">{icp.idealCompanySize}</p></Card>
            <Card><h3 className="mb-3 font-semibold">Ideal Geography</h3><p className="text-sm text-muted-foreground">{icp.idealGeography}</p></Card>
          </div>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Buyer Personas</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {knowledge.personas.map((persona) => (
                <div key={persona.id} className="rounded-md border border-border bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="text-sm text-muted-foreground">{persona.personaType}</p><h4 className="font-semibold">{persona.title}</h4></div>
                    <Badge>{persona.confidenceScore}%</Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Goals: {persona.goals.join(", ")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Pain: {persona.painPoints.join(", ")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Criteria: {persona.buyingCriteria.join(", ")}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-3 font-semibold">Supporting Evidence</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{icp.supportingEvidence.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Missing Segments</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{icp.missingSegments.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Recommended Segments</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{icp.recommendedSegments.map((item) => <li key={item}>• {item}</li>)}</ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
