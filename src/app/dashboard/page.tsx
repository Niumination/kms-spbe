// src/app/dashboard/page.tsx (dengan peningkatan interaktivitas)
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FileText, Eye, Clock, TrendingUp, Plus, Search, Filter } from 'lucide-react';

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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang, {userProfile?.full_name || user.email}! 👋
        </h1>
        <p className="text-blue-100 mb-6">
          Ayo mulai berbagi pengetahuan hari ini
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard/contents/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Buat Konten Baru
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            <Search className="w-5 h-5" />
            Jelajahi Konten
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Konten</p>
              <p className="text-3xl font-bold text-gray-900">{contentCount}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +2 bulan ini
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{totalViews}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15% minggu ini
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Aktivitas Terbaru</p>
              <p className="text-3xl font-bold text-gray-900">{recentViews?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-1">views hari ini</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/contents/new"
          className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-center group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-medium text-gray-900">Buat Konten</p>
        </Link>

        <Link
          href="/dashboard/contents"
          className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md hover:border-green-300 transition-all text-center group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-medium text-gray-900">Kelola Konten</p>
        </Link>

        <Link
          href="/dashboard/bookmarks"
          className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all text-center group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="font-medium text-gray-900">Bookmarks</p>
        </Link>

        <Link
          href="/dashboard/activity"
          className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all text-center group"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <p className="font-medium text-gray-900">Aktivitas</p>
        </Link>
      </div>

      {/* Recent Contents */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Konten Terbaru</h2>
            <p className="text-sm text-gray-500 mt-1">Konten yang baru saja Anda buat</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
            <Link
              href="/dashboard/contents"
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              Lihat Semua →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {(userContents as Content[])?.map((content) => (
            <div key={content.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/dashboard/contents/${content.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
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
                      {new Date(content.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    content.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : content.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {content.status}
                </span>
              </div>
            </div>
          ))}
          {!userContents || userContents.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada konten</h3>
              <p className="text-gray-600 mb-4">Mulai berbagi pengetahuan dengan membuat konten pertama Anda</p>
              <Link
                href="/dashboard/contents/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Buat Konten Baru
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}