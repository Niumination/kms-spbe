// src/app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, Eye, Clock, TrendingUp } from 'lucide-react';

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  email?: string;
  [key: string]: any;
}

interface Content {
  id: string;
  title: string;
  view_count: number;
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export default async function DashboardPage() {
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

  const userProfile = profile as Profile | null;

  // Get user's contents
  const [{ data: userContents }, { data: recentViews }] = await Promise.all([
    supabase
      .from('contents')
      .select('*')
      .eq('author_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('content_views')
      .select('*')
      .order('viewed_at', { ascending: false })
      .limit(5),
  ]);

  const totalViews = (userContents as Content[])?.reduce((sum, content) => sum + (content.view_count || 0), 0) || 0;
  const contentCount = userContents?.length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Selamat datang, {userProfile?.full_name || user.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Konten</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {contentCount}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalViews}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktivitas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {recentViews?.length || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Contents */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Konten Terbaru</h2>
          <Link
            href="/dashboard/contents"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {(userContents as Content[])?.map((content) => (
            <div key={content.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/dashboard/contents/${content.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {content.title}
                  </Link>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {content.view_count || 0} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(content.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    content.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {content.status}
                </span>
              </div>
            </div>
          ))}
          {!userContents || userContents.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Belum ada konten
            </div>
          )}
        </div>
      </div>
    </div>
  );
}