import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { docTours } from "@/lib/docs/seed";
export default async function TourPage({params}:{params:Promise<{tourId:string}>}){const {tourId}=await params;const tour=docTours.find(t=>t.id===tourId);if(!tour)notFound();return <AppShell><div className="mb-6"><Badge tone="blue">Interactive Walkthrough</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">{tour.title}</h2></div><div className="grid gap-4">{tour.steps.map((s,i)=><Card key={s.title}><Badge>Step {i+1}</Badge><h3 className="mt-3 font-semibold">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.body}</p><code className="mt-3 block text-xs">{s.target}</code></Card>)}</div></AppShell>}
