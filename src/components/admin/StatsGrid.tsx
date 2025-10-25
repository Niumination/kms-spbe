// src/components/admin/StatsGrid.tsx
import {
  FileTextIcon,
  UsersIcon,
  MessageSquareIcon,
  BookmarkIcon,
  CheckCircleIcon,
  FileEditIcon,
  ArchiveIcon,
} from 'lucide-react';

interface StatsGridProps {
  stats: {
    totalContents: number;
    totalUsers: number;
    totalComments: number;
    totalBookmarks: number;
    contentsByStatus: {
      published: number;
      draft: number;
      archived: number;
    };
    contentsByType: Record<string, number>;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  const mainStats = [
    {
      name: 'Total Konten',
      value: stats.totalContents,
      icon: FileTextIcon,
      color: 'blue',
      change: '+12%',
    },
    {
      name: 'Total Pengguna',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'green',
      change: '+8%',
    },
    {
      name: 'Total Komentar',
      value: stats.totalComments,
      icon: MessageSquareIcon,
      color: 'purple',
      change: '+23%',
    },
    {
      name: 'Total Bookmarks',
      value: stats.totalBookmarks,
      icon: BookmarkIcon,
      color: 'orange',
      change: '+15%',
    },
  ];

  const statusStats = [
    {
      name: 'Published',
      value: stats.contentsByStatus.published,
      icon: CheckCircleIcon,
      color: 'green',
    },
    {
      name: 'Draft',
      value: stats.contentsByStatus.draft,
      icon: FileEditIcon,
      color: 'yellow',
    },
    {
      name: 'Archived',
      value: stats.contentsByStatus.archived,
      icon: ArchiveIcon,
      color: 'gray',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-2">{stat.change} vs bulan lalu</p>
              </div>
              <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Konten by Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusStats.map((stat) => (
            <div
              key={stat.name}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200"
            >
              <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content by Type */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Konten by Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(stats.contentsByType).map(([type, count]) => (
            <div key={type} className="text-center p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 capitalize">{type}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}