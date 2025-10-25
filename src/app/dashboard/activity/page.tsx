// src/app/dashboard/activity/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { ActivityIcon } from 'lucide-react';

export const metadata = {
  title: 'Aktivitas | KMS SPBE',
};

export default async function ActivityPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  // Get activity logs
  const { data: activities } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ActivityIcon className="w-8 h-8 text-purple-600" />
          Riwayat Aktivitas
        </h1>
        <p className="text-gray-600 mt-1">
          Log aktivitas Anda di sistem KMS SPBE
        </p>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ActivityTimeline activities={activities || []} />
      </div>
    </div>
  );
}