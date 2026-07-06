import type { CommercialActivity, CommercialForecast, CommercialPlan, CommercialTemplate, RelationshipPath, WeeklyReview } from "@/types/domain";

export type CommercialOperatingPlan = {
  plan: CommercialPlan;
  activities: CommercialActivity[];
  relationshipPaths: RelationshipPath[];
  forecast: CommercialForecast;
  weeklyReviews: WeeklyReview[];
  templates: CommercialTemplate[];
};
