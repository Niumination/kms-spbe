// src/app/admin/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Eye,
  TrendingUp,
} from 'lucide-react';

export const metadata = {
  title: 'Dashboard Admin | KMS SPBE',
};

interface Content {
  id: string;
  status: 'published' | 'draft' | 'archived';
  [key: string]: any;
}

interface Profile {
  id: string;
  role: string;
  [key: string]: any;
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'editor'].includes((profile as Profile).role)) {
    redirect('/unauthorized');
  }

  // Get statistics
  const [contentStats, userStats, viewStats] = await Promise.all([
    supabase.from('contents').select('status').then(({ data }) => {
      const counts = { published: 0, draft: 0, archived: 0 };
      (data as Content[])?.forEach((c) => {
        counts[c.status as keyof typeof counts]++;
      });
      return { data: counts };
    }),
    supabase.from('profiles').select('role').then(({ data }) => {
      return { data: data?.length || 0 };
    }),
    supabase.from('content_views').select('views').then(({ data }) => {
      const total = data?.reduce((sum, item: any) => sum + (item.views || 0), 0) || 0;
      return { data: total };
    }),
  ]);

  const stats = [
    {
      title: 'Total Konten',
      value: (contentStats.data.published + contentStats.data.draft + contentStats.data.archived).toString(),
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Konten Published',
      value: contentStats.data.published.toString(),
      icon: LayoutDashboard,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Total Users',
      value: userStats.data.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+5%',
    },
    {
      title: 'Total Views',
      value: viewStats.data.toString(),
      icon: Eye,
      color: 'bg-orange-500',
      change: '+23%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Selamat datang di Admin Panel KMS SPBE
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600">Belum ada aktivitas terbaru</p>
        </div>
      </div>
    </div>
  );
}