import { AppShell } from "@/components/app-shell";
import { Badge, Card, Field } from "@/components/ui";
import { answerDocsQuestion } from "@/lib/docs/seed";

export default function AskAIPage() {
  const sample = answerDocsQuestion("Why is this recommendation ranked first?");
  return <AppShell><div className="mb-6"><Badge tone="blue">Ask AI</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Documentation Assistant</h2><p className="mt-2 text-sm text-muted-foreground">Answers use approved internal documentation only.</p></div><div className="grid gap-5 lg:grid-cols-[1fr_360px]"><Card><Field label="Ask a question" value="Why is this recommendation ranked first?" /><div className="mt-5 rounded-md bg-muted p-4 text-sm leading-6">{sample.answer}</div></Card><Card><h3 className="mb-3 font-semibold">Sources</h3><div className="grid gap-2 text-sm text-muted-foreground">{sample.sources.map((s) => <span key={s}>{s}</span>)}<span>Confidence: {sample.confidence}%</span></div></Card></div></AppShell>;
}
