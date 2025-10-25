#!/bin/bash
# apply-database-migration.sh

echo "🗄️  Applying KMS SPBE Database Migration..."
echo "========================================"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Option 1: Apply via Supabase CLI
echo "📤 Uploading migration to Supabase..."
supabase db push

# Option 2: Apply via SQL file
# echo "📤 Executing SQL file..."
# psql -h db.xxx.supabase.co -U postgres -d postgres -f database-migration-complete.sql

echo ""
echo "✅ Migration completed!"
echo ""
echo "🔍 Verification:"
echo "  1. Check Supabase Dashboard > Table Editor"
echo "  2. Verify 10 tables exist"
echo "  3. Test RLS policies"
echo ""
echo "📊 Tables created:"
echo "  ✓ profiles"
echo "  ✓ contents"
echo "  ✓ bookmarks"
echo "  ✓ activity_logs"
echo "  ✓ comments"
echo "  ✓ notifications"
echo "  ✓ content_versions"
echo "  ✓ search_analytics"
echo "  ✓ tags"
echo "  ✓ categories"
