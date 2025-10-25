// src/app/admin/users/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UserList } from '@/components/admin/UserList';

export const metadata = {
  title: 'Manajemen User | Admin KMS SPBE',
};

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  email?: string;
  [key: string]: any;
}

export default async function UsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get current user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || (profile as Profile).role !== 'admin') {
    redirect('/unauthorized');
  }

  // Get all users
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manajemen User</h1>
        <p className="text-gray-600 mt-1">
          Kelola user dan hak akses mereka
        </p>
      </div>

      {/* User List */}
      <UserList users={(users as Profile[]) || []} />
    </div>
  );
}