import Link from "next/link";
import { Building2, CalendarDays, ClipboardList, FileSearch, FileSliders, Gauge, Handshake, Network, ShieldCheck, Table2, Users } from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: Building2 },
  { href: "/intake/healthcare-saas", label: "Intake", icon: ClipboardList },
  { href: "/profile/healthcare-saas", label: "Profile", icon: Gauge },
  { href: "/knowledge/healthcare-saas", label: "Knowledge", icon: Network },
  { href: "/knowledge/healthcare-saas/documents", label: "Documents", icon: FileSearch },
  { href: "/knowledge/healthcare-saas/customers", label: "Customers", icon: Users },
  { href: "/knowledge/healthcare-saas/icp", label: "ICP Intelligence", icon: Gauge },
  { href: "/partners/healthcare-saas", label: "Partners", icon: Handshake },
  { href: "/partners/healthcare-saas/matrix", label: "Scoring Matrix", icon: Table2 },
  { href: "/commercial/healthcare-saas", label: "Commercial Plan", icon: CalendarDays },
  { href: "/review", label: "TVB Review", icon: ShieldCheck },
  { href: "/admin", label: "Config", icon: FileSliders }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-white p-5 lg:block">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary">TVB Intelligence Engine</p>
          <h1 className="mt-2 text-xl font-semibold tracking-normal">Network Intelligence</h1>
        </div>
        <nav className="grid gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">{children}</div>
      </main>
    </div>
  );
}
