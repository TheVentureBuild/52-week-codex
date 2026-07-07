create extension if not exists "pgcrypto";
create extension if not exists vector;

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid,
  created_at timestamptz default now()
);

create table if not exists user_roles (
  user_id uuid primary key,
  role text not null check (role in ('founder', 'operator', 'admin')),
  workspace_id uuid references workspaces(id),
  created_at timestamptz default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id),
  name text not null,
  legal_name text,
  website text,
  description text,
  headquarters text,
  founded_year int,
  employee_count_range text,
  revenue_range text,
  funding_stage text,
  primary_industry text,
  secondary_industries jsonb default '[]',
  founder_name text,
  founder_email text,
  intake_status text default 'draft',
  profile_generation_status text default 'not_started',
  review_status text default 'draft',
  created_by uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  submitted_at timestamptz
);

create table if not exists company_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  product_name text,
  product_category text,
  problem_solved text,
  primary_use_case text,
  secondary_use_cases jsonb default '[]',
  differentiators jsonb default '[]',
  deployment_model text,
  pricing_model text,
  average_contract_value numeric,
  sales_cycle_length text,
  implementation_timeline text,
  product_maturity text
);

create table if not exists company_icp (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  target_company_size text,
  target_industries jsonb default '[]',
  target_geographies jsonb default '[]',
  buyer_titles jsonb default '[]',
  influencer_titles jsonb default '[]',
  economic_buyer text,
  technical_buyer text,
  pain_points jsonb default '[]',
  trigger_events jsonb default '[]',
  disqualifying_factors jsonb default '[]'
);

create table if not exists company_customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  customer_name text,
  industry text,
  company_size text,
  geography text,
  use_case text,
  annual_revenue numeric,
  contract_value numeric,
  deployment_type text,
  success_story text,
  expansion_potential text,
  referenceable boolean default false
);

create table if not exists company_technology (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  cloud_provider text,
  backend_language text,
  frontend_framework text,
  database_system text,
  ai_stack jsonb default '[]',
  data_infrastructure jsonb default '[]',
  integrations jsonb default '[]',
  api_available boolean default false,
  security_certifications jsonb default '[]',
  compliance_requirements jsonb default '[]',
  marketplace_listings jsonb default '[]',
  hosting_model text
);

create table if not exists company_gtm (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  current_sales_motion text,
  founder_led_sales boolean default false,
  direct_enterprise_sales boolean default false,
  channel_sales boolean default false,
  existing_partners jsonb default '[]',
  existing_resellers jsonb default '[]',
  existing_si_relationships jsonb default '[]',
  hyperscaler_relationship text,
  marketing_channels jsonb default '[]',
  current_pipeline numeric,
  current_arr numeric,
  revenue_goals jsonb default '[]'
);

create table if not exists company_partner_readiness (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  partner_sellable boolean default false,
  requires_implementation_services boolean default false,
  requires_integration_services boolean default false,
  requires_managed_services boolean default false,
  partners_can_make_services_revenue boolean default false,
  partner_collateral_available boolean default false,
  partner_margin_available boolean default false,
  revenue_share_available boolean default false,
  training_material_available boolean default false,
  demo_environment_available boolean default false
);

create table if not exists company_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  file_name text,
  file_type text,
  storage_path text,
  uploaded_by uuid,
  uploaded_at timestamptz default now(),
  processing_status text default 'uploaded'
);

create table if not exists company_intelligence_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  summary text,
  product_category text,
  core_problem text,
  icp_summary text,
  buyer_personas jsonb default '[]',
  customer_segments jsonb default '[]',
  traction_summary text,
  technology_summary text,
  gtm_readiness_score numeric,
  partner_readiness_score numeric,
  hyperscaler_alignment text,
  si_partner_potential text,
  revenue_motion_summary text,
  missing_information jsonb default '[]',
  recommended_next_data jsonb default '[]',
  confidence_score numeric,
  evidence jsonb default '[]',
  generated_at timestamptz default now(),
  generated_by_model text,
  prompt_version text
);

create table if not exists configurations (
  id uuid primary key default gen_random_uuid(),
  config_key text unique,
  config_value jsonb,
  config_type text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists prompt_registry (
  id uuid primary key default gen_random_uuid(),
  prompt_key text,
  version text,
  purpose text,
  prompt_template text,
  input_schema jsonb,
  output_schema jsonb,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists ai_provider_configs (
  id uuid primary key default gen_random_uuid(),
  provider_name text,
  provider_type text,
  model_name text,
  use_case text,
  config jsonb,
  active boolean default true
);

alter table companies enable row level security;
alter table company_profiles enable row level security;
alter table company_icp enable row level security;
alter table company_customers enable row level security;
alter table company_technology enable row level security;
alter table company_gtm enable row level security;
alter table company_partner_readiness enable row level security;
alter table company_documents enable row level security;
alter table company_intelligence_profiles enable row level security;
alter table configurations enable row level security;
alter table prompt_registry enable row level security;
alter table ai_provider_configs enable row level security;

drop policy if exists "founders can read own companies" on companies;
drop policy if exists "founders can write own companies" on companies;

create policy "founders can read own companies" on companies
  for select using (created_by = auth.uid() or exists (select 1 from user_roles where user_id = auth.uid() and role in ('operator', 'admin')));

create policy "founders can write own companies" on companies
  for all using (created_by = auth.uid() or exists (select 1 from user_roles where user_id = auth.uid() and role in ('operator', 'admin')));

create table if not exists knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  source_type text not null,
  source_uri text,
  sync_frequency text,
  auto_sync boolean default false,
  include_subfolders boolean default false,
  maximum_file_size_mb int,
  supported_types jsonb default '[]',
  status text default 'connected',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  source_id uuid references knowledge_sources(id),
  file_name text,
  file_type text,
  document_category text,
  storage_path text,
  source_uri text,
  processing_stage text default 'queued',
  summary text,
  extracted_topics jsonb default '[]',
  extracted_technologies jsonb default '[]',
  extracted_customers jsonb default '[]',
  extracted_competitors jsonb default '[]',
  extracted_products jsonb default '[]',
  confidence_score numeric,
  page_count int default 0,
  indexed_chunks int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  document_id uuid references knowledge_documents(id) on delete cascade,
  chunk_index int,
  content text,
  page_reference text,
  token_count int,
  embedding vector,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists knowledge_entities (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  document_id uuid references knowledge_documents(id) on delete set null,
  entity_type text,
  name text,
  confidence_score numeric,
  evidence text,
  page_reference text,
  source_timestamp timestamptz,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists knowledge_relationships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  source_entity_id uuid references knowledge_entities(id) on delete cascade,
  target_entity_id uuid references knowledge_entities(id) on delete cascade,
  source_node text,
  relationship_type text,
  target_node text,
  confidence_score numeric,
  evidence text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists knowledge_topics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  document_id uuid references knowledge_documents(id) on delete cascade,
  topic text,
  confidence_score numeric,
  evidence text,
  created_at timestamptz default now()
);

create table if not exists company_personas (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  persona_type text,
  title text,
  goals jsonb default '[]',
  pain_points jsonb default '[]',
  kpis jsonb default '[]',
  buying_criteria jsonb default '[]',
  objections jsonb default '[]',
  decision_drivers jsonb default '[]',
  evidence jsonb default '[]',
  confidence_score numeric,
  generated_at timestamptz default now()
);

create table if not exists company_icp_analysis (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  current_icp text,
  suggested_icp text,
  confidence_score numeric,
  supporting_evidence jsonb default '[]',
  missing_segments jsonb default '[]',
  recommended_segments jsonb default '[]',
  priority_industries jsonb default '[]',
  recommended_buyer_titles jsonb default '[]',
  ideal_company_size text,
  ideal_geography text,
  generated_at timestamptz default now()
);

create table if not exists customer_patterns (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  common_industry text,
  average_company_size text,
  common_geography text,
  buying_committee jsonb default '[]',
  technical_decision_makers jsonb default '[]',
  business_decision_makers jsonb default '[]',
  typical_acv numeric,
  implementation_length text,
  common_integrations jsonb default '[]',
  deployment_models jsonb default '[]',
  success_factors jsonb default '[]',
  expansion_factors jsonb default '[]',
  generated_at timestamptz default now()
);

create table if not exists knowledge_processing_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  document_id uuid references knowledge_documents(id) on delete cascade,
  stage text default 'queued',
  status text default 'queued',
  restartable boolean default true,
  error_message text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);

alter table knowledge_sources enable row level security;
alter table knowledge_documents enable row level security;
alter table knowledge_chunks enable row level security;
alter table knowledge_entities enable row level security;
alter table knowledge_relationships enable row level security;
alter table knowledge_topics enable row level security;
alter table company_personas enable row level security;
alter table company_icp_analysis enable row level security;
alter table customer_patterns enable row level security;
alter table knowledge_processing_jobs enable row level security;

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text,
  website text,
  description text,
  partner_type text,
  headquarters text,
  geographies jsonb default '[]',
  industries jsonb default '[]',
  technology_focus jsonb default '[]',
  cloud_focus jsonb default '[]',
  services_offered jsonb default '[]',
  partner_size text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists company_partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  partner_id uuid references partners(id) on delete cascade,
  source text,
  relationship_owner text,
  relationship_strength numeric,
  notes text,
  status text default 'generated',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists partner_scores (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  partner_id uuid references partners(id) on delete cascade,
  icp_fit_score numeric,
  industry_fit_score numeric,
  technology_fit_score numeric,
  cloud_fit_score numeric,
  customer_overlap_score numeric,
  services_opportunity_score numeric,
  resale_opportunity_score numeric,
  relationship_score numeric,
  speed_to_revenue_score numeric,
  tvb_revenue_potential_score numeric,
  competitive_risk_score numeric,
  total_score numeric,
  confidence_score numeric,
  score_version text,
  evidence jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists partner_recommendations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  partner_id uuid references partners(id) on delete cascade,
  recommendation_type text,
  priority text,
  rationale text,
  why_partner_would_care text,
  win_win_proposal text,
  suggested_pitch text,
  recommended_next_action text,
  estimated_product_revenue numeric,
  estimated_services_revenue numeric,
  estimated_tvb_revenue numeric,
  estimated_time_to_revenue text,
  assumptions jsonb default '[]',
  risks jsonb default '[]',
  evidence jsonb default '[]',
  status text default 'generated',
  owner text,
  notes text,
  mark_for_planning boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists partner_import_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  file_name text,
  source_type text,
  status text,
  imported_count int default 0,
  failed_count int default 0,
  errors jsonb default '[]',
  created_at timestamptz default now(),
  completed_at timestamptz
);

alter table partners enable row level security;
alter table company_partners enable row level security;
alter table partner_scores enable row level security;
alter table partner_recommendations enable row level security;
alter table partner_import_jobs enable row level security;

create table if not exists commercial_plans (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  name text,
  template_key text,
  horizon_weeks int,
  status text default 'draft',
  commercial_health_score numeric,
  current_week int,
  expected_pipeline numeric,
  revenue_forecast numeric,
  completed_activities int default 0,
  blocked_activities int default 0,
  at_risk_activities int default 0,
  version int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists commercial_activities (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references commercial_plans(id) on delete cascade,
  company_id uuid references companies(id) on delete cascade,
  title text,
  description text,
  category text,
  priority text,
  owner text,
  due_date date,
  status text default 'draft',
  expected_revenue numeric,
  probability numeric,
  confidence_score numeric,
  evidence jsonb default '[]',
  source_recommendation_id uuid,
  target_company text,
  target_partner_id uuid references partners(id) on delete set null,
  target_contact text,
  relationship_needed text,
  commercial_motion text,
  estimated_effort text,
  why_now text,
  sequencing_rationale text,
  suggested_email text,
  suggested_meeting_agenda jsonb default '[]',
  success_criteria jsonb default '[]',
  kpis jsonb default '[]',
  revenue_impact numeric,
  execution_difficulty numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists activity_dependencies (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references commercial_activities(id) on delete cascade,
  depends_on_activity_id uuid references commercial_activities(id) on delete cascade,
  dependency_type text,
  created_at timestamptz default now()
);

create table if not exists activity_assignments (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references commercial_activities(id) on delete cascade,
  assigned_to text,
  role text,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists activity_notes (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references commercial_activities(id) on delete cascade,
  author_id uuid,
  note text,
  created_at timestamptz default now()
);

create table if not exists activity_status_history (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references commercial_activities(id) on delete cascade,
  old_status text,
  new_status text,
  changed_by uuid,
  note text,
  created_at timestamptz default now()
);

create table if not exists relationship_paths (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  target_partner_id uuid references partners(id) on delete set null,
  target_contact text,
  recommended_introduction text,
  relationship_strength numeric,
  tvb_owner text,
  suggested_introduction_path text,
  expected_outcome text,
  path_length int,
  warmth text,
  confidence_score numeric,
  created_at timestamptz default now()
);

create table if not exists commercial_forecasts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  plan_id uuid references commercial_plans(id) on delete cascade,
  pipeline_created numeric,
  revenue_probability numeric,
  expected_close date,
  tvb_revenue numeric,
  partner_revenue numeric,
  services_revenue numeric,
  learning_value numeric,
  created_at timestamptz default now()
);

create table if not exists weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  plan_id uuid references commercial_plans(id) on delete cascade,
  week_number int,
  completed jsonb default '[]',
  in_progress jsonb default '[]',
  delayed jsonb default '[]',
  blocked jsonb default '[]',
  recommendations jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists commercial_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text unique,
  name text,
  description text,
  horizon_weeks int,
  motions jsonb default '[]',
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists plan_versions (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references commercial_plans(id) on delete cascade,
  version int,
  change_reason text,
  snapshot jsonb,
  created_at timestamptz default now()
);

alter table commercial_plans enable row level security;
alter table commercial_activities enable row level security;
alter table activity_dependencies enable row level security;
alter table activity_assignments enable row level security;
alter table activity_notes enable row level security;
alter table activity_status_history enable row level security;
alter table relationship_paths enable row level security;
alter table commercial_forecasts enable row level security;
alter table weekly_reviews enable row level security;
alter table commercial_templates enable row level security;
alter table plan_versions enable row level security;

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  role_key text unique,
  name text,
  description text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  permission_key text unique,
  name text,
  description text,
  created_at timestamptz default now()
);

create table if not exists feature_flags (
  id uuid primary key default gen_random_uuid(),
  flag_key text unique,
  scope text,
  enabled boolean default false,
  rules jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists platform_configurations (
  id uuid primary key default gen_random_uuid(),
  config_key text unique,
  config_value jsonb,
  scope text,
  scope_id text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists workflow_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text unique,
  name text,
  config jsonb,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists workflow_versions (
  id uuid primary key default gen_random_uuid(),
  workflow_template_id uuid references workflow_templates(id) on delete cascade,
  version text,
  config jsonb,
  active boolean default false,
  created_at timestamptz default now()
);

create table if not exists prompt_versions (
  id uuid primary key default gen_random_uuid(),
  prompt_key text,
  version text,
  prompt_template text,
  target_model text,
  temperature numeric,
  input_schema jsonb,
  output_schema jsonb,
  evaluation_method text,
  rollback_version text,
  owner text,
  approval_status text,
  active boolean default false,
  created_at timestamptz default now()
);

create table if not exists model_routing (
  id uuid primary key default gen_random_uuid(),
  use_case text,
  provider_name text,
  model_name text,
  priority int,
  enabled boolean default true,
  health text,
  config jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists plugin_registry (
  id uuid primary key default gen_random_uuid(),
  plugin_key text unique,
  name text,
  category text,
  version text,
  enabled boolean default false,
  health text,
  config jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists integration_configs (
  id uuid primary key default gen_random_uuid(),
  integration_key text unique,
  provider text,
  config jsonb default '{}',
  enabled boolean default false,
  health text,
  updated_at timestamptz default now()
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  actor_label text,
  event_type text,
  target_type text,
  target_id text,
  summary text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists evaluation_results (
  id uuid primary key default gen_random_uuid(),
  ai_call_id text,
  provider text,
  model text,
  prompt_version text,
  latency_ms numeric,
  cost numeric,
  confidence numeric,
  evidence jsonb default '[]',
  evaluation jsonb default '{}',
  accepted boolean,
  feedback text,
  created_at timestamptz default now()
);

create table if not exists analytics_snapshots (
  id uuid primary key default gen_random_uuid(),
  scope text,
  scope_id text,
  metrics jsonb,
  created_at timestamptz default now()
);

create table if not exists learning_events (
  id uuid primary key default gen_random_uuid(),
  signal text,
  source_type text,
  source_id text,
  outcome text,
  recommendation text,
  confidence numeric,
  created_at timestamptz default now()
);

create table if not exists feedback_events (
  id uuid primary key default gen_random_uuid(),
  source_type text,
  source_id text,
  user_id uuid,
  rating numeric,
  feedback text,
  created_at timestamptz default now()
);

create table if not exists system_health (
  id uuid primary key default gen_random_uuid(),
  component text,
  status text,
  latency_ms numeric,
  error_rate numeric,
  metadata jsonb default '{}',
  checked_at timestamptz default now()
);

create table if not exists job_queue (
  id uuid primary key default gen_random_uuid(),
  job_type text,
  payload jsonb,
  status text default 'queued',
  attempts int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists background_workers (
  id uuid primary key default gen_random_uuid(),
  worker_key text,
  status text,
  last_heartbeat timestamptz,
  metadata jsonb default '{}'
);

create table if not exists scheduled_jobs (
  id uuid primary key default gen_random_uuid(),
  job_key text,
  schedule text,
  enabled boolean default true,
  payload jsonb default '{}',
  next_run_at timestamptz
);

create table if not exists notification_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text unique,
  channel text,
  subject text,
  body text,
  active boolean default true,
  created_at timestamptz default now()
);

alter table roles enable row level security;
alter table permissions enable row level security;
alter table feature_flags enable row level security;
alter table platform_configurations enable row level security;
alter table workflow_templates enable row level security;
alter table workflow_versions enable row level security;
alter table prompt_versions enable row level security;
alter table model_routing enable row level security;
alter table plugin_registry enable row level security;
alter table integration_configs enable row level security;
alter table audit_events enable row level security;
alter table evaluation_results enable row level security;
alter table analytics_snapshots enable row level security;
alter table learning_events enable row level security;
alter table feedback_events enable row level security;
alter table system_health enable row level security;
alter table job_queue enable row level security;
alter table background_workers enable row level security;
alter table scheduled_jobs enable row level security;
alter table notification_templates enable row level security;

create table if not exists ui_action_events (
  id uuid primary key default gen_random_uuid(),
  action_key text not null,
  entity_type text,
  entity_id text,
  status text default 'completed',
  payload jsonb default '{}',
  result jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists ui_action_state (
  action_key text primary key,
  entity_type text,
  entity_id text,
  status text default 'saved',
  payload jsonb default '{}',
  result jsonb default '{}',
  updated_at timestamptz default now()
);

alter table ui_action_events enable row level security;
alter table ui_action_state enable row level security;

drop policy if exists "ui action events can be inserted by app" on ui_action_events;
drop policy if exists "ui action events can be read by app" on ui_action_events;
drop policy if exists "ui action state can be upserted by app" on ui_action_state;
drop policy if exists "ui action state can be read by app" on ui_action_state;

create policy "ui action events can be inserted by app" on ui_action_events
  for insert to anon, authenticated with check (true);

create policy "ui action events can be read by app" on ui_action_events
  for select to anon, authenticated using (true);

create policy "ui action state can be upserted by app" on ui_action_state
  for all to anon, authenticated using (true) with check (true);

create policy "ui action state can be read by app" on ui_action_state
  for select to anon, authenticated using (true);

create table if not exists documentation_categories (
  id uuid primary key default gen_random_uuid(),
  category_key text unique,
  name text,
  description text,
  created_at timestamptz default now()
);

create table if not exists documentation_articles (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text unique,
  category text,
  tags jsonb default '[]',
  audience jsonb default '[]',
  version text,
  status text default 'draft',
  owner text,
  related_modules jsonb default '[]',
  related_screens jsonb default '[]',
  related_apis jsonb default '[]',
  content_markdown text,
  approval_status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists documentation_tags (
  id uuid primary key default gen_random_uuid(),
  tag text unique,
  created_at timestamptz default now()
);

create table if not exists documentation_feedback (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references documentation_articles(id) on delete cascade,
  user_id uuid,
  rating numeric,
  comment text,
  created_at timestamptz default now()
);

create table if not exists documentation_versions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references documentation_articles(id) on delete cascade,
  version text,
  content_markdown text,
  change_note text,
  created_at timestamptz default now()
);

create table if not exists documentation_views (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references documentation_articles(id) on delete cascade,
  user_id uuid,
  role text,
  viewed_at timestamptz default now()
);

create table if not exists documentation_search_index (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references documentation_articles(id) on delete cascade,
  searchable_text text,
  metadata jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists documentation_tours (
  id uuid primary key default gen_random_uuid(),
  tour_key text unique,
  title text,
  module text,
  audience jsonb default '[]',
  steps jsonb default '[]',
  enabled boolean default true,
  created_at timestamptz default now()
);

create table if not exists documentation_playbooks (
  id uuid primary key default gen_random_uuid(),
  playbook_key text unique,
  title text,
  content_markdown text,
  audience jsonb default '[]',
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists documentation_faq (
  id uuid primary key default gen_random_uuid(),
  question text,
  answer_markdown text,
  tags jsonb default '[]',
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists documentation_release_notes (
  id uuid primary key default gen_random_uuid(),
  version text,
  release_date date,
  new_features jsonb default '[]',
  improvements jsonb default '[]',
  bug_fixes jsonb default '[]',
  migration_notes jsonb default '[]',
  breaking_changes jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists documentation_videos (
  id uuid primary key default gen_random_uuid(),
  title text,
  url text,
  related_article_id uuid references documentation_articles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists documentation_examples (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references documentation_articles(id) on delete cascade,
  example_type text,
  content text,
  created_at timestamptz default now()
);

alter table documentation_categories enable row level security;
alter table documentation_articles enable row level security;
alter table documentation_tags enable row level security;
alter table documentation_feedback enable row level security;
alter table documentation_versions enable row level security;
alter table documentation_views enable row level security;
alter table documentation_search_index enable row level security;
alter table documentation_tours enable row level security;
alter table documentation_playbooks enable row level security;
alter table documentation_faq enable row level security;
alter table documentation_release_notes enable row level security;
alter table documentation_videos enable row level security;
alter table documentation_examples enable row level security;
