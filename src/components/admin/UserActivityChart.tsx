// src/components/admin/UserActivityChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Activity {
  id: string;
  created_at: string;
  action?: string;
  user_id?: string;
  [key: string]: any;
}

export function UserActivityChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: activities } = await supabase
          .from('user_activities')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        const hourCounts: Record<string, number> = {};
        for (let i = 0; i < 24; i++) {
          hourCounts[i.toString().padStart(2, '0') + ':00'] = 0;
        }

        (activities as Activity[])?.forEach((activity) => {
          const date = new Date(activity.created_at);
          const hourKey = date.getHours().toString().padStart(2, '0') + ':00';
          if (hourCounts[hourKey] !== undefined) {
            hourCounts[hourKey]++;
          }
        });

        const chartData = Object.entries(hourCounts).map(([hour, count]) => ({
          hour,
          aktivitas: count,
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Aktivitas User per Jam
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="aktivitas" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}