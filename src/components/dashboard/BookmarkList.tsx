// src/components/dashboard/BookmarkList.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  BookmarkIcon,
  TrashIcon,
  ExternalLinkIcon,
  EyeIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Bookmark {
  id: string;
  notes: string | null;
  created_at: string;
  content: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    content_type: string;
    view_count: number;
    created_at: string;
  };
}

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export function BookmarkList({ bookmarks: initialBookmarks }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (bookmarkId: string) => {
    if (!confirm('Hapus bookmark ini?')) return;

    setDeletingId(bookmarkId);

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (error) throw error;

      setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
      toast.success('Bookmark berhasil dihapus');
      router.refresh();
    } catch (error: any) {
      toast.error('Gagal menghapus bookmark');
    } finally {
      setDeletingId(null);
    }
  };

  const contentTypeColors: Record<string, string> = {
    guide: 'bg-blue-100 text-blue-800',
    policy: 'bg-green-100 text-green-800',
    sop: 'bg-purple-100 text-purple-800',
    template: 'bg-orange-100 text-orange-800',
    faq: 'bg-pink-100 text-pink-800',
  };

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <BookmarkIcon className="w-5 h-5 text-blue-600" />
                <Link
                  href={`/content/${bookmark.content.slug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                >
                  {bookmark.content.title}
                </Link>
              </div>

              {bookmark.content.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {bookmark.content.description}
                </p>
              )}

              {bookmark.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-800">Catatan:</strong> {bookmark.notes}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contentTypeColors[bookmark.content.content_type] ||
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {bookmark.content.content_type}
                </span>
                <span className="flex items-center gap-1">
                  <EyeIcon className="w-4 h-4" />
                  {bookmark.content.view_count.toLocaleString()} views
                </span>
                <span>
                  Disimpan{' '}
                  {formatDistanceToNow(new Date(bookmark.created_at), {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/content/${bookmark.content.slug}`}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Buka konten"
              >
                <ExternalLinkIcon className="w-5 h-5" />
              </Link>
              <button
                onClick={() => handleDelete(bookmark.id)}
                disabled={deletingId === bookmark.id}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Hapus bookmark"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}