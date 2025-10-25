// src/app/admin/analytics/page.tsx
import { createClient } from '@/lib/supabase/server';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { TopContents } from '@/components/admin/TopContents';
import { UserGrowthChart } from '@/components/admin/UserGrowthChart';
import { SearchTrends } from '@/components/admin/SearchTrends';

interface SearchRecord {
  query: string;
  [key: string]: any;
};

export const metadata = {
  title: 'Analytics | Admin KMS SPBE',
};

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Get analytics data
  const [
    { data: topContents },
    { data: recentSearches },
    { data: activityStats },
  ] = await Promise.all([
    supabase
      .from('contents')
      .select('id, slug, title, view_count, content_type')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(10),
    supabase
      .from('search_analytics')
      .select('query, created_at')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('activity_logs')
      .select('action, created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false }),
  ]);

  // Process search trends
  const searchTrends = (recentSearches as SearchRecord[] | undefined)?.reduce((acc, search) => {
    acc[search.query] = (acc[search.query] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSearches = Object.entries(searchTrends || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          Analisis penggunaan dan performa sistem KMS SPBE
        </p>
      </div>

      {/* Charts */}
      <AnalyticsCharts activityStats={activityStats || []} />

      {/* Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Contents */}
        <TopContents contents={topContents || []} />

        {/* Search Trends */}
        <SearchTrends searches={topSearches} />
      </div>

      {/* User Growth */}
      <UserGrowthChart />
    </div>
  );
}