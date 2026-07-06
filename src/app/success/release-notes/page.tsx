import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { releaseNotes } from "@/lib/docs/seed";
export default function ReleaseNotesPage(){return <AppShell><div className="mb-6"><Badge tone="blue">Release Notes</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Product Releases</h2></div><div className="grid gap-5">{releaseNotes.map(r=><Card key={r.id}><h3 className="text-lg font-semibold">Version {r.version}</h3><p className="text-sm text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p><p className="mt-3 text-sm">New: {r.newFeatures.join(", ")}</p><p className="mt-2 text-sm text-muted-foreground">Migration: {r.migrationNotes.join(", ") || "None"}</p></Card>)}</div></AppShell>}
