// src/app/admin/page.tsx
import { createClient } from '@/lib/supabase/server';
import { StatsGrid } from '@/components/admin/StatsGrid';
import { RecentContents } from '@/components/admin/RecentContents';
import { UserActivityChart } from '@/components/admin/UserActivityChart';
import { PopularSearches } from '@/components/admin/PopularSearches';

export const metadata = {
  title: 'Admin Dashboard | KMS SPBE',
  description: 'Admin dashboard untuk mengelola KMS SPBE',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Get statistics
  const [
    { count: totalContents },
    { count: totalUsers },
    { count: totalComments },
    { count: totalBookmarks },
    { data: recentContents },
    { data: topSearches },
  ] = await Promise.all([
    supabase.from('contents').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('comments').select('*', { count: 'exact', head: true }),
    supabase.from('bookmarks').select('*', { count: 'exact', head: true }),
    supabase
      .from('contents')
      .select('id, slug, title, content_type, status, created_at, view_count, author:profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('search_analytics')
      .select('query, count:id.count()')
      .order('count', { ascending: false })
      .limit(10),
  ]);

  // Get content by status
  const { data: contentsByStatus } = await supabase
    .from('contents')
    .select('status')
    .then(({ data }) => {
      const counts = { published: 0, draft: 0, archived: 0 };
      data?.forEach((c) => {
        counts[c.status as keyof typeof counts]++;
      });
      return { data: counts };
    });

  // Get content by type
  const { data: contentsByType } = await supabase
    .from('contents')
    .select('content_type')
    .then(({ data }) => {
      const counts: Record<string, number> = {};
      data?.forEach((c) => {
        counts[c.content_type] = (counts[c.content_type] || 0) + 1;
      });
      return { data: counts };
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview dan statistik sistem KMS SPBE
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        stats={{
          totalContents: totalContents || 0,
          totalUsers: totalUsers || 0,
          totalComments: totalComments || 0,
          totalBookmarks: totalBookmarks || 0,
          contentsByStatus: contentsByStatus || { published: 0, draft: 0, archived: 0 },
          contentsByType: contentsByType || {},
        }}
      />

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contents */}
        <RecentContents contents={recentContents || []} />

        {/* Popular Searches */}
        <PopularSearches searches={topSearches || []} />
      </div>

      {/* User Activity Chart */}
      <UserActivityChart />
    </div>
  );
}