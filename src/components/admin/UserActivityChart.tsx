// src/components/admin/UserActivityChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ActivityIcon } from 'lucide-react';

export function UserActivityChart() {
  const [chartData, setChartData] = useState<Array<{ hour: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivityData() {
      const supabase = createClient();
      
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      const { data: activities } = await supabase
        .from('activity_logs')
        .select('created_at')
        .gte('created_at', oneDayAgo)
        .order('created_at', { ascending: true });

      if (activities) {
        const hourCounts: Record<string, number> = {};
        
        for (let i = 23; i >= 0; i--) {
          const date = new Date();
          date.setHours(date.getHours() - i, 0, 0, 0);
          const hourKey = date.getHours().toString().padStart(2, '0') + ':00';
          hourCounts[hourKey] = 0;
        }

        activities.forEach((activity) => {
          const date = new Date(activity.created_at);
          const hourKey = date.getHours().toString().padStart(2, '0') + ':00';
          if (hourCounts[hourKey] !== undefined) {
            hourCounts[hourKey]++;
          }
        });

        const data = Object.entries(hourCounts).map(([hour, count]) => ({
          hour,
          count,
        }));

        setChartData(data);
      }
      
      setLoading(false);
    }

    fetchActivityData();
  }, []);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <ActivityIcon className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Aktivitas User (24 Jam Terakhir)
        </h3>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Belum ada aktivitas</p>
        </div>
      ) : (
        <div className="h-64 flex items-end justify-between gap-1">
          {chartData.map(({ hour, count }) => {
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
            
            return (
              <div
                key={hour}
                className="flex-1 flex flex-col items-center gap-1 group"
              >
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t hover:from-green-600 hover:to-emerald-500 transition-all duration-200 cursor-pointer"
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${hour}: ${count} aktivitas`}
                  ></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {count} aktivitas
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 -rotate-45 origin-top-left mt-2">
                  {hour}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Total aktivitas:{' '}
            <span className="font-semibold text-gray-900">
              {chartData.reduce((sum, d) => sum + d.count, 0)}
            </span>
          </span>
          <span className="text-gray-600">
            Peak:{' '}
            <span className="font-semibold text-gray-900">
              {maxCount} aktivitas
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
