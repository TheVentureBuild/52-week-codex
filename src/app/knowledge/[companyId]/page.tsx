import Link from "next/link";
import { notFound } from "next/navigation";
import { GitBranch, RefreshCw, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Progress } from "@/components/ui";
import { getKnowledgeBase } from "@/lib/knowledge/seed";
import { searchKnowledge } from "@/lib/knowledge/synthesis";

export default async function KnowledgeDashboardPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const knowledge = getKnowledgeBase(companyId);
  if (!knowledge) notFound();
  const searchResults = searchKnowledge("Epic", knowledge.documents, knowledge.entities, knowledge.relationships).slice(0, 5);

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge tone="blue">Module 02</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">{knowledge.intake.company.name} Knowledge</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">A living evidence layer across documents, entities, customer patterns, personas, and ICP discovery.</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/knowledge/${companyId}/documents`}><Button variant="secondary"><Search className="mr-2" size={16} />Explore</Button></Link>
          <Button><RefreshCw className="mr-2" size={16} />Refresh knowledge</Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-4">
            <Card><p className="text-sm text-muted-foreground">Knowledge Health</p><p className="mt-2 text-3xl font-semibold">{knowledge.health.score}</p><Progress value={knowledge.health.score} /></Card>
            <Card><p className="text-sm text-muted-foreground">Documents</p><p className="mt-2 text-3xl font-semibold">{knowledge.health.documentCount}</p></Card>
            <Card><p className="text-sm text-muted-foreground">Indexed Pages</p><p className="mt-2 text-3xl font-semibold">{knowledge.health.indexedPages}</p></Card>
            <Card><p className="text-sm text-muted-foreground">Entities</p><p className="mt-2 text-3xl font-semibold">{knowledge.health.extractedEntityCount}</p></Card>
          </div>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Company Knowledge Graph</h3>
            <div className="grid gap-3">
              {knowledge.relationships.slice(0, 8).map((relationship) => (
                <div key={relationship.id} className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-white p-3 text-sm">
                  <GitBranch size={16} className="text-primary" />
                  <span className="font-medium">{relationship.sourceNode}</span>
                  <Badge>{relationship.relationshipType}</Badge>
                  <span>{relationship.targetNode}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{relationship.confidenceScore}%</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-5 md:grid-cols-3">
            <Card><h3 className="font-semibold">Technology Map</h3><p className="mt-2 text-sm text-muted-foreground">{knowledge.documents.flatMap((doc) => doc.extractedTechnologies).slice(0, 8).join(", ")}</p></Card>
            <Card><h3 className="font-semibold">Customer Map</h3><p className="mt-2 text-sm text-muted-foreground">{knowledge.documents.flatMap((doc) => doc.extractedCustomers).filter(Boolean).join(", ") || "Needs more customer documents"}</p></Card>
            <Card><h3 className="font-semibold">Industry Map</h3><p className="mt-2 text-sm text-muted-foreground">{knowledge.icpAnalysis.priorityIndustries.join(", ")}</p></Card>
          </div>
        </div>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-3 font-semibold">Processing Status</h3>
            <div className="grid gap-2 text-sm">
              {knowledge.documents.map((document) => (
                <div key={document.id} className="flex justify-between rounded-md bg-muted px-3 py-2">
                  <span>{document.fileName}</span>
                  <Badge tone="green">{document.processingStage.replace("_", " ")}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Open Questions</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">{knowledge.health.openQuestions.map((question) => <li key={question}>• {question}</li>)}</ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Search: Epic</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {searchResults.length ? searchResults.map((result) => <span key={result.id}>{result.title} · {result.source}</span>) : <span>No Epic evidence found yet.</span>}
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Knowledge Timeline</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <span>Documents queued</span>
              <span>Classification completed</span>
              <span>Entities extracted</span>
              <span>Knowledge graph updated</span>
              <span>Profile enrichment ready</span>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
