import { notFound } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Field } from "@/components/ui";
import { getPartnerUniverse } from "@/lib/partners/seed";

export default async function PartnerImportPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const universe = getPartnerUniverse(companyId);
  if (!universe) notFound();

  return (
    <AppShell>
      <div className="mb-6">
        <Badge tone="blue">Partner Import</Badge>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">Import Stakeholders</h2>
        <p className="mt-2 text-sm text-muted-foreground">Manual entry, CSV upload, copy/paste table, and future connector placeholders.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">Manual Partner Entry</h3>
          <div className="grid gap-4">
            <Field label="Partner name" />
            <Field label="Website" />
            <Field label="Partner type" />
            <Field label="Geography" />
            <Field label="Industry focus" />
            <Field label="Technology focus" />
            <Field label="Cloud alignment" />
            <Field label="Known relationship owner" />
            <Field label="Notes" multiline />
            <Button>Import partner</Button>
          </div>
        </Card>
        <div className="grid gap-5">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">CSV Upload</h3>
            <div className="rounded-md border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
              <UploadCloud className="mx-auto mb-3" size={28} />
              Upload a CSV with partner name, website, type, geography, industries, technologies, cloud focus, owner, and notes.
            </div>
            <Button className="mt-4" variant="secondary">Upload CSV</Button>
          </Card>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Copy/Paste Table</h3>
            <Field label="Paste rows" multiline />
            <Button className="mt-4">Parse pasted partners</Button>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Future Connector</h3>
            <p className="text-sm text-muted-foreground">Connector placeholder for partner CRM, marketplace, and ecosystem data imports.</p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
