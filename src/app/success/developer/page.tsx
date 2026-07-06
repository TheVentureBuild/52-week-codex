import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
const sections = ["Architecture","Database","API","JSON Schemas","Events","Plugin SDK","AI Architecture","Configuration","Deployment"];
export default function DeveloperPortalPage(){return <AppShell><div className="mb-6"><Badge tone="blue">Developer Portal</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Developer Guide</h2></div><div className="grid gap-5 md:grid-cols-3">{sections.map((s)=><Card key={s}><h3 className="font-semibold">{s}</h3><p className="mt-2 text-sm text-muted-foreground">Reference generated from platform metadata and module APIs.</p></Card>)}</div></AppShell>}
