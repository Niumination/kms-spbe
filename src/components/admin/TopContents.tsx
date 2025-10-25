// src/components/admin/TopContents.tsx
import Link from 'next/link';
import { TrophyIcon, EyeIcon } from 'lucide-react';

interface Content {
  id: string;
  slug: string;
  title: string;
  view_count: number;
  content_type: string;
}

interface TopContentsProps {
  contents: Content[];
}

export function TopContents({ contents }: TopContentsProps) {
  const maxViews = Math.max(...contents.map((c) => c.view_count), 1);

  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32']; // Gold, Silver, Bronze

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrophyIcon className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-900">Top 10 Contents</h3>
      </div>

      <div className="space-y-4">
        {contents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Belum ada konten</p>
        ) : (
          contents.map((content, index) => (
            <div key={content.id} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{
                  background:
                    index < 3
                      ? medalColors[index]
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/content/${content.slug}`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                  target="_blank"
                >
                  {content.title}
                </Link>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500 capitalize">
                    {content.content_type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <EyeIcon className="w-3 h-3" />
                    {content.view_count.toLocaleString()} views
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    style={{
                      width: `${(content.view_count / maxViews) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}