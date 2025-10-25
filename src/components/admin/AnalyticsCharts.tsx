// src/components/admin/AnalyticsCharts.tsx
'use client';

import { useMemo } from 'react';
import { BarChart3Icon, ActivityIcon } from 'lucide-react';

interface ActivityLog {
  action: string;
  created_at: string;
}

interface AnalyticsChartsProps {
  activityStats: ActivityLog[];
}

export function AnalyticsCharts({ activityStats }: AnalyticsChartsProps) {
  const chartData = useMemo(() => {
    // Group by action
    const actionCounts: Record<string, number> = {};
    activityStats.forEach((log) => {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    });

    // Get top 7 actions
    const sorted = Object.entries(actionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 7);

    const maxCount = Math.max(...sorted.map(([, count]) => count), 1);

    return sorted.map(([action, count]) => ({
      action,
      count,
      percentage: (count / maxCount) * 100,
    }));
  }, [activityStats]);

  const dailyActivity = useMemo(() => {
    // Group by day for last 7 days
    const days: Record<string, number> = {};
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayKey = date.toLocaleDateString('id-ID', { 
        month: 'short', 
        day: 'numeric' 
      });
      days[dayKey] = 0;
    }

    activityStats.forEach((log) => {
      const date = new Date(log.created_at);
      const dayKey = date.toLocaleDateString('id-ID', { 
        month: 'short', 
        day: 'numeric' 
      });
      if (days[dayKey] !== undefined) {
        days[dayKey]++;
      }
    });

    const maxCount = Math.max(...Object.values(days), 1);

    return Object.entries(days).map(([day, count]) => ({
      day,
      count,
      percentage: (count / maxCount) * 100,
    }));
  }, [activityStats]);

  const actionLabels: Record<string, string> = {
    view: 'View Content',
    create: 'Create Content',
    update: 'Update Content',
    delete: 'Delete Content',
    login: 'Login',
    logout: 'Logout',
    bookmark: 'Bookmark',
    comment: 'Comment',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Activity by Type */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3Icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Aktivitas by Type
          </h3>
        </div>

        <div className="space-y-4">
          {chartData.map(({ action, count, percentage }) => (
            <div key={action}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {actionLabels[action] || action}
                </span>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <ActivityIcon className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Aktivitas 7 Hari Terakhir
          </h3>
        </div>

        <div className="space-y-4">
          {dailyActivity.map(({ day, count, percentage }) => (
            <div key={day}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{day}</span>
                <span className="text-sm text-gray-500">{count} aktivitas</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}