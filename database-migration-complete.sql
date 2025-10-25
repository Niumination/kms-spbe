-- ================================================================
-- KMS SPBE - COMPLETE DATABASE MIGRATION
-- Version: 2.0
-- Date: 2024-01-20
-- ================================================================

-- CLEANUP (Run only if resetting)
-- ================================================================
DO $$ 
BEGIN
  -- Drop all policies
  DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
  DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
  DROP POLICY IF EXISTS "Anyone can read public content" ON contents;
  DROP POLICY IF EXISTS "Authenticated users can read internal content" ON contents;
  DROP POLICY IF EXISTS "Admins can read restricted content" ON contents;
  DROP POLICY IF EXISTS "Authors can update own content" ON contents;
  DROP POLICY IF EXISTS "Editors can create content" ON contents;
  DROP POLICY IF EXISTS "Users can read own bookmarks" ON bookmarks;
  DROP POLICY IF EXISTS "Users can manage own bookmarks" ON bookmarks;
  DROP POLICY IF EXISTS "Users can read own activity" ON activity_logs;
  DROP POLICY IF EXISTS "Admins can read all activity" ON activity_logs;
  
  -- Drop triggers
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  DROP TRIGGER IF EXISTS on_profile_updated ON profiles;
  DROP TRIGGER IF EXISTS on_content_updated ON contents;
  DROP TRIGGER IF EXISTS set_bookmark_timestamp ON bookmarks;
  DROP TRIGGER IF EXISTS log_content_view ON contents;
  
  -- Drop functions
  DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
  DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
  DROP FUNCTION IF EXISTS public.increment_view_count() CASCADE;
  DROP FUNCTION IF EXISTS public.log_activity() CASCADE;
  
  RAISE NOTICE 'Cleanup completed';
END $$;

-- TABLES
-- ================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  organization TEXT,
  position TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{"notifications": true, "theme": "light"}'::jsonb,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CONTENTS TABLE
CREATE TABLE IF NOT EXISTS contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  body TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('guide', 'policy', 'sop', 'template', 'faq')),
  access_level TEXT NOT NULL DEFAULT 'public' CHECK (access_level IN ('public', 'internal', 'restricted')),
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category TEXT,
  tags TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- 4. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'deleted', 'hidden')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  action_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CONTENT VERSIONS TABLE (Audit/History)
CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  changed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  change_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. SEARCH ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  results_count INTEGER,
  clicked_result_id UUID REFERENCES contents(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TAGS TABLE
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES
-- ================================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_organization ON profiles(organization);

-- Contents indexes
CREATE INDEX IF NOT EXISTS idx_contents_slug ON contents(slug);
CREATE INDEX IF NOT EXISTS idx_contents_type ON contents(content_type);
CREATE INDEX IF NOT EXISTS idx_contents_author ON contents(author_id);
CREATE INDEX IF NOT EXISTS idx_contents_status ON contents(status);
CREATE INDEX IF NOT EXISTS idx_contents_access_level ON contents(access_level);
CREATE INDEX IF NOT EXISTS idx_contents_category ON contents(category);
CREATE INDEX IF NOT EXISTS idx_contents_tags ON contents USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_contents_created_at ON contents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contents_view_count ON contents(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_contents_featured ON contents(featured) WHERE featured = TRUE;

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_contents_search ON contents 
  USING GIN(to_tsvector('indonesian', title || ' ' || COALESCE(description, '') || ' ' || body));

-- Bookmarks indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_content ON bookmarks(content_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_created ON bookmarks(created_at DESC);

-- Activity logs indexes
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_resource ON activity_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_logs(created_at DESC);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- Content versions indexes
CREATE INDEX IF NOT EXISTS idx_content_versions_content ON content_versions(content_id);
CREATE INDEX IF NOT EXISTS idx_content_versions_version ON content_versions(version);

-- Search analytics indexes
CREATE INDEX IF NOT EXISTS idx_search_query ON search_analytics(query);
CREATE INDEX IF NOT EXISTS idx_search_user ON search_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_search_created ON search_analytics(created_at DESC);

-- Tags indexes
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_usage ON tags(usage_count DESC);

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(order_index);

-- ENABLE ROW LEVEL SECURITY
-- ================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES - PROFILES
-- ================================================================

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS POLICIES - CONTENTS
-- ================================================================

CREATE POLICY "Anyone can read public content"
  ON contents FOR SELECT
  USING (access_level = 'public' AND status = 'published');

CREATE POLICY "Authenticated users can read internal content"
  ON contents FOR SELECT
  USING (
    access_level = 'internal' AND 
    status = 'published' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Admins can read restricted content"
  ON contents FOR SELECT
  USING (
    access_level = 'restricted' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authors can read own drafts"
  ON contents FOR SELECT
  USING (
    status = 'draft' AND author_id = auth.uid()
  );

CREATE POLICY "Authors can update own content"
  ON contents FOR UPDATE
  USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Editors can create content"
  ON contents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('editor', 'admin')
    )
  );

CREATE POLICY "Admins can delete content"
  ON contents FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS POLICIES - BOOKMARKS
-- ================================================================

CREATE POLICY "Users can read own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bookmarks"
  ON bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- RLS POLICIES - ACTIVITY LOGS
-- ================================================================

CREATE POLICY "Users can read own activity"
  ON activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all activity"
  ON activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can insert activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (true);

-- RLS POLICIES - COMMENTS
-- ================================================================

CREATE POLICY "Anyone can read active comments"
  ON comments FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS POLICIES - NOTIFICATIONS
-- ================================================================

CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- RLS POLICIES - CONTENT VERSIONS
-- ================================================================

CREATE POLICY "Users can read content versions"
  ON content_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM contents
      WHERE id = content_versions.content_id
      AND (
        access_level = 'public' OR
        (access_level = 'internal' AND auth.uid() IS NOT NULL) OR
        (access_level = 'restricted' AND EXISTS (
          SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
        ))
      )
    )
  );

-- FUNCTIONS
-- ================================================================

-- 1. Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    'user',
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 2. Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 3. Increment view count
CREATE OR REPLACE FUNCTION public.increment_view_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Increment view count when content is accessed
  -- Note: This is just a placeholder, actual implementation 
  -- should be done via API to prevent abuse
  RETURN NEW;
END;
$$;

-- 4. Log activity
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO activity_logs (user_id, action, resource_type, resource_id, metadata)
  VALUES (auth.uid(), p_action, p_resource_type, p_resource_id, p_metadata)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- 5. Create content version
CREATE OR REPLACE FUNCTION public.create_content_version()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_version INTEGER;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version), 0) + 1 INTO v_version
  FROM content_versions
  WHERE content_id = NEW.id;
  
  -- Insert version record
  INSERT INTO content_versions (content_id, version, title, body, changed_by)
  VALUES (NEW.id, v_version, NEW.title, NEW.body, auth.uid());
  
  RETURN NEW;
END;
$$;

-- 6. Update tag usage count
CREATE OR REPLACE FUNCTION public.update_tag_usage()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Decrement old tags
  IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
    UPDATE tags
    SET usage_count = usage_count - 1
    WHERE name = ANY(OLD.tags);
  END IF;
  
  -- Increment new tags
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE tags
    SET usage_count = usage_count + 1
    WHERE name = ANY(NEW.tags);
    
    -- Create tags if they don't exist
    INSERT INTO tags (name, slug)
    SELECT 
      tag_name,
      LOWER(REGEXP_REPLACE(tag_name, '[^a-zA-Z0-9]+', '-', 'g'))
    FROM UNNEST(NEW.tags) AS tag_name
    ON CONFLICT (name) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- 7. Send notification function
CREATE OR REPLACE FUNCTION public.send_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_action_url TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_notification_id UUID;
BEGIN
  INSERT INTO notifications (user_id, title, message, type, action_url)
  VALUES (p_user_id, p_title, p_message, p_type, p_action_url)
  RETURNING id INTO v_notification_id;
  
  RETURN v_notification_id;
END;
$$;

-- 8. Get user statistics
CREATE OR REPLACE FUNCTION public.get_user_stats(p_user_id UUID)
RETURNS TABLE (
  total_bookmarks BIGINT,
  total_comments BIGINT,
  total_content_created BIGINT,
  total_content_views BIGINT,
  last_activity TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM bookmarks WHERE user_id = p_user_id),
    (SELECT COUNT(*) FROM comments WHERE user_id = p_user_id AND status = 'active'),
    (SELECT COUNT(*) FROM contents WHERE author_id = p_user_id AND status = 'published'),
    (SELECT COALESCE(SUM(view_count), 0) FROM contents WHERE author_id = p_user_id),
    (SELECT MAX(created_at) FROM activity_logs WHERE user_id = p_user_id);
END;
$$;

-- 9. Search content function
CREATE OR REPLACE FUNCTION public.search_contents(
  p_query TEXT,
  p_limit INTEGER DEFAULT 10,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  description TEXT,
  content_type TEXT,
  rank REAL
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.slug,
    c.title,
    c.description,
    c.content_type,
    ts_rank(
      to_tsvector('indonesian', c.title || ' ' || COALESCE(c.description, '') || ' ' || c.body),
      plainto_tsquery('indonesian', p_query)
    ) AS rank
  FROM contents c
  WHERE
    c.status = 'published' AND
    c.access_level = 'public' AND
    to_tsvector('indonesian', c.title || ' ' || COALESCE(c.description, '') || ' ' || c.body) @@ 
    plainto_tsquery('indonesian', p_query)
  ORDER BY rank DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- TRIGGERS
-- ================================================================

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update profiles timestamp
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to update contents timestamp
CREATE TRIGGER on_content_updated
  BEFORE UPDATE ON contents
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to create content version
CREATE TRIGGER on_content_version_created
  AFTER INSERT OR UPDATE ON contents
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION public.create_content_version();

-- Trigger to update tag usage
CREATE TRIGGER on_content_tags_changed
  AFTER INSERT OR UPDATE OR DELETE ON contents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_tag_usage();

-- Trigger to update comments timestamp
CREATE TRIGGER on_comment_updated
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- SEED DATA
-- ================================================================

-- Insert default categories
INSERT INTO categories (name, slug, description, icon, order_index)
VALUES
  ('Panduan', 'guides', 'Panduan dan tutorial penggunaan sistem', 'book-open', 1),
  ('Kebijakan', 'policies', 'Kebijakan dan regulasi terkait SPBE', 'file-text', 2),
  ('SOP', 'sops', 'Standard Operating Procedures', 'clipboard-check', 3),
  ('Template', 'templates', 'Template dokumen dan formulir', 'file-code', 4),
  ('FAQ', 'faqs', 'Frequently Asked Questions', 'help-circle', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default tags
INSERT INTO tags (name, slug, color)
VALUES
  ('SPBE', 'spbe', '#3b82f6'),
  ('Tutorial', 'tutorial', '#10b981'),
  ('Getting Started', 'getting-started', '#f59e0b'),
  ('Advanced', 'advanced', '#ef4444'),
  ('Security', 'security', '#8b5cf6'),
  ('Integration', 'integration', '#ec4899'),
  ('Best Practice', 'best-practice', '#14b8a6')
ON CONFLICT (slug) DO NOTHING;

-- VIEWS (for easier querying)
-- ================================================================

-- Popular content view
CREATE OR REPLACE VIEW popular_contents AS
SELECT
  c.id,
  c.slug,
  c.title,
  c.description,
  c.content_type,
  c.view_count,
  c.created_at,
  p.full_name AS author_name,
  (SELECT COUNT(*) FROM bookmarks WHERE content_id = c.id) AS bookmark_count,
  (SELECT COUNT(*) FROM comments WHERE content_id = c.id AND status = 'active') AS comment_count
FROM contents c
LEFT JOIN profiles p ON c.author_id = p.id
WHERE c.status = 'published' AND c.access_level = 'public'
ORDER BY c.view_count DESC;

-- Recent activity view
CREATE OR REPLACE VIEW recent_activities AS
SELECT
  al.id,
  al.action,
  al.resource_type,
  al.resource_id,
  al.created_at,
  p.full_name AS user_name,
  p.avatar_url
FROM activity_logs al
LEFT JOIN profiles p ON al.user_id = p.id
ORDER BY al.created_at DESC;

-- User dashboard stats view
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT
  p.id AS user_id,
  p.full_name,
  p.email,
  p.role,
  (SELECT COUNT(*) FROM bookmarks WHERE user_id = p.id) AS bookmark_count,
  (SELECT COUNT(*) FROM comments WHERE user_id = p.id AND status = 'active') AS comment_count,
  (SELECT COUNT(*) FROM contents WHERE author_id = p.id AND status = 'published') AS content_count,
  (SELECT COALESCE(SUM(view_count), 0) FROM contents WHERE author_id = p.id) AS total_views
FROM profiles p;

-- VERIFICATION
-- ================================================================

DO $$
DECLARE
  table_count INTEGER;
  policy_count INTEGER;
  trigger_count INTEGER;
  function_count INTEGER;
  index_count INTEGER;
BEGIN
  -- Count tables
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN (
    'profiles', 'contents', 'bookmarks', 'activity_logs', 
    'comments', 'notifications', 'content_versions', 
    'search_analytics', 'tags', 'categories'
  );
  
  -- Count policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public';
  
  -- Count triggers
  SELECT COUNT(*) INTO trigger_count
  FROM information_schema.triggers
  WHERE trigger_schema = 'public';
  
  -- Count functions
  SELECT COUNT(*) INTO function_count
  FROM information_schema.routines
  WHERE routine_schema = 'public'
  AND routine_type = 'FUNCTION';
  
  -- Count indexes
  SELECT COUNT(*) INTO index_count
  FROM pg_indexes
  WHERE schemaname = 'public';
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'DATABASE MIGRATION SUMMARY';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Tables created: % (expected: 10)', table_count;
  RAISE NOTICE 'Policies created: %', policy_count;
  RAISE NOTICE 'Triggers created: %', trigger_count;
  RAISE NOTICE 'Functions created: %', function_count;
  RAISE NOTICE 'Indexes created: %', index_count;
  RAISE NOTICE '========================================';
  
  IF table_count = 10 THEN
    RAISE NOTICE '✅ All tables created successfully!';
  ELSE
    RAISE WARNING '⚠️  Some tables may be missing!';
  END IF;
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Migration completed at: %', NOW();
  RAISE NOTICE '========================================';
END $$;
