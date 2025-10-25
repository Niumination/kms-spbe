// src/components/dashboard/ProfileStats.tsx
import {
  BookmarkIcon,
  MessageSquareIcon,
  FileTextIcon,
  EyeIcon,
  CalendarIcon,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

interface ProfileStatsProps {
  stats: {
    total_bookmarks: number;
    total_comments: number;
    total_content_created: number;
    total_content_views: number;
    last_activity: string;
  } | null;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  if (!stats) return null;

  const statItems = [
    {
      label: 'Bookmarks',
      value: stats.total_bookmarks,
      icon: BookmarkIcon,
      color: 'blue',
    },
    {
      label: 'Komentar',
      value: stats.total_comments,
      icon: MessageSquareIcon,
      color: 'green',
    },
    {
      label: 'Konten Dibuat',
      value: stats.total_content_created,
      icon: FileTextIcon,
      color: 'purple',
    },
    {
      label: 'Total Views',
      value: stats.total_content_views,
      icon: EyeIcon,
      color: 'orange',
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Statistik</h2>
        {stats.last_activity && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>
              Terakhir aktif{' '}
              {formatDistanceToNow(new Date(stats.last_activity), {
                addSuffix: true,
                locale: id,
              })}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200"
          >
            <div className={`p-2 rounded-lg ${colorClasses[item.color]} mb-2`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {item.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}