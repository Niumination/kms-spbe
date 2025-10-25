// src/components/dashboard/RecentActivity.tsx
'use client';

import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  FileTextIcon,
  BookmarkIcon,
  MessageSquareIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
} from 'lucide-react';

interface Activity {
  id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  metadata: any;
  created_at: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const actionIcons: Record<string, any> = {
  view: EyeIcon,
  create: FileTextIcon,
  update: EditIcon,
  delete: TrashIcon,
  bookmark: BookmarkIcon,
  comment: MessageSquareIcon,
};

const actionColors: Record<string, string> = {
  view: 'text-blue-600 bg-blue-50',
  create: 'text-green-600 bg-green-50',
  update: 'text-yellow-600 bg-yellow-50',
  delete: 'text-red-600 bg-red-50',
  bookmark: 'text-purple-600 bg-purple-50',
  comment: 'text-orange-600 bg-orange-50',
};

const actionLabels: Record<string, string> = {
  view: 'Melihat',
  create: 'Membuat',
  update: 'Memperbarui',
  delete: 'Menghapus',
  bookmark: 'Menyimpan',
  comment: 'Berkomentar',
};

const resourceLabels: Record<string, string> = {
  content: 'konten',
  bookmark: 'bookmark',
  comment: 'komentar',
  profile: 'profil',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Aktivitas Terakhir
        </h2>
        <div className="text-center py-12">
          <p className="text-gray-500">Belum ada aktivitas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Aktivitas Terakhir
      </h2>
      <div className="space-y-4">
        {activities.slice(0, 8).map((activity) => {
          const Icon = actionIcons[activity.action] || FileTextIcon;
          const colorClass = actionColors[activity.action] || 'text-gray-600 bg-gray-50';
          const actionLabel = actionLabels[activity.action] || activity.action;
          const resourceLabel = resourceLabels[activity.resource_type] || activity.resource_type;

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  {actionLabel} {resourceLabel}
                  {activity.metadata?.title && (
                    <span className="font-medium"> "{activity.metadata.title}"</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.created_at), {
                    addSuffix: true,
                    locale: id,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {activities.length > 8 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a
            href="/dashboard/activity"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Lihat Semua Aktivitas →
          </a>
        </div>
      )}
    </div>
  );
}