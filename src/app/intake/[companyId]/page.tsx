import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge, Button, Card, Field, Progress, ToggleField } from "@/components/ui";
import { seedIntakes } from "@/lib/data/seed";
import { compactList } from "@/lib/utils";

const sections = [
  "Company Basics",
  "Product Overview",
  "Ideal Customer Profile",
  "Top Customers",
  "Technology Stack",
  "Current GTM Motion",
  "Partner Readiness",
  "Commercial Goals",
  "Supporting Documents",
  "Review & Submit"
];

export default async function IntakePage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const intake = seedIntakes.find((item) => item.company.id === companyId);
  if (!intake) notFound();

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} /> Dashboard</Link>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <Badge tone="blue">Founder wizard</Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">{intake.company.name} intake</h2>
            <p className="mt-2 text-sm text-muted-foreground">Drafts can be saved at any point. Submission requires the minimum TVB intelligence fields.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              action={{
                url: `/api/companies/${companyId}/intake/save`,
                payload: intake,
                successMessage: "Draft saved"
              }}
            >
              <Save className="mr-2" size={16} />Save draft
            </Button>
            <Button
              action={{
                url: `/api/companies/${companyId}/intake/submit`,
                payload: intake,
                successMessage: "Submitted",
                redirectTo: "/review"
              }}
            >
              <Send className="mr-2" size={16} />Submit for review
            </Button>
          </div>
        </div>
        <Progress value={intake.company.completion} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[260px_1fr]">
        <Card className="h-fit p-3">
          <div className="grid gap-1">
            {sections.map((section, index) => (
              <div key={section} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-muted text-xs font-semibold">{index + 1}</span>
                <span>{section}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-5">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Company Basics</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Company legal name" value={intake.company.legalName} />
              <Field label="Brand name" value={intake.company.name} />
              <Field label="Website" value={intake.company.website} />
              <Field label="Headquarters" value={intake.company.headquarters} />
              <Field label="Founded year" value={intake.company.foundedYear} />
              <Field label="Employee count" value={intake.company.employeeCountRange} />
              <Field label="Revenue range" value={intake.company.revenueRange} />
              <Field label="Funding stage" value={intake.company.fundingStage} />
              <Field label="Primary industry" value={intake.company.primaryIndustry} />
              <Field label="Secondary industries" value={compactList(intake.company.secondaryIndustries)} />
              <Field label="Founder name" value={intake.company.founderName} />
              <Field label="Founder email" value={intake.company.founderEmail} />
              <div className="md:col-span-2"><Field label="Short company description" value={intake.company.description} multiline /></div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Product Overview</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Product name" value={intake.profile.productName} />
              <Field label="Product category" value={intake.profile.productCategory} />
              <Field label="Problem solved" value={intake.profile.problemSolved} multiline />
              <Field label="Primary use case" value={intake.profile.primaryUseCase} multiline />
              <Field label="Key differentiators" value={compactList(intake.profile.keyDifferentiators)} />
              <Field label="Deployment model" value={intake.profile.deploymentModel} />
              <Field label="Pricing model" value={intake.profile.pricingModel} />
              <Field label="Average contract value" value={intake.profile.averageContractValue} />
              <Field label="Sales cycle length" value={intake.profile.salesCycleLength} />
              <Field label="Implementation timeline" value={intake.profile.implementationTimeline} />
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">ICP, GTM, and Commercial Goals</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Target industries" value={compactList(intake.icp.targetIndustries)} />
              <Field label="Buyer titles" value={compactList(intake.icp.buyerTitles)} />
              <Field label="Target geographies" value={compactList(intake.icp.targetGeographies)} />
              <Field label="Current sales motion" value={intake.gtm.currentSalesMotion} />
              <Field label="Current pipeline" value={intake.gtm.currentPipeline} />
              <Field label="Current ARR" value={intake.gtm.currentArr} />
              <Field label="12-month revenue goal" value={intake.commercialGoals.twelveMonthRevenueGoal} />
              <Field label="Target partner types" value={compactList(intake.commercialGoals.targetPartnerTypes)} />
              <Field label="Founder asks from TVB" value={intake.commercialGoals.founderAsksFromTvb} />
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Technology & Partner Readiness</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Cloud provider" value={intake.technology.cloudProvider} />
              <Field label="Backend language" value={intake.technology.backendLanguage} />
              <Field label="Frontend framework" value={intake.technology.frontendFramework} />
              <Field label="Database" value={intake.technology.databaseSystem} />
              <ToggleField label="Product is partner-sellable" checked={intake.partnerReadiness.partnerSellable} />
              <ToggleField label="Requires implementation services" checked={intake.partnerReadiness.requiresImplementationServices} />
              <ToggleField label="Partner collateral available" checked={intake.partnerReadiness.partnerCollateralAvailable} />
              <ToggleField label="Demo environment available" checked={intake.partnerReadiness.demoEnvironmentAvailable} />
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-lg font-semibold">Top Customers & Documents</h3>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr><th className="p-3">Customer</th><th className="p-3">Industry</th><th className="p-3">Use case</th><th className="p-3">Referenceable</th></tr>
                </thead>
                <tbody>
                  {(intake.customers.length ? intake.customers : [{ id: "empty", customerName: "No customers added", industry: "", useCase: "", referenceable: false }]).map((customer) => (
                    <tr key={customer.id} className="border-t border-border">
                      <td className="p-3">{customer.customerName}</td>
                      <td className="p-3">{customer.industry}</td>
                      <td className="p-3">{customer.useCase}</td>
                      <td className="p-3">{customer.referenceable ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-md border border-dashed border-border bg-white p-6 text-center text-sm text-muted-foreground">Upload pitch decks, case studies, pricing sheets, architecture docs, sales collateral, references, or demo links.</div>
          </Card>

          <div className="flex justify-between">
            <Button variant="secondary" href="/"><ArrowLeft className="mr-2" size={16} />Back</Button>
            <Button href={`/profile/${companyId}`}>Next section<ArrowRight className="ml-2" size={16} /></Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
