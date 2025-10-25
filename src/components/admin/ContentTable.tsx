// src/components/admin/ContentTable.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  EditIcon,
  TrashIcon,
  EyeIcon,
  MoreVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArchiveIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Content {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content_type: string;
  status: string;
  access_level: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    full_name: string | null;
    email: string;
  } | null;
}

interface ContentTableProps {
  contents: Content[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export function ContentTable({
  contents,
  currentPage,
  totalPages,
  totalCount,
}: ContentTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: string, title: string) => {
  if (!confirm(`Yakin ingin menghapus konten "${title}"?`)) return;
  
  setDeletingId(id);
  
  try {
    const { error } = await (supabase as any)
      .from('contents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    toast.success('Konten berhasil dihapus');
    router.refresh();
  } catch (error: any) {
    console.error('Error deleting content:', error);
    toast.error('Gagal menghapus konten');
  } finally {
    setDeletingId(null);
  }
};

  const handleStatusChange = async (id: string, newStatus: string) => {
  try {
    const { error } = await (supabase as any)
      .from('contents')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) throw error;
    toast.success('Status berhasil diubah');
    router.refresh();
  } catch (error: any) {
    console.error('Error updating status:', error);
    toast.error('Gagal mengubah status');
  }
};

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  const accessLevelColors = {
    public: 'bg-blue-100 text-blue-800',
    internal: 'bg-purple-100 text-purple-800',
    restricted: 'bg-red-100 text-red-800',
  };

  const typeColors = {
    guide: 'bg-blue-50 text-blue-700',
    policy: 'bg-green-50 text-green-700',
    sop: 'bg-purple-50 text-purple-700',
    template: 'bg-orange-50 text-orange-700',
    faq: 'bg-pink-50 text-pink-700',
  };

  if (contents.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500">Tidak ada konten ditemukan</p>
      </div>
    );
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Access
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contents.map((content) => (
              <tr key={content.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <Link
                      href={`/content/${content.slug}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                      target="_blank"
                    >
                      {content.title}
                    </Link>
                    {content.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {content.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      typeColors[content.content_type as keyof typeof typeColors] ||
                      'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {content.content_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      statusColors[content.status as keyof typeof statusColors]
                    }`}
                  >
                    {content.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      accessLevelColors[
                        content.access_level as keyof typeof accessLevelColors
                      ]
                    }`}
                  >
                    {content.access_level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    {content.view_count.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.author?.full_name || content.author?.email || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(content.updated_at), {
                    addSuffix: true,
                    locale: id,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/contents/${content.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <EditIcon className="w-4 h-4" />
                    </Link>

                    {/* More menu */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === content.id ? null : content.id)
                        }
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More actions"
                      >
                        <MoreVerticalIcon className="w-4 h-4" />
                      </button>

                      {openMenuId === content.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          ></div>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                            {content.status !== 'published' && (
                              <button
                                onClick={() => handleStatusChange(content.id, 'published')}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                Publish
                              </button>
                            )}
                            {content.status !== 'draft' && (
                              <button
                                onClick={() => handleStatusChange(content.id, 'draft')}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <XCircleIcon className="w-4 h-4 text-yellow-600" />
                                Set as Draft
                              </button>
                            )}
                            {content.status !== 'archived' && (
                              <button
                                onClick={() => handleStatusChange(content.id, 'archived')}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <ArchiveIcon className="w-4 h-4 text-gray-600" />
                                Archive
                              </button>
                            )}
                            <hr className="my-1" />
                            <button
                              onClick={() => handleDelete(content.id, content.title)}
                              disabled={deletingId === content.id}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              <TrashIcon className="w-4 h-4" />
                              {deletingId === content.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * 20 + 1} to{' '}
          {Math.min(currentPage * 20, totalCount)} of {totalCount} results
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`?page=${currentPage - 1}`}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                : 'hover:bg-gray-50'
            }`}
          >
            Previous
          </Link>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Link
                  key={pageNumber}
                  href={`?page=${pageNumber}`}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </div>
          <Link
            href={`?page=${currentPage + 1}`}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                : 'hover:bg-gray-50'
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}