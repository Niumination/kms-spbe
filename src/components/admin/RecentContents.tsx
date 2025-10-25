// src/components/admin/RecentContents.tsx
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { FileTextIcon, EyeIcon } from 'lucide-react';

interface Content {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  status: string;
  view_count: number;
  created_at: string;
  author: {
    full_name: string | null;
  } | null;
}

interface RecentContentsProps {
  contents: Content[];
}

export function RecentContents({ contents }: RecentContentsProps) {
  const typeColors: Record<string, string> = {
    guide: 'bg-blue-100 text-blue-800',
    policy: 'bg-green-100 text-green-800',
    sop: 'bg-purple-100 text-purple-800',
    template: 'bg-orange-100 text-orange-800',
    faq: 'bg-pink-100 text-pink-800',
  };

  const statusColors: Record<string, string> = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Konten Terbaru</h3>
        <Link
          href="/admin/contents"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {contents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Belum ada konten</p>
        ) : (
          contents.map((content) => (
            <div key={content.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileTextIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/admin/contents/${content.id}/edit`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                >
                  {content.title}
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                      typeColors[content.content_type] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {content.content_type}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                      statusColors[content.status]
                    }`}
                  >
                    {content.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <EyeIcon className="w-3 h-3" />
                    {content.view_count}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {content.author?.full_name || 'Unknown'} •{' '}
                  {formatDistanceToNow(new Date(content.created_at), {
                    addSuffix: true,
                    locale: id,
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}