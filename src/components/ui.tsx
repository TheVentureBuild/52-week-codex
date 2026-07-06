import { cn } from "@/lib/utils";

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "amber" | "blue" }) {
  const tones = {
    neutral: "bg-muted text-muted-foreground",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-cyan-50 text-cyan-700"
  };
  return <span className={cn("inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("rounded-lg border border-border bg-card p-5 shadow-sm", className)}>{children}</section>;
}

export function Button({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "secondary" }) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition",
        variant === "primary" ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-white hover:bg-muted",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-sm bg-muted">
      <div className="h-2 rounded-sm bg-primary" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Field({ label, value, multiline }: { label: string; value?: string | number; multiline?: boolean }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {multiline ? (
        <textarea className="min-h-24 rounded-md border border-border bg-white p-3 text-sm outline-none focus:border-primary" defaultValue={value} />
      ) : (
        <input className="h-10 rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-primary" defaultValue={value} />
      )}
    </label>
  );
}

export function ToggleField({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-border bg-white px-3 py-2 text-sm">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={checked} className="h-4 w-4 accent-teal-700" />
    </label>
  );
}
