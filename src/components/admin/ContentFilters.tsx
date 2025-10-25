// src/components/admin/ContentFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon, FilterIcon, XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ContentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    
    router.push(`/admin/contents?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch('');
    setType('');
    setStatus('');
    router.push('/admin/contents');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        applyFilters();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const hasFilters = search || type || status;

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
            placeholder="Cari judul konten..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set('type', e.target.value);
            } else {
              params.delete('type');
            }
            router.push(`/admin/contents?${params.toString()}`);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua Tipe</option>
          <option value="guide">Guide</option>
          <option value="policy">Policy</option>
          <option value="sop">SOP</option>
          <option value="template">Template</option>
          <option value="faq">FAQ</option>
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set('status', e.target.value);
            } else {
              params.delete('status');
            }
            router.push(`/admin/contents?${params.toString()}`);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
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