// src/app/admin/layout.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Admin Panel | KMS SPBE',
};

interface Profile {
  id: string;
  role: string;
  full_name?: string;
  email?: string;
  [key: string]: any;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  // Only admin and editor can access admin panel
  if (!profile || !['admin', 'editor'].includes((profile as Profile).role)) {
    redirect('/unauthorized');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar profile={profile as Profile} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} profile={profile as Profile} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}