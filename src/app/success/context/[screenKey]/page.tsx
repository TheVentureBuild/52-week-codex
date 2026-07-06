import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { getContextHelp } from "@/lib/docs/seed";
export default async function ContextHelpPage({params}:{params:Promise<{screenKey:string}>}){const {screenKey}=await params;const article=getContextHelp(screenKey);if(!article)notFound();return <AppShell><div className="mb-6"><Badge tone="blue">Context Help</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">{article.title}</h2></div><Card><pre className="whitespace-pre-wrap text-sm text-muted-foreground">{article.content}</pre></Card></AppShell>}
