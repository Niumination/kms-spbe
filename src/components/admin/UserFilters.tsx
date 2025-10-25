// src/components/admin/UserFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon, XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function UserFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [role, setRole] = useState(searchParams.get('role') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (role) params.set('role', role);
    
    router.push(`/admin/users?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch('');
    setRole('');
    router.push('/admin/users');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        applyFilters();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const hasFilters = search || role;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Role Filter */}
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set('role', e.target.value);
            } else {
              params.delete('role');
            }
            router.push(`/admin/users?${params.toString()}`);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Semua Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="user">User</option>
        </select>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}