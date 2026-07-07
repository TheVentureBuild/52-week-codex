import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Field } from "@/components/ui";
import { docArticles, docTours, releaseNotes } from "@/lib/docs/seed";

export default function KnowledgeCenterPage() {
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">Module 06</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Knowledge & Success Center</h2><p className="mt-2 text-sm text-muted-foreground">Learn. Understand. Succeed.</p></div>
      <Card className="mb-5"><div className="grid gap-3 md:grid-cols-[1fr_auto]"><Field label="Search documentation" value="Partner Score" /><Button href="/success/search?q=Partner%20Score"><Search className="mr-2" size={16}/>Search</Button></div></Card>
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5 md:grid-cols-2">
          {["Getting Started","User Guides","Product Modules","AI Recommendations Explained","GTM Playbooks","Administrator Guide","Developer Guide","API Reference","Release Notes","FAQ"].map((item) => <Card key={item}><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-muted-foreground">Role-aware platform documentation.</p></Card>)}
        </div>
        <div className="grid h-fit gap-5">
          <Card><h3 className="mb-3 font-semibold">Recommended Articles</h3><div className="grid gap-2 text-sm text-muted-foreground">{docArticles.map((a) => <Link key={a.slug} href={`/success/docs/${a.slug}`}>{a.title}</Link>)}</div></Card>
          <Card><h3 className="mb-3 font-semibold">Product Tours</h3><div className="grid gap-2 text-sm text-muted-foreground">{docTours.map((t) => <Link key={t.id} href={`/success/tours/${t.id}`}>{t.title}</Link>)}</div></Card>
          <Card><h3 className="mb-3 font-semibold">New Features</h3><div className="grid gap-2 text-sm text-muted-foreground">{releaseNotes[0].newFeatures.map((f) => <span key={f}>{f}</span>)}</div></Card>
          <Button href="/success/ask" className="w-full">Ask AI</Button>
        </div>
      </div>
    </AppShell>
  );
}
