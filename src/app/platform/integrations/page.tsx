import { AppShell } from "@/components/app-shell";
import { Badge, Card, ToggleField } from "@/components/ui";

const integrations = ["Google Workspace", "Supabase", "CRM", "Storage", "Email", "Messaging", "Calendars", "Knowledge Sources"];
export default function IntegrationCenterPage() {
  return <AppShell><div className="mb-6"><Badge tone="blue">Integration Center</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Centralized Integrations</h2></div><div className="grid gap-5 md:grid-cols-4">{integrations.map((item) => <Card key={item}><h3 className="font-semibold">{item}</h3><p className="mt-2 text-sm text-muted-foreground">Configurable provider abstraction.</p><div className="mt-4"><ToggleField label="Enabled" checked={item === "Supabase" || item === "Google Workspace"} /></div></Card>)}</div></AppShell>;
}
