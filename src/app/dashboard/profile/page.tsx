// src/app/dashboard/profile/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/dashboard/ProfileForm';

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  [key: string]: any;
}

export default async function ProfilePage() {
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

  // Get user statistics - using direct query instead of RPC
  const [
    { count: contentCount },
    { data: contents }
  ] = await Promise.all([
    supabase
      .from('contents')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', user.id),
    supabase
      .from('contents')
      .select('view_count')
      .eq('author_id', user.id)
  ]);

  const totalViews = contents?.reduce((sum: number, c: any) => sum + (c.view_count || 0), 0) || 0;

  const stats = {
    content_count: contentCount || 0,
    total_views: totalViews,
  };

  // Create default profile if not exists
  const userProfile: Profile = profile || {
    id: user.id,
    role: 'viewer',
    full_name: '',
    email: user.email,
    avatar_url: '',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-600 mt-1">
          Kelola informasi profil dan preferensi Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">Total Konten</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.content_count}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">Total Views</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.total_views}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <ProfileForm profile={userProfile} user={user} />
    </div>
  );
}