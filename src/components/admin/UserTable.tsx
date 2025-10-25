// src/components/admin/UserTable.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  ShieldIcon,
  ShieldCheckIcon,
  UserIcon,
  MoreVerticalIcon,
  BanIcon,
  CheckCircleIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  role: string;
  full_name: string | null;
  organization: string | null;
  phone: string | null;
  created_at: string;
  last_login_at: string | null;
}

interface UserTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export function UserTable({
  users,
  currentPage,
  totalPages,
  totalCount,
}: UserTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleRoleChange = async (userId: string, newRole: string) => {
  try {
    const { error } = await (supabase as any)
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) throw error;
    toast.success('Role berhasil diubah');
    router.refresh();
  } catch (error: any) {
    console.error('Error updating role:', error);
    toast.error('Gagal mengubah role');
  }
};

  const roleConfig = {
    admin: {
      label: 'Admin',
      icon: ShieldCheckIcon,
      color: 'bg-red-100 text-red-800',
      iconColor: 'text-red-600',
    },
    editor: {
      label: 'Editor',
      icon: ShieldIcon,
      color: 'bg-purple-100 text-purple-800',
      iconColor: 'text-purple-600',
    },
    user: {
      label: 'User',
      icon: UserIcon,
      color: 'bg-blue-100 text-blue-800',
      iconColor: 'text-blue-600',
    },
  };

  if (users.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500">Tidak ada pengguna ditemukan</p>
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
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => {
              const config = roleConfig[user.role as keyof typeof roleConfig] || roleConfig.user;
              const Icon = config.icon;

              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                        {user.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name || 'No Name'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.phone && (
                          <div className="text-xs text-gray-400">{user.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.organization || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                        <Icon className={`w-3 h-3 ${config.iconColor}`} />
                        {config.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.last_login_at
                      ? formatDistanceToNow(new Date(user.last_login_at), {
                          addSuffix: true,
                          locale: id,
                        })
                      : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(user.created_at), {
                      addSuffix: true,
                      locale: id,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {/* Role Menu */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === user.id ? null : user.id)
                          }
                          disabled={updatingId === user.id}
                          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                          title="Change role"
                        >
                          <MoreVerticalIcon className="w-4 h-4" />
                        </button>

                        {openMenuId === user.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                Change Role
                              </div>
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleRoleChange(user.id, 'admin')}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <ShieldCheckIcon className="w-4 h-4 text-red-600" />
                                  Set as Admin
                                </button>
                              )}
                              {user.role !== 'editor' && (
                                <button
                                  onClick={() => handleRoleChange(user.id, 'editor')}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <ShieldIcon className="w-4 h-4 text-purple-600" />
                                  Set as Editor
                                </button>
                              )}
                              {user.role !== 'user' && (
                                <button
                                  onClick={() => handleRoleChange(user.id, 'user')}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <UserIcon className="w-4 h-4 text-blue-600" />
                                  Set as User
                                </button>
                              )}
                              <hr className="my-1" />
                              <button
                                onClick={() => {
                                  toast.error('Feature coming soon');
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                View Activity
                              </button>
                              <button
                                onClick={() => {
                                  toast.error('Feature coming soon');
                                  setOpenMenuId(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <BanIcon className="w-4 h-4" />
                                Suspend User
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * 20 + 1} to{' '}
          {Math.min(currentPage * 20, totalCount)} of {totalCount} users
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`?page=${currentPage - 1}`}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                : 'hover:bg-gray-50'
            }`}
          >
            Previous
          </a>
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
                <a
                  key={pageNumber}
                  href={`?page=${pageNumber}`}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    currentPage === pageNumber
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </a>
              );
            })}
          </div>
          <a
            href={`?page=${currentPage + 1}`}
            className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                : 'hover:bg-gray-50'
            }`}
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
}