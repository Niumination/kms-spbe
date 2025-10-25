// src/components/admin/UserGrowthChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface User {
  id: string;
  created_at: string;
  email?: string;
  [key: string]: any;
}

export function UserGrowthChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: users } = await supabase
          .from('profiles')
          .select('created_at')
          .order('created_at', { ascending: true });

        const monthCounts: Record<string, number> = {};

        // Count users per month
        (users as User[])?.forEach((user) => {
          const date = new Date(user.created_at);
          const monthKey = date.toLocaleDateString('id-ID', { 
            month: 'short',
            year: 'numeric',
          });
          monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
        });

        const chartData = Object.entries(monthCounts).map(([month, count]) => ({
          bulan: month,
          pengguna: count,
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching user growth data:', error);
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
        Pertumbuhan Pengguna
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="pengguna" 
            stroke="#3b82f6" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}