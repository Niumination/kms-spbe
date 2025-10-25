// src/app/dashboard/profile/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/dashboard/ProfileForm';
import { ProfileStats } from '@/components/dashboard/ProfileStats';
import { PasswordChangeForm } from '@/components/dashboard/PasswordChangeForm';

export const metadata = {
  title: 'Profil Saya | KMS SPBE',
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get user statistics
  const { data: stats } = await supabase
    .rpc('get_user_stats', { p_user_id: user.id })
    .single();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-600 mt-1">
          Kelola informasi profil dan pengaturan akun Anda
        </p>
      </div>

      {/* Profile Stats */}
      <ProfileStats stats={stats} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Informasi Profil</h2>
            <ProfileForm profile={profile} user={user} />
          </div>
        </div>

        {/* Side Panel - 1 column */}
        <div className="space-y-6">
          {/* Password Change */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Ubah Password</h2>
            <PasswordChangeForm />
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Informasi Akun</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium">{user.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Role</dt>
                <dd className="font-medium capitalize">{profile?.role}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Member Since</dt>
                <dd className="font-medium">
                  {new Date(profile?.created_at || '').toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Last Login</dt>
                <dd className="font-medium">
                  {profile?.last_login_at ? new Date(profile.last_login_at).toLocaleString('id-ID') : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}