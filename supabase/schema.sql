create extension if not exists "pgcrypto";

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
