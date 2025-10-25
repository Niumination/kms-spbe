// src/app/admin/contents/page.tsx
import { createClient } from '@/lib/supabase/server';
import { ContentTable } from '@/components/admin/ContentTable';
import { ContentFilters } from '@/components/admin/ContentFilters';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export const metadata = {
  title: 'Kelola Konten | Admin KMS SPBE',
};

interface PageProps {
  searchParams: Promise<{
    type?: string;
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminContentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Build query
  let query = supabase
    .from('contents')
    .select(`
      id,
      slug,
      title,
      description,
      content_type,
      status,
      access_level,
      view_count,
      created_at,
      updated_at,
      author:profiles(id, full_name, email)
    `, { count: 'exact' })
    .order('created_at', { ascending: false });

  // Apply filters
  if (params.type) {
    query = query.eq('content_type', params.type);
  }
  if (params.status) {
    query = query.eq('status', params.status);
  }
  if (params.search) {
    query = query.ilike('title', `%${params.search}%`);
  }

  // Pagination
  const page = parseInt(params.page || '1');
  const limit = 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data: contents, count, error } = await query;

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Konten</h1>
          <p className="text-gray-600 mt-1">
            Manage semua konten di sistem KMS SPBE
          </p>
        </div>
        <Link
          href="/admin/contents/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Buat Konten Baru
        </Link>
      </div>

      {/* Filters */}
      <ContentFilters />

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {error ? (
          <div className="p-8 text-center text-red-600">
            Error loading contents: {error.message}
          </div>
        ) : (
          <ContentTable
            contents={contents || []}
            currentPage={page}
            totalPages={totalPages}
            totalCount={count || 0}
          />
        )}
      </div>
    </div>
  );
}