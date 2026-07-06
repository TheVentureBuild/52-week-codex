import type { CompanyKnowledgeBase } from "@/lib/knowledge/types";
import type { CompanyPartner, Partner, PartnerRecommendation, PartnerScore } from "@/types/domain";

export type CompanyPartnerUniverse = {
  knowledge: CompanyKnowledgeBase;
  partners: Partner[];
  companyPartners: CompanyPartner[];
  scores: PartnerScore[];
  recommendations: PartnerRecommendation[];
};

export type PartnerImportInput = {
  companyId: string;
  sourceType: "manual" | "csv" | "paste" | "connector";
  rows: Partial<Partner>[];
};

export type PartnerWithScore = {
  partner: Partner;
  companyPartner: CompanyPartner;
  score: PartnerScore;
  recommendation: PartnerRecommendation;
};
