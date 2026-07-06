begin;

-- Demo workspace and company used across Modules 1-6.
insert into workspaces (id, name, created_by)
values ('00000000-0000-4000-8000-000000000001', 'TVB Demo Workspace', null)
on conflict (id) do update set name = excluded.name;

insert into companies (
  id, workspace_id, name, legal_name, website, description, headquarters,
  founded_year, employee_count_range, revenue_range, funding_stage,
  primary_industry, secondary_industries, founder_name, founder_email,
  intake_status, profile_generation_status, review_status, created_by, submitted_at
)
values (
  '10000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000001',
  'Pulsar Care',
  'Pulsar Care Inc.',
  'https://pulsarcare.example',
  'AI-enabled closed-loop referral and care coordination platform for health systems and community-based organizations.',
  'Austin, TX',
  2022,
  '11-50',
  '$1M-$5M',
  'Seed',
  'Healthcare',
  '["Social Care", "Care Coordination", "Applied AI"]'::jsonb,
  'Maya Patel',
  'maya@pulsarcare.example',
  'submitted',
  'generated',
  'ready_for_review',
  null,
  now()
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  intake_status = excluded.intake_status,
  profile_generation_status = excluded.profile_generation_status,
  review_status = excluded.review_status,
  updated_at = now();

insert into company_profiles (
  id, company_id, product_name, product_category, problem_solved, primary_use_case,
  secondary_use_cases, differentiators, deployment_model, pricing_model,
  average_contract_value, sales_cycle_length, implementation_timeline, product_maturity
)
values (
  '10000000-0000-4000-8000-000000000002',
  '10000000-0000-4000-8000-000000000001',
  'Pulsar Connect',
  'Care coordination SaaS',
  'Health systems struggle to close the loop between clinical referrals, social-care partners, and measurable outcomes.',
  'Closed-loop referral orchestration for value-based care teams.',
  '["Community partner routing", "Consent-aware data sharing", "ER diversion analytics"]'::jsonb,
  '["FHIR-ready integration layer", "Workflow automation for care teams", "Partner performance analytics"]'::jsonb,
  'Cloud SaaS',
  'Annual platform fee plus implementation services',
  85000,
  '90-120 days',
  '6-8 weeks',
  'Pilot-ready'
)
on conflict (id) do update set product_name = excluded.product_name;

insert into company_icp (
  id, company_id, target_company_size, target_industries, target_geographies,
  buyer_titles, influencer_titles, economic_buyer, technical_buyer, pain_points,
  trigger_events, disqualifying_factors
)
values (
  '10000000-0000-4000-8000-000000000003',
  '10000000-0000-4000-8000-000000000001',
  'Mid-market to enterprise health systems',
  '["Hospitals", "Accountable Care Organizations", "Medicaid MCOs"]'::jsonb,
  '["United States"]'::jsonb,
  '["Chief Population Health Officer", "VP Care Management", "Chief Digital Officer"]'::jsonb,
  '["Director of Social Work", "Integration Lead", "Value-Based Care Program Manager"]'::jsonb,
  'Chief Population Health Officer',
  'VP Integration Architecture',
  '["Untracked referrals", "Manual partner coordination", "Inconsistent SDOH outcomes reporting"]'::jsonb,
  '["New value-based care contract", "State Medicaid quality initiative", "Readmission reduction mandate"]'::jsonb,
  '["No care-management team", "No integration capacity", "Pure fee-for-service revenue model"]'::jsonb
)
on conflict (id) do update set target_company_size = excluded.target_company_size;

insert into company_customers (
  id, company_id, customer_name, industry, company_size, geography, use_case,
  annual_revenue, contract_value, deployment_type, success_story, expansion_potential, referenceable
)
values (
  '10000000-0000-4000-8000-000000000004',
  '10000000-0000-4000-8000-000000000001',
  'Lone Star Community Health Network',
  'Healthcare',
  '1,000-5,000 employees',
  'Texas',
  'Care referral tracking across community partners',
  250000000,
  72000,
  'Pilot',
  'Reduced manual referral follow-up time by 32% during a six-week pilot.',
  'Expand from two clinics to ten clinics after integration hardening.',
  true
)
on conflict (id) do update set customer_name = excluded.customer_name;

insert into company_technology (
  id, company_id, cloud_provider, backend_language, frontend_framework, database_system,
  ai_stack, data_infrastructure, integrations, api_available, security_certifications,
  compliance_requirements, marketplace_listings, hosting_model
)
values (
  '10000000-0000-4000-8000-000000000005',
  '10000000-0000-4000-8000-000000000001',
  'AWS',
  'TypeScript',
  'React',
  'PostgreSQL',
  '["OpenAI", "LangChain", "Rules-based routing"]'::jsonb,
  '["FHIR ingestion", "Event queue", "Analytics warehouse"]'::jsonb,
  '["Epic App Orchard", "Salesforce Health Cloud", "Unite Us"]'::jsonb,
  true,
  '["SOC 2 planned"]'::jsonb,
  '["HIPAA", "BAA required"]'::jsonb,
  '["AWS Marketplace planned"]'::jsonb,
  'Single-tenant cloud'
)
on conflict (id) do update set cloud_provider = excluded.cloud_provider;

insert into company_gtm (
  id, company_id, current_sales_motion, founder_led_sales, direct_enterprise_sales,
  channel_sales, existing_partners, existing_resellers, existing_si_relationships,
  hyperscaler_relationship, marketing_channels, current_pipeline, current_arr, revenue_goals
)
values (
  '10000000-0000-4000-8000-000000000006',
  '10000000-0000-4000-8000-000000000001',
  'Founder-led enterprise pilots',
  true,
  true,
  false,
  '["Community health coalition"]'::jsonb,
  '[]'::jsonb,
  '["Regional healthcare IT consultant"]'::jsonb,
  'Early AWS alignment through marketplace discovery',
  '["Founder network", "Healthcare conferences", "Partner referrals"]'::jsonb,
  420000,
  180000,
  '["Reach $1M ARR in 12 months", "Launch two SI-led pilots", "Convert first marketplace transaction"]'::jsonb
)
on conflict (id) do update set current_sales_motion = excluded.current_sales_motion;

insert into company_partner_readiness (
  id, company_id, partner_sellable, requires_implementation_services,
  requires_integration_services, requires_managed_services, partners_can_make_services_revenue,
  partner_collateral_available, partner_margin_available, revenue_share_available,
  training_material_available, demo_environment_available
)
values (
  '10000000-0000-4000-8000-000000000007',
  '10000000-0000-4000-8000-000000000001',
  true, true, true, false, true, true, false, true, false, true
)
on conflict (id) do update set partner_sellable = excluded.partner_sellable;

insert into company_documents (
  id, company_id, file_name, file_type, storage_path, uploaded_by, processing_status
)
values (
  '10000000-0000-4000-8000-000000000008',
  '10000000-0000-4000-8000-000000000001',
  'pulsar-care-demo-deck.pdf',
  'pdf',
  'demo/pulsar-care-demo-deck.pdf',
  null,
  'processed'
)
on conflict (id) do update set processing_status = excluded.processing_status;

insert into company_intelligence_profiles (
  id, company_id, summary, product_category, core_problem, icp_summary, buyer_personas,
  customer_segments, traction_summary, technology_summary, gtm_readiness_score,
  partner_readiness_score, hyperscaler_alignment, si_partner_potential,
  revenue_motion_summary, missing_information, recommended_next_data, confidence_score,
  evidence, generated_by_model, prompt_version
)
values (
  '10000000-0000-4000-8000-000000000009',
  '10000000-0000-4000-8000-000000000001',
  'Pulsar Care is a pilot-ready healthcare workflow platform with strong value-based care relevance and partner-led services potential.',
  'Healthcare workflow SaaS',
  'Manual and fragmented referral coordination prevents health systems from proving social-care outcomes.',
  'Best fit is US health systems with active value-based care contracts and existing care-management capacity.',
  '[{"title":"Chief Population Health Officer","priority":"economic buyer"},{"title":"VP Integration Architecture","priority":"technical buyer"}]'::jsonb,
  '["Health systems", "Medicaid managed-care plans", "Community health networks"]'::jsonb,
  'One referenceable pilot and $420K qualified pipeline.',
  'AWS-hosted TypeScript/Postgres platform with FHIR and Salesforce Health Cloud integration paths.',
  78,
  84,
  'Good AWS marketplace potential after security package completion.',
  'High services attach potential for healthcare SIs.',
  'Founder-led pilots should convert into SI-supported repeatable implementations.',
  '["Signed BAA evidence", "Detailed implementation SOW", "Partner margin model"]'::jsonb,
  '["Upload security questionnaire", "Add partner training deck", "Validate Epic integration reference"]'::jsonb,
  0.82,
  '["Founder intake", "Pilot customer note", "Partner readiness answers"]'::jsonb,
  'demo-seed',
  'v1-demo'
)
on conflict (id) do update set summary = excluded.summary;

insert into configurations (id, config_key, config_value, config_type, active)
values (
  '20000000-0000-4000-8000-000000000001',
  'demo.scoring_weights',
  '{"gtm":0.3,"partner":0.35,"icp":0.25,"evidence":0.1}'::jsonb,
  'scoring',
  true
)
on conflict (id) do update set config_value = excluded.config_value;

insert into prompt_registry (id, prompt_key, version, purpose, prompt_template, input_schema, output_schema, active)
values (
  '20000000-0000-4000-8000-000000000002',
  'company_intelligence_profile',
  'v1-demo',
  'Generate company intelligence profile from founder intake and documents.',
  'Summarize the company, ICP, partner readiness, and missing evidence.',
  '{"company_id":"uuid"}'::jsonb,
  '{"summary":"string","confidence_score":"number"}'::jsonb,
  true
)
on conflict (id) do update set prompt_template = excluded.prompt_template;

insert into ai_provider_configs (id, provider_name, provider_type, model_name, use_case, config, active)
values (
  '20000000-0000-4000-8000-000000000003',
  'OpenAI',
  'llm',
  'gpt-5-mini',
  'demo intelligence generation',
  '{"temperature":0.2,"max_output_tokens":1800}'::jsonb,
  true
)
on conflict (id) do update set model_name = excluded.model_name;

-- Module 02: Knowledge Intelligence and ICP Discovery.
insert into knowledge_sources (
  id, company_id, source_type, source_uri, sync_frequency, auto_sync,
  include_subfolders, maximum_file_size_mb, supported_types, status
)
values (
  '30000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'google_drive',
  'drive://tvb-demo/pulsar-care',
  'weekly',
  true,
  true,
  25,
  '["pdf", "docx", "pptx", "md"]'::jsonb,
  'connected'
)
on conflict (id) do update set status = excluded.status;

insert into knowledge_documents (
  id, company_id, source_id, file_name, file_type, document_category, storage_path,
  source_uri, processing_stage, summary, extracted_topics, extracted_technologies,
  extracted_customers, extracted_competitors, extracted_products, confidence_score,
  page_count, indexed_chunks
)
values (
  '30000000-0000-4000-8000-000000000002',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000001',
  'Pulsar Care Partner Brief.pdf',
  'pdf',
  'partner_brief',
  'demo/Pulsar Care Partner Brief.pdf',
  'drive://tvb-demo/pulsar-care/partner-brief',
  'indexed',
  'Partner brief highlights closed-loop referrals, FHIR integrations, and SI implementation revenue opportunity.',
  '["Closed-loop referrals", "Value-based care", "FHIR integrations"]'::jsonb,
  '["FHIR", "Salesforce Health Cloud", "PostgreSQL"]'::jsonb,
  '["Lone Star Community Health Network"]'::jsonb,
  '["Unite Us", "Findhelp"]'::jsonb,
  '["Pulsar Connect"]'::jsonb,
  0.86,
  12,
  2
)
on conflict (id) do update set processing_stage = excluded.processing_stage;

insert into knowledge_chunks (
  id, company_id, document_id, chunk_index, content, page_reference, token_count, embedding, metadata
)
values
(
  '30000000-0000-4000-8000-000000000003',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',
  1,
  'Pulsar Connect helps care-management teams route referrals to community partners, track closure, and report value-based outcomes.',
  'p.2',
  28,
  null,
  '{"section":"value proposition"}'::jsonb
),
(
  '30000000-0000-4000-8000-000000000004',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',
  2,
  'Implementation partners can package integration, workflow design, training, and ongoing optimization services around the platform.',
  'p.7',
  24,
  null,
  '{"section":"partner opportunity"}'::jsonb
)
on conflict (id) do update set content = excluded.content;

insert into knowledge_entities (
  id, company_id, document_id, entity_type, name, confidence_score, evidence, page_reference, metadata
)
values
(
  '30000000-0000-4000-8000-000000000005',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',
  'customer',
  'Lone Star Community Health Network',
  0.87,
  'Named as pilot customer in partner brief.',
  'p.5',
  '{"referenceable":true}'::jsonb
),
(
  '30000000-0000-4000-8000-000000000006',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',
  'technology',
  'FHIR',
  0.9,
  'FHIR-ready integration layer listed in solution architecture.',
  'p.8',
  '{"category":"interoperability"}'::jsonb
)
on conflict (id) do update set evidence = excluded.evidence;

insert into knowledge_relationships (
  id, company_id, source_entity_id, target_entity_id, source_node, relationship_type,
  target_node, confidence_score, evidence, metadata
)
values (
  '30000000-0000-4000-8000-000000000007',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000005',
  '30000000-0000-4000-8000-000000000006',
  'Lone Star Community Health Network',
  'requires_integration',
  'FHIR',
  0.79,
  'Pilot deployment requires interoperability with health-system systems.',
  '{"source":"partner brief"}'::jsonb
)
on conflict (id) do update set relationship_type = excluded.relationship_type;

insert into knowledge_topics (id, company_id, document_id, topic, confidence_score, evidence)
values (
  '30000000-0000-4000-8000-000000000008',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',
  'Healthcare SI services attach',
  0.83,
  'Partner brief describes implementation, training, and optimization services.'
)
on conflict (id) do update set topic = excluded.topic;

insert into company_personas (
  id, company_id, persona_type, title, goals, pain_points, kpis, buying_criteria,
  objections, decision_drivers, evidence, confidence_score
)
values (
  '30000000-0000-4000-8000-000000000009',
  '10000000-0000-4000-8000-000000000001',
  'economic_buyer',
  'Chief Population Health Officer',
  '["Reduce avoidable ER usage", "Improve referral closure", "Prove value-based care outcomes"]'::jsonb,
  '["Fragmented partner network", "Manual reporting", "Low visibility into referral status"]'::jsonb,
  '["Readmission rate", "Referral closure rate", "Cost avoidance"]'::jsonb,
  '["HIPAA readiness", "Integration feasibility", "Pilot speed"]'::jsonb,
  '["Security package incomplete", "Need proof of outcomes"]'::jsonb,
  '["Value-based care contract pressure", "Community health mandate"]'::jsonb,
  '["Founder intake", "Partner brief"]'::jsonb,
  0.84
)
on conflict (id) do update set title = excluded.title;

insert into company_icp_analysis (
  id, company_id, current_icp, suggested_icp, confidence_score, supporting_evidence,
  missing_segments, recommended_segments, priority_industries, recommended_buyer_titles,
  ideal_company_size, ideal_geography
)
values (
  '30000000-0000-4000-8000-000000000010',
  '10000000-0000-4000-8000-000000000001',
  'Broad healthcare organizations looking for referral coordination.',
  'US health systems and Medicaid MCOs with value-based care contracts and integration budgets.',
  0.81,
  '["Pilot customer", "FHIR capability", "Closed-loop referral workflow"]'::jsonb,
  '["Behavioral health networks", "Rural hospital alliances"]'::jsonb,
  '["Medicaid MCOs", "ACO networks", "Population health departments"]'::jsonb,
  '["Healthcare", "Government health programs"]'::jsonb,
  '["Chief Population Health Officer", "VP Care Management", "Chief Digital Officer"]'::jsonb,
  '1,000+ employees',
  'United States'
)
on conflict (id) do update set suggested_icp = excluded.suggested_icp;

insert into customer_patterns (
  id, company_id, common_industry, average_company_size, common_geography, buying_committee,
  technical_decision_makers, business_decision_makers, typical_acv, implementation_length,
  common_integrations, deployment_models, success_factors, expansion_factors
)
values (
  '30000000-0000-4000-8000-000000000011',
  '10000000-0000-4000-8000-000000000001',
  'Healthcare',
  '1,000-5,000 employees',
  'United States',
  '["Population Health", "Care Management", "IT Integration", "Compliance"]'::jsonb,
  '["VP Integration Architecture", "Security Officer"]'::jsonb,
  '["Chief Population Health Officer", "VP Care Management"]'::jsonb,
  85000,
  '6-8 weeks',
  '["FHIR", "Salesforce Health Cloud", "Epic"]'::jsonb,
  '["Cloud SaaS", "Single tenant"]'::jsonb,
  '["Executive sponsor", "Data-sharing agreement", "Community partner onboarding"]'::jsonb,
  '["Additional clinics", "Managed services", "Analytics add-on"]'::jsonb
)
on conflict (id) do update set common_industry = excluded.common_industry;

insert into knowledge_processing_jobs (
  id, company_id, document_id, stage, status, restartable, completed_at
)
values (
  '30000000-0000-4000-8000-000000000012',
  '10000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',
  'indexing',
  'completed',
  true,
  now()
)
on conflict (id) do update set status = excluded.status;

-- Module 03: Partner Universe and Commercial Scoring.
insert into partners (
  id, name, website, description, partner_type, headquarters, geographies,
  industries, technology_focus, cloud_focus, services_offered, partner_size
)
values
(
  '40000000-0000-4000-8000-000000000001',
  'Accenture Health Cloud',
  'https://accenture.example/health',
  'Global consulting and systems integration partner focused on healthcare transformation.',
  'systems_integrator',
  'New York, NY',
  '["United States", "Europe"]'::jsonb,
  '["Healthcare", "Public Sector"]'::jsonb,
  '["Salesforce Health Cloud", "FHIR", "AI workflow automation"]'::jsonb,
  '["AWS", "Microsoft Azure"]'::jsonb,
  '["Implementation", "Integration", "Change management", "Managed services"]'::jsonb,
  'Enterprise'
),
(
  '40000000-0000-4000-8000-000000000002',
  'AWS Healthcare Marketplace',
  'https://aws.example/healthcare',
  'Cloud marketplace and partner channel for healthcare SaaS solutions.',
  'hyperscaler',
  'Seattle, WA',
  '["United States"]'::jsonb,
  '["Healthcare", "Life Sciences"]'::jsonb,
  '["Cloud infrastructure", "Marketplace procurement", "Healthcare data"]'::jsonb,
  '["AWS"]'::jsonb,
  '["Marketplace listing", "Co-sell support", "Solution architecture"]'::jsonb,
  'Enterprise'
)
on conflict (id) do update set description = excluded.description;

insert into company_partners (
  id, company_id, partner_id, source, relationship_owner, relationship_strength, notes, status
)
values (
  '40000000-0000-4000-8000-000000000003',
  '10000000-0000-4000-8000-000000000001',
  '40000000-0000-4000-8000-000000000001',
  'generated',
  'TVB',
  0.62,
  'Strong healthcare services attach, needs warm intro to healthcare cloud practice.',
  'shortlisted'
)
on conflict (id) do update set status = excluded.status;

insert into partner_scores (
  id, company_id, partner_id, icp_fit_score, industry_fit_score, technology_fit_score,
  cloud_fit_score, customer_overlap_score, services_opportunity_score,
  resale_opportunity_score, relationship_score, speed_to_revenue_score,
  tvb_revenue_potential_score, competitive_risk_score, total_score,
  confidence_score, score_version, evidence
)
values (
  '40000000-0000-4000-8000-000000000004',
  '10000000-0000-4000-8000-000000000001',
  '40000000-0000-4000-8000-000000000001',
  86, 92, 84, 78, 70, 91, 68, 62, 74, 88, 28, 83,
  0.82,
  'v1-demo',
  '["Healthcare vertical focus", "Implementation services potential", "Salesforce Health Cloud alignment"]'::jsonb
)
on conflict (id) do update set total_score = excluded.total_score;

insert into partner_recommendations (
  id, company_id, partner_id, recommendation_type, priority, rationale,
  why_partner_would_care, win_win_proposal, suggested_pitch,
  recommended_next_action, estimated_product_revenue, estimated_services_revenue,
  estimated_tvb_revenue, estimated_time_to_revenue, assumptions, risks, evidence,
  status, owner, notes, mark_for_planning
)
values (
  '40000000-0000-4000-8000-000000000005',
  '10000000-0000-4000-8000-000000000001',
  '40000000-0000-4000-8000-000000000001',
  'co-sell',
  'High',
  'Accenture can monetize implementation and change-management services while Pulsar Care provides a focused healthcare workflow product.',
  'The partner gets services pull-through in population health programs without building the core product.',
  'Package a 90-day closed-loop referral pilot for value-based care teams.',
  'Pulsar Care gives your healthcare cloud practice a faster path to closed-loop referral outcomes with implementation services attached.',
  'Validate warm intro and co-design a pilot SOW.',
  240000,
  420000,
  78000,
  '90-120 days',
  '["Partner has active healthcare transformation accounts", "Pulsar completes security package"]'::jsonb,
  '["Long enterprise procurement cycle", "Security review may slow pilot"]'::jsonb,
  '["Partner score", "Knowledge brief", "Company readiness profile"]'::jsonb,
  'approved_for_planning',
  'Harshal Shah',
  'Use as the first commercial execution test case.',
  true
)
on conflict (id) do update set status = excluded.status;

insert into partner_import_jobs (
  id, company_id, file_name, source_type, status, imported_count, failed_count, errors, completed_at
)
values (
  '40000000-0000-4000-8000-000000000006',
  '10000000-0000-4000-8000-000000000001',
  'demo-partner-universe.csv',
  'csv',
  'completed',
  2,
  0,
  '[]'::jsonb,
  now()
)
on conflict (id) do update set imported_count = excluded.imported_count;

-- Module 04: Commercial Execution Engine.
insert into commercial_plans (
  id, company_id, name, template_key, horizon_weeks, status, commercial_health_score,
  current_week, expected_pipeline, revenue_forecast, completed_activities,
  blocked_activities, at_risk_activities, version
)
values (
  '50000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'Pulsar Care 13-Week Partner Revenue Sprint',
  'partner_revenue_sprint',
  13,
  'active',
  76,
  2,
  660000,
  240000,
  1,
  0,
  1,
  1
)
on conflict (id) do update set status = excluded.status;

insert into commercial_activities (
  id, plan_id, company_id, title, description, category, priority, owner, due_date,
  status, expected_revenue, probability, confidence_score, evidence,
  source_recommendation_id, target_company, target_partner_id, target_contact,
  relationship_needed, commercial_motion, estimated_effort, why_now,
  sequencing_rationale, suggested_email, suggested_meeting_agenda,
  success_criteria, kpis, revenue_impact, execution_difficulty
)
values
(
  '50000000-0000-4000-8000-000000000002',
  '50000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'Validate Accenture healthcare practice intro',
  'Confirm the warmest introduction path and secure discovery conversation.',
  'relationship',
  'High',
  'TVB',
  current_date + interval '7 days',
  'in_progress',
  240000,
  0.42,
  0.79,
  '["Partner recommendation", "Relationship path"]'::jsonb,
  '40000000-0000-4000-8000-000000000005',
  'Accenture Health Cloud',
  '40000000-0000-4000-8000-000000000001',
  'Healthcare Cloud Practice Lead',
  'Warm intro from TVB network',
  'Partner co-sell',
  'Medium',
  'Partner has healthcare workflow transformation demand now.',
  'Intro must happen before pilot SOW creation.',
  'Would welcome 25 minutes to explore a closed-loop referral pilot with services pull-through for your healthcare cloud team.',
  '["Confirm healthcare vertical priorities", "Validate services attach", "Agree next-step pilot design"]'::jsonb,
  '["Intro accepted", "Discovery meeting scheduled", "Pilot owner identified"]'::jsonb,
  '["Meeting booked", "Partner sponsor identified"]'::jsonb,
  240000,
  4
),
(
  '50000000-0000-4000-8000-000000000003',
  '50000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'Package 90-day pilot SOW',
  'Create a partner-ready pilot scope with product, implementation, training, and success metrics.',
  'asset',
  'High',
  'Founder',
  current_date + interval '14 days',
  'draft',
  420000,
  0.35,
  0.74,
  '["Company readiness", "Partner score"]'::jsonb,
  '40000000-0000-4000-8000-000000000005',
  'Accenture Health Cloud',
  '40000000-0000-4000-8000-000000000001',
  'Healthcare Cloud Practice Lead',
  'Partner solution-design session',
  'Pilot packaging',
  'Medium',
  'A clear SOW makes the partner economics concrete.',
  'Needs discovery inputs before finalization.',
  'Sharing a draft pilot package that makes services revenue, implementation scope, and outcome metrics explicit.',
  '["Review pilot outcomes", "Confirm implementation roles", "Align commercial model"]'::jsonb,
  '["Draft SOW completed", "Services revenue estimate approved"]'::jsonb,
  '["SOW draft ready", "Partner feedback received"]'::jsonb,
  420000,
  5
)
on conflict (id) do update set status = excluded.status;

insert into activity_dependencies (id, activity_id, depends_on_activity_id, dependency_type)
values (
  '50000000-0000-4000-8000-000000000004',
  '50000000-0000-4000-8000-000000000003',
  '50000000-0000-4000-8000-000000000002',
  'finish_to_start'
)
on conflict (id) do update set dependency_type = excluded.dependency_type;

insert into activity_assignments (id, activity_id, assigned_to, role, status)
values (
  '50000000-0000-4000-8000-000000000005',
  '50000000-0000-4000-8000-000000000002',
  'Harshal Shah',
  'Relationship owner',
  'active'
)
on conflict (id) do update set status = excluded.status;

insert into activity_notes (id, activity_id, author_id, note)
values (
  '50000000-0000-4000-8000-000000000006',
  '50000000-0000-4000-8000-000000000002',
  null,
  'Demo note: prioritize warm intro path before sending founder-led outbound.'
)
on conflict (id) do update set note = excluded.note;

insert into activity_status_history (id, activity_id, old_status, new_status, changed_by, note)
values (
  '50000000-0000-4000-8000-000000000007',
  '50000000-0000-4000-8000-000000000002',
  'draft',
  'in_progress',
  null,
  'Seeded as active for demo testing.'
)
on conflict (id) do update set new_status = excluded.new_status;

insert into relationship_paths (
  id, company_id, target_partner_id, target_contact, recommended_introduction,
  relationship_strength, tvb_owner, suggested_introduction_path, expected_outcome,
  path_length, warmth, confidence_score
)
values (
  '50000000-0000-4000-8000-000000000008',
  '10000000-0000-4000-8000-000000000001',
  '40000000-0000-4000-8000-000000000001',
  'Healthcare Cloud Practice Lead',
  'Use TVB healthcare advisor network to identify a practice lead with population-health ownership.',
  0.62,
  'Harshal Shah',
  'TVB advisor -> Accenture healthcare leader -> practice discovery call',
  'Discovery meeting with qualified practice sponsor',
  2,
  'Warm',
  0.72
)
on conflict (id) do update set warmth = excluded.warmth;

insert into commercial_forecasts (
  id, company_id, plan_id, pipeline_created, revenue_probability, expected_close,
  tvb_revenue, partner_revenue, services_revenue, learning_value
)
values (
  '50000000-0000-4000-8000-000000000009',
  '10000000-0000-4000-8000-000000000001',
  '50000000-0000-4000-8000-000000000001',
  660000,
  0.36,
  current_date + interval '105 days',
  78000,
  420000,
  420000,
  8
)
on conflict (id) do update set pipeline_created = excluded.pipeline_created;

insert into weekly_reviews (
  id, company_id, plan_id, week_number, completed, in_progress, delayed, blocked, recommendations
)
values (
  '50000000-0000-4000-8000-000000000010',
  '10000000-0000-4000-8000-000000000001',
  '50000000-0000-4000-8000-000000000001',
  2,
  '["Intake profile generated"]'::jsonb,
  '["Validate Accenture healthcare practice intro"]'::jsonb,
  '["Security questionnaire still incomplete"]'::jsonb,
  '[]'::jsonb,
  '["Complete security evidence packet", "Confirm intro path before outbound"]'::jsonb
)
on conflict (id) do update set recommendations = excluded.recommendations;

insert into commercial_templates (id, template_key, name, description, horizon_weeks, motions, active)
values (
  '50000000-0000-4000-8000-000000000011',
  'partner_revenue_sprint',
  '13-Week Partner Revenue Sprint',
  'Turns high-priority partner recommendations into relationship, asset, pilot, and revenue milestones.',
  13,
  '["Warm intro", "Partner pitch", "Pilot SOW", "Co-sell motion"]'::jsonb,
  true
)
on conflict (id) do update set name = excluded.name;

insert into plan_versions (id, plan_id, version, change_reason, snapshot)
values (
  '50000000-0000-4000-8000-000000000012',
  '50000000-0000-4000-8000-000000000001',
  1,
  'Initial demo plan generated from partner recommendation.',
  '{"status":"active","current_week":2,"expected_pipeline":660000}'::jsonb
)
on conflict (id) do update set snapshot = excluded.snapshot;

-- Module 05: Platform Intelligence and Governance.
insert into roles (id, role_key, name, description, active)
values
('60000000-0000-4000-8000-000000000001', 'founder', 'Founder', 'Company founder using TVB execution workflows.', true),
('60000000-0000-4000-8000-000000000002', 'operator', 'Operator', 'TVB operator managing intelligence and execution quality.', true)
on conflict (id) do update set name = excluded.name;

insert into permissions (id, permission_key, name, description)
values
('60000000-0000-4000-8000-000000000003', 'companies.read', 'Read companies', 'View company intelligence records.'),
('60000000-0000-4000-8000-000000000004', 'commercial.execute', 'Execute commercial plans', 'Manage commercial plans and activities.')
on conflict (id) do update set description = excluded.description;

insert into feature_flags (id, flag_key, scope, enabled, rules)
values (
  '60000000-0000-4000-8000-000000000005',
  'module_6_knowledge_center',
  'global',
  true,
  '{"audiences":["founder","operator"]}'::jsonb
)
on conflict (id) do update set enabled = excluded.enabled;

insert into platform_configurations (id, config_key, config_value, scope, scope_id, active)
values (
  '60000000-0000-4000-8000-000000000006',
  'demo.default_workspace',
  '{"workspace_id":"00000000-0000-4000-8000-000000000001","company_id":"10000000-0000-4000-8000-000000000001"}'::jsonb,
  'global',
  null,
  true
)
on conflict (id) do update set config_value = excluded.config_value;

insert into workflow_templates (id, template_key, name, config, active)
values (
  '60000000-0000-4000-8000-000000000007',
  'founder_to_partner_plan',
  'Founder Intake to Partner Plan',
  '{"steps":["intake","knowledge_index","partner_score","commercial_plan","review"]}'::jsonb,
  true
)
on conflict (id) do update set config = excluded.config;

insert into workflow_versions (id, workflow_template_id, version, config, active)
values (
  '60000000-0000-4000-8000-000000000008',
  '60000000-0000-4000-8000-000000000007',
  '1.0.0',
  '{"quality_gates":["profile_complete","evidence_present","human_approval"]}'::jsonb,
  true
)
on conflict (id) do update set active = excluded.active;

insert into prompt_versions (
  id, prompt_key, version, prompt_template, target_model, temperature, input_schema,
  output_schema, evaluation_method, rollback_version, owner, approval_status, active
)
values (
  '60000000-0000-4000-8000-000000000009',
  'partner_recommendation',
  'v1-demo',
  'Score each partner and explain the win-win commercial path with evidence.',
  'gpt-5-mini',
  0.2,
  '{"company":"object","partners":"array"}'::jsonb,
  '{"recommendations":"array"}'::jsonb,
  'human_review',
  null,
  'TVB',
  'approved',
  true
)
on conflict (id) do update set approval_status = excluded.approval_status;

insert into model_routing (id, use_case, provider_name, model_name, priority, enabled, health, config)
values (
  '60000000-0000-4000-8000-000000000010',
  'partner_scoring',
  'OpenAI',
  'gpt-5-mini',
  1,
  true,
  'healthy',
  '{"fallback":"gpt-5-nano"}'::jsonb
)
on conflict (id) do update set health = excluded.health;

insert into plugin_registry (id, plugin_key, name, category, version, enabled, health, config)
values (
  '60000000-0000-4000-8000-000000000011',
  'supabase',
  'Supabase Connector',
  'database',
  '1.0.0',
  true,
  'healthy',
  '{"project":"kyanguocevacepfhwvgy"}'::jsonb
)
on conflict (id) do update set enabled = excluded.enabled;

insert into integration_configs (id, integration_key, provider, config, enabled, health)
values (
  '60000000-0000-4000-8000-000000000012',
  'google_drive_knowledge',
  'Google Drive',
  '{"sync":"manual","supported_types":["pdf","docx","pptx","md"]}'::jsonb,
  true,
  'configured'
)
on conflict (id) do update set health = excluded.health;

insert into audit_events (
  id, actor_id, actor_label, event_type, target_type, target_id, summary, metadata
)
values (
  '60000000-0000-4000-8000-000000000013',
  null,
  'Demo Seeder',
  'seed.created',
  'company',
  '10000000-0000-4000-8000-000000000001',
  'Demo data inserted for end-to-end module testing.',
  '{"modules":[1,2,3,4,5,6]}'::jsonb
)
on conflict (id) do update set summary = excluded.summary;

insert into evaluation_results (
  id, ai_call_id, provider, model, prompt_version, latency_ms, cost, confidence,
  evidence, evaluation, accepted, feedback
)
values (
  '60000000-0000-4000-8000-000000000014',
  'demo-call-001',
  'OpenAI',
  'gpt-5-mini',
  'partner_recommendation:v1-demo',
  1240,
  0.012,
  0.82,
  '["Partner score evidence", "Knowledge brief"]'::jsonb,
  '{"rubric_score":4.2,"needs_human_review":true}'::jsonb,
  true,
  'Useful for demo planning.'
)
on conflict (id) do update set accepted = excluded.accepted;

insert into analytics_snapshots (id, scope, scope_id, metrics)
values (
  '60000000-0000-4000-8000-000000000015',
  'company',
  '10000000-0000-4000-8000-000000000001',
  '{"profile_score":78,"partner_score":83,"commercial_health":76,"docs_indexed":1}'::jsonb
)
on conflict (id) do update set metrics = excluded.metrics;

insert into learning_events (
  id, signal, source_type, source_id, outcome, recommendation, confidence
)
values (
  '60000000-0000-4000-8000-000000000016',
  'partner_recommendation_marked_for_planning',
  'partner_recommendation',
  '40000000-0000-4000-8000-000000000005',
  'accepted',
  'Increase weighting for services opportunity in healthcare SI scoring.',
  0.74
)
on conflict (id) do update set recommendation = excluded.recommendation;

insert into feedback_events (id, source_type, source_id, user_id, rating, feedback)
values (
  '60000000-0000-4000-8000-000000000017',
  'commercial_plan',
  '50000000-0000-4000-8000-000000000001',
  null,
  4,
  'Good structure for a founder-facing 13-week sprint.'
)
on conflict (id) do update set rating = excluded.rating;

insert into system_health (id, component, status, latency_ms, error_rate, metadata)
values (
  '60000000-0000-4000-8000-000000000018',
  'knowledge-indexer',
  'healthy',
  210,
  0.01,
  '{"last_demo_run":"seed"}'::jsonb
)
on conflict (id) do update set status = excluded.status;

insert into job_queue (id, job_type, payload, status, attempts)
values (
  '60000000-0000-4000-8000-000000000019',
  'refresh_partner_scores',
  '{"company_id":"10000000-0000-4000-8000-000000000001"}'::jsonb,
  'queued',
  0
)
on conflict (id) do update set status = excluded.status;

insert into background_workers (id, worker_key, status, last_heartbeat, metadata)
values (
  '60000000-0000-4000-8000-000000000020',
  'demo-worker',
  'idle',
  now(),
  '{"queue":"default"}'::jsonb
)
on conflict (id) do update set last_heartbeat = excluded.last_heartbeat;

insert into scheduled_jobs (id, job_key, schedule, enabled, payload, next_run_at)
values (
  '60000000-0000-4000-8000-000000000021',
  'weekly_commercial_review',
  '0 9 * * MON',
  true,
  '{"plan_id":"50000000-0000-4000-8000-000000000001"}'::jsonb,
  now() + interval '7 days'
)
on conflict (id) do update set next_run_at = excluded.next_run_at;

insert into notification_templates (id, template_key, channel, subject, body, active)
values (
  '60000000-0000-4000-8000-000000000022',
  'weekly_review_ready',
  'email',
  'Your weekly TVB commercial review is ready',
  'Review completed, delayed, and next-best actions for the current sprint.',
  true
)
on conflict (id) do update set subject = excluded.subject;

-- Module 06: Knowledge and Success Center.
insert into documentation_categories (id, category_key, name, description)
values
('70000000-0000-4000-8000-000000000001', 'getting_started', 'Getting Started', 'Founder and operator onboarding guidance.'),
('70000000-0000-4000-8000-000000000002', 'commercial_execution', 'Commercial Execution', 'Playbooks for partner-led revenue execution.')
on conflict (id) do update set description = excluded.description;

insert into documentation_articles (
  id, title, slug, category, tags, audience, version, status, owner,
  related_modules, related_screens, related_apis, content_markdown, approval_status
)
values (
  '70000000-0000-4000-8000-000000000003',
  'How Partner Score Works',
  'how-partner-score-works',
  'commercial_execution',
  '["partners", "scoring", "commercial plan"]'::jsonb,
  '["founder", "operator"]'::jsonb,
  '1.0.0',
  'published',
  'TVB',
  '["module-3", "module-4"]'::jsonb,
  '["Partner Universe", "Commercial Execution"]'::jsonb,
  '["partner_scores", "partner_recommendations"]'::jsonb,
  '# How Partner Score Works\n\nPartner score combines ICP fit, technology alignment, services opportunity, relationship warmth, and speed to revenue. Human approval is required before outreach.',
  'approved'
)
on conflict (id) do update set content_markdown = excluded.content_markdown;

insert into documentation_tags (id, tag)
values
('70000000-0000-4000-8000-000000000004', 'partners'),
('70000000-0000-4000-8000-000000000005', 'commercial-plan')
on conflict (id) do update set tag = excluded.tag;

insert into documentation_feedback (id, article_id, user_id, rating, comment)
values (
  '70000000-0000-4000-8000-000000000006',
  '70000000-0000-4000-8000-000000000003',
  null,
  5,
  'Clear enough for founder onboarding.'
)
on conflict (id) do update set rating = excluded.rating;

insert into documentation_versions (id, article_id, version, content_markdown, change_note)
values (
  '70000000-0000-4000-8000-000000000007',
  '70000000-0000-4000-8000-000000000003',
  '1.0.0',
  '# How Partner Score Works\n\nInitial published version.',
  'Seeded demo help article.'
)
on conflict (id) do update set change_note = excluded.change_note;

insert into documentation_views (id, article_id, user_id, role)
values (
  '70000000-0000-4000-8000-000000000008',
  '70000000-0000-4000-8000-000000000003',
  null,
  'founder'
)
on conflict (id) do update set role = excluded.role;

insert into documentation_search_index (id, article_id, searchable_text, metadata)
values (
  '70000000-0000-4000-8000-000000000009',
  '70000000-0000-4000-8000-000000000003',
  'partner score icp technology services opportunity relationship warmth speed to revenue human approval',
  '{"slug":"how-partner-score-works"}'::jsonb
)
on conflict (id) do update set searchable_text = excluded.searchable_text;

insert into documentation_tours (id, tour_key, title, module, audience, steps, enabled)
values (
  '70000000-0000-4000-8000-000000000010',
  'founder_first_run',
  'Founder First Run',
  'module-1',
  '["founder"]'::jsonb,
  '[{"target":"company-intake","text":"Start with the company profile."},{"target":"partner-plan","text":"Review recommended partner path."}]'::jsonb,
  true
)
on conflict (id) do update set steps = excluded.steps;

insert into documentation_playbooks (id, playbook_key, title, content_markdown, audience, active)
values (
  '70000000-0000-4000-8000-000000000011',
  'partner_intro_playbook',
  'Partner Intro Playbook',
  'Use this playbook to move from scored partner recommendation to warm intro, discovery, pilot SOW, and weekly review.',
  '["operator"]'::jsonb,
  true
)
on conflict (id) do update set content_markdown = excluded.content_markdown;

insert into documentation_faq (id, question, answer_markdown, tags, active)
values (
  '70000000-0000-4000-8000-000000000012',
  'Can founders contact partners directly from the app?',
  'Not yet. The workflow keeps a human approval gate before outreach so TVB can protect relationship quality.',
  '["partners", "approval"]'::jsonb,
  true
)
on conflict (id) do update set answer_markdown = excluded.answer_markdown;

insert into documentation_release_notes (
  id, version, release_date, new_features, improvements, bug_fixes,
  migration_notes, breaking_changes
)
values (
  '70000000-0000-4000-8000-000000000013',
  '0.6.0-demo',
  current_date,
  '["Knowledge and Success Center", "Documentation search records", "Demo seed dataset"]'::jsonb,
  '["End-to-end testing data for Modules 1-6"]'::jsonb,
  '[]'::jsonb,
  '["Run supabase/schema.sql before supabase/seed.sql"]'::jsonb,
  '[]'::jsonb
)
on conflict (id) do update set release_date = excluded.release_date;

insert into documentation_videos (id, title, url, related_article_id)
values (
  '70000000-0000-4000-8000-000000000014',
  'Partner Scoring Walkthrough',
  'https://example.com/tvb-demo/partner-scoring',
  '70000000-0000-4000-8000-000000000003'
)
on conflict (id) do update set title = excluded.title;

insert into documentation_examples (id, article_id, example_type, content)
values (
  '70000000-0000-4000-8000-000000000015',
  '70000000-0000-4000-8000-000000000003',
  'partner_score',
  '{"partner":"Accenture Health Cloud","total_score":83,"priority":"High"}'
)
on conflict (id) do update set content = excluded.content;

commit;
