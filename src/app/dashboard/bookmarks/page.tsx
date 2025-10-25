// src/app/dashboard/bookmarks/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { BookmarkList } from '@/components/dashboard/BookmarkList';
import { BookmarkIcon } from 'lucide-react';

export const metadata = {
  title: 'Bookmarks | KMS SPBE',
};

export default async function BookmarksPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Get bookmarks with content details
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select(`
      id,
      notes,
      created_at,
      content:contents (
        id,
        slug,
        title,
        description,
        content_type,
        view_count,
        created_at
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookmarkIcon className="w-8 h-8 text-blue-600" />
            Bookmarks
          </h1>
          <p className="text-gray-600 mt-1">
            Konten yang telah Anda simpan untuk dibaca nanti
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {bookmarks?.length || 0} bookmark tersimpan
        </div>
      </div>

      {/* Bookmarks List */}
      {bookmarks && bookmarks.length > 0 ? (
        <BookmarkList bookmarks={bookmarks} />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BookmarkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada bookmark
          </h3>
          <p className="text-gray-500 mb-6">
            Mulai menyimpan konten yang menarik untuk dibaca nanti
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Jelajahi Konten
          </a>
        </div>
      )}
    </div>
  );
}