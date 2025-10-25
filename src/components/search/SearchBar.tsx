// src/components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search" aria-label="Pencarian dokumen">
      <div className="relative">
        <label htmlFor="search-input" className="sr-only">
          Cari dokumen, kebijakan, atau panduan
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search-input"
          type="search"
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Cari dokumen, kebijakan, panduan..."
          aria-label="Kolom pencarian"
          aria-describedby="search-description"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span id="search-description" className="sr-only">
          Masukkan kata kunci untuk mencari dokumen, kebijakan, atau panduan terkait SPBE
        </span>
      </div>
    </form>
  );
}