import { AppShell } from "@/components/app-shell";
import { Badge, Card, ToggleField } from "@/components/ui";

const roles = ["Platform Admin", "TVB Admin", "TVB Operator", "Advisor", "Founder", "Investor", "Read Only", "Custom Role"];
const permissions = ["View companies", "Edit intake", "Approve recommendations", "Edit prompts", "Change model routing", "Manage users", "Export data", "View audit"];

export default function SecurityPage() {
  return (
    <AppShell>
      <div className="mb-6"><Badge tone="blue">Security & RBAC</Badge><h2 className="mt-3 text-3xl font-semibold tracking-normal">Role Management</h2></div>
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card><h3 className="mb-3 font-semibold">Roles</h3><div className="grid gap-2 text-sm text-muted-foreground">{roles.map((role) => <span key={role}>{role}</span>)}</div></Card>
        <Card><h3 className="mb-3 font-semibold">Permissions</h3><div className="grid gap-3 md:grid-cols-2">{permissions.map((permission) => <ToggleField key={permission} label={permission} checked />)}</div></Card>
        <Card><h3 className="mb-3 font-semibold">Security Controls</h3><div className="grid gap-3"><ToggleField label="Row Level Security" checked /><ToggleField label="Encrypted secrets" checked /><ToggleField label="Signed URLs" checked /><ToggleField label="Audit every action" checked /></div></Card>
        <Card><h3 className="mb-3 font-semibold">Enterprise Ready</h3><div className="grid gap-3"><ToggleField label="SSO ready" /><ToggleField label="Rate limiting" checked /><ToggleField label="Session management" checked /><ToggleField label="API key vault" checked /></div></Card>
      </div>
    </AppShell>
  );
}
