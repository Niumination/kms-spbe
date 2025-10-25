// src/app/admin/settings/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SettingsForm } from '@/components/admin/SettingsForm';

export const metadata = {
  title: 'Settings | Admin KMS SPBE',
};

interface Profile {
  id: string;
  role: string;
  [key: string]: any;
}

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || (profile as Profile).role !== 'admin') {
    redirect('/unauthorized');
  }

  // Get system settings
  const { data: settings } = await supabase
    .from('settings')
    .select('*')
    .single();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-1">
          Kelola pengaturan sistem KMS SPBE
        </p>
      </div>

      {/* Settings Form */}
      <SettingsForm initialSettings={settings} />
    </div>
  );
}