// src/components/dashboard/ActivityTimeline.tsx
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
  UserIcon,
} from 'lucide-react';

interface Activity {
  id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  metadata: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const actionConfig: Record<string, { icon: any; color: string; label: string }> = {
  view: { icon: EyeIcon, color: 'blue', label: 'Melihat' },
  create: { icon: FileTextIcon, color: 'green', label: 'Membuat' },
  update: { icon: EditIcon, color: 'yellow', label: 'Memperbarui' },
  delete: { icon: TrashIcon, color: 'red', label: 'Menghapus' },
  bookmark: { icon: BookmarkIcon, color: 'purple', label: 'Menyimpan' },
  comment: { icon: MessageSquareIcon, color: 'orange', label: 'Berkomentar' },
  login: { icon: UserIcon, color: 'green', label: 'Login' },
  logout: { icon: UserIcon, color: 'gray', label: 'Logout' },
};

const resourceLabels: Record<string, string> = {
  content: 'konten',
  bookmark: 'bookmark',
  comment: 'komentar',
  profile: 'profil',
  user: 'akun',
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Belum ada aktivitas</p>
      </div>
    );
  }

  // Group by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.created_at).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedActivities).map(([date, dayActivities]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 sticky top-0 bg-white py-2">
            {date}
          </h3>
          <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
            {dayActivities.map((activity, index) => {
              const config = actionConfig[activity.action] || {
                icon: FileTextIcon,
                color: 'gray',
                label: activity.action,
              };

              const Icon = config.icon;
              const colorClasses = {
                blue: 'bg-blue-500',
                green: 'bg-green-500',
                yellow: 'bg-yellow-500',
                red: 'bg-red-500',
                purple: 'bg-purple-500',
                orange: 'bg-orange-500',
                gray: 'bg-gray-500',
              };

              return (
                <div key={activity.id} className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full ${
                      colorClasses[config.color as keyof typeof colorClasses]
                    } ring-4 ring-white`}
                  ></div>

                  {/* Content */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          config.color === 'blue'
                            ? 'bg-blue-100 text-blue-600'
                            : config.color === 'green'
                            ? 'bg-green-100 text-green-600'
                            : config.color === 'yellow'
                            ? 'bg-yellow-100 text-yellow-600'
                            : config.color === 'red'
                            ? 'bg-red-100 text-red-600'
                            : config.color === 'purple'
                            ? 'bg-purple-100 text-purple-600'
                            : config.color === 'orange'
                            ? 'bg-orange-100 text-orange-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {config.label}{' '}
                          {resourceLabels[activity.resource_type] || activity.resource_type}
                          {activity.metadata?.title && (
                            <span className="font-medium">
                              {' '}
                              "{activity.metadata.title}"
                            </span>
                          )}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>
                            {formatDistanceToNow(new Date(activity.created_at), {
                              addSuffix: true,
                              locale: id,
                            })}
                          </span>
                          {activity.ip_address && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span>IP: {activity.ip_address}</span>
                            </>
                          )}
                          {activity.user_agent && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="truncate max-w-xs">
                                {activity.user_agent.split(' ')[0]}
                              </span>
                            </>
                          )}
                        </div>

                        {activity.metadata &&
                          Object.keys(activity.metadata).length > 1 && (
                            <details className="mt-2">
                              <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">
                                Lihat detail
                              </summary>
                              <pre className="mt-2 text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                                {JSON.stringify(activity.metadata, null, 2)}
                              </pre>
                            </details>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}