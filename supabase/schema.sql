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
