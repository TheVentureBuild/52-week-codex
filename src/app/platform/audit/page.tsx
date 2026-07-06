import { AppShell } from "@/components/app-shell";
import { Badge, Card } from "@/components/ui";
import { auditEvents } from "@/lib/platform/seed";

export default function AuditCenterPage() {
  return <AppShell><div className="mb-6"><Badge tone="blue">Audit Center</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Searchable Platform Events</h2></div><Card className="p-0"><table className="w-full text-left text-sm"><thead className="bg-muted text-muted-foreground"><tr><th className="p-4">Actor</th><th className="p-4">Event</th><th className="p-4">Target</th><th className="p-4">Summary</th><th className="p-4">Time</th></tr></thead><tbody>{auditEvents.map((event) => <tr key={event.id} className="border-t border-border"><td className="p-4">{event.actor}</td><td className="p-4">{event.eventType}</td><td className="p-4">{event.target}</td><td className="p-4">{event.summary}</td><td className="p-4">{new Date(event.createdAt).toLocaleString()}</td></tr>)}</tbody></table></Card></AppShell>;
}
