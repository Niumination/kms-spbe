// src/app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PopularContent } from '@/components/dashboard/PopularContent';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  BookmarkIcon, 
  MessageSquareIcon, 
  FileTextIcon, 
  EyeIcon 
} from 'lucide-react';

export const metadata = {
  title: 'Dashboard | KMS SPBE',
  description: 'Dashboard pengguna KMS SPBE',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Get user stats
  const [
    { count: bookmarkCount },
    { count: commentCount },
    { data: userContents },
    { data: recentActivities },
  ] = await Promise.all([
    supabase.from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'active'),
    supabase.from('contents').select('view_count').eq('author_id', user.id).eq('status', 'published'),
    supabase.from('activity_logs').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ]);

  const totalViews = userContents?.reduce((sum, content) => sum + (content.view_count || 0), 0) || 0;
  const contentCount = userContents?.length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Selamat datang kembali! Berikut ringkasan aktivitas Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Bookmarks"
          value={bookmarkCount || 0}
          icon={BookmarkIcon}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Komentar"
          value={commentCount || 0}
          icon={MessageSquareIcon}
          color="green"
        />
        <StatsCard
          title="Konten Dibuat"
          value={contentCount}
          icon={FileTextIcon}
          color="purple"
        />
        <StatsCard
          title="Total Views"
          value={totalViews}
          icon={EyeIcon}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <RecentActivity activities={recentActivities || []} />

        {/* Popular Content */}
        <PopularContent />
      </div>
    </div>
  );
}