import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { searchDocs } from "@/lib/docs/seed";

export default async function DocsSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: query } = await searchParams;
  const q = query ?? "";
  const results = searchDocs(q);
  return <AppShell><div className="mb-6"><Badge tone="blue">Documentation Search</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Search Results</h2><p className="mt-2 text-sm text-muted-foreground">Query: {q}</p></div><div className="grid gap-4">{results.map((article) => <Card key={article.slug}><Link href={`/success/docs/${article.slug}`} className="text-lg font-semibold hover:text-primary">{article.title}</Link><p className="mt-2 text-sm text-muted-foreground">{article.category} · {article.tags.join(", ")}</p></Card>)}</div></AppShell>;
}
