// src/app/admin/users/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UserTable } from '@/components/admin/UserTable';
import { UserFilters } from '@/components/admin/UserFilters';

export const metadata = {
  title: 'Kelola Pengguna | Admin KMS SPBE',
};

interface PageProps {
  searchParams: Promise<{
    role?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  
  // Check admin access
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/unauthorized');
  }

  // Build query
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply filters
  if (params.role) {
    query = query.eq('role', params.role);
  }
  if (params.search) {
    query = query.or(`full_name.ilike.%${params.search}%,email.ilike.%${params.search}%`);
  }

  // Pagination
  const page = parseInt(params.page || '1');
  const limit = 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data: users, count, error } = await query;

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Pengguna</h1>
        <p className="text-gray-600 mt-1">
          Manage user dan role di sistem KMS SPBE
        </p>
      </div>

      {/* Filters */}
      <UserFilters />

      {/* User Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {error ? (
          <div className="p-8 text-center text-red-600">
            Error loading users: {error.message}
          </div>
        ) : (
          <UserTable
            users={users || []}
            currentPage={page}
            totalPages={totalPages}
            totalCount={count || 0}
          />
        )}
      </div>
    </div>
  );
}