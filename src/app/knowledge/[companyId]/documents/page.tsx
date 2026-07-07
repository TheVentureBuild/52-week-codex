import { notFound } from "next/navigation";
import { RefreshCw, UploadCloud } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Field, ToggleField } from "@/components/ui";
import { getKnowledgeBase } from "@/lib/knowledge/seed";

export default async function DocumentIntelligencePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const knowledge = getKnowledgeBase(companyId);
  if (!knowledge) notFound();

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge tone="blue">Document Intelligence</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">Documents & Sources</h2>
          <p className="mt-2 text-sm text-muted-foreground">Classify documents, extract entities, connect Google Drive, and keep processing stages visible.</p>
        </div>
        <Button
          action={{
            url: "/api/knowledge/documents/upload",
            payload: { companyId, fileName: "demo-upload.pdf", documentCategory: "uploaded_demo" },
            successMessage: "Upload queued"
          }}
        >
          <UploadCloud className="mr-2" size={16} />Upload document
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-0">
          <div className="overflow-hidden rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr><th className="p-4">Document</th><th className="p-4">Type</th><th className="p-4">Status</th><th className="p-4">Topics</th><th className="p-4">Confidence</th><th className="p-4">Action</th></tr>
              </thead>
              <tbody>
                {knowledge.documents.map((document) => (
                  <tr key={document.id} className="border-t border-border">
                    <td className="p-4"><div className="font-medium">{document.fileName}</div><div className="text-muted-foreground">{document.summary}</div></td>
                    <td className="p-4">{document.documentCategory}</td>
                    <td className="p-4"><Badge tone="green">{document.processingStage.replace("_", " ")}</Badge></td>
                    <td className="p-4">{document.extractedTopics.join(", ")}</td>
                    <td className="p-4">{document.confidenceScore}%</td>
                    <td className="p-4">
                      <Button
                        variant="secondary"
                        action={{
                          url: "/api/knowledge/reprocess",
                          payload: { companyId, documentId: document.id },
                          successMessage: "Queued"
                        }}
                      >
                        <RefreshCw className="mr-2" size={15} />Reprocess
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid h-fit gap-5">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Google Drive Connector</h3>
            <div className="grid gap-4">
              <Field label="Folder URL" value={knowledge.googleDriveConnection.folderUrl} />
              <Field label="Sync frequency" value={knowledge.googleDriveConnection.syncFrequency} />
              <Field label="Maximum file size MB" value={knowledge.googleDriveConnection.maximumFileSizeMb} />
              <Field label="Supported types" value={knowledge.googleDriveConnection.supportedTypes.join(", ")} />
              <ToggleField label="Auto sync" checked={knowledge.googleDriveConnection.autoSync} />
              <ToggleField label="Include subfolders" checked={knowledge.googleDriveConnection.includeSubfolders} />
              <Button
                action={{
                  url: "/api/knowledge/google-drive/connect",
                  payload: { companyId, folderUrl: knowledge.googleDriveConnection.folderUrl },
                  successMessage: "Folder connected"
                }}
              >
                Connect folder
              </Button>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Extracted Entities</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {knowledge.entities.slice(0, 10).map((entity) => <span key={entity.id}>{entity.entityType}: {entity.name}</span>)}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
