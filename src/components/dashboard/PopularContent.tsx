// src/components/dashboard/PopularContent.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { EyeIcon, TrendingUpIcon } from 'lucide-react';

interface Content {
  id: string;
  slug: string;
  title: string;
  content_type: string;
  view_count: number;
}

export function PopularContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularContent() {
      const supabase = createClient();
      const { data } = await supabase
        .from('contents')
        .select('id, slug, title, content_type, view_count')
        .eq('status', 'published')
        .eq('access_level', 'public')
        .order('view_count', { ascending: false })
        .limit(5);

      if (data) {
        setContents(data);
      }
      setLoading(false);
    }

    fetchPopularContent();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUpIcon className="w-5 h-5 text-orange-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Konten Populer
        </h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : contents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Belum ada konten populer</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((content, index) => (
            <Link
              key={content.id}
              href={`/content/${content.slug}`}
              className="block group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                    {content.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 capitalize">
                      {content.content_type}
                    </span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <EyeIcon className="w-3 h-3" />
                      {content.view_count.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}