-- ============================================
-- MONARCHY HOMES DATABASE SCHEMA
-- Supabase PostgreSQL
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    property_postcode TEXT,
    property_address TEXT,
    property_type TEXT,
    number_of_rooms INTEGER,
    licensed BOOLEAN DEFAULT FALSE,
    has_license TEXT, -- 'yes', 'no', 'unsure'
    current_occupancy INTEGER,
    current_management TEXT,
    current_monthly_income NUMERIC(10,2),
    portfolio_owner BOOLEAN DEFAULT FALSE,
    main_challenges TEXT[],
    preferred_contact TEXT DEFAULT 'phone',
    lead_source TEXT DEFAULT 'website',
    lead_type TEXT DEFAULT 'assessment', -- 'assessment', 'callback', 'contact', 'download'
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'proposal', 'converted', 'lost'
    tags TEXT[],
    notes TEXT,
    assigned_to UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_property_postcode ON leads(property_postcode);
CREATE INDEX IF NOT EXISTS idx_leads_licensed ON leads(licensed);
CREATE INDEX IF NOT EXISTS idx_leads_portfolio_owner ON leads(portfolio_owner);

-- ============================================
-- 2. ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT, -- SHA256 hashed password
    role TEXT DEFAULT 'admin', -- 'super_admin', 'admin', 'viewer'
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- ============================================
-- 3. EMAIL LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    recipient_email TEXT NOT NULL,
    recipient_name TEXT,
    subject TEXT NOT NULL,
    template TEXT, -- template name used
    email_type TEXT DEFAULT 'transactional', -- 'transactional', 'broadcast', 'notification'
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'bounced'
    error_message TEXT,
    metadata JSONB,
    sent_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at DESC);

-- ============================================
-- 4. RESOURCES TABLE (Compliance Guides)
-- ============================================
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'general', -- 'compliance', 'licensing', 'fire_safety', 'general'
    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size INTEGER,
    file_type TEXT,
    download_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_is_public ON resources(is_public);

-- ============================================
-- 5. ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL, -- 'page_view', 'cta_click', 'form_start', 'form_submit', 'calculator_used'
    page_url TEXT,
    page_title TEXT,
    session_id TEXT,
    visitor_id TEXT,
    referrer TEXT,
    user_agent TEXT,
    device_type TEXT, -- 'desktop', 'mobile', 'tablet'
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);

-- ============================================
-- 6. LEAD ACTIVITIES TABLE (Timeline)
-- ============================================
CREATE TABLE IF NOT EXISTS lead_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- 'status_change', 'note_added', 'email_sent', 'call_logged', 'tag_added'
    description TEXT,
    old_value TEXT,
    new_value TEXT,
    performed_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON lead_activities(created_at DESC);

-- ============================================
-- 7. EMAIL TEMPLATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    body_html TEXT NOT NULL,
    body_text TEXT,
    variables TEXT[], -- ['full_name', 'property_postcode']
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. DOWNLOADS TABLE (Lead Magnet Downloads)
-- ============================================
CREATE TABLE IF NOT EXISTS downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    resource TEXT NOT NULL,
    download_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    downloaded BOOLEAN DEFAULT FALSE,
    downloaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_downloads_token ON downloads(download_token);
CREATE INDEX IF NOT EXISTS idx_downloads_email ON downloads(email);
CREATE INDEX IF NOT EXISTS idx_downloads_created_at ON downloads(created_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Policies for leads
CREATE POLICY "Service role can do all on leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated admins can read leads" ON leads
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
    );

CREATE POLICY "Authenticated admins can update leads" ON leads
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
    );

CREATE POLICY "Authenticated admins can delete leads" ON leads
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin')
    );

-- Public insert for lead forms
CREATE POLICY "Anyone can insert leads" ON leads
    FOR INSERT WITH CHECK (true);

-- Policies for admin_users
CREATE POLICY "Admins can read admin_users" ON admin_users
    FOR SELECT USING (
        auth.uid() = id OR 
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies for resources
CREATE POLICY "Anyone can read public resources" ON resources
    FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can manage resources" ON resources
    FOR ALL USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
    );

-- Policies for analytics (public insert, admin read)
CREATE POLICY "Anyone can insert analytics" ON analytics_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read analytics" ON analytics_events
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
    );

-- ============================================
-- INITIAL DATA
-- ============================================

-- Insert default email templates
INSERT INTO email_templates (name, subject, body_html, body_text, variables) VALUES
(
    'lead_confirmation',
    'Thank You for Your Enquiry - Monarchy Homes',
    '<h1>Thank you, {{full_name}}!</h1><p>We have received your property assessment request for {{property_postcode}}.</p><p>One of our property specialists will contact you within 24 hours to discuss how we can help maximise your rental income.</p><p>In the meantime, feel free to download our free HMO Compliance Checklist.</p><p>Best regards,<br>The Monarchy Homes Team</p>',
    'Thank you, {{full_name}}! We have received your property assessment request for {{property_postcode}}. One of our property specialists will contact you within 24 hours.',
    ARRAY['full_name', 'property_postcode']
),
(
    'admin_notification',
    'New Lead: {{full_name}} - {{property_postcode}}',
    '<h2>New Lead Received</h2><p><strong>Name:</strong> {{full_name}}</p><p><strong>Phone:</strong> {{phone}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Postcode:</strong> {{property_postcode}}</p><p><strong>Rooms:</strong> {{number_of_rooms}}</p><p><strong>Licensed:</strong> {{licensed}}</p><p><strong>Type:</strong> {{lead_type}}</p><p><a href="{{admin_url}}">View in Dashboard</a></p>',
    'New Lead: {{full_name}} - Phone: {{phone}} - Postcode: {{property_postcode}}',
    ARRAY['full_name', 'phone', 'email', 'property_postcode', 'number_of_rooms', 'licensed', 'lead_type', 'admin_url']
),
(
    'callback_confirmation',
    'Callback Request Confirmed - Monarchy Homes',
    '<h1>Callback Confirmed</h1><p>Hi {{full_name}},</p><p>We have received your callback request. One of our team will call you at {{phone}} shortly.</p><p>Best regards,<br>Monarchy Homes</p>',
    'Hi {{full_name}}, We have received your callback request. One of our team will call you at {{phone}} shortly.',
    ARRAY['full_name', 'phone']
);
