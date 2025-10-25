// src/components/admin/UserGrowthChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UsersIcon } from 'lucide-react';

export function UserGrowthChart() {
  const [chartData, setChartData] = useState<Array<{ month: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserGrowth() {
      const supabase = createClient();
      
      // Get users grouped by month for last 6 months
      const { data: users } = await supabase
        .from('profiles')
        .select('created_at')
        .order('created_at', { ascending: true });

      if (users) {
        const monthCounts: Record<string, number> = {};
        const now = new Date();
        
        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          const monthKey = date.toLocaleDateString('id-ID', { 
            month: 'short',
            year: 'numeric',
          });
          monthCounts[monthKey] = 0;
        }

        // Count users per month
        users.forEach((user) => {
          const date = new Date(user.created_at);
          const monthKey = date.toLocaleDateString('id-ID', { 
            month: 'short',
            year: 'numeric',
          });
          if (monthCounts[monthKey] !== undefined) {
            monthCounts[monthKey]++;
          }
        });

        const data = Object.entries(monthCounts).map(([month, count]) => ({
          month,
          count,
        }));

        setChartData(data);
      }
      
      setLoading(false);
    }

    fetchUserGrowth();
  }, []);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <UsersIcon className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Pertumbuhan Pengguna
        </h3>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {chartData.map(({ month, count }) => (
            <div key={month}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{month}</span>
                <span className="text-sm text-gray-500">
                  +{count} user{count !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}