import { getKnowledgeBase } from "@/lib/knowledge/seed";
import type { CompanyPartner, Partner } from "@/types/domain";
import type { CompanyPartnerUniverse, PartnerWithScore } from "./types";
import { rankPartners, recommendPartner, scorePartner } from "./synthesis";

const now = new Date().toISOString();

const partners: Partner[] = [
  {
    id: "accenture-health-cloud",
    name: "Accenture Health Cloud",
    website: "https://www.accenture.com",
    description: "Enterprise consulting and implementation partner for healthcare cloud transformation.",
    partnerType: "system_integrator",
    headquarters: "Dublin, Ireland",
    geographies: ["US", "UK", "UAE"],
    industries: ["Health systems", "Payers", "Healthcare"],
    technologyFocus: ["FHIR", "Epic", "AWS", "Azure", "Integration API"],
    cloudFocus: ["AWS", "Azure"],
    servicesOffered: ["implementation", "integration", "change management", "managed services"],
    partnerSize: "Enterprise",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "aws-marketplace",
    name: "AWS Marketplace GTM",
    website: "https://aws.amazon.com/marketplace",
    description: "Hyperscaler marketplace and co-sell channel for cloud-native SaaS companies.",
    partnerType: "marketplace_partner",
    headquarters: "Seattle, WA",
    geographies: ["US", "Global"],
    industries: ["Healthcare", "SaaS", "AI Infrastructure"],
    technologyFocus: ["AWS", "Marketplace", "SaaS"],
    cloudFocus: ["AWS"],
    servicesOffered: ["marketplace listing", "co-sell", "private offers"],
    partnerSize: "Hyperscaler",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "regional-hie-network",
    name: "Regional HIE Network",
    website: "https://hie.example",
    description: "Healthcare information exchange network with provider and community organization relationships.",
    partnerType: "referral_partner",
    headquarters: "Austin, TX",
    geographies: ["Texas", "Florida"],
    industries: ["Health systems", "HIEs", "Community care"],
    technologyFocus: ["FHIR", "HL7", "Epic"],
    cloudFocus: ["AWS"],
    servicesOffered: ["referrals", "data exchange", "community onboarding"],
    partnerSize: "Mid-market",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "guidewire-channel",
    name: "Guidewire Channel Advisors",
    website: "https://channel.example",
    description: "B2B SaaS reseller and channel advisory network focused on enterprise software.",
    partnerType: "reseller",
    headquarters: "Dallas, TX",
    geographies: ["US"],
    industries: ["SaaS", "Cybersecurity", "Healthcare"],
    technologyFocus: ["CRM", "Salesforce", "Azure"],
    cloudFocus: ["Azure"],
    servicesOffered: ["resell", "channel enablement", "sales training"],
    partnerSize: "Boutique",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "bluepeak-managed-security",
    name: "BluePeak Managed Security",
    website: "https://bluepeak.example",
    description: "MSSP with cloud identity, compliance, and managed detection offerings.",
    partnerType: "mssp",
    headquarters: "Denver, CO",
    geographies: ["US", "Canada"],
    industries: ["Cybersecurity", "Financial services", "Healthcare"],
    technologyFocus: ["Azure AD", "Okta", "Cloud identity"],
    cloudFocus: ["Azure"],
    servicesOffered: ["managed security", "integration", "compliance support"],
    partnerSize: "Mid-market",
    createdAt: now,
    updatedAt: now
  }
];

function companyPartners(companyId: string): CompanyPartner[] {
  return partners.map((partner, index) => ({
    id: `${companyId}-${partner.id}`,
    companyId,
    partnerId: partner.id,
    source: index < 3 ? "manual_seed" : "csv_seed",
    relationshipOwner: index === 0 ? "Harshal Shah" : "",
    relationshipStrength: [82, 74, 68, 48, 42][index] ?? 40,
    notes: index === 0 ? "Potential enterprise implementation path with healthcare expertise." : "Imported for partner universe scoring.",
    status: "generated",
    createdAt: now,
    updatedAt: now
  }));
}

export function getPartnerUniverse(companyId: string): CompanyPartnerUniverse | undefined {
  const knowledge = getKnowledgeBase(companyId);
  if (!knowledge) return undefined;
  const links = companyPartners(companyId);
  const scores = links.map((link) => scorePartner(knowledge, partners.find((partner) => partner.id === link.partnerId)!, link));
  const recommendations = scores.map((score) => recommendPartner(knowledge, partners.find((partner) => partner.id === score.partnerId)!, score));
  return { knowledge, partners, companyPartners: links, scores, recommendations };
}

export function getRankedPartnerRows(companyId: string): PartnerWithScore[] {
  const universe = getPartnerUniverse(companyId);
  if (!universe) return [];
  return rankPartners(universe.companyPartners.map((companyPartner) => {
    const partner = universe.partners.find((item) => item.id === companyPartner.partnerId)!;
    const score = universe.scores.find((item) => item.partnerId === partner.id)!;
    const recommendation = universe.recommendations.find((item) => item.partnerId === partner.id)!;
    return { partner, companyPartner, score, recommendation };
  }));
}
