import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card } from "@/components/ui";
import { docArticles } from "@/lib/docs/seed";

function renderMarkdown(content: string) {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("# ")) return <h1 key={index} className="text-2xl font-semibold">{line.replace("# ", "")}</h1>;
    if (line.startsWith("## ")) return <h2 key={index} className="mt-5 text-lg font-semibold">{line.replace("## ", "")}</h2>;
    if (line.startsWith("```")) return null;
    if (!line.trim()) return <div key={index} className="h-2" />;
    return <p key={index} className="text-sm leading-6 text-muted-foreground">{line}</p>;
  });
}

export default async function DocArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = docArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <AppShell><div className="mb-6"><Badge tone="blue">{article.category}</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">{article.title}</h2><p className="mt-2 text-sm text-muted-foreground">Version {article.version} · Last updated {new Date(article.updatedAt).toLocaleDateString()} · {article.approvalStatus}</p></div><div className="grid gap-5 lg:grid-cols-[1fr_300px]"><Card><article className="grid gap-2">{renderMarkdown(article.content)}</article><div className="mt-6 flex gap-2"><Button variant="secondary">Copy link</Button><Button variant="secondary">Print</Button><Button variant="secondary">Export PDF</Button><Button>Helpful</Button></div></Card><Card><h3 className="mb-3 font-semibold">Related</h3><div className="grid gap-2 text-sm text-muted-foreground">{article.relatedModules.map((m) => <span key={m}>{m}</span>)}{article.relatedApis.map((api) => <code key={api}>{api}</code>)}</div></Card></div></AppShell>;
}
